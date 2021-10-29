import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import initializeAuthentication from '../Firebase/firebase.init';


initializeAuthentication();

const auth = getAuth();

const Register = () => {

    const [email, setEmail] = useState({ });
    const [password, setPassword] = useState({});
    const [error, setError] = useState('');

    const handleRegistation = (e) => {
        e.preventDefault();
        console.log(email, password);
        if (password.length < 6) {
            setError('Password Must be at lest 6 character long');
            return;
        }
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Password Must contaent 2 upper case');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setError('');
            })
            .catch(error => {
                setError(error.message);
        })

    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div>
            <form onSubmit={handleRegistation} className="text-center m-auto max-w-xl">
                <button className=" px-14 py-2 text-lg text-white bg-blue-800 mb-2">Registation Form</button>
                <div className="p-2">
                    <input onBlur={handleEmailChange}  required className="p-1 mb-4 border border-gray-600" type="email" placeholder="example@email.com"></input>
                    <br />
                    <p className="text-sm p-2 text-red-600">{ error}</p>
                    <input onBlur={handlePassword} required className="p-1 border border-gray-600" type="password" placeholder="password"></input>
                    <br />
                    <button className="bg-green-900 mt-3 py-2 px-12 text-white border-none">Registation</button>
                </div>
                <button className="bg-green-900 mt-3 mx-3 py-2 px-12 text-white border-none">Login</button>
            </form>
        </div>
    )
}

export default Register
