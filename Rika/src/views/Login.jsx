import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import LoginButton from "../common/LoginButton.jsx";
import authApi from "../lib/authApi.js";
import {UserContext} from "../lib/AuthProvider.jsx";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const {userRole, isAuthenticated, checkAuth, loading, setUser} = useContext(UserContext);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        if (isAuthenticated) {
            if (userRole === "Customer") {
                navigate("/customer")
            } else if (userRole === "Admin") {
                navigate("/admin")
            }
        }
    }, [isAuthenticated, userRole, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");

        if(!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        if(password.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            return;
        }

        const endPoint = '/TokenGenerator/login';
        try {
            const response = await authApi.post(endPoint, {email, password}, {withCredentials:true});
            if(response.status === 200){
                const userData = response.data;
                setUser({
                    ...userData,
                });
                await checkAuth();
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    if(loading){
        return <div>Loading...</div>
    }

    return (
        <div className="flex font-mont flex-col items-center justify-center">
            <div className="mb-10 mt-16">
                <h1 className="text-5xl text-left">RIKA</h1>
                <h2>Online Shopping</h2>
            </div>
            <div className="w-11/12 text-center mb-10">
                <h2 className="text-2xl font-semibold mb-3">Welcome!</h2>
                <p className="text-gray-500">Please login or sign to continue our app</p>
            </div>
            <form className="sm:w-6/12 w-11/12 flex flex-col items-center mb-4" onSubmit={handleLogin}>
                <label className="font-semibold w-11/12" htmlFor="email">Email</label>
                <input
                    className="w-11/12 border-b border-gray-300 mb-6"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter email address"
                    onChange={(e) => setEmail(e.target.value)} />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

                <label className="font-semibold w-11/12" htmlFor="password">Password</label>
                <input
                    className="w-11/12 border-b border-gray-300 mb-12"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)} />
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

                    <div className='flex justify-center items-center gap-2 mb-4'>
                        <p className="mb-1">Remember me</p>
                        <input type="checkbox" />
                    </div>
                <LoginButton color="#000" label={"Login"} />
            </form>

            <div className="mb-8 text-gray-400">───────────── or ─────────────</div>
            <div className='sm:w-6/12 w-11/12 flex flex-col items-center'>
                <LoginButton color="#3b5998" label={"Continue with Facebook"} />
                <LoginButton color="#FFF" textColor="#666" label={"Continue with Google"} />
                <LoginButton color="#FFF" textColor="#666" label={"Continue with Apple"} />
            </div>
        </div>
    );
};

export default Login;
