import React, { useState, useEffect, useCallback } from 'react';
import styles from './Comment.module.css'; // Đảm bảo bạn có file CSS này để định kiểu
import { formatDistanceToNow } from 'date-fns'; // Thư viện format ngày tháng
import { FaEllipsisV, FaPen, FaRegTrashAlt , FaMinus,FaCheck } from 'react-icons/fa'; // Import biểu tượng ba chấm
import Rating from '../Rating/Rating';

const CommentSection = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userId, setUserId] = useState(null); // Khởi tạo state cho userId
  const [showOptions, setShowOptions] = useState(null); // State cho hiển thị tùy chọn
  const [editingCommentId, setEditingCommentId] = useState(null); // State để lưu id của comment đang được chỉnh sửa
  const [editingContent, setEditingContent] = useState(''); // State để lưu nội dung khi chỉnh sửa

  // Lấy userId và username từ localStorage khi component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Get the full user object
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id); // Set userId từ user object
    }
  }, []);

  const fetchComments = useCallback(async () => {
    if (!movieId) {
      console.error('movieId is undefined or null');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/comments?movieId=${movieId}`);
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
  }, [movieId]);

  useEffect(() => {
    fetchComments(); // Fetch comments khi component mount
  }, [fetchComments]);

  // Hàm thêm bình luận mới
  const handleAddComment = async () => {
    if (!newComment.trim()) return; // Ngăn chặn bình luận rỗng

    const storedUser = JSON.parse(localStorage.getItem('user')); // Lấy user từ localStorage
    const username = storedUser ? storedUser.username : 'Unknown'; // Lấy tên người dùng

    try {
      const response = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          movieId,
          userId,
          username,
          content: newComment,
        }),
      });

      if (response.ok) {
        fetchComments(); // Làm mới bình luận sau khi thêm
        setNewComment(''); // Xóa ô nhập
      } else {
        const errorData = await response.json();
        console.error('Failed to add comment:', errorData); // Ghi log thông tin lỗi
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Hàm xóa bình luận
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchComments(); // Làm mới danh sách bình luận
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // Hàm chỉnh sửa bình luận
  const handleEditComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editingContent }),
      });

      if (response.ok) {
        setEditingCommentId(null); // Đóng chế độ chỉnh sửa sau khi lưu
        fetchComments(); // Làm mới danh sách bình luận
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
          <div key={comment._id} className={styles.commentitem}>
            <div className={styles.commentContent}>
              <strong>{comment.username}</strong>

              {editingCommentId === comment._id ? (
                // Nếu đang ở chế độ chỉnh sửa, hiển thị ô nhập liệu
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className={styles.editingInput}
                />
              ) : (
                // Nếu không, hiển thị nội dung bình luận
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
              {/* Hiển thị tùy chọn nếu userId khớp */}
              {showOptions === comment._id && (
                <>
                  {userId && comment.userId === userId ? (
                    <div className={styles.options}>
                      {editingCommentId === comment._id ? (
                        <>
                          <button onClick={() => handleEditComment(comment._id)}><FaCheck/></button>
                          <button onClick={() => setEditingCommentId(null)}><FaMinus/></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => {
                            setEditingCommentId(comment._id);
                            setEditingContent(comment.content); // Đặt nội dung hiện tại để chỉnh sửa
                          }}><FaPen/></button>
                          <button onClick={() => handleDeleteComment(comment._id)}><FaRegTrashAlt/></button>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className={styles.timeOnly}>
                      {/* Chỉ hiển thị thời gian nếu không phải là chủ sở hữu comment */}
                      <span>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
  
      {/* Ô nhập bình luận mới */}
      {userId ? (
        <div className={styles.add_comment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className={styles.commentInput}
          />
          <div className='displayRightRating'>
            <Rating />
          </div>
          <button onClick={handleAddComment}>Post Comment</button>
        </div>
      ) : (
        <p>Please log in to post a comment.</p> // Thông báo nếu chưa đăng nhập
      )}
    </div>
  );
};

export default CommentSection;
