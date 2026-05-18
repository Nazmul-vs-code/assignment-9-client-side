"use client";

import { authClient } from '@/lib/auth-client';
import React from 'react';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    if (isPending) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <span className="loading loading-spinner loading-md text-primary"></span>
            </div>
        );
    }

    const onSubmit = async (e) => {
        // e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { email, image, name } = Object.fromEntries(formData.entries());

        await authClient.updateUser({
            name,
            image,
            
        });

        toast.success("Wow, amezing profile! :)")


    }

    return (
        <div className="py-10 px-4 max-w-2xl mx-auto">
            {/* Header Banner & Avatar Display */}
            <div className="flex flex-col items-center gap-4 mb-8 text-center">
                <div className="avatar">
                    <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-md">
                        <img
                            src={user?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                            alt="Profile Avatar"
                        />
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-base-content">
                        {user?.name || "User Account"}
                    </h2>
                    <p className="text-xs text-base-content/60 mt-0.5">
                        {user?.email || "user@example.com"}
                    </p>
                </div>
            </div>

            {/* Profile Form Container */}
            <form onSubmit={onSubmit}>

                <fieldset className="fieldset bg-base-100 border-base-300 rounded-2xl border p-6 md:p-8 shadow-sm">
                    <legend className="fieldset-legend font-semibold px-2">Account Settings</legend>

                    {/* Username Input */}
                    <div className="w-full">
                        <label className="label-text block mb-1 font-medium text-xs">Username / Full Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={user?.name}
                            className="input input-bordered w-full rounded-xl bg-base-50/50"
                            placeholder="Your Username"
                            required
                        />
                    </div>

                    {/* Email Address Input */}
                    <div className="mt-4 w-full">
                        <label className="label-text block mb-1 font-medium text-xs">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            defaultValue={user?.email}
                            className="input input-bordered w-full rounded-xl bg-base-200 cursor-not-allowed text-base-content/50"
                            placeholder="your.email@example.com"
                            readOnly
                            required
                        />
                    </div>

                    {/* Profile Picture URL Input */}
                    <div className="mt-4 w-full">
                        <label className="label-text block mb-1 font-medium text-xs">Profile Picture URL</label>
                        <input
                            type="url"
                            name="image"
                            defaultValue={user?.image}
                            className="input input-bordered w-full rounded-xl bg-base-50/50"
                            placeholder="https://example.com/avatar.jpg"
                        />
                    </div>

                    {/* Clean Update Button */}
                    <button
                        type="submit"
                        className="btn btn-primary mt-8 w-full rounded-xl font-bold text-white shadow-sm"
                    >
                        Update Profile
                    </button>
                </fieldset>
            </form>
        </div>
    );
};

export default ProfilePage;