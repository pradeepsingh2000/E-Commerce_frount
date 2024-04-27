import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

export default function Googlelogin() {
  return (
    <div>
      
      <GoogleOAuthProvider clientId="38819014863-rh35skjsp7964l4g3aie3mcpv74onlm6.apps.googleusercontent.com">
      <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
      </GoogleOAuthProvider>

    </div>
  )
}
