"use client";

import React, { useState } from 'react';
import { FaRegHeart, FaHeart, FaCommentAlt, FaPaperPlane, FaEllipsisV, FaTrash, FaEdit } from 'react-icons/fa';

const IdeaInteractionsAndComments = ({ ideaId }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0); // Set baseline metrics to 0

    // FIXED: Removed the mock default comments array to start completely fresh
    const [comments, setComments] = useState([]);
    
    const [newCommentText, setNewCommentText] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText, setEditText] = useState("");

    // Submit actions handler
    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newCommentText.trim()) return;

        const newComment = {
            id: Date.now(),
            user: "You (Creator)",
            avatar: "https://i.pravatar.cc/100?img=12",
            text: newCommentText,
            isOwn: true
        };
        setComments([...comments, newComment]);
        setNewCommentText("");
    };

    // Save modified changes
    const handleSaveEdit = (id) => {
        setComments(comments.map(c => c.id === id ? { ...c, text: editText } : c));
        setEditingCommentId(null);
        setEditText("");
    };

    // Delete handling
    const handleDeleteComment = (id) => {
        setComments(comments.filter(c => c.id !== id));
    };

    return (
        <div className="bg-base-100 border border-base-200 rounded-2xl shadow-sm overflow-hidden">
            
            {/* Quick Action Interaction Counter Ribbon */}
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
                {/* FIXED: Conditional render for when the comment section is empty */}
                {comments.length === 0 ? (
                    <div className="text-center py-8 px-4">
                        <FaCommentAlt className="text-3xl text-base-content/20 mx-auto mb-2" />
                        <p className="text-sm font-medium text-base-content/50">No feedback yet</p>
                        <p className="text-xs text-base-content/40 mt-0.5">Be the first to share your thoughts!</p>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3 items-start group">
                            
                            {/* User Profile Avatar */}
                            <div className="avatar">
                                <div className="w-8 h-8 rounded-full">
                                    <img src={comment.avatar} alt={comment.user} />
                                </div>
                            </div>

                            {/* Comment Core Speech Bubble layout */}
                            <div className="flex-grow min-w-0 bg-base-200/60 rounded-2xl px-3 py-2 relative">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-bold text-xs text-base-content">{comment.user}</span>
                                    
                                    {/* Only Render Edit/Delete controls if it's the owner's comment */}
                                    {comment.isOwn && (
                                        <div className="dropdown dropdown-end dropdown-bottom">
                                            <div tabIndex={0} role="button" className="p-1 text-base-content/40 hover:text-base-content opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                                <FaEllipsisV className="text-xs" />
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content menu p-1 shadow-md bg-base-100 rounded-xl w-28 z-[10] border border-base-200 text-xs">
                                                <li>
                                                    <button onClick={() => { setEditingCommentId(comment.id); setEditText(comment.text); }} className="py-2 gap-2 text-base-content">
                                                        <FaEdit /> Edit
                                                    </button>
                                                </li>
                                                <li>
                                                    <button onClick={() => handleDeleteComment(comment.id)} className="py-2 gap-2 text-error hover:bg-error/10">
                                                        <FaTrash /> Delete
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Conditional Display: Standard message vs Edit Mode Form Field */}
                                {editingCommentId === comment.id ? (
                                    <div className="mt-1 space-y-1.5">
                                        <textarea 
                                            className="textarea textarea-bordered textarea-xs w-full bg-base-100" 
                                            value={editText} 
                                            onChange={(e) => setEditText(e.target.value)}
                                        />
                                        <div className="flex justify-end gap-1">
                                            <button onClick={() => setEditingCommentId(null)} className="btn btn-ghost btn-xs rounded-md">Cancel</button>
                                            <button onClick={() => handleSaveEdit(comment.id)} className="btn btn-primary btn-xs rounded-md px-3">Save</button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-base-content/90 mt-0.5 break-words leading-relaxed">
                                        {comment.text}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Comment Bottom Input Field Sticky Footer */}
            <form onSubmit={handleAddComment} className="p-3 bg-base-200/50 border-t border-base-200 flex gap-2 items-center">
                <input 
                    type="text" 
                    placeholder="Share your thoughts on this idea..." 
                    className="input input-sm input-bordered flex-grow bg-base-100 rounded-xl"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                />
                <button type="submit" className="btn btn-primary btn-sm btn-square rounded-xl text-white">
                    <FaPaperPlane className="text-xs" />
                </button>
            </form>

        </div>
    );
};

export default IdeaInteractionsAndComments;