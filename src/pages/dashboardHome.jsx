
import { Card, CardContent } from "@/components/ui/card";
import { BASE_URL } from "../lib/utils";

const stats = [
    { label: "Total Users", value: "1,230" },
    { label: "Active Sessions", value: "150" },
    { label: "Revenue (Ksh)", value: "75,000" },
    { label: "Bundles Sold", value: "2,340" },
];

const fetchStats = async () => {
    try {
        //setLoading(true);
        const response = await fetch(`${BASE_URL}/stats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching stats:', error);
    } finally {
        // setLoading(false)
    }
};

useEffect(() => {
    fetchStats();
}, []);

const DashboardHome = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="rounded-2xl shadow">
                        <CardContent className="p-6">
                            <h3 className="text-gray-600 text-sm">{stat.label}</h3>
                            <p className="text-2xl font-bold mt-2">{stat.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DashboardHome;
