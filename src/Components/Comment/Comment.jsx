import React, { useState, useEffect, useCallback } from 'react';
import styles from './Comment.module.css'; // Đảm bảo bạn có file CSS này để định kiểu
import { formatDistanceToNow } from 'date-fns'; // Thư viện format ngày tháng, có thể cài đặt bằng `npm install date-fns`
import Rating from '../Rating/Rating';
const CommentSection = ({ movieId, userId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Hàm lấy danh sách bình luận từ API
  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/comments?movieId=${movieId}`);
      const data = await response.json();
      console.log("Fetched comments:", data); // Debugging
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [movieId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Hàm thêm bình luận mới
  const handleAddComment = async () => {
    if (!newComment.trim()) return; // Không cho phép bình luận rỗng

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId, userId, content: newComment }),
      });

      if (response.ok) {
        fetchComments();
        setNewComment('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Hàm xóa bình luận
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // Hàm chỉnh sửa bình luận
  const handleEditComment = async (commentId, updatedContent) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: updatedContent }),
      });

      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  return (
    <div className={styles.commentsection}>
      <h3>Comments</h3>

      {/* Hiển thị danh sách bình luận */}
      <div className={styles.commentlist}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.commentitem}>
            <p>
              <strong>{comment.username}:</strong> {comment.content}
            </p>
            <p className={styles.commentdate}>
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </p>
            {comment.userId === userId && (
              <div className={styles.commentactions}>
                <button
                  onClick={() => {
                    const updatedContent = prompt('Edit your comment:', comment.content);
                    if (updatedContent) {
                      handleEditComment(comment.id, updatedContent);
                    }
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Ô nhập bình luận mới */}
      <div className={styles.add_comment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <div className='displayRightRating'>
          <Rating />
        </div>
        <button onClick={handleAddComment}>Post Comment</button>
      </div>
    </div>
  );
};

export default CommentSection;
