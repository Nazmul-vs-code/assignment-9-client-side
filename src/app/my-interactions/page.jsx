import IdeaCard from '@/components/IdeaCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const MyInterActionPage = async () => {

    const session = await auth.api.getSession(
        {
            headers: await headers()
        }
    )
    const user = session?.user;


    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    // console.log(token, ' token my interactiosn ')

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/my-interactions?authorId=${user.id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    const myIdeaData = await res.json();

    return (
        <div className='p-10 flex flex-col gap-2.5'>
            <h2 className="text-primary border-b-2 font-semibold text-3xl md:text-3xl tracking-tight">
                My Interactions
            </h2>

            {myIdeaData.length === 0 ? (
                <div className="alert alert-warning shadow-sm rounded-box max-w-md">
                    <span>No trending ideas found at this time. Check back later!</span>
                </div>
            ) : (
                /* The Grid Configuration requested: 1 column on mobile, 2 on medium displays, 3 on large screens */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myIdeaData.map((idea) => (
                        // Always use a unique key string when rendering item arrays in React
                        <IdeaCard key={idea._id || idea.ideaTitle} idea={idea} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyInterActionPage;