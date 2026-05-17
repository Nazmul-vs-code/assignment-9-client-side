import React from 'react';

const Loading = () => {
    return (
        <div className="min-h-[400px] w-full flex flex-col items-center justify-center gap-3">
            {/* DaisyUI Loading Spinner Element */}
            <span className="loading loading-spinner loading-lg text-primary"></span>
            
            {/* Optional friendly text */}
            <p className="text-base-content/70 font-medium tracking-wide text-sm animate-pulse">
                Securing the vault...
            </p>
        </div>
    );
};

export default Loading;