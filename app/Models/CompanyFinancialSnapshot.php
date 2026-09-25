<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyFinancialSnapshot extends Model
{
    protected $fillable = [
        'total_assets',
        'total_liabilities',
        'currency',
        'source',
        'external_reference',
        'synced_at',
    ];

    protected $casts = [
        'total_assets' => 'decimal:2',
        'total_liabilities' => 'decimal:2',
        'synced_at' => 'datetime',
    ];
}
