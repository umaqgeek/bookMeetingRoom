<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\MeetingRoom;

class MeetingRoomsController extends Controller
{
    function list()
    {
        return MeetingRoom::all();
    }
}
