import IdeaCard from '@/Components/IdeaCard';
import React from 'react';


const TrendingIdeas = async () => {
    let ideaData = [];
    
    try {
        const ideas = await fetch(`${process.env.SERVER_URI}/ideas`);
        ideaData = await ideas.json();
    } catch (error) {
        console.error("Failed to fetch trending ideas:", error);
    }

    return (
        <section className="py-12">
            <div className="flex flex-col mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Inspirations</span>
                <h2 className="font-extrabold text-3xl md:text-4xl text-base-content">
                    All Startup Ideas
                </h2>
                <div className="w-16 h-1 bg-primary rounded-full mt-3"></div>
            </div>

            {/* Error / Empty Fallback State handling safely */}
            {ideaData.length === 0 ? (
                <div className="alert alert-warning shadow-sm rounded-box max-w-md">
                    <span>No trending ideas found at this time. Check back later!</span>
                </div>
            ) : (
                /* The Grid Configuration requested: 1 column on mobile, 2 on medium displays, 3 on large screens */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ideaData.map((idea) => (
                        // Always use a unique key string when rendering item arrays in React
                        <IdeaCard key={idea._id || idea.ideaTitle} idea={idea} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default TrendingIdeas;