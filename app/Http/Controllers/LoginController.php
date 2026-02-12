<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    // --- SALT GENERATOR ---
    private function saltgenerator($length = 6)
    {
        $characters = '0123456789';
        $saltvalue = '';
        $charactersLength = strlen($characters);
        $randomnumber = bin2hex(random_bytes(8)); // 16 characters in hex
        for ($i = 0; $i < $length; $i++) {
            $randomIndex = mt_rand(0, $charactersLength - 1);
            $saltvalue .= $characters[$randomIndex];
        }
        $saltvalue .= $randomnumber;
        return $saltvalue;
    }

    // --- CUSTOM HASH PASSWORD ---
    private function customHashPassword($password, $salt)
    {
        $passwordWithSalt = $password . $salt;
        return bcrypt($passwordWithSalt);
    }

    // --- VERIFY CUSTOM HASHED PASSWORD ---
    private function verifyCustomHashedPassword($password, $hashedPassword, $salt)
    {
        $passwordWithSalt = $password . $salt;
        return password_verify($passwordWithSalt, $hashedPassword);
    }

    public function signinform()
    {
        return Inertia::render('auth/userlogin');
    }

    public function signin(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if ($user && $user->salt) {
            // Use custom hashing for users with salt
            if ($this->verifyCustomHashedPassword($credentials['password'], $user->password, $user->salt)) {
                Auth::login($user);
                $request->session()->regenerate();

                if ($user->roles->value === 'admin') {
                    return redirect()->route('dashboard');
                }

                return redirect()->route('userdashboard');
            } else {
                return back()->withErrors([
                    'email' => 'Invalid credentials',
                ]);
            }
        } else {
            // Legacy users without salt
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
}