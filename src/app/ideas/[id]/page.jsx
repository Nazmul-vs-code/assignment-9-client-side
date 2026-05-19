import React, { cache } from 'react';
import { FaDollarSign, FaUsers, FaExclamationTriangle, FaCheckCircle, FaCalendarAlt, FaLock } from 'react-icons/fa';
import IdeaInteractionsAndComments from '@/Components/IdeaInteractionsAndComments';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const IdeaDetailsPage = async ({ params }) => {
    const { id } = await params;
    const {token} = await auth.api.getToken({
        headers: await headers()
    })

    // const tokendata = await token;
    // console.log(token , ' token in details page')

    const fetchDetails = await fetch(`${process.env.SERVER_URI}/ideas/${id}` , {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
 );
    // console.log(fetchDetails.status , ' status ')

    const data = await fetchDetails.json();

    if (fetchDetails.status === 401) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-base-100 border border-base-200 p-8 rounded-3xl shadow-xl text-center space-y-5">
                    <div className="w-16 h-16 bg-error/10 text-error rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-sm">
                        <FaLock />
                    </div>
                    <div>
                        <h3 className="font-extrabold text-2xl text-base-content tracking-tight">
                            Access Restricted
                        </h3>
                        <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
                            Your secure backend middleware blocked this request. Please log in with an authorized session account to view these vision vault metrics.
                        </p>
                    </div>
                    <div className="pt-2">
                        <a href="/login" className="btn btn-primary btn-block rounded-xl font-bold shadow-md">
                            Go to Login
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    if (!data || data.message) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <div className="alert alert-error max-w-md shadow-md">
                    <span>Idea details could not be found. Please try again later.</span>
                </div>
            </div>
        );
    }

    // --- SAFELY PARSE TAGS REGARDLESS OF MONGO DATA TYPE ---
    const tags = Array.isArray(data.tags) 
        ? data.tags 
        : (typeof data.tags === 'string' && data.tags.trim() !== '') 
            ? data.tags.split(',').map(t => t.trim()).filter(t => t !== '') 
            : [];

    return (
        <div className="py-10 max-w-6xl mx-auto px-4">
            {/* Top Back/Category Navigation Bar */}
            <div className="flex items-center gap-2 text-sm text-base-content/60 mb-6">
                <span className="badge badge-primary font-medium">{data.category}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-xs" />
                    <span>Vaulted Recently</span>
                </div>
            </div>

            {/* Main Section Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Left Side: Full Pitch Presentation (Takes 2 columns) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header Details */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-base-content tracking-tight">
                            {data.ideaTitle}
                        </h1>
                        <p className="text-lg text-base-content/70 mt-3 leading-relaxed font-medium">
                            {data.shortDescription}
                        </p>
                    </div>

                    {/* Banner Image */}
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-base-200">
                        <img 
                            src={data.imageURL || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"} 
                            alt={data.ideaTitle} 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Detailed Pitch Section */}
                    <div className="bg-base-100 border border-base-200 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold border-b border-base-200 pb-3 mb-4">
                            The Deep Dive
                        </h3>
                        <p className="text-base-content/80 leading-relaxed whitespace-pre-line">
                            {data.detailedDescription}
                        </p>
                    </div>

                    {/* Problem vs Solution Split Panels */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-error/5 border border-error/20 p-5 rounded-2xl">
                            <h4 className="flex items-center gap-2 font-bold text-error text-lg mb-2">
                                <FaExclamationTriangle className="text-base" /> The Problem
                            </h4>
                            <p className="text-sm text-base-content/80 leading-relaxed">
                                {data.problemStatement}
                            </p>
                        </div>
                        <div className="bg-success/5 border border-success/20 p-5 rounded-2xl">
                            <h4 className="flex items-center gap-2 font-bold text-success text-lg mb-2">
                                <FaCheckCircle className="text-base" /> The Solution
                            </h4>
                            <p className="text-sm text-base-content/80 leading-relaxed">
                                {data.proposedSolution}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Metadata Vault Metrics & Live Interactive Feedback System */}
                <div className="space-y-6 lg:sticky lg:top-24">
                    {/* Core Metric Cards */}
                    <div className="bg-base-200 border border-base-300 rounded-2xl p-5 space-y-4">
                        <h3 className="font-bold text-sm uppercase tracking-wider text-base-content/50">
                            Vault Metrics
                        </h3>

                        {/* Budget Status */}
                        <div className="flex items-center gap-4 bg-base-100 p-3 rounded-xl border border-base-300/60">
                            <div className="p-3 bg-success/10 text-success rounded-lg text-xl">
                                <FaDollarSign />
                            </div>
                            <div>
                                <span className="text-xs text-base-content/50 block">Estimated Budget</span>
                                <span className="font-bold text-base-content text-lg">
                                    ${data.estimatedBudget ? data.estimatedBudget.toLocaleString() : 'TBD'}
                                </span>
                            </div>
                        </div>

                        {/* Target Audience status */}
                        <div className="flex items-center gap-4 bg-base-100 p-3 rounded-xl border border-base-300/60">
                            <div className="p-3 bg-info/10 text-info rounded-lg text-xl">
                                <FaUsers />
                            </div>
                            <div className="min-w-0">
                                <span className="text-xs text-base-content/50 block">Target Audience</span>
                                <span className="font-semibold text-base-content text-sm block truncate">
                                    {data.targetAudience}
                                </span>
                            </div>
                        </div>

                        {/* Tag Cloud using the cleaned tags array */}
                        {tags.length > 0 && (
                            <div className="pt-2">
                                <span className="text-xs font-semibold text-base-content/40 block mb-2">Tags</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {tags.map((tag, idx) => (
                                        <span key={idx} className="badge badge-sm badge-outline py-2.5 text-base-content/70">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Interactive Comments & Actions Wrapper (Client Container) */}
                    <IdeaInteractionsAndComments ideaId={id} />

                </div>
            </div>
        </div>
    );
};

export default IdeaDetailsPage;