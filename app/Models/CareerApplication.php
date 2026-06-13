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
        'ip_address',
        'user_agent',
        'reviewed_at',
        'reviewer_notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'reviewed_at' => 'datetime',
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
     * Mark as reviewed.
     */
    public function markAsReviewed(string $notes = null): void
    {
        $this->update([
            'status' => 'reviewed',
            'reviewer_notes' => $notes,
            'reviewed_at' => now(),
        ]);
    }

    /**
     * Mark as hired.
     */
    public function markAsHired(): void
    {
        $this->update(['status' => 'hired']);
    }

    /**
     * Mark as rejected.
     */
    public function markAsRejected(string $notes = null): void
    {
        $this->update([
            'status' => 'rejected',
            'reviewer_notes' => $notes,
            'reviewed_at' => now(),
        ]);
    }
}