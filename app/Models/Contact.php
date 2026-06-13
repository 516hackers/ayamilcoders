<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'contacts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'company',
        'service',
        'budget',
        'message',
        'whatsapp',
        'timeline',
        'source',
        'is_read',
        'ip_address',
        'user_agent',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_read' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the service badge color based on service type.
     */
    public function getServiceBadgeColorAttribute(): string
    {
        return match ($this->service) {
            'Web Development', 'Full-Stack Web Application', 'E-Commerce Platform' => 'blue',
            'Blockchain / Smart Contract', 'Token Launch (ERC-20 / BEP-20)', 'DeFi / NFT Development' => 'purple',
            'Mobile App (Flutter / Android)' => 'green',
            'AI / Automation Integration' => 'cyan',
            'IT Consulting / DevOps', 'Bug Fixing / Code Audit' => 'orange',
            default => 'gray',
        };
    }

    /**
     * Get the budget range label.
     */
    public function getBudgetLabelAttribute(): string
    {
        return $this->budget ?? 'Not specified';
    }

    /**
     * Scope a query to only include unread contacts.
     */
    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }

    /**
     * Mark as read.
     */
    public function markAsRead(): void
    {
        $this->update(['is_read' => true]);
    }
}