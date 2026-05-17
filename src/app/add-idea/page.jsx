'use client'
import React from 'react';

const AddIdeasPage = () => {
    return (
        <div className='py-10'>
            <div className='w-5/8 mx-auto flex flex-col space-y-4'>

                <h2 className='text-red-500 font-semibold text-2xl'>Add your valuable Ideas here</h2>

                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
                    <legend className="fieldset-legend">Submit Your Startup Idea</legend>

                    {/* Row 1: Title & Short Description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">Idea Title</label>
                            <input type="text" className="input w-full" placeholder="Enter idea title" required />
                        </div>
                        <div>
                            <label className="label">Short Description</label>
                            <input type="text" className="input w-full" placeholder="A quick one-liner summary" required />
                        </div>
                    </div>

                    {/* Row 2: Full Width Detailed Description */}
                    <div className="mt-2">
                        <label className="label">Detailed Description</label>
                        <textarea className="textarea textarea-bordered w-full h-24" placeholder="Deep dive into your idea..." required></textarea>
                    </div>

                    {/* Row 3: Category & Tags */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                            <label className="label">Category</label>
                            <select className="select select-bordered w-full" required>
                                <option disabled selected>Select a category</option>
                                <option value="Education">Education</option>
                                <option value="Health">Health</option>
                                <option value="Tech">Tech</option>
                                <option value="AI">AI</option>
                                <option value="Food">Food</option>
                                <option value="Transport">Transport</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">Tags (Optional)</label>
                            <input type="text" className="input w-full" placeholder="e.g., saas, green-tech, automation" />
                        </div>
                    </div>

                    {/* Row 4: Image URL & Estimated Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                            <label className="label">Image URL</label>
                            <input type="url" className="input w-full" placeholder="https://example.com/image.jpg" required />
                        </div>
                        <div>
                            <label className="label">Estimated Budget (Optional)</label>
                            <input type="number" className="input w-full" placeholder="e.g., $5000" />
                        </div>
                    </div>

                    {/* Row 5: Target Audience */}
                    <div className="mt-2">
                        <label className="label">Target Audience</label>
                        <input type="text" className="input w-full" placeholder="Who is this built for?" required />
                    </div>

                    {/* Row 6: Problem Statement & Proposed Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                            <label className="label">Problem Statement</label>
                            <textarea className="textarea textarea-bordered w-full h-24" placeholder="What pain point are you solving?" required></textarea>
                        </div>
                        <div>
                            <label className="label">Proposed Solution</label>
                            <textarea className="textarea textarea-bordered w-full h-24" placeholder="How does your idea solve this problem?" required></textarea>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button className="btn btn-neutral mt-8 w-full">Vault My Idea</button>
                </fieldset>
            </div>
        </div>
    );
};

export default AddIdeasPage;