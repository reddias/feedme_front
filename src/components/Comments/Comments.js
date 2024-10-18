import React, {useState} from 'react';
import {createComment} from '../../api/comments';
import './comments.css';

const Comments = ({comments, recipeId}) => {
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        await createComment(recipeId, newComment);
        setNewComment('');
    };

    return (
        <div className="new-comments-section">
            <h3>Comments ({comments.length})</h3>

            <div className="comment-input">
                <input
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment..."
                />
                <button onClick={handleCommentSubmit}>Submit</button>
            </div>


            {/* List of Comments */}
            <ul className="new-comments-list">
                {[...comments].reverse().map((comment, index) => (
                    <li key={index} className="new-comment-item">
                        <div className="new-comment-user-photo">
                            {comment.user.photo_url ? (
                                <img src={comment.user.photo_url} />
                            ) : (
                                <div className="new-no-photo"></div>
                            )}
                        </div>
                        <div className="new-comment-content">
                            <span className="new-comment-author">{comment.user.full_name}</span>
                            <p className="new-comment-text">{comment.message}</p>
                        </div>
                        <span className="new-comment-time">{comment.created_at}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
