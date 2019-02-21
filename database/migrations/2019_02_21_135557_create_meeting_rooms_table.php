<?php

use App\Models\MeetingRoom;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeetingRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meeting_rooms', function (Blueprint $table) {
            $table->primary('id');
            $table->string('description');
            $table->timestamps();
        });

        MeetingRoom::create([
            'id' => '1',
            'description' => 'Bilik Mesyuarat 1'
        ]);

        MeetingRoom::create([
            'id' => '2',
            'description' => 'Bilik Mesyuarat 2'
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meeting_rooms');
    }
}
