<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/loginApi', 'PassportController@login');
Route::post('/registerApi', 'PassportController@register');
Route::group(['middleware' => 'auth:api'], function() {
  Route::post('/get-details', 'PassportController@getDetails');
});

Route::get('/meeting-rooms', 'MeetingRoomsController@list');
Route::get('/book-times', 'BookTimesController@list');
Route::get('/bookings', 'BookingsController@listAll');
Route::get('/bookings/{id}', 'BookingsController@list');
Route::post('/bookings', 'BookingsController@store');
Route::put('/bookings/{id}', 'BookingsController@save');
Route::delete('/bookings/{id}', 'BookingsController@delete');
Route::put('/approve-booking/{id}', 'BookingsController@approveOrReject');
Route::put('/approve-booking-all', 'BookingsController@approveOrRejectAll');
