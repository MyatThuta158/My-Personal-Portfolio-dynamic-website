<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Landing_Information extends Model
{
    use HasFactory;

    protected $table='Landing_Information';
    protected $fillable=['ProfilePhoto','Icon1','Icon2','Icon3','Icon4','IconLink1','IconLink2','IconLink3','IconLink4','Description'];
    public $timestamps=false;
}
