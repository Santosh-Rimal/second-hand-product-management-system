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

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request)
    {
        // 1. Validate input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed'],
        ]);

        // 2. Generate salt
        $salt = $this->saltgenerator();

        // 3. Hash password with salt
        $hashedPassword = $this->customHashPassword($request->password, $salt);

        // 5. Create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $hashedPassword,
            'salt' => $salt,
            'roles' => 'user',
        ]);


        // 7. Log the user in
       Auth::login($user);

        $request->session()->regenerate();

        if ($user->roles->value === 'admin') { // assuming relationship `role()`
            return redirect()->route('dashboard');
        }

        return redirect()->route('userdashboard');
    }
}