import React from 'react';

const UpdateCommentModal = ({ modalId, commentId, initialText }) => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const updatedText = formData.get("updatedCommentText");

        console.log("Your input data:", updatedText);

        document.getElementById(modalId).close();


        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/edit-comment/${commentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: updatedText })
        })
        window.location.reload();


    };

    return (
        <div>
            <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-sm">
                    <h3 className="font-bold text-lg mb-4">Edit Comment</h3>

                    {/* Add your onSubmit handler here */}
                    <form onSubmit={handleSubmit} className="space-y-4">


                        <textarea
                            name="updatedCommentText"
                            className="textarea textarea-bordered w-full h-24 rounded-xl resize-none text-sm"
                            placeholder="Type your changes here..."
                            required
                        />

                        <div className="modal-action gap-2">
                            <button
                                type="button"
                                className="btn btn-ghost btn-sm rounded-xl"
                                onClick={() => document.getElementById(modalId).close()}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary btn-sm rounded-xl text-white">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default UpdateCommentModal;