import React from 'react';
import { toast } from 'react-toastify';

const DeleteModal = ({ commentId, modalId }) => {

    const onDelete = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/delete-comment/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            });

            const data = await res.json();
            
            if (data.deletedCount > 0) {
                toast.success('Comment deleted successfully.');


                document.getElementById(modalId).close();


                window.location.reload();
            } else {
                toast.error('Failed to delete comment.');
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
            toast.error('Something went wrong.');
        }

        // console.log(commentId , modalId)
    };

    return (
        <div>
            <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-error">Delete Comment?</h3>
                    <p className="py-4 text-sm text-base-content/70">
                        Are you sure you want to permanently delete this comment? This action cannot be undone.
                    </p>

                    <div className="modal-action gap-2">
                        <form method="dialog" className="flex gap-2 w-full justify-end">
                            {/* Closes modal safely via its unique ID */}
                            <button
                                type="button"
                                className="btn btn-ghost btn-sm rounded-xl"
                                onClick={() => document.getElementById(modalId).close()}
                            >
                                Cancel
                            </button>

                            {/* Executes the dynamic fetch request */}
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
        </div>
    );
};

export default DeleteModal;