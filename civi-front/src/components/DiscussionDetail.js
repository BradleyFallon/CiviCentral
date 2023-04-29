import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper } from "@mui/material";
import { getDiscussionById, getCommentsByDiscussionId, postComment } from '../api';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const DiscussionDetail = () => {
  const { id: discussionId } = useParams();
  const [discussion, setDiscussion] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        const discussionData = await getDiscussionById(discussionId);
        setDiscussion(discussionData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDiscussion();
  }, [discussionId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getCommentsByDiscussionId(discussionId);
        setComments(commentsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [discussionId]);

  const handleCommentSubmit = async (newComment) => {
    try {
      const user_id = 1; // Hardcode the user ID for now

      const commentData = {
        content: newComment,
        created_by: user_id,
        discussion: discussionId,
      };
      console.log('Comment data:', commentData);
      const newCommentData = await postComment(discussionId, commentData);
      setComments([...comments, newCommentData]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md">
      
      <Paper elevation={12} style={{ padding: '16px', marginBottom: '16px', /*var(--civi-bright)*/ background: '#c4faf5' }}>
      <h1>{discussion.title}</h1>
      <Paper elevation={2} style={{ padding: '16px', marginBottom: '16px' }}>
      <p>{discussion.description}</p>
      </Paper>
      <p>Created by: {discussion.created_by?.username}</p>
      </Paper>

      <CommentForm onSubmit={handleCommentSubmit} />

      <h3>Comments</h3>
      <CommentList comments={comments} />
    </Container>
  );
};
export default DiscussionDetail;
