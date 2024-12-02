import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import ArrowBack from "../common/ArrowBack.jsx";
import InputField from "./sections/AdminCreateProduct/InputField.jsx";
import LoginButton from "../common/LoginButton.jsx";

const ConfirmEmail = () => {
    const [verified, setVerified] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        userId: '',
        passcode: ''
    });

    const handleRegistration = async (e) => {
        e.preventDefault();

        //call on api
        const apiUrl = "https://rika-verification-provider.azurewebsites.net/api/passcode/validatepasscode";
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.status === 200) {
            setVerified(true);
        } else {
            setError(data.Message);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = () => {
        navigate("/login");
    };

return (
    <div>
        {verified ? (
        <div className="flex font-mont items-center justify-center min-h-screen bg-gray-300 p-4">
                <div className="flex flex-col w-6/12 items-center bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md sm:w-96 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <h1 className="mb-4 text-2xl text-center">Email confirmed, please login.</h1>
                    <LoginButton color="black" label={"Login"} onClick={handleLogin} />
                </div>
        </div> )
            :
        <div className="flex font-mont items-center justify-center min-h-screen bg-gray-300 p-4">
            <form
                id="email-form"
                onSubmit={(e) => handleRegistration(e, formData)}
                className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md w-full sm:w-96 md:w-2/3 lg:w-1/2 xl:w-1/3">

                <div className="flex items-center justify-between mb-6">
                    <ArrowBack goBackTo="/login"/>
                    <h2 className="text-xl sm:text-2xl text-center flex-grow text-gray-800">Email
                        verification</h2>
                    <div className="sm:w-6"></div>
                </div>

                <InputField
                    label="Email"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    error={error.userId}
                />

                <InputField
                    label="Passcode"
                    name="passcode"
                    value={formData.passcode}
                    onChange={handleChange}
                    error={error.passcode}
                />
                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                    id="createButton"
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 mt-4">
                    Submit
                </button>
            </form>
        </div>
        }
    </div>
)}
export default ConfirmEmail
