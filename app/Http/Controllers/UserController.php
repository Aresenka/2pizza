<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use JWTAuthException;

class UserController extends Controller
{
    /**
     * Get token for passed email-password pair
     *
     * @param $email
     * @param $password
     * @return \Illuminate\Http\JsonResponse
     */
    private function getToken($email, $password)
    {
        //Value to return
        $token = null;

        try {
            //If auth failed return error
            if (!$token = JWTAuth::attempt(['email' => $email, 'password' => $password])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token' => $token
                ]);
            }
        } catch (JWTAuthException $e) {
            //If exception caught return error
            return response()->json([
                'response' => 'error',
                'message' => 'Token creation failed',
            ]);
        }

        return $token;
    }

    /**
     * Login and set auth token to user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        //Get user with passed email
        $user = \App\User::where('email', $request->email)->get()->first();

        if ($user) {
            //If user exists validate password
            if (\Hash::check($request->password, $user->password))
            {
                //If password is correct generate token and set it to user model
                $token = self::getToken($request->email, $request->password);

                $user->auth_token = $token;
                $user->save();

                //Return user data
                $response = [
                    'success' => true,
                    'data' => [
                        'id' => $user->id,
                        'auth_token' => $user->auth_token,
                        'name' => $user->name,
                        'email' => $user->email
                    ]
                ];
            } else {
                //If password is incorrect return error
                $response = [
                    'success' => false,
                    'data' => 'Password is incorrect'
                ];
            }
        } else {
            //If it is no user with such email return error
            $response = [
                'success' => false,
                'data' => 'Such user doesnt exists'
            ];
        }

        return response()->json($response, 201);
    }

    /**
     * Register new user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        //Init new user data
        $payload = [
            'password'=>\Hash::make($request->password),
            'email'=>$request->email,
            'name'=>$request->name,
            'auth_token'=> ''
        ];

        //Create user model
        $user = new \App\User($payload);

        //Try to create new user
        if ($user->save())
        {
            //If user created try to generate token
            $token = self::getToken($request->email, $request->password); // generate user token

            //If generation failed return error
            if (!is_string($token))  return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);

            //Add token  and save the user
            $user->auth_token = $token; // update user token
            $user->save();

            //Return user data
            $response = ['success'=>true, 'data'=>['name'=>$user->name,'id'=>$user->id,'email'=>$request->email,'auth_token'=>$token]];
        }
        else
            $response = ['success'=>false, 'data'=>'Couldnt register user']; //If creation failed return error

        return response()->json($response, 201);
    }
}
