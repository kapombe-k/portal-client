import { Outlet, NavLink } from "react-router";
import { Users, Package, CreditCard, LifeBuoy, Activity, Home } from "lucide-react";

const navItems = [
    { path: "/admin", label: "Dashboard", icon: <Home size={18} /> },
    { path: "/admin/users", label: "Users", icon: <Users size={18} /> },
    { path: "/admin/bundles", label: "Bundles", icon: <Package size={18} /> },
    { path: "/admin/transactions", label: "Transactions", icon: <CreditCard size={18} /> },
    { path: "/admin/tickets", label: "Support Tickets", icon: <LifeBuoy size={18} /> },
    { path: "/admin/audit-logs", label: "Audit Logs", icon: <Activity size={18} /> },
];

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg p-4 flex flex-col">
                <h2 className="text-xl font-bold mb-8 text-green-700">WiFi ISP Admin</h2>
                <nav className="flex flex-col gap-3">
                    {navItems.map((item, i) => (
                        <NavLink
                            key={i}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive ? "bg-green-100 text-green-700 font-semibold" : "text-gray-700 hover:bg-gray-200"
                                }`
                            }
                        >
                            {item.icon}
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">Operator</span>
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="profile"
                            className="rounded-full w-10 h-10"
                        />
                    </div>
                </header>

                {/* Routed Content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
