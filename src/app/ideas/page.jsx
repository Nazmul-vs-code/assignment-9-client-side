"use client";

import IdeaCard from '@/components/IdeaCard';
import React, { useState, useEffect } from 'react';

const IdeasPage = () => {
    const [ideaData, setIdeaData] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);

    // Hardcoded categories list  
    const categories = ["Education", "AI", "Health", "E-commerce", "Food", "Tech"];

    

    useEffect(() => {
        setLoading(true);
        
        // 1. Build the dynamic query parameters string cleanly
        const queryParams = new URLSearchParams();

        if (search.trim()) queryParams.append("search", search.trim());
        if (category) queryParams.append("category", category);

        // 2. Fetch data from backend using the built query structure
        const targetUrl = `${process.env.NEXT_PUBLIC_SERVER_URI}/ideas?${queryParams.toString()}`;
        
        fetch(targetUrl , {

        })
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data) => {
                setIdeaData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch filtered ideas:", error);
                setLoading(false);
            });
    }, [search, category]);  

    return (
        <section className="py-12 px-4 max-w-7xl mx-auto">
            {/* Header and Controls Block Layout */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Inspirations</span>
                    <h2 className="font-extrabold text-3xl md:text-4xl text-base-content">
                        All Startup Ideas
                    </h2>
                    <div className="w-16 h-1 bg-primary rounded-full mt-3"></div>
                </div>

                {/* Live Input Controls Viewport */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    {/* Search Field Input */}
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered w-full sm:w-64 rounded-xl bg-base-100"
                    />

                    {/* Filter Dropdown Selection */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="select select-bordered w-full sm:w-52 rounded-xl bg-base-100"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Display State Wrapper */}
            {loading ? (
                <div className="flex justify-center items-center min-h-[30vh]">
                    <span className="loading loading-spinner loading-md text-primary"></span>
                </div>
            ) : ideaData.length === 0 ? (
                <div className="alert alert-warning shadow-sm rounded-xl max-w-md mx-auto">
                    <span>No startup ideas found matching your criteria. Try another search term!</span>
                </div>
            ) : (
                /* Dynamic Responsive Grid System */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ideaData.map((idea) => (
                        <IdeaCard key={idea._id || idea.ideaTitle} idea={idea} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default IdeasPage;