import { Link } from "react-router";

const plans = [
    { name: "1 GB", duration: "Valid for 1 Day", price: 50 },
    { name: "5 GB", duration: "Valid for 7 Days", price: 200 },
    { name: "Unlimited", duration: "Valid for 30 Days", price: 1500 },
];

const Plans = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-center mb-10">Available WiFi Plans</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center"
                    >
                        <h2 className="text-xl font-semibold">{plan.name}</h2>
                        <p className="text-gray-600">{plan.duration}</p>
                        <p className="text-green-700 text-2xl font-bold my-4">
                            Ksh {plan.price}
                        </p>
                        <Link
                            to={`/checkout?plan=${plan.name}&price=${plan.price}`}
                            className="px-6 py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition"
                        >
                            Buy Now
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Plans;
