const DashboardMetrics = () => {
    const metrics = [
        { title: "Total Users", value: "2,543", change: "+12.5%", color: "text-green-500" },
        { title: "New Users", value: "185", change: "+3.2%", color: "text-green-500" },
        { title: "Active Sessions", value: "1,253", change: "-2.1%", color: "text-red-500" },
        { title: "Revenue", value: "$12,345", change: "+8.3%", color: "text-green-500" },
    ];

    return (
        <div className="grid grid-cols-4 gap-6 mt-6">
            {metrics.map((metric, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-gray-500">{metric.title}</p>
                    <h3 className="text-2xl font-bold">{metric.value}</h3>
                    <span className={metric.color}>{metric.change}</span>
                </div>
            ))}
        </div>
    );
};

export default DashboardMetrics;
