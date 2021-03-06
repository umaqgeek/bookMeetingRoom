<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->date('booking_date');
            $table->string('booking_day');
            $table->integer('book_time_id');
            $table->foreign('book_time_id')->references('id')->on('book_times');
            $table->integer('meeting_room_id');
            $table->foreign('meeting_room_id')->references('id')->on('meeting_rooms');
            $table->softDeletes();
            $table->unique(['booking_date', 'book_time_id', 'meeting_room_id']);
            $table->integer('approved')->nullable()->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bookings');
    }
}
