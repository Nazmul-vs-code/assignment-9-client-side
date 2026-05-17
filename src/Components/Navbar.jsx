import Image from "next/image";
import Link from "next/link";
import React from "react";
import ToggleTheme from "./ToggleTheme";

const Navbar = () => {
    const navLinks = (
        <>
            <li>
                <Link href="/">Home</Link>
            </li>

            <li>
                <Link href="/ideas">Ideas</Link>
            </li>

            <li>
                <Link href="/add-idea">Add Idea</Link>
            </li>

            <li>
                <Link href="/my-ideas">My Ideas</Link>
            </li>

            <li>
                <Link href="/my-interactions">My Interactions</Link>
            </li>
        </>
    );

    return (
        <div className="sticky top-0 z-50 bg-base-100 shadow-md">
            <div className="navbar max-w-7xl mx-auto px-4">

                {/* Navbar Start */}
                <div className="navbar-start">

                    {/* Mobile Menu */}
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-64"
                        >
                            {navLinks}
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-2xl font-bold"
                    >
                        <Image
                            src="/logo.png"
                            width={45}
                            height={45}
                            alt="IdeaVault Logo"
                            className="rounded-full"
                        />

                        <span className="hidden sm:block text-primary">
                            IdeaVault
                        </span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-medium gap-2">
                        {navLinks}
                    </ul>
                </div>

                {/* Navbar End */}
                <div className="navbar-end gap-2">

                    {/* Theme Button */}

                    <ToggleTheme />

                    {/* Login Button */}
                    <Link
                        href="/login"
                        className="btn btn-primary rounded-full px-6"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;