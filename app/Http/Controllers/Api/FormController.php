<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\Contact;
use App\Models\CareerApplication;

class FormController extends Controller
{
    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'company' => 'nullable|string|max:255',
            'service' => 'required|string',
            'budget' => 'nullable|string',
            'message' => 'required|string|min:10|max:5000',
            'whatsapp' => 'nullable|string',
        ]);

        // Save to database
        $contact = Contact::create($validated);

        // Optional: Send email notification
        Mail::raw("New contact from {$validated['name']}: {$validated['message']}", function ($mail) {
            $mail->to('info@ayamilcoders.com')
                 ->subject('New Contact Form Submission');
        });

        return response()->json([
            'success' => true,
            'message' => 'Your message has been sent. We\'ll get back to you within 24 hours!'
        ]);
    }

    public function submitCareer(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string',
            'role' => 'required|string',
            'experience' => 'required|string',
            'portfolio_url' => 'nullable|url',
            'message' => 'required|string|min:20|max:5000',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:5120', // 5MB max
        ]);

        // Handle file upload
        $resumePath = null;
        if ($request->hasFile('resume')) {
            $resumePath = $request->file('resume')->store('resumes', 'public');
        }

        // Save to database
        $application = CareerApplication::create([
            ...$validated,
            'resume_path' => $resumePath,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Application submitted successfully! We\'ll review and contact you soon.'
        ]);
    }
}