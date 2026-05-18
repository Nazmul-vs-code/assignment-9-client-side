"use client";

import React from 'react';
import { toast } from 'react-toastify';

const EditMyIdeaModal = ({ idea, modalId }) => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const updatedIdea = Object.fromEntries(formData.entries());

        fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/ideas/${idea._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedIdea)
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.modifiedCount > 0 || data.success) {
                toast.success('Idea updated successfully.');
                document.getElementById(modalId).close();
                window.location.reload();
            } else {
                toast.error('No changes were made.');
            }
        })
        .catch((err) => console.error("Update error:", err));
    };

    return (
        <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box p-0 max-w-4xl bg-transparent border-none shadow-none">
                <form onSubmit={handleSubmit}>
                    <fieldset className="fieldset bg-base-100 border-base-300 rounded-2xl border p-6 md:p-8 shadow-sm relative">
                        <button 
                            type="button" 
                            onClick={() => document.getElementById(modalId).close()} 
                            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
                        >
                            ✕
                        </button>

                        <legend className="fieldset-legend font-semibold px-2 text-lg text-primary">Edit Your Startup Idea</legend>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                            <div>
                                <label className="label-text block mb-1 font-medium text-xs">Idea Title</label>
                                <input type="text" name="ideaTitle" defaultValue={idea?.ideaTitle} className="input input-bordered w-full rounded-xl bg-base-50/50" placeholder="Enter idea title" required />
                            </div>
                            <div>
                                <label className="label-text block mb-1 font-medium text-xs">Short Description</label>
                                <input type="text" name="shortDescription" defaultValue={idea?.shortDescription} className="input input-bordered w-full rounded-xl bg-base-50/50" placeholder="A quick one-liner summary" required />
                            </div>
                        </div>

                        <div className="mt-4 w-full">
                            <label className="label-text block mb-1 font-medium text-xs">Detailed Description</label>
                            <textarea name="detailedDescription" defaultValue={idea?.detailedDescription} className="textarea textarea-bordered w-full h-28 rounded-xl bg-base-50/50 leading-relaxed" placeholder="Deep dive into your idea..." required></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
                            <div>
                                <label className="label-text block mb-1 font-medium text-xs">Category</label>
                                <select name="category" className="select select-bordered w-full rounded-xl bg-base-50/50" defaultValue={idea?.category || ""} required>
                                    <option value="" disabled>Select a category</option>
                                    <option value="Education">Education</option>
                                    <option value="Health">Health</option>
                                    <option value="Tech">Tech</option>
                                    <option value="AI">AI</option>
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                </select>
                            </div>
                            <div>
                                <label className="label-text block mb-1 font-medium text-xs">Tags (Optional)</label>
                                <input type="text" name="tags" defaultValue={idea?.tags} className="input input-bordered w-full rounded-xl bg-base-50/50" placeholder="e.g., saas, green-tech, automation" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
                            <div>
                                <label className="label-text block mb-1 font-medium text-xs">Image URL</label>
                                <input type="url" name="imageURL" defaultValue={idea?.imageURL} className="input input-bordered w-full rounded-xl bg-base-50/50" placeholder="https://example.com/image.jpg" required />
                            </div>
                            <div>
                                <label className="label-text block mb-1 font-medium text-xs">Estimated Budget (Optional)</label>
                                <input type="number" name="estimatedBudget" defaultValue={idea?.estimatedBudget} className="input input-bordered w-full rounded-xl bg-base-50/50" placeholder="e.g., 5000" />
                            </div>
                        </div>

                        <div className="mt-4 w-full">
                            <label className="label-text block mb-1 font-medium text-xs">Target Audience</label>
                            <input type="text" name="targetAudience" defaultValue={idea?.targetAudience} className="input input-bordered w-full rounded-xl bg-base-50/50" placeholder="Who is this built for?" required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
                            <div>
                                <label className="label-text block mb-1 font-medium text-xs">Problem Statement</label>
                                <textarea name="problemStatement" defaultValue={idea?.problemStatement} className="textarea textarea-bordered w-full h-28 rounded-xl bg-base-50/50 leading-relaxed" placeholder="What pain point are you solving?" required></textarea>
                            </div>
                            <div>
                                <label className="label-text block mb-1 font-medium text-xs">Proposed Solution</label>
                                <textarea name="proposedSolution" defaultValue={idea?.proposedSolution} className="textarea textarea-bordered w-full h-28 rounded-xl bg-base-50/50 leading-relaxed" placeholder="How does your idea solve this problem?" required></textarea>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-8 w-full">
                            <button 
                                type="button" 
                                onClick={() => document.getElementById(modalId).close()} 
                                className="btn btn-ghost rounded-xl font-medium"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-primary rounded-xl font-bold text-white shadow-sm flex-grow sm:flex-grow-0 sm:px-8"
                            >
                                Save Changes
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </dialog>
    );
};

export default EditMyIdeaModal;