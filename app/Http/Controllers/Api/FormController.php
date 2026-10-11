<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CareerApplication;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class FormController extends Controller
{
    /**
     * Validate all client fields, but persist only database-backed attributes.
     * Timeline and source are accepted for forward-compatible forms without
     * attempting INSERTs into columns absent from the original contacts table.
     */
    public function submitContact(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'email', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'service' => ['required', 'string', 'max:120'],
            'budget' => ['nullable', 'string', 'max:120'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
            'whatsapp' => ['nullable', 'string', 'max:60'],
            'timeline' => ['nullable', 'string', 'max:120'],
            'source' => ['nullable', 'string', 'max:120'],
        ]);

        $data = Arr::only($validated, [
            'name', 'email', 'company', 'service', 'budget', 'message', 'whatsapp',
        ]);
        // Retain optional project context without introducing schema changes.
        $context = [];
        if (! empty($validated['timeline'])) {
            $context[] = 'Preferred timeline: '.$validated['timeline'];
        }
        if (! empty($validated['source'])) {
            $context[] = 'Referral source: '.$validated['source'];
        }
        if ($context !== []) {
            $data['message'] .= "\n\n".implode("\n", $context);
        }
        $contact = Contact::create($data);

        // Notification failure must not undo an already stored inquiry.
        try {
            Mail::raw(
                "New contact from {$validated['name']} ({$validated['email']}):\n\n{$contact->message}",
                static function ($mail): void {
                    $mail->to('info@ayamilcoders.com')->subject('New Contact Form Submission');
                }
            );
        } catch (Throwable $exception) {
            // Log metadata only; do not expose inquiry text or private details.
            Log::warning('Contact notification delivery failed', [
                'contact_id' => $contact->getKey(),
                'error_type' => get_class($exception),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Your inquiry has been received. Our team will respond as soon as possible.',
        ], 201);
    }

    /** Save career applications without leaking uploads into mass assignment. */
    public function submitCareer(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:60'],
            'role' => ['required', 'string', 'max:120'],
            'experience' => ['required', 'string', 'max:80'],
            'portfolio_url' => ['nullable', 'url', 'max:255'],
            'message' => ['required', 'string', 'min:20', 'max:5000'],
            'resume' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
        ]);

        // Preserve the existing public-disk behavior for compatibility with
        // the current resume_url accessor; migrating old CVs to private storage
        // requires an authenticated download flow and a separate rollout.
        $resumePath = $request->hasFile('resume')
            ? $request->file('resume')->store('resumes', 'public')
            : null;

        try {
            CareerApplication::create([
                ...Arr::only($validated, [
                    'name', 'email', 'phone', 'role', 'experience', 'portfolio_url', 'message',
                ]),
                'resume_path' => $resumePath,
            ]);
        } catch (Throwable $exception) {
            // Do not strand the uploaded file if the database transaction fails.
            if ($resumePath !== null) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($resumePath);
            }
            throw $exception;
        }

        return response()->json([
            'success' => true,
            'message' => 'Your application has been received. Thank you for your interest.',
        ], 201);
    }
}
