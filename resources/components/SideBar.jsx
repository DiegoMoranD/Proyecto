const Sidebar = () => {
    return (
        <aside className="w-64 bg-white shadow-lg p-6">
            <h1 className="text-xl font-bold text-blue-600 mb-6">Admin Panel</h1>
            <nav>
                <ul className="space-y-3">
                    <li className="text-gray-700 font-semibold p-2 rounded bg-gray-200">Dashboard</li>
                    <li className="text-gray-600 hover:text-gray-900 p-2 cursor-pointer">Users</li>
                    <li className="text-gray-600 hover:text-gray-900 p-2 cursor-pointer">Reports</li>
                    <li className="text-gray-600 hover:text-gray-900 p-2 cursor-pointer">Analytics</li>
                    <li className="text-gray-600 hover:text-gray-900 p-2 cursor-pointer">Settings</li>
                </ul>
            </nav>
            <button className="mt-6 text-red-600 font-semibold">Logout</button>
        </aside>
    );
};

export default Sidebar;
