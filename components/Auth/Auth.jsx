import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/material/IconButton";
import { useGoogleLogin } from "@react-oauth/google";
import UserAvatar from "./userAvatar";
import axios from "axios";
import Cookies from 'js-cookie';

function Auth() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const googleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async (codeResponse) => {
            var loginDetails = await axios.post(`/api/getUserInfo`, {
                body: JSON.stringify({
                    code: codeResponse.code
                }),
            });
            console.log(loginDetails)
            // console.log(loginDetails.data.user)
            // Cookies.set("access_token_cookie", access_token);
            // Cookies.set("refresh_token_cookie", refresh_token);
            // Cookies.set("access_csrf_token_cookie", access_csrf_token);
            setLoggedIn(true);
            setUser(loginDetails.data.user);
        },
    });
  
    async function handleLogout() {
        const msg = await axios.get(`/api/getProtected`)
        setLoggedIn(false);
    }
  
    return (
        <div
        style={{
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 16,
            right: 20,
            zIndex: 1000,
        }}>
            {!loggedIn ? (
                <IconButton
                    color="primary"
                    onClick={() => googleLogin()}
                >
                <GoogleIcon fontSize="large" />
                </IconButton>
            ) : (
                <UserAvatar 
                    userName={user.name} 
                    onClick={handleLogout}>
                </UserAvatar>
            )}
        </div>
    );
}

export default Auth;