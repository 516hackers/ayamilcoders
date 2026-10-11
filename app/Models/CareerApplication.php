<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CareerApplication extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'career_applications';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    // Only existing SQL columns are mass assignable.
    protected $fillable = [
        'name',
        'email',
        'phone',
        'role',
        'experience',
        'portfolio_url',
        'message',
        'resume_path',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the status badge color.
     */
    public function getStatusBadgeColorAttribute(): string
    {
        return match ($this->status) {
            'pending' => 'yellow',
            'reviewed' => 'blue',
            'rejected' => 'red',
            'hired' => 'green',
            default => 'gray',
        };
    }

    /**
     * Get the status label.
     */
    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'pending' => 'Pending Review',
            'reviewed' => 'Under Review',
            'rejected' => 'Not Selected',
            'hired' => 'Hired',
            default => ucfirst($this->status),
        };
    }

    /**
     * Get the role display name.
     */
    public function getRoleDisplayAttribute(): string
    {
        return match ($this->role) {
            'Full-Stack Web Developer' => 'Full-Stack Developer',
            'Blockchain / Solidity Developer' => 'Blockchain Developer',
            'Mobile Developer (Flutter)' => 'Flutter Developer',
            'UI/UX Designer' => 'UI/UX Designer',
            'AI / Python Engineer' => 'AI/ML Engineer',
            default => $this->role,
        };
    }

    /**
     * Get the experience level label.
     */
    public function getExperienceLabelAttribute(): string
    {
        return match ($this->experience) {
            'Fresher (0–1 yr)' => 'Entry Level (0-1 years)',
            'Junior (1–2 yrs)' => 'Junior (1-2 years)',
            'Mid-Level (2–4 yrs)' => 'Mid-Level (2-4 years)',
            'Senior (4+ yrs)' => 'Senior (4+ years)',
            default => $this->experience,
        };
    }

    /**
     * Get the resume URL.
     */
    public function getResumeUrlAttribute(): ?string
    {
        if ($this->resume_path) {
            return asset('storage/' . $this->resume_path);
        }
        return null;
    }

    /**
     * Scope a query to only include pending applications.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include reviewed applications.
     */
    public function scopeReviewed($query)
    {
        return $query->where('status', 'reviewed');
    }

    /**
     * Record an application review using the existing status column.
     *
     * The live SQL schema does not have reviewer_notes or reviewed_at columns.
     * Do not attempt to write those absent columns. An optional note cannot
     * be persisted until the database owner chooses a separate schema change.
     */
    public function markAsReviewed(?string $notes = null): void
    {
        if ($notes !== null && trim($notes) !== '') {
            \Illuminate\Support\Facades\Log::warning('Career review note not saved: reviewer_notes column is absent', [
                'application_id' => $this->getKey(),
            ]);
        }

        $this->update(['status' => 'reviewed']);
    }

    /**
     * Mark as hired.
     */
    public function markAsHired(): void
    {
        $this->update(['status' => 'hired']);
    }

    /**
     * Mark as rejected without writing columns missing from the live schema.
     */
    public function markAsRejected(?string $notes = null): void
    {
        if ($notes !== null && trim($notes) !== '') {
            \Illuminate\Support\Facades\Log::warning('Career rejection note not saved: reviewer_notes column is absent', [
                'application_id' => $this->getKey(),
            ]);
        }

        $this->update(['status' => 'rejected']);
    }
}
