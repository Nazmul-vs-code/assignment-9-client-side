"use client";

import { authClient } from '@/lib/auth-client';
import React, { useState, useEffect } from 'react';
import DeleteIdeaModal from '@/components/DeleteIdeaModal';
import EditMyIdeaModal from '@/Components/EditMyIdeaModal';

const MyIdeasPage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isPending) return;
        if (!user?.id) {
            setLoading(false);
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/my-ideas?authorId=${user.id}`)
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error("Failed to load vault items.");
            })
            .then((data) => {
                setIdeas(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching vault data:", err);
                setLoading(false);
            });
    }, [user?.id, isPending]);

    if (loading || isPending) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <span className="loading loading-spinner loading-md text-primary"></span>
            </div>
        );
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

            <div className="main-vault-wrapper">
                {ideas.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-base-300 rounded-2xl">
                        <p className="text-sm text-base-content/50">You have not added any ideas yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {ideas.map((idea) => {
                            const deleteModalId = `delete_modal_${idea._id}`;
                            const editModalId = `edit_modal_${idea._id}`;

                            return (
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

                                    <div className="flex items-center justify-end gap-2 mt-5 pt-3 border-t border-base-100">
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById(editModalId).showModal()}
                                            className="btn btn-ghost btn-sm text-xs rounded-xl text-base-content/70 hover:text-primary"
                                        >
                                            Update
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => document.getElementById(deleteModalId).showModal()}
                                            className="btn btn-ghost btn-sm text-xs rounded-xl text-error/80 hover:bg-error/10 hover:text-error"
                                        >
                                            Delete
                                        </button>

                                        <DeleteIdeaModal
                                            ideaId={idea._id}
                                            modalId={deleteModalId}
                                        />

                                        <EditMyIdeaModal
                                            idea={idea}
                                            modalId={editModalId}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyIdeasPage;