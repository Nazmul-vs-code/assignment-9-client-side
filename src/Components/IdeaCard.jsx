import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaDollarSign, FaTag, FaArrowRight, FaLightbulb } from 'react-icons/fa';

const IdeaCard = ({ idea }) => {
    // Destructure properties from your MongoDB objects with protective fallbacks
    const {
        ideaTitle,
        shortDescription,
        category,
        tags = [],
        imageURL,
        estimatedBudget,
        _id,
    } = idea;

    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 flex flex-col h-full">
            {/* Card Image Banner */}
            <figure className="relative h-48 w-full bg-base-300 overflow-hidden">
                <img
                    src={imageURL || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"}
                    alt={ideaTitle}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                />
                {/* Floating Category Badge */}
                <div className="absolute top-3 left-3 badge badge-primary font-medium gap-1 py-3 px-3 shadow-sm">
                    <FaLightbulb className="text-xs" />
                    {category}
                </div>
            </figure>

            {/* Card Content Wrapper */}
            <div className="card-body p-5 flex flex-col justify-between flex-grow">
                <div>
                    {/* Title */}
                    <h2 className="card-title text-xl font-bold tracking-tight text-base-content line-clamp-1">
                        {ideaTitle}
                    </h2>

                    {/* Short Description */}
                    <p className="text-sm text-base-content/70 mt-2 line-clamp-2 min-h-[40px]">
                        {shortDescription}
                    </p>

                    {/* Generated Dynamic Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                            {tags.map((tag, idx) => (
                                <div key={idx} className="badge badge-outline text-xs gap-1 py-2.5 text-base-content/60">
                                    <FaTag className="text-[10px]" />
                                    {tag}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Section: Budget & Details Trigger */}
                <div className="border-t border-base-200 mt-5 pt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-base-content/40">Budget</span>
                        <div className="flex items-center font-bold text-success text-base">
                            <FaDollarSign className="text-xs -mr-0.5" />
                            {estimatedBudget ? estimatedBudget.toLocaleString() : 'TBD'}
                        </div>
                    </div>

                    <button className="btn btn-neutral btn-sm rounded-full gap-2 font-medium group">
                        <Link href={`/ideas/${_id}`}>Explore</Link> 
                        <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IdeaCard;