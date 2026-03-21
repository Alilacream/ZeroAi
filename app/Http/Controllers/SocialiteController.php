<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    /**
     * Redirect the user to the provider authentication page.
     */
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Obtain the user information from the provider.
     */
    public function handleProviderCallback($provider)
    {
        try {
            $providerUser = Socialite::driver($provider)->user();

            // Log the provider user data for debugging
            Log::info('Socialite provider user data for '.$provider, [
                'id' => $providerUser->getId(),
                'name' => $providerUser->getName(),
                'email' => $providerUser->getEmail(),
                'avatar' => $providerUser->getAvatar(),
                'user_array' => $providerUser->user,
            ]);
        } catch (\Exception $e) {
            // If user denied access or any other error, redirect back to login
            Log::error('Socialite authentication failed for '.$provider, [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect('/login')->with('error', 'Failed to login with '.$provider.'. Please try again.');
        }

        // Get email - handle the case where GitHub might not return email in the main object
        $email = $providerUser->getEmail();

        // For GitHub, if email is null, we need to fetch it from the emails array
        if (! $email && $provider === 'github' && isset($providerUser->user['emails'])) {
            $emails = $providerUser->user['emails'];

            // Look for primary and verified email first
            foreach ($emails as $emailData) {
                if (isset($emailData['primary']) && $emailData['primary'] === true &&
                    isset($emailData['verified']) && $emailData['verified'] === true) {
                    $email = $emailData['email'];
                    break;
                }
            }

            // If no primary verified email, look for any verified email
            if (! $email) {
                foreach ($emails as $emailData) {
                    if (isset($emailData['verified']) && $emailData['verified'] === true) {
                        $email = $emailData['email'];
                        break;
                    }
                }
            }

            // If still no email, use the first email available
            if (! $email && ! empty($emails)) {
                $email = $emails[0]['email'] ?? null;
            }
        }

        // If we still don't have an email, we can't create the user
        if (! $email) {
            Log::error('Cannot create user without email for '.$provider, [
                'providerUserData' => [
                    'id' => $providerUser->getId(),
                    'name' => $providerUser->getName(),
                    'email' => $providerUser->getEmail(),
                    'emails' => $providerUser->user['emails'] ?? [],
                ],
            ]);

            return redirect('/login')->with('error', 'Unable to retrieve email from '.$provider.'. Please ensure your email is public or try again.');
        }

        // Check if user already exists in our database by email or provider ID
        $existingUserByEmail = User::where('email', $email)->first();
        $existingUserByProvider = User::where(
            $provider.'_id', $providerUser->getId()
        )->first();

        if ($existingUserByProvider) {
            // User already linked with this provider, just log them in
            $user = $existingUserByProvider;
        } elseif ($existingUserByEmail) {
            // User exists with same email but different provider (or no provider) - link account
            $user = $existingUserByEmail;
            $user->{$provider.'_id'} = $providerUser->getId();
            $user->save();
        } else {
            // New user - create account
            $user = User::create([
                'name' => $providerUser->getName(),
                'email' => $email,
                $provider.'_id' => $providerUser->getId(),
                'password' => Hash::make(Str::random(24)), // random password
                'email_verified_at' => now(), // Social providers already verify email
            ]);

            Log::info('Created new user via '.$provider, [
                'user_id' => $user->id,
                'email' => $user->email,
                $provider.'_id' => $user->{$provider.'_id'},
            ]);
        }

        // Log the user in
        Auth::login($user, true);

        // Redirect to dashboard
        return redirect()->intended('/dashboard');
    }
}
