'use client'; 

import React, { useState, useEffect } from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from 'recharts';

const COLOR_PALETTE = ['#2563EB', '#7C3AED', '#059669', '#DB2777', '#06B6D4', '#EA580C', '#F59E0B', '#64748B'];

export default function CategoryCharts({ isAnimationActive = true }) {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/ideas`)
            .then(res => res.json())
            .then(ideas => {
                const counts = {};
                
                // Count occurrences of each category simply
                ideas.forEach(idea => {
                    const cat = idea.category || 'Uncategorized';
                    counts[cat] = (counts[cat] || 0) + 1;
                });

                // Map straight into array format for Recharts
                const formatted = Object.keys(counts).map((name, idx) => ({
                    name,
                    value: counts[name],
                    fill: COLOR_PALETTE[idx % COLOR_PALETTE.length]
                }));

                setChartData(formatted);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-10 text-xs text-base-content/50">Loading chart...</div>;

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto p-4 bg-base-100 border border-base-200 shadow-sm rounded-2xl">
            {/* Pie Chart Canvas */}
            <div style={{ width: '100%', aspectRatio: 1, maxWidth: '280px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Tooltip />
                        <Pie
                            data={chartData}
                            innerRadius="75%"
                            outerRadius="100%"
                            cornerRadius={6}
                            paddingAngle={4}
                            dataKey="value"
                            isAnimationActive={isAnimationActive}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Simplified Legend Grid Below */}
            <div className="w-full mt-6 pt-4 border-t border-base-200">
                <div className="grid grid-cols-2 gap-3">
                    {chartData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs font-medium text-base-content/80">
                            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                            <span className="truncate">
                                {item.name} <span className="opacity-40">({item.value})</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}