<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function signinform(){
        return Inertia::render('auth/userlogin');
    }


public function signin(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required|min:8',
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();

        $user = Auth::user();

        if ($user->roles->value === 'admin') {
            return redirect()->route('dashboard');
        }

        return redirect()->route('userdashboard');
    }

    return back()->withErrors([
        'email' => 'Invalid credentials',
    ]);
}

}