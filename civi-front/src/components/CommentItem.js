import React, { useState } from 'react';
import { Paper, Typography, Button, Grid, IconButton } from "@mui/material";
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { postComment, postVote } from '../api';
import CommentForm from './CommentForm';
import { useTheme } from '@mui/material/styles';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return dateFormatter.format(date);
};

const CommentItem = ({ comment }) => {
  const theme = useTheme();
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
    <Grid item style={{ marginLeft: '4px' }}>
      <Paper elevation={comment.parent_comment ? 2 : 12} style={{ marginTop: '16px', padding: '16px', background: comment.parent_comment ? theme.palette.light.main : theme.palette.background.paper }}>
        <Grid container direction="column">
          <Grid item container alignItems="center">
            <Grid item xs={1}>
              <img
                src="https://via.placeholder.com/40" // Replace with user's profile photo URL
                alt={comment.created_by.username}
                style={{ borderRadius: '50%', width: '40px', height: '40px' }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1">
                {comment.created_by.username}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle2">
                {formatDate(comment.created_at)}
              </Typography>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <Button
                variant="outlined"
                size="small"
                onClick={handleReplyButtonClick}
                style={{ marginTop: '8px' }}
              >
                Reply
              </Button>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={1} style={{ textAlign: 'left' }}>
              <IconButton onClick={() => handleVoteClick(1)} size="small" style={{ marginLeft: '-8px' }}>
                <ArrowUpward fontSize="small" />
              </IconButton>
              <Typography variant="subtitle2" style={{ textAlign: 'left'}}>
                {comment.total_votes}
              </Typography>
              <IconButton onClick={() => handleVoteClick(-1)} size="small" style={{ marginLeft: '-8px' }}>
                <ArrowDownward fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item xs={11}>
              <Paper elevation={2} style={{ padding: '16px', marginBottom: '16px' }} variant="outlined">
              <Typography variant="body1">
                {comment.content}
              </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        {isReplyFormVisible && <CommentForm onSubmit={handleReplySubmit} />}
      </Paper>
    </Grid>
  );
};

export default CommentItem;