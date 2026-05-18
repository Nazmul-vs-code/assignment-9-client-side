
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const MyIdeasPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;

    let ideas = [];

    if (user?.id) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/my-ideas?authorId=${user.id}`);
        if (res.ok) {
            ideas = await res.json();
        }
    }


    return (
        <div className="py-10 px-4 max-w-6xl mx-auto">

            <div className="mb-8">
                <h2 className="text-primary font-bold text-2xl md:text-3xl tracking-tight">
                    My Idea Vault
                </h2>
                <p className="text-xs text-base-content/60 mt-1">
                    Manage and track your submitted innovations
                </p>
            </div>

        {/* Ideas added by user here */}
        <dvi className="">
            {ideas.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-base-300 rounded-2xl">
                    <p className="text-sm text-base-content/50">You have not added any ideas yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ideas.map((idea) => (
                        <div key={idea._id} className="p-5 border border-base-200 bg-base-100 rounded-2xl shadow-sm flex flex-col justify-between">
                            <div>
                                <span className="text-[10px] font-semibold tracking-wider uppercase text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                                    {idea.category}
                                </span>
                                <h3 className="font-bold text-base mt-3 text-base-content line-clamp-1">
                                    {idea.ideaTitle}
                                </h3>
                                <p className="text-xs text-base-content/70 mt-1 line-clamp-2">
                                    {idea.shortDescription}
                                </p>
                            </div>

                            {/* Action Buttons Container */}
                            <div className="flex items-center justify-end gap-2 mt-5 pt-3 border-t border-base-100">
                                <button className="btn btn-ghost btn-sm text-xs rounded-xl text-base-content/70 hover:text-primary">
                                    Update
                                </button>
                                <button className="btn btn-ghost btn-sm text-xs rounded-xl text-error/80 hover:bg-error/10 hover:text-error">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </dvi>


        </div>
    );
};

export default MyIdeasPage;