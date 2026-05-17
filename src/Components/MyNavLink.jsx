"use client"; // Required because usePathname works on the client-side

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const MyNavLink = ({ href, children }) => {
    const pathname = usePathname();
    
    // Checks if the current browser route matches this specific link's target path
    const isActive = pathname === href;

    return (
        <li>
            <Link 
                href={href} 
                className={`transition-colors duration-200 ${
                    isActive 
                        ? 'text-primary font-bold bg-base-200/60 lg:bg-transparent' // Active Styles
                        : 'text-base-content/80 hover:text-primary' // Inactive/Hover Styles
                }`}
            >
                {children}
            </Link>
        </li>
    );
};

export default MyNavLink;