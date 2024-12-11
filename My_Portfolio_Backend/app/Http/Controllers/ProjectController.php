<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use Illuminate\Http\Request;
use Laravel\Pail\ValueObjects\Origin\Console;
use SebastianBergmann\CodeCoverage\Report\Xml\Project;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $data=Projects::all();

       return response()->json(['data'=>$data]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

 
       $valideData= $request->validate([
            'ProjectName'=>'required|string',
            'ProjectType'=>'required|string',
            'ProjectDescription'=>'required|string',
            'ProjectLink'=>'required|string',
            'ProjectProfile'=>'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        try{

            if ($request->hasFile('ProjectProfile')) {
                $imgName=time().'.' .$request->ProjectProfile->extension(); //----Make file name--//
                $desFolder=public_path('img');
                $request->ProjectProfile->move($desFolder,$imgName);

                //----This adding project profile path---//
                $valideData['ProjectProfile']=$imgName;
                //------This save the project in database---//
                Projects::create($valideData);

                return response()->json(['message'=>"Save Successfully!"]);
            }

        }catch(\Exception $e){
            return response()->json(['Error'=>$e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $response=Projects::findorfail($id);
        return response()->json([$response]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validate=$request->validate([
            'ProjectName'=>'required|string',
            'ProjectType'=>'required|string',
            'ProjectDescription'=>'required|string',
            'ProjectLink'=>'required|string',
              
        ]);

        //-----this find the data with ID from database----//
        $data=Projects::find($id);

        if ($data->ProjectProfile==$request->ProjectProfile) {
            $data->update([
                'ProjectName'=>$validate['ProjectName'],
                'ProjectDescription'=>$validate['ProjectDescription'],
                'ProjectType'=>$validate['ProjectType'],
                'ProjectLink'=>$validate['ProjectLink'],
            ]);

            return response()->json(['message'=>"Update Successfully!"]);
        }elseif($request->hasFile('ProjectProfile')){
            $name=time(). '.' .$request->ProjectProfile->extension();
            $desFolder=public_path('img');
            $request->ProjectProfile->move($desFolder,$name);

            $data->update([
                'ProjectName'=>$validate['ProjectName'],
                'ProjectType'=>$validate['ProjectType'],
                'ProjectDescription'=>$validate['ProjectDescription'],
                'ProjectLink'=>$validate['ProjectLink'],
                'ProjectProfile'=>$name,
            ]);

            return response()->json(['message'=>"Update Successfully!"]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
{
    $id = $request->input('id');

    try {
        $project = Projects::findOrFail($id);
        $project->delete();

        return response()->json(['message' => "Successfully deleted!"]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()]);
    }
}

}
