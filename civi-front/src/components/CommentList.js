import React from 'react';
import { Grid } from '@mui/material';
import CommentItem from './CommentItem';

const CommentList = ({ comments }) => {
  const renderComment = (comment, level = 0) => {
    const childComments = comments.filter(
      (childComment) => childComment.parent_comment === comment.id
    );

    return (
      <React.Fragment key={comment.id}>

        <grid item style={{paddingTop: '16px'}}>
        <CommentItem comment={comment} />
        </grid>
          
        <div style={{marginLeft: '16px', borderLeft: '1px solid #ccc', paddingTop: '8px'}}>
          {childComments.map((childComment) => renderComment(childComment, level + 1))}
          </div>

      </React.Fragment>
    );
  };

  const topLevelComments = comments.filter((comment) => !comment.parent_comment);

  return (
    <Grid container direction="column">
      {topLevelComments.map((comment) => renderComment(comment))}
    </Grid>
  );
};

export default CommentList;



