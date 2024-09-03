<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class DashbordConroller extends Controller
{
    public function index(Request $request)
    {
        // Get the count of all users
        $userCount = User::count();
        return response(compact('userCount'));
    }
}
