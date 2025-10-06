import { useState } from "react";
import { BASE_URL } from "../lib/utils";

const UsersPage = () => {
    // mock data
    const mockData = [{ id: 1, name: "John Doe", phone: "0712345678", created: "2025-09-01" },
        { id: 2, name: "Jane Smith", phone: "0798765432", created: "2025-09-05" },]
    const [users, setUsers] = useState(mockData);
    const [loading, setLoading] = useState(false);

    
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BASE_URL}/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsers(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     fetchUsers();
    // }, []);
    
    if (loading)return <div>Loading...</div>

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Users</h2>
            <table className="w-full bg-white rounded-2xl shadow overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Phone</th>
                        <th className="p-3 text-left">Joined</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id} className="border-b">
                            <td className="p-3">{u.name}</td>
                            <td className="p-3">{u.phone}</td>
                            <td className="p-3">{u.created}</td>
                            <td className="p-3">
                                <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                                    View
                                </button>
                                <button className="ml-2 px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                                    Suspend
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersPage;
