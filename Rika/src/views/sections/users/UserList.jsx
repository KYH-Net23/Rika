import { FaEnvelope, FaPhone, FaCity, FaUser, FaInfoCircle } from "react-icons/fa"; 

const UserList = ({ users }) => {
    return (
      <ul className="divide-y divide-gray-300">
        {users.map((user) => (
          <li key={user.id} className="p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow mb-4">
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-mont font-semibold text-black">{user.username}</h2>
                <p className={`text-sm flex items-center gap-2 font-mont ${user.isDeleted ? "text-red-600" : "text-green-600"}`}>
                    <FaInfoCircle className="text-gray-600" />
                    {user.isDeleted ? "Inactive" : "Active"}
                </p>              
                <p className="text-gray-500 text-sm flex items-center gap-2 font-mont">
                    <FaUser className="text-gray-600" /> {user.userRole}
                </p>
                <p className="text-gray-500 text-sm flex items-center gap-2 font-mont">
                    <FaEnvelope className="text-gray-600" /> {user.email}
                </p>
                {user.userRole !== "Admin" && (
                <>
                    <p className="text-gray-500 text-sm flex items-center gap-2 font-mont">
                        <FaPhone className="text-gray-600" /> {user.phoneNumber}
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-2 font-mont">
                        <FaCity className="text-gray-600" /> {user.city}
                    </p> 
                </>                   
                )}
            </div>
            <button className="mt-2 font-mont font-medium hover:underline">View Details</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default UserList;
