"use client";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BASE_URL } from "../lib/utils";

const signupSchema = z.object({
    userName: z.string().min(1, "Username is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export function SignupForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data) => {
        try {
            const res = await fetch(`${BASE_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            const responseData = await res.json();
            console.log("Signup successful:", responseData);
            reset();
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };

    return (
        <div
            className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Welcome to ISP Portal
            </h2>
            <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-400">
                Sign up to get started
            </h3>
            <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
                <div
                    className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                    <LabelInputContainer>
                        <Label htmlFor="firstname">User Name</Label>
                        <Input id="firstname" placeholder="Kasongo254" type="text" {...register("userName")} />
                    </LabelInputContainer>
                    {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
                    <LabelInputContainer>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone number" placeholder="" type="text" {...register("phoneNumber")} />
                    </LabelInputContainer>
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                </div>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="projectmayhem@fc.com" type="email" {...register("email")} />
                </LabelInputContainer>
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="••••••••" type="password" {...register("password")} />
                </LabelInputContainer>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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
                        href="/signup"
                        className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400">
                        Log In here &rarr;
                    </a>                
                </div>
            </form>
        </div>
    );
};

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

export default SignupForm;