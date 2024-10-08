import React, { useState, useEffect, useCallback } from 'react';
import styles from './Comment.module.css';
import { formatDistanceToNow } from 'date-fns';
import { FaEllipsisV, FaPen, FaRegTrashAlt, FaMinus, FaCheck } from 'react-icons/fa';
import { } from 'bad-words';


const CommentSection = ({ movieId, title }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showOptions, setShowOptions] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  const token = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser ? storedUser.id : null;
  const username = storedUser ? storedUser.username : 'Unknown';

  // Khởi tạo bộ lọc bad-words
  
  const badWords = ['chó', 'khùng', 'xấu', 'bẩn', 'ngu']
  const isProfane = (text) => {
    return badWords.some((word) => text.toLowerCase().includes(word));
  };
  const fetchComments = useCallback(async () => {
    if (!movieId) {
      console.error('movieId is undefined or null');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/comments/get?movieId=${movieId}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setComments(data);
      } else {
        console.error('Fetched data is not an array:', data);
        setComments([]);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
    console.log('Received movieId:', movieId);

  }, [movieId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Add new comment
  const handleAddComment = async () => {
    if (!token || !userId) {
      alert('Please log in to post a comment.');
      return;
    }

    // Kiểm tra comment có chứa từ ngữ không phù hợp
    if (isProfane(newComment)) {
      alert('Bình luận của bạn chứa từ ngữ không phù hợp. Vui lòng sửa lại.');
      return;
    }
    

    if (!newComment.trim()) return; // Prevent empty comments

    try {
      const response = await fetch('http://localhost:5000/api/comments/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          movieId,
          userId,
          username,
          content: newComment,
          // title,
        }),
      });

      if (response.ok) {
        fetchComments();
        setNewComment('');
      } else {
        const errorData = await response.json();
        console.error('Failed to add comment:', errorData);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }console.log('fetchComments')
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/comments/delete/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // Edit comment
  const handleEditComment = async (commentId) => {
    if (!token) return;

    // Kiểm tra nội dung chỉnh sửa có chứa từ cấm
    if (isProfane(editingContent)) {
      alert('Bình luận chứa từ cấm');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/comments/edit/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editingContent }),
      });

      if (response.ok) {
        setEditingCommentId(null);
        fetchComments();
      }
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  return (
    <div className={styles.commentsection}>
      <h3>Comments</h3>

      <div className={styles.commentlist}>
        {comments.map((comment) => (
          <div key={comment._id} className={styles.commentitem}>
            <div className={styles.commentContent}>
              <strong>{comment.username}</strong>

              {editingCommentId === comment._id ? (
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className={styles.editingInput}
                />
              ) : (
                <p>{comment.content}</p>
              )}
            </div>
            <div className={styles.commentFooter}>
              <span className={styles.commentDate}>
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </span>
              <span
                className={styles.optionsIcon}
                onClick={() => setShowOptions(showOptions === comment._id ? null : comment._id)}
              >
                <FaEllipsisV />
              </span>
              {showOptions === comment._id && userId && comment.userId === userId && (
                <div className={styles.options}>
                  {editingCommentId === comment._id ? (
                    <>
                      <button onClick={() => handleEditComment(comment._id)}><FaCheck /></button>
                      <button onClick={() => setEditingCommentId(null)}><FaMinus /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => {
                        setEditingCommentId(comment._id);
                        setEditingContent(comment.content);
                      }}><FaPen /></button>
                      <button onClick={() => handleDeleteComment(comment._id)}><FaRegTrashAlt /></button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {userId ? (
        <div className={styles.add_comment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className={styles.commentInput}
          />
          <button onClick={handleAddComment}>Post Comment</button>
        </div>
      ) : (
        <p>Please log in to post a comment.</p>
      )}
    </div>
  );
};

export default CommentSection;
