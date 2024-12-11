<?php

use App\Http\Middleware\EnsureTokenIsValid;
use Illuminate\Support\Facades\Route;

//---------This is only for test-----------//
// Route::get('/home', [App\Http\Controllers\Users::class,function () {
//     return response()->json(['message' => 'API is working!']);
// }]);

Route::post('/store',[App\Http\Controllers\Users::class,'store'])->name('store');
Route::post('/loginf',[App\Http\Controllers\Users::class,'Authlogin'])->name('login');

// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/loginGet', [App\Http\Controllers\Users::class, 'User'])->name('home');
// });


 
Route::middleware(['ensure.token.is.valid', 'auth:sanctum'])->group(function () {
    // Route::get('/loginGet', [App\Http\Controllers\Users::class, 'User']);
    Route::get('/test', [App\Http\Controllers\Users::class, 'Test']);
    Route::post('/introinfo', [App\Http\Controllers\LandingInfoController::class, 'InformationSave']);
    Route::post('/updateintroinfo', [App\Http\Controllers\LandingInfoController::class, 'UpdateLandingInfo']);
    Route::get('/getlandinginfo', [App\Http\Controllers\LandingInfoController::class, 'GetLandingInfo']);
    Route::post('/ProjectAdd', [App\Http\Controllers\ProjectController::class, 'store']);
    Route::get('/ProjectAll', [App\Http\Controllers\ProjectController::class, 'index']);
    Route::get('/ProjectUpdateShow/{id}', [App\Http\Controllers\ProjectController::class, 'show']);
    Route::post('/ProjectUpdate/{id}', [App\Http\Controllers\ProjectController::class, 'update']);
    Route::delete('/ProjectDelete', [App\Http\Controllers\ProjectController::class, 'destroy']);
});

Route::get('/landinginfo', [App\Http\Controllers\LandingInfoController::class, 'GetLandingInfo']);
Route::get('/ProjectData', [App\Http\Controllers\ProjectController::class, 'index']);
Route::get('/user', [App\Http\Controllers\Users::class, 'User']);


