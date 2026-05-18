'use client'
import React from 'react';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client'; 

const AddIdeasPage = () => {
   
    
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("You must be logged in to submit an idea!");
            return;
        }

        const formData = new FormData(e.currentTarget);
        const rawIdeaData = Object.fromEntries(formData.entries());

        const idea = {
            ...rawIdeaData,
            authorId: user?.id || user?._id
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/ideas`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(idea)
        });

        const data = await res.json();
        console.log(data, ' data here added');

        if (data.acknowledged) {
            toast.success('Congratulations! Your Idea is added successfully.');
            e.currentTarget.reset();
        }
    };

    return (
        <div className='py-10 px-4'>
            <div className='max-w-4xl mx-auto flex flex-col space-y-4'>
                <h2 className='text-primary font-bold text-2xl md:text-3xl tracking-tight'>
                    Add your valuable Ideas here
                </h2>

                <form onSubmit={handleSubmit}>
                    <fieldset className="fieldset bg-base-100 border-base-300 rounded-2xl border p-6 md:p-8 shadow-sm">
                        <legend className="fieldset-legend font-semibold px-2">Submit Your Startup Idea</legend>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            <div>
                                <label className="label-text block mb-1 font-medium text-xs">Idea Title</label>
                                <input type="text" name="ideaTitle" className="input input-bordered w-full rounded-xl bg-base-50/50" placeholder="Enter idea title" required />
                            </div>
                            <div>
                                <label className="label-text block mb-1 font-medium text-xs">Short Description</label>
                                <input type="text" name="shortDescription" className="input input-bordered w-full rounded-xl bg-base-50/50" placeholder="A quick one-liner summary" required />
                            </div>
                        </div>

                        <div className="mt-4 w-full">
                            <label className="label-text block mb-1 font-medium text-xs">Detailed Description</label>
                            <textarea name="detailedDescription" className="textarea textarea-bordered w-full h-28 rounded-xl bg-base-50/50 leading-relaxed" placeholder="Deep dive into your idea..." required></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
                            <div>
                                <label className="label-text block mb-1 font-medium text-xs">Category</label>
                                <select name="category" className="select select-bordered w-full rounded-xl bg-base-50/50" defaultValue="" required>
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
                                <input type="text" name="tags" className="input input-bordered w-full rounded-xl bg-base-50/50" placeholder="e.g., saas, green-tech, automation" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
                            <div>
                                <label className="label-text block mb-1 font-medium text-xs">Image URL</label>
                                <input type="url" name="imageURL" className="input input-bordered w-full rounded-xl bg-base-50/50" placeholder="https://example.com/image.jpg" required />
                            </div>
                            <div>
                                <label className="label-text block mb-1 font-medium text-xs">Estimated Budget (Optional)</label>
                                <input type="number" name="estimatedBudget" className="input input-bordered w-full rounded-xl bg-base-50/50" placeholder="e.g., 5000" />
                            </div>
                        </div>

                        <div className="mt-4 w-full">
                            <label className="label-text block mb-1 font-medium text-xs">Target Audience</label>
                            <input type="text" name="targetAudience" className="input input-bordered w-full rounded-xl bg-base-50/50" placeholder="Who is this built for?" required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
                            <div>
                                <label className="label-text block mb-1 font-medium text-xs">Problem Statement</label>
                                <textarea name="problemStatement" className="textarea textarea-bordered w-full h-28 rounded-xl bg-base-50/50 leading-relaxed" placeholder="What pain point are you solving?" required></textarea>
                            </div>
                            <div>
                                <label className="label-text block mb-1 font-medium text-xs">Proposed Solution</label>
                                <textarea name="proposedSolution" className="textarea textarea-bordered w-full h-28 rounded-xl bg-base-50/50 leading-relaxed" placeholder="How does your idea solve this problem?" required></textarea>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary mt-8 w-full rounded-xl font-bold text-white shadow-sm">
                            Vault My Idea
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default AddIdeasPage;