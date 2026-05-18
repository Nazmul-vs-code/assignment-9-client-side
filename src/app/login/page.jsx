'use client'
import { authClient } from '@/lib/auth-client';
import { redirect, useRouter } from 'next/navigation';

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const credentials = Object.fromEntries(formData.entries());

        // console.log(credentials);

        const { data, error } = await authClient.signIn.email({
            email: credentials.email,
            password: credentials.password
        });

        console.log({ data, error }, ' data , error ')

        if (data) {
            toast.success(`Welcome back, ${data.user.name || 'User'}! You have successfully logged in.`);
            router.push('/');
        }

        if (error) {
            toast.error("Unexpected erro occured :  " + error.message)
        }
    };

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        })
    }

    return (
        <div className='py-10 px-4'>
            <div className='max-w-md mx-auto flex flex-col space-y-4 bg-base-100 border-2 border-gray-200 p-5'>

                <h2 className='text-primary font-bold text-2xl md:text-3xl tracking-tight text-center'>
                    Welcome Back
                </h2>

                <form onSubmit={handleSubmit}>
                    <fieldset className="fieldset bg-base-100 border-base-300 rounded-2xl border p-6 md:p-8 shadow-sm">
                        <legend className="fieldset-legend font-semibold px-2">Account Login</legend>

                        <div className="w-full space-y-4">
                            <div>
                                <label className="label-text block mb-1 font-medium text-xs">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input input-bordered w-full rounded-xl bg-base-50/50"
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="label-text block mb-1 font-medium text-xs">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="input input-bordered w-full rounded-xl bg-base-50/50"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary mt-8 w-full rounded-xl font-bold text-white shadow-sm">
                            Access Vault
                        </button>
                    </fieldset>
                </form>
                <div className="">
                    <button 
                    onClick={handleGoogleSignIn}
                    className="btn btn-outline w-full font-bold mt-2">
                        <FcGoogle />  Continue with google
                    </button>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;