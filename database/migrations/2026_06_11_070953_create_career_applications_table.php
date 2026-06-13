<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('career_applications', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('role');
            $table->string('experience');
            $table->string('portfolio_url')->nullable();
            $table->text('message');
            $table->string('resume_path')->nullable();
            $table->string('status')->default('pending'); // pending, reviewed, rejected, hired
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('career_applications');
    }
};