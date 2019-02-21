<?php

use App\Models\Booking;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ImportLegacyFebruary2019 extends Migration
{

    function csvToArray($filename = '', $delimiter = ',')
    {
        if (!file_exists($filename) || !is_readable($filename))
            return false;

        $header = null;
        $data = array();
        if (($handle = fopen($filename, 'r')) !== false)
        {
            while (($row = fgetcsv($handle, 1000, $delimiter)) !== false)
            {
                if (!$header)
                    $header = $row;
                else
                    $data[] = array_combine($header, $row);
            }
            fclose($handle);
        }

        return $data;
    }

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $file = storage_path('legacy/tempahan.csv');
        $tempahanArr = $this->csvToArray($file);
        for ($i = 0; $i < count($tempahanArr); $i ++)
        {
            $t = $tempahanArr[$i];
            $tNew = array();

            $tNew['title'] = $t['t_perkara'];
            $tNew['booking_date'] = $t['t_date'];
            $tNew['booking_day'] = $t['t_day'];
            $tNew['book_time_id'] = $t['m_id'];
            $tNew['meeting_room_id'] = $t['bm_id'];

            Booking::create($tNew);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bookings');

        Schema::create('bookings', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->date('booking_date');
            $table->string('booking_day');
            $table->integer('book_time_id')->unsigned();
            $table->foreign('book_time_id')->references('id')->on('book_times');
            $table->integer('meeting_room_id')->unsigned();
            $table->foreign('meeting_room_id')->references('id')->on('meeting_rooms');
            $table->softDeletes();
            $table->timestamps();
        });
    }
}
