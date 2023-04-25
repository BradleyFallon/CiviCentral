import React, { useState } from 'react';
import { Paper, Typography, Button, Grid } from "@mui/material";
import { postComment } from '../api';
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

            // Update the parent component's comments list here (if needed)

            setIsReplyFormVisible(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Grid item>
            {/* If there is no parent, raise the elevation value */}
            <Paper elevation={comment.parent_comment ? 2 : 12} style={{mamrginTop: '16px'}}>
                <Typography variant="subtitle1">
                    {comment.created_by.username}: {comment.content}
                </Typography>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleReplyButtonClick}
                    style={{ marginTop: '8px' }}
                >
                    Reply
                </Button>
                {isReplyFormVisible && <CommentForm onSubmit={handleReplySubmit} />}
            </Paper>
        </Grid>
    );
};

export default CommentItem;
