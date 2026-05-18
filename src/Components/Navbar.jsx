'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ToggleTheme from "./ToggleTheme";
import MyNavLink from "./MyNavLink";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                },
            },
        });
    };


    const navLinks = (
        <>
            <MyNavLink href="/">Home</MyNavLink>
            <MyNavLink href="/ideas">Ideas</MyNavLink>
            {
                <>
                    <MyNavLink href="/add-idea">Add Idea</MyNavLink>
                    <MyNavLink href="/my-ideas">My Ideas</MyNavLink>
                    <MyNavLink href="/my-interactions">My Interactions</MyNavLink>
                </>
            }
        </>
    );

    return (
        <div className="sticky top-0 z-50 bg-base-100 shadow-md">
            <div className="navbar max-w-7xl mx-auto px-4">

                {/* Navbar Start: Logo & Mobile Menu */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-64 gap-1">
                            {navLinks}
                        </ul>
                    </div>

                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
                        <Image src="/logo.png" width={45} height={45} alt="IdeaVault Logo" className="rounded-full" />
                        <span className="hidden sm:block text-primary">IdeaVault</span>
                    </Link>
                </div>

                {/* Navbar Center: Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-medium gap-2">
                        {navLinks}
                    </ul>
                </div>

                {/* Navbar End: Theme & Auth Profiles */}
                <div className="navbar-end gap-3">
                    <ToggleTheme />

                    {isPending ? (
                        <span className="loading loading-spinner loading-md text-primary"></span>
                    ) : session?.user ? (
                        /* LOGGED IN VIEW */
                        <div className="flex items-center gap-3">
                            {/* User Name displayed beside avatar */}
                            <span className="hidden md:block font-medium text-sm text-base-content/80">
                                {session.user.name}
                            </span>

                            {/* Avatar Dropdown wrapper */}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-base-300">
                                    <div className="w-10 rounded-full relative">
                                        <img
                                            alt={session.user.name || "User Avatar"}
                                            src={session.user.image || "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"} 
                                        />
                                            </div>
                                </div>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-2xl w-56 border border-base-200">
                                        <li className="px-4 py-2 border-b border-base-200 mb-1 lg:hidden">
                                            <p className="font-bold text-base-content truncate p-0">{session.user.name}</p>
                                        </li>
                                        <li>
                                            <Link href="/profile" className="justify-between py-2">
                                                My Profile
                                                <span className="badge badge-primary badge-sm text-white">New</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <button onClick={handleLogout} className="text-error font-medium hover:bg-error/10 py-2">
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            ) : (
                            /* LOGGED OUT VIEW */
                            <>
                                <Link href="/login" className="btn btn-primary rounded-full px-6">
                                    Login
                                </Link>
                                <Link href="/signup" className="btn text-red-600 btn-outline rounded-full px-6 hidden sm:inline-flex">
                                    Register
                                </Link>
                            </>
                    )}
                        </div>
            </div>
            </div>
            );
};

            export default Navbar;