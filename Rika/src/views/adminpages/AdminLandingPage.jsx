
import {useContext, useEffect} from "react";
import {UserContext} from "../../lib/AuthProvider.jsx";
import LogoutButton from "../../common/LogoutButton.jsx";
import { useNavigate } from 'react-router-dom';

const AdminLandingPage = () => {
    const {userRole, isAuthenticated, checkAuth} = useContext(UserContext);
    const navigate = useNavigate();
    
    const toCreateProduct = () => {
      navigate('/productscreate');
    };

    const toAllInvoices = () => {
        navigate("/all-invoices");
    };

    useEffect(() => {
        const authorizeUser = async () => {
            await checkAuth();
        }

        authorizeUser();
    }, [checkAuth]);

    if (!isAuthenticated) {
        return <div>I am not authenticated.</div>;
    }

    if (userRole !== 'Admin') {
        return <div>I am not an admin.</div>;
    }

    return (
        <div>
            <h1>Welcome admin!</h1>
            <LogoutButton/>
            <button onClick={toCreateProduct}
                    id="createButton"
                    type="submit"
                    className="w-[130px] bg-green-500 text-white p-2 rounded hover:bg-green-800 mt-4">
                    Create Product
                </button>

                <button onClick={() => navigate('/all-invoices')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    All Invoices
                </button>

                <button onClick={() => navigate('/reports')}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                    Reports
                </button>
        </div>
    );
};

export default AdminLandingPage;
