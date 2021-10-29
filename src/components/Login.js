import React, { useState } from 'react'
import initializeAuthentication from '../Firebase/firebase.init'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider,GithubAuthProvider  } from "firebase/auth";


initializeAuthentication();
const auth = getAuth();




const Login = () => {

    const provider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const [user, setUser] = useState({});

    const handleGoogleSign = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const {displayName, email, photoURL} = result.user;
                const gmailLogin = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                };
                setUser(gmailLogin);
        })
    }
    const handleFacebookSignIn = () => {
        signInWithPopup(auth, facebookProvider)
            .then(result => {
                const { displayName, email, photoURL } = result.user;
                console.log(result.user);
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL
                };
                setUser(loggedInUser);
            })
            .catch((error) => {
                console.log(error.message);
        })

    }
    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const { displayName, email, photoURL } = result.user;
                const githubLogin = {
                    name: displayName,
                    email: email,
                    photo:photoURL
                }
                setUser(githubLogin);
            })
            .catch((error) => {
                console.log(error.message);
        })
    }


    return (
        <div className="mb-10 bg-gray-200 pt-10 text-center">
            <button onClick={handleGoogleSign} className="bg-pink-600 mt-3 mx-3 py-2 px-9 text-white border-none text-center hover:bg-yellow-500 hover:text-black">Googel Sign In</button>
            <button onClick={handleFacebookSignIn} className="bg-indigo-700 mt-3 py-2 px-9 text-white border-none text-center hover:bg-pink-400 hover:text-black">Facebook In</button>
            <button onClick={handleGithubSignIn} className="bg-blue-800 mx-3 mt-3 py-2 px-9 text-white border-none text-center hover:bg-indigo-500 hover:text-black">Github In</button>
            <div className=" m-auto mt-7 border-gray-900 border max-w-2xl">
                <img className="m-auto rounded-full h-20" src={user.photo }alt=""/>
                <h1>User name:{user.name }</h1>
                <h2>Email: {user.email}</h2>
            </div>
        </div>
    )
}

export default Login
