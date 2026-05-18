"use client";

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLink, FaLock, FaEye, FaEyeSlash, FaLightbulb, FaExclamationCircle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    // State to hold and display custom password validation errors
    const [validationError, setValidationError] = useState("");

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        setValidationError(""); // Clear previous errors

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.image.value;

        const password = form.password.value;

        // --- Custom Password Validations ---

        // 1. Minimum 6 characters check
        if (password.length < 6) {
            setValidationError("Password must be at least 6 characters long.");
            return;
        }

        // 2. Contains at least one uppercase letter ("one chap")
        if (!/[A-Z]/.test(password)) {
            setValidationError("Password must contain at least one capital letter.");
            return;
        }

        // 3. Contains at least one lowercase letter ("one small")
        if (!/[a-z]/.test(password)) {
            setValidationError("Password must contain at least one small letter.");
            return;
        }

        // const formData = new FormData(e.currentTarget);
        // const user = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name,
            image,
            callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
        },
        )

        // console.log({ data, error }, ' data , error ')
        if (data) {
            toast.success("Congratulations " + data.name + ". You have successfully created an account");
            redirect('/');
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
        <div className="min-h-[calc(100vh-68px)] flex items-center justify-center bg-base-200/50 py-10 px-4">
            <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 border border-base-200">

                {/* Left Column: Side Branding Panel */}
                <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-primary/90 to-primary-dark bg-primary p-12 text-primary-content relative overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                            <FaLightbulb className="text-xl text-yellow-300" />
                        </div>
                        <span>IdeaVault</span>
                    </div>

                    <div className="space-y-4 my-auto z-10">
                        <h2 className="text-3xl font-extrabold leading-tight">
                            Protect and grow your startup concepts.
                        </h2>
                        <p className="text-primary-content/80 text-sm leading-relaxed">
                            Join a global community of innovators, refine your project pitches, track real-time audience metrics, and get structured live comments.
                        </p>
                    </div>

                    <div className="text-xs text-primary-content/60">
                        © 2026 IdeaVault Inc. All rights reserved.
                    </div>
                </div>

                {/* Right Column: Sign Up Form */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-6">
                        <h3 className="text-2xl font-extrabold text-base-content tracking-tight">
                            Create your Vault
                        </h3>
                        <p className="text-xs text-base-content/60 mt-1">
                            Get started by filling out your credentials below.
                        </p>
                    </div>

                    <form onSubmit={handleSignUpSubmit} className="space-y-4">
                        {/* 1. Name Input Field */}
                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-xs">Full Name</span>
                            </label>
                            <div className="input input-bordered flex items-center gap-3 rounded-xl bg-base-50 focus-within:outline-primary">
                                <FaUser className="text-base-content/40 text-sm" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    className="grow text-sm bg-transparent border-none focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* 2. Email Input Field */}
                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-xs">Email Address</span>
                            </label>
                            <div className="input input-bordered flex items-center gap-3 rounded-xl bg-base-50 focus-within:outline-primary">
                                <FaEnvelope className="text-base-content/40 text-sm" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="grow text-sm bg-transparent border-none focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* 3. Photo URL Input Field */}
                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-xs">Photo URL</span>
                            </label>
                            <div className="input input-bordered flex items-center gap-3 rounded-xl bg-base-50 focus-within:outline-primary">
                                <FaLink className="text-base-content/40 text-sm" />
                                <input
                                    type="url"
                                    name="image"
                                    placeholder="Enter yoru profile's url"
                                    className="grow text-sm bg-transparent border-none focus:outline-none"

                                />
                            </div>
                        </div>

                        {/* 4. Password Input Field */}
                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold text-xs">Password</span>
                            </label>
                            <div className="input input-bordered flex items-center gap-3 rounded-xl bg-base-50 focus-within:outline-primary relative">
                                <FaLock className="text-base-content/40 text-sm" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    className="grow text-sm bg-transparent border-none focus:outline-none pr-8"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 text-base-content/40 hover:text-base-content transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                                </button>
                            </div>
                            {/* Minor helpful caption text below the input field */}
                            <label className="label p-1">
                                <span className="label-text-alt text-[10px] text-base-content/50">
                                    Requires min 6 characters with uppercase & lowercase letters.
                                </span>
                            </label>
                        </div>

                        {/* Terms and Conditions Checkbox */}
                        <div className="form-control py-1">
                            <label className="label cursor-pointer justify-start gap-3 p-0">
                                <input type="checkbox" className="checkbox checkbox-xs checkbox-primary rounded" required />
                                <span className="label-text text-xs text-base-content/70">
                                    I agree to the Terms of Service & Privacy Policy
                                </span>
                            </label>
                        </div>

                        {/* Dynamic DaisyUI Error Alert block */}
                        {validationError && (
                            <div className="alert alert-error py-2.5 px-3 rounded-xl text-xs flex items-center gap-2 shadow-sm font-medium animate-shake">
                                <FaExclamationCircle className="text-sm shrink-0" />
                                <span>{validationError}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary w-full font-bold mt-2">
                            Create Account
                        </button>

                    </form>
                    <div className="">
                        <button
                        onClick={handleGoogleSignIn} 
                        className="btn btn-outline w-full font-bold mt-2">
                            <FcGoogle />  Continue with google
                        </button>

                    </div>

                    {/* Navigation Footer */}
                    <p className="text-center text-xs text-base-content/70 mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary font-bold hover:underline link link-hover">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;