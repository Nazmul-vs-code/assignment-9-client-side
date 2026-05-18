'use client'
import React from 'react';
import { toast } from 'react-toastify';

const AddIdeasPage = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const idea = Object.fromEntries(formData.entries())
        // console.log(idea , ' idea form data ')

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/ideas`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(idea)
        })

        const data  = await res.json();
        console.log(data , ' data here added')

        if(data.acknowledged){
            toast.success('Congratulations! Your Idea is added successfully.')
        }

    };

    return (
        <div className='py-10 px-4'>

            <div className='max-w-4xl mx-auto flex flex-col space-y-4'>

                <h2 className='text-primary font-bold text-2xl md:text-3xl tracking-tight'>
                    Add your valuable Ideas here
                </h2>

                {/* Form wrapper initialization */}
                <form onSubmit={handleSubmit}>
                    <fieldset className="fieldset bg-base-100 border-base-300 rounded-2xl border p-6 md:p-8 shadow-sm">
                        <legend className="fieldset-legend font-semibold px-2">Submit Your Startup Idea</legend>

                        {/* Row 1: Title & Short Description */}
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

                        {/* Row 2: Full Width Detailed Description */}
                        <div className="mt-4 w-full">
                            <label className="label-text block mb-1 font-medium text-xs">Detailed Description</label>
                            <textarea name="detailedDescription" className="textarea textarea-bordered w-full h-28 rounded-xl bg-base-50/50 leading-relaxed" placeholder="Deep dive into your idea..." required></textarea>
                        </div>

                        {/* Row 3: Category & Tags */}
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

                        {/* Row 4: Image URL & Estimated Budget */}
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

                        {/* Row 5: Target Audience */}
                        <div className="mt-4 w-full">
                            <label className="label-text block mb-1 font-medium text-xs">Target Audience</label>
                            <input type="text" name="targetAudience" className="input input-bordered w-full rounded-xl bg-base-50/50" placeholder="Who is this built for?" required />
                        </div>

                        {/* Row 6: Problem Statement & Proposed Solution */}
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

                        {/* Submit Button */}
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