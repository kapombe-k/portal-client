import { useState } from "react";
import { useSearchParams } from "react-router";

const Checkout = () => {
    const [searchParams] = useSearchParams();
    const planName = searchParams.get("plan");
    const planPrice = searchParams.get("price");
    const [phone, setPhone] = useState("");

    const handlePayment = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/pay", {
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
        }
    };

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
