import { useState, useEffect } from "react";
import { useFetchUsers } from "../lib/fetchUsers";
import ArrowBack from "../common/ArrowBack";
import { FaExclamationTriangle } from "react-icons/fa"; 
import UserList from "./sections/users/UserList";

const Users = () => {
  // const { getData } = useFetchUsers();
  const { getCustomers, getAdmins } = useFetchUsers();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const [customerData, adminData] = await Promise.all([
          getCustomers(),
          getAdmins(),
        ]);

        setUsers([...customerData, ...adminData]);
      } catch (err) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [getCustomers, getAdmins]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-mont text-[16px] font-semibold">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 px-4 py-3 rounded-lg max-w-md mx-auto shadow-md flex items-center gap-2">
          <FaExclamationTriangle />
          <div className="font-mont">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4 px-4 py-8 bg-gray-50 font-mont">
    <ArrowBack goBackTo="/" className="mb-4" />
    <h1 className="text-3xl font-mont font-bold mb-4">User List</h1>
    <UserList users={users} /> {/* Use UserList component */}
  </section>
  );
};

export default Users;
