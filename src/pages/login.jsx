"use client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { BottomGradient } from "../ui/bottom-gradient";


export function SignInForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Field ${name} changed to ${value}`);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const signIn = async () => {
            try {
                const res = await fetch("/api/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                console.log("Signup successful:", data);
            } catch (error) {
                console.error("Error during signup:", error);
            }
        };
        signIn();
        setFormData({ email: "", password: "" });
        console.log("Form submitted");
    };
    return (
        <div
            className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Welcome back to ISP Portal
            </h2>
            <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-400">
                Sign in to continue
            </h3>
            <form className="my-8" onSubmit={handleSubmit}>                
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={formData.email} onChange={handleChange} />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="••••••••" type="password" value={formData.password} onChange={handleChange} />
                </LabelInputContainer>
                <button
                    className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                    type="submit">
                    Sign up &rarr;
                    <BottomGradient />
                </button>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        Already have an account?
                    </span>
                    <a
                        href="/login"
                        className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400">
                        Log in
                    </a>

                
                </div>
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span
                className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span
                className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
export default SignInForm;