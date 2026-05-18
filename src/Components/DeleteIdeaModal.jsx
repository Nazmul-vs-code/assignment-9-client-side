"use client";

import React from 'react';
import { toast } from 'react-toastify';

const DeleteIdeaModal = ({ ideaId, modalId }) => {
    const onDelete = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/ideas/${ideaId}`, {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' }
            });

            const data = await res.json();
            
            if (data.deletedCount > 0 || data.success) {
                toast.success('Idea deleted successfully.');
                document.getElementById(modalId).close();
                window.location.reload();
            } else {
                toast.error('Failed to delete this item.');
            }
        } catch (error) {
            console.error("Deletion error:", error);
            toast.error('Something went wrong.');
        }
    };

    return (
        <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box text-left">
                <h3 className="font-bold text-lg text-error">Delete Startup Idea?</h3>
                <p className="py-4 text-sm text-base-content/70">
                    Are you sure you want to permanently delete this startup configuration? This action cannot be undone.
                </p>
                <div className="modal-action gap-2">
                    <form method="dialog" className="flex gap-2 w-full justify-end">
                        <button
                            type="button"
                            className="btn btn-ghost btn-sm rounded-xl"
                            onClick={() => document.getElementById(modalId).close()}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onDelete}
                            className="btn btn-error btn-sm rounded-xl text-white"
                        >
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default DeleteIdeaModal;