<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\BookTime;

class BookTimesController extends Controller
{
    function list()
    {
        return BookTime::all();
    }
}
