const RecentActivity = () => {
    const activities = [
        { user: "John Doe", action: "created a new report", time: "2 hours ago" },
        { user: "Jane Smith", action: "updated user settings", time: "5 hours ago" },
        { user: "Robert Johnson", action: "deleted a user account", time: "1 day ago" },
        { user: "Emily Davis", action: "generated monthly report", time: "2 days ago" },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <ul>
                {activities.map((activity, index) => (
                    <li key={index} className="py-2 border-b">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                        <span className="text-gray-500 text-sm"> ({activity.time})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivity;
