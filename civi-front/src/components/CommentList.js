import React, { useState } from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import CommentItem from './CommentItem';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CommentList = ({ comments }) => {
  const [hiddenReplies, setHiddenReplies] = useState({});

  const toggleReplies = (commentId) => {
    setHiddenReplies({
      ...hiddenReplies,
      [commentId]: !hiddenReplies[commentId],
    });
  };

  const countReplies = (comment) => {
    const childComments = comments.filter(
      (childComment) => childComment.parent_comment === comment.id
    );

    let count = childComments.length;
    childComments.forEach((childComment) => {
      count += countReplies(childComment);
    });

    return count;
  };

  const renderComment = (comment, level = 0) => {
    const childComments = comments.filter(
      (childComment) => childComment.parent_comment === comment.id
    );

    const showReplies = !hiddenReplies[comment.id];
    const replyCount = countReplies(comment);

    return (
      <React.Fragment key={comment.id}>
        <Grid item style={{ paddingTop: '16px' }}>
          <CommentItem comment={comment} />
        </Grid>

        <div style={{marginLeft: '24px',borderLeft: '1px solid #ccc',}}>
          {childComments.length > 0 && (
            <div style={{ marginBottom: '-16px' }}>
              <IconButton
                size="small"
                onClick={() => toggleReplies(comment.id)}
              >
                {showReplies ? <Visibility /> : <VisibilityOff />}
              </IconButton>
              <Typography variant="caption" display="inline">
                {replyCount} replies
              </Typography>
            </div>
          )}
          <div style={{ marginTop: '0px' }}>
          {showReplies &&
            childComments.map((childComment) =>
              renderComment(childComment, level + 1)
            )}
            </div>
        </div>
      </React.Fragment>
    );
  };

  const topLevelComments = comments.filter(
    (comment) => !comment.parent_comment
  );

  return (
    <Grid container direction="column">
      {topLevelComments.map((comment) => renderComment(comment))}
    </Grid>
  );
};

export default CommentList;
