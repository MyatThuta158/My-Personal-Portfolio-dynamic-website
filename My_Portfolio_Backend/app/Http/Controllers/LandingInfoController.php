<?php

namespace App\Http\Controllers;

use App\Models\Landing_Information;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use function Termwind\parse;

class LandingInfoController extends Controller
{
    public function InformationSave(Request $request){
        // Validate the input data
        $information = $request->validate([
            'ProfilePhoto' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'Icon1' => 'required|string',
            'Icon2' => 'required|string',
            'Icon3' => 'required|string',
            'Icon4' => 'required|string',
            'IconLink1' => 'required|string',
            'IconLink2' => 'required|string',
            'IconLink3' => 'required|string',
            'IconLink4' => 'required|string',
            'Description' => 'required|string',
        ]);
    
        try {
            if ($request->hasFile('ProfilePhoto')) {
                $imgName = time() . '.' . $request->ProfilePhoto->extension();
                $desFolder = public_path('img');
                $request->ProfilePhoto->move($desFolder, $imgName);
    
                // Save the information to the database
                Landing_Information::create([
                    'ProfilePhoto' => $imgName,
                    'Icon1' => $information['Icon1'],
                    'Icon2' => $information['Icon2'],
                    'Icon3' => $information['Icon3'],
                    'Icon4' => $information['Icon4'],
                    'IconLink1' => $information['IconLink1'],
                    'IconLink2' => $information['IconLink2'],
                    'IconLink3' => $information['IconLink3'],
                    'IconLink4' => $information['IconLink4'],
                    'Description' => $information['Description'],
                ]);
    
                return response()->json(['message' => 'Save Successfully!']);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error creating user: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function GetLandingInfo(){

        //---------Retrieve all data from database---//
        
       $data = Landing_Information::where('id', 1)->first();
        // $data = Landing_Information::find(1)->first();

        if ($data) {
            // $data->ProfilePhoto = url('img/' . $data->ProfilePhoto);
            return response()->json($data);
        }
    
        return response()->json(["message" => "No data found!"], 404);

        
    }

    public function UpdateLandingInfo(Request $request){

       // dd($request);
        //----This validate the information---//
        $updateInformation = $request->validate([
           
            'Icon1' => 'required|string',
            'Icon2' => 'required|string',
            'Icon3' => 'required|string',
            'Icon4' => 'required|string',
            'IconLink1' => 'required|string',
            'IconLink2' => 'required|string',
            'IconLink3' => 'required|string',
            'IconLink4' => 'required|string',
            'Description' => 'required|string',
        ]);

        //-----This is for id retrieve---//
        $info=Landing_Information::find(1);
        // dd($infoId);

        //----Update the information---//
        try {
        
    
            if ($info->ProfilePhoto==$request->ProfilePhoto) {
                 // Save the information to the database
                 $info->update([
                    'Icon1' => $updateInformation['Icon1'],
                    'Icon2' => $updateInformation['Icon2'],
                    'Icon3' => $updateInformation['Icon3'],
                    'Icon4' => $updateInformation['Icon4'],
                    'IconLink1' => $updateInformation['IconLink1'],
                    'IconLink2' => $updateInformation['IconLink2'],
                    'IconLink3' => $updateInformation['IconLink3'],
                    'IconLink4' => $updateInformation['IconLink4'],
                    'Description' => $updateInformation['Description'],
                ]);

                return response()->json(['messageSuccess' => 'Update Successfully!']);
    
            }elseif($request->hasFile('ProfilePhoto')){
                $imgName = time() . '.' . $request->ProfilePhoto->extension();
                $desFolder = public_path('img');
                $request->ProfilePhoto->move($desFolder, $imgName);

                //----Update the data---//
                $info->update([
                    'ProfilePhoto' => $imgName,
                    'Icon1' => $updateInformation['Icon1'],
                    'Icon2' => $updateInformation['Icon2'],
                    'Icon3' => $updateInformation['Icon3'],
                    'Icon4' => $updateInformation['Icon4'],
                    'IconLink1' => $updateInformation['IconLink1'],
                    'IconLink2' => $updateInformation['IconLink2'],
                    'IconLink3' => $updateInformation['IconLink3'],
                    'IconLink4' => $updateInformation['IconLink4'],
                    'Description' => $updateInformation['Description'],
                ]);
                return response()->json(['messageSuccess' => 'Update Successfully!']);
            }

               
               
         
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error creating user: ' . $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
     }
    
}
