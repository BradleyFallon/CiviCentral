import React, { useState } from 'react';
import { TextField, Button, Grid } from "@mui/material";

const CommentForm = ({ onSubmit }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    onSubmit(newComment);
    setNewComment('');
  };

  return (
    <form onSubmit={handleCommentSubmit} style={{ marginTop: '16px' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={10}>
          <TextField
            fullWidth
            id="newComment"
            label="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CommentForm;
