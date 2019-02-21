<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'booking_date',
        'booking_day',
        'book_time_id',
        'meeting_room_id'
    ];
}
