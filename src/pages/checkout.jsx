import { useState } from "react";
import { useSearchParams } from "react-router";
import { BASE_URL } from "../lib/utils";

const Checkout = () => {
    const [searchParams] = useSearchParams();
    const planName = searchParams.get("plan");
    const planPrice = searchParams.get("price");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone,
                    amount: planPrice,
                    plan: planName,
                }),
            });

            const data = await res.json();
            alert(data.message || "Payment request sent to your phone.");
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        };
    };

    if (loading) return <div>Loading...</div>

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Complete Your Purchase</h2>

                <div className="bg-green-50 p-4 rounded-lg mb-6">
                    <p>
                        <strong>Plan:</strong> {planName}
                    </p>
                    <p>
                        <strong>Price:</strong> Ksh {planPrice}
                    </p>
                </div>

                <form onSubmit={handlePayment}>
                    <label className="block mb-2 font-semibold">Enter MPESA Number</label>
                    <input
                        type="tel"
                        placeholder="e.g. 0712345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800 transition"
                    >
                        Pay with MPESA
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
