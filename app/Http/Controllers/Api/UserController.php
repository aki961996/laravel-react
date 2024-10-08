<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return UserResource::collection(
        //     User::query()->orderBy('id', 'desc')->paginate(10)
        // );

        return UserResource::collection(
            User::query()
                ->when(request('search'), function ($query, $search) {
                    $query->where('name', 'like', '%' . $search . '%');
                    // ->orWhere('email', 'like', '%' . $search . '%'); // Adjust the fields you want to search
                })
                ->orderBy('id', 'desc')
                ->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        return  response(
            new UserResource($user),
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);
        return response(
            new UserResource($user),
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response(null, 204);
    }
}
