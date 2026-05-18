"use client";

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart, FaCommentAlt, FaPaperPlane, FaEllipsisV, FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import DeleteModal from './DeleteModal';
import UpdateCommentModal from './UpdateCommentModal';



const IdeaInteractionsAndComments = ({ ideaId }) => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    // console.log(user , ' user in comment ')


    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    // Normal storage array for your fetched comments
    const [comments, setComments] = useState([]);

    // Normal fetching on component load
    useEffect(() => {
        if (!ideaId) return;

        fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/comments?ideaId=${ideaId}`)
            .then(res => res.json())
            .then(data => setComments(data))
            .catch(err => console.error("Error fetching comments:", err));
    }, [ideaId]);

    // Simple submission capturing raw values natively via FormData
    const handleAddComment = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const text = formData.get("commentText")?.trim();

        if (!text) return;

        const myComment = {
            id: Date.now(),
            ideaId: ideaId,
            name: user?.name,
            authorId: user?.id,
            userImage: user?.image,
            text: text,
            currentDate: new Date().toISOString()
        };

        // console.log(myComment, " COMMENT DATA ");
        e.currentTarget.reset();

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/add-comments`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(myComment)

        })
        const data = await res.json()


        if (data.acknowledged) {
            window.location.reload();
        }
    };

    // Delete comment functionalities 


    return (
        <div className="bg-base-100 border border-base-200 rounded-2xl shadow-sm overflow-hidden">

            {/* Quick Action Interaction Ribbon */}
            <div className="p-4 border-b border-base-200 flex items-center justify-around bg-base-50/50">
                <button
                    onClick={() => { setIsLiked(!isLiked); setLikeCount(isLiked ? likeCount - 1 : likeCount + 1); }}
                    className={`flex items-center gap-2 font-semibold text-sm btn btn-ghost btn-sm rounded-xl px-4 ${isLiked ? 'text-red-500 bg-red-50' : 'text-base-content/70'}`}
                >
                    {isLiked ? <FaHeart className="text-base" /> : <FaRegHeart className="text-base" />}
                    <span>{likeCount} Likes</span>
                </button>
                <div className="flex items-center gap-2 font-semibold text-sm text-base-content/70 btn btn-ghost btn-sm rounded-xl pointer-events-none">
                    <FaCommentAlt className="text-base text-primary/80" />
                    <span>{comments.length} Comments</span>
                </div>
            </div>

            {/* Comments Stream Wrapper */}
            <div className="p-4 space-y-4 max-h-[380px] overflow-y-auto bg-base-100">
                {comments.length === 0 ? (
                    <div className="text-center py-8 px-4">
                        <FaCommentAlt className="text-3xl text-base-content/20 mx-auto mb-2" />
                        <p className="text-sm font-medium text-base-content/50">No feedback yet</p>
                        <p className="text-xs text-base-content/40 mt-0.5">Be the first to share your thoughts!</p>
                    </div>
                ) : (
                    comments.map((item, index) => (
                        <div key={item._id || index} className="flex gap-3 items-start group">

                            <div className="avatar">
                                <div className="w-8 h-8 rounded-full">
                                    <img src={item?.userImage} alt={item?.name} />
                                </div>
                            </div>

                            <div className="flex-grow min-w-0 bg-base-200/60 rounded-2xl px-3 py-2 relative">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-bold text-xs text-base-content">{item?.name}</span>

                                    <span className="text-[30%]">{item?.currentDate}</span>

                                    {/* Edit and Delete Action UI dropdown elements */}
                                    <div className="dropdown dropdown-end dropdown-bottom">
                                        <div tabIndex={0} role="button" className="p-1 text-base-content/40 hover:text-base-content opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <FaEllipsisV className="text-xs" />
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content menu p-1 shadow-md bg-base-100 rounded-xl w-28 z-[10] border border-base-200 text-xs">
                                            <li>
                                                {/* Trigger Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => document.getElementById(`edit_modal_${item.id}`).showModal()}
                                                    className="py-2 gap-2 text-base-content w-full text-left flex items-center"
                                                >
                                                    Edit
                                                </button>

                                                {/* Simple Modal Instance */}
                                                <UpdateCommentModal
                                                
                                                    modalId={`edit_modal_${item.id}`}
                                                    commentId={item.id}
                                                    initialText={item.text}
                                                />
                                            </li>
                                            <li>
                                                {/* 1. Trigger Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => document.getElementById(`delete_modal_${item.id}`).showModal()}
                                                    className="py-2 gap-2 text-error hover:bg-error/10 w-full text-left flex items-center"
                                                >
                                                    <FaTrash /> Delete
                                                </button>

                                                {/* 2. Modal Component Instance */}
                                                <DeleteModal
                                                    commentId={item.id}
                                                    modalId={`delete_modal_${item.id}`}
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <p className="text-sm text-base-content/90 mt-0.5 break-words leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Comment Form Sticky Footer */}
            <form onSubmit={handleAddComment} className="p-3 bg-base-200/50 border-t border-base-200 flex gap-2 items-center">
                <input
                    type="text"
                    name="commentText"
                    placeholder="Share your thoughts on this idea..."
                    className="input input-sm input-bordered flex-grow bg-base-100 rounded-xl"
                    required
                />
                <button type="submit" className="btn btn-primary btn-sm btn-square rounded-xl text-white">
                    <FaPaperPlane className="text-xs" />
                </button>
            </form>

        </div>
    );
};

export default IdeaInteractionsAndComments;