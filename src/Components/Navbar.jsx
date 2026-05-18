import Image from "next/image";
import Link from "next/link";
import React from "react";
import ToggleTheme from "./ToggleTheme";
import MyNavLink from "./MyNavLink"; // Imported your custom link element

const Navbar = () => {
    // Replaced standard Next.js Links with your smart conditional Link component
    const navLinks = (
        <>
            <MyNavLink href="/">Home</MyNavLink>
            <MyNavLink href="/ideas">Ideas</MyNavLink>
            <MyNavLink href="/add-idea">Add Idea</MyNavLink>
            <MyNavLink href="/my-ideas">My Ideas</MyNavLink>
            <MyNavLink href="/my-interactions">My Interactions</MyNavLink>
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
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-64 gap-1"
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
                    <Link
                        href="/signup"
                        className="btn text-red-600 btn-outline rounded-full px-6"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;