<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Booking;

class BookingsController extends Controller
{
    function listAll()
    {
        $bookings = Booking::with(array('bookTime', 'meetingRoom'))
          ->orderBy('booking_date', 'ASC')
          ->orderBy('book_time_id', 'ASC')
          ->orderBy('meeting_room_id', 'ASC')
          ->get();
        for ($i = 0; $i < sizeof($bookings); $i++) {
            $booking_date = $bookings[$i]->booking_date;
            $date = date_create($booking_date);
            $booking_date = date_format($date, 'd M Y');
            $bookings[$i]->booking_date = $booking_date;
        }
        return $bookings;
    }

    function list($id)
    {
        $booking = Booking::with(array('bookTime', 'meetingRoom'))->find($id);
        $booking_date = $booking->booking_date;
        $date = date_create($booking_date);
        $booking_date = date_format($date, 'd M Y');
        $booking->booking_date = $booking_date;
        return $booking;
    }

    function store(Request $request)
    {
        return Booking::create($request->all());
    }

    function save(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);
        $booking->update($request->all());

        return $booking;
    }

    function delete($id)
    {
        Booking::findOrFail($id)->delete();

        return 204;
    }
}
