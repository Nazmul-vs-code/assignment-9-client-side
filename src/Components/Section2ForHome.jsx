'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaChartPie, FaComments, FaSearch } from 'react-icons/fa';

const features = [
    {
        icon: <FaLightbulb />,
        title: "Concept Vaulting",
        desc: "Securely document your raw startup ideas with structured criteria fields like estimated budgets and targeted user demographics.",
        badge: "Core",
        color: "from-amber-400 to-orange-500"
    },
    {
        icon: <FaChartPie />,
        title: "Dynamic Metrics",
        desc: "Watch your collection instantly aggregate into visual pie charts, offering clear overviews of category distributions.",
        badge: "Analytics",
        color: "from-blue-500 to-indigo-600"
    },
    {
        icon: <FaSearch />,
        title: "Granular Filtering",
        desc: "Sift through entire repositories smoothly using text queries and category parameters synchronized right to the database.",
        badge: "Search",
        color: "from-cyan-500 to-teal-600"
    },
    {
        icon: <FaComments />,
        title: "Social Feedback",
        desc: "Engage with the wider network via modular client-side community comment workflows and real-time interaction modules.",
        badge: "Social",
        color: "from-purple-500 to-pink-600"
    }
];

const Section2ForHome = () => {
    return (
        <section className="py-24 px-4 max-w-6xl mx-auto overflow-hidden">
            <div className="text-center mb-16">
                <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
                    System Architecture
                </span>
                <h2 className="font-black text-4xl md:text-5xl text-base-content tracking-tight">
                    Engineered Features
                </h2>
                <div className="w-16 h-1.5 bg-primary rounded-full mt-4 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
                        whileHover={{ y: -6 }}
                        className="bg-base-100 border border-base-200 shadow-xl rounded-3xl p-6 md:p-8 flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl"
                    >
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                {/* Gradient Icon Container */}
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.color} text-white flex items-center justify-center text-xl shadow-md transition-transform duration-300 group-hover:scale-110`}>
                                    {feat.icon}
                                </div>
                                <span className="badge badge-sm badge-outline font-semibold uppercase tracking-wider text-base-content/40 px-2.5 py-3 group-hover:border-primary group-hover:text-primary transition-colors">
                                    {feat.badge}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-base-content mb-2 group-hover:text-primary transition-colors">
                                {feat.title}
                            </h3>
                            <p className="text-sm text-base-content/60 leading-relaxed">
                                {feat.desc}
                            </p>
                        </div>

                        <div className="pt-4 mt-6 border-t border-base-100/60 flex items-center justify-end">
                            <span className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                View Module &rarr;
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Section2ForHome;