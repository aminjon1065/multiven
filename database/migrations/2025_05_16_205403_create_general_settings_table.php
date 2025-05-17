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
        Schema::create('general_settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_name')->default('Neutron');
            $table->string('layout')->default('LTR');
            $table->string('contact_email')->default('info@neutron.tj');
            $table->string('contact_phone')->nullable()->default("+992911000770");
            $table->string('contact_address')->nullable();
            $table->text('map')->nullable();
            $table->string('currency_name')->default('SOMONI');
            $table->string('currency_icon')->default('$');
            $table->string('time_zone')->default("Asia/Dushanbe");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('general_settings');
    }
};
