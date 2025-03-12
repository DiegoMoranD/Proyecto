const RecentUsers = () => {
    const users = [
        { name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
        { name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
        { name: "Robert Johnson", email: "robert@example.com", role: "User", status: "Inactive" },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-semibold mb-4">Recent Users</h3>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Role</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{user.role}</td>
                            <td className="p-2">
                                <span
                                    className={`px-2 py-1 text-xs font-semibold rounded ${user.status === "Active"
                                            ? "bg-green-200 text-green-700"
                                            : "bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {user.status}
                                </span>
                            </td>
                            <td className="p-2">
                                <button className="text-blue-500 mr-2">Edit</button>
                                <button className="text-red-500">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentUsers;
