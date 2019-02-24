<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookTime extends Model
{
    /**
     * Disables incrementing keys.
     *
     * @var boolean
     */
    public $incrementing = false;

    /**
     * The primary key for this model.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'description'
    ];

    /**
     * Get the bookings for the book time.
     */
    public function bookings()
    {
        return $this->hasMany('App\Models\Booking');
    }
}
