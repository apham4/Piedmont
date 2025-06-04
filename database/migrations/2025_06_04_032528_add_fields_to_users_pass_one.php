<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->date('dob')->nullable();
            $table->boolean('is_dob_public')->default(false);
            $table->string('location')->nullable();
            $table->boolean('is_location_public')->default(false);
            $table->text('bio')->nullable();
            $table->boolean('is_bio_public')->default(false);
            $table->json('follows')->nullable();
            $table->json('blocks')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
            'dob',
            'is_dob_public',
            'location',
            'is_location_public',
            'bio',
            'is_bio_public',
            'follows',
            'blocks',
            ]);
        });
    }
};
