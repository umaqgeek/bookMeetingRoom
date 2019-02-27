<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booking extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

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
        'meeting_room_id',
        'approved'
    ];

    /**
     * Get the book time that owns the booking.
     */
    public function bookTime()
    {
        return $this->belongsTo(BookTime::class, 'book_time_id');
    }

    /**
     * Get the meeting room that owns the booking.
     */
    public function meetingRoom()
    {
        return $this->belongsTo(MeetingRoom::class, 'meeting_room_id');
    }
}
