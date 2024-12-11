<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response; 

class Users extends Controller
{
    /**
     * Display a simple message to test the controller.
     */
    public function index()
    {
        return "Hello World";
    }

    /**
     * Store a newly created user in the database.
     */
    public function store(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        try {
            // Create a new user with hashed password
            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            return response()->json([
                'message' => 'User created successfully',
                'user' => $user,
            ], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error creating user: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * User login validation and token generation.
     */
    public function Authlogin(Request $request)
    {
        $inputValidate=$request->validate([
            'email'=>'required|email',
            'password'=>'required',
        ]);

        try{
            if (!Auth::attempt($inputValidate)) {
                return response()->json([
                    'message'=>'Input credentail is incorrect!'
                ],\Symfony\Component\HttpFoundation\Response::HTTP_UNAUTHORIZED);
            }

            $user=Auth::user();
            $token=$user->createToken('Login_Token')->plainTextToken;

            if ($token !==null) {
                $cookies = cookie('loginCookie', $token, 60 * 24);
                return response()->json(['message' => 'Login successfully','user'=>$user,'cookies'=>$token])->withCookie($cookies);
                    
            }
        }
        catch(\Exception $e){
            return response()->json([
                'message'=>$e
            ]);
        }

       
    }
    

    public function User(){
        $user= User::get();
        return response()->json(['user'=>$user]);
    }

    public function Test(){

        $user= Auth::user();
        return response()->json(['user'=>$user]);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Implementation for showing a specific resource (optional)
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Implementation for updating a resource (optional)
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Implementation for deleting a resource (optional)
    }
}
