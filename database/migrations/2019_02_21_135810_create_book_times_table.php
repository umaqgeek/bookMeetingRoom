<?php

use App\Models\BookTime;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookTimesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('book_times', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description');
            $table->timestamps();
        });

        BookTime::create([
            'description' => '8.00 AM - 12.00 PM'
        ]);

        BookTime::create([
            'description' => '2.00 PM - 6.00 PM'
        ]);

        BookTime::create([
            'description' => '8.00 PM - 11.00 PM'
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('book_times');
    }
}
