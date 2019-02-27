<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Booking;

class BookingsController extends Controller
{
    function listAll(Request $req)
    {
        $approved = isset($req->approved) ? $req->approved : 1;
        $bookings = Booking::with(array('bookTime', 'meetingRoom'));

        if (in_array($approved, ['1', '0'])) {
            $bookings = $bookings->where('approved', $approved);
        }

        $bookings = $bookings
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
        $booking->save();

        return $booking;
    }

    function delete($id)
    {
        Booking::findOrFail($id)->delete();
        return 204;
    }

    function approveOrReject(Request $request, $id)
    {
        // return $request->approved;
        $booking = Booking::findOrFail($id);
        $booking->update([
          'approved' => isset($request->approved) ? $request->approved : 0
        ]);

        return $booking;
    }

    function approveOrRejectAll(Request $request)
    {
        Booking::whereRaw('1=1')->update([
          'approved' => isset($request->approved) ? $request->approved : 0
        ]);

        return '200';
    }
}
