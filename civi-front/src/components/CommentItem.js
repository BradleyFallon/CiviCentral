import React, { useState } from 'react';
import { Paper, Typography, Button, Grid, IconButton } from "@mui/material";
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { postComment, postVote } from '../api';
import CommentForm from './CommentForm';


const CommentItem = ({ comment }) => {
  const [isReplyFormVisible, setIsReplyFormVisible] = useState(false);

  const handleReplyButtonClick = () => {
    setIsReplyFormVisible(!isReplyFormVisible);
  };

  const handleReplySubmit = async (replyContent) => {
    try {
      const user_id = 1; // Hardcode the user ID for now

      const replyData = {
        content: replyContent,
        created_by: user_id,
        discussion: comment.discussion,
      };

      const newReplyData = await postComment(comment.discussion, replyData, comment.id);
      console.log("Reply submitted:", newReplyData);

      setIsReplyFormVisible(false);
    } catch (error) {
      console.error(error);
    }
  };


  const handleVoteClick = async (voteType) => {
    try {
      const user_id = 1; // Hardcode the user ID for now

      const voteData = {
        user: user_id,
        vote_type: voteType,
        content_type: 'comment', // Replace 'app_name' with your actual app name
        object_id: comment.id,
      };

      const newVoteData = await postVote(voteData);
      console.log("Vote submitted:", newVoteData);

      // Update the parent component's comments list here (if needed)

    } catch (error) {
      console.error(error);
    }
  };



  return (
    <Grid item>
      {/* If there is no parent, raise the elevation value */}
      <Paper elevation={comment.parent_comment ? 2 : 12} style={{ mamrginTop: '16px' }}>
        <Typography variant="subtitle1">
          {comment.created_by.username}: {comment.content}
        </Typography>
        <IconButton onClick={() => handleVoteClick(1)} size="small">
          <ArrowUpward fontSize="small" />
        </IconButton>
        <IconButton onClick={() => handleVoteClick(-1)} size="small">
          <ArrowDownward fontSize="small" />
        </IconButton>
        <Button
          variant="outlined"
          size="small"
          onClick={handleReplyButtonClick}
          style={{ marginTop: '8px' }}
        >
          Reply
        </Button>
        <Typography variant="subtitle2">
          Total Votes: {comment.total_votes}
        </Typography>
        {isReplyFormVisible && <CommentForm onSubmit={handleReplySubmit} />}
      </Paper>
    </Grid>
  );
};

export default CommentItem;
