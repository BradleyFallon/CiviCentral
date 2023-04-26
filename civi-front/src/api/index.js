import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

export const getUsers = async () => {
    const response = await axios.get(`${API_BASE_URL}users/`);
    return response.data;
};

export const postVote = async (voteData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}vote`, voteData);
    return response.data;
  } catch (error) {
    console.error("Error posting vote:", error);
    throw error;
  }
};

export const getDiscussions = async () => {
    const response = await axios.get(`${API_BASE_URL}discussions/`);
    return response.data;
};

export const getDiscussionById = async (discussionId) => {
    const response = await axios.get(`${API_BASE_URL}discussions/${discussionId}/`);
    return response.data;
};

export const getCommentsByDiscussionId = async (discussionId) => {
    const response = await axios.get(`${API_BASE_URL}discussions/${discussionId}/comments/`);
    return response.data;
};

export const postComment = async (discussionId, commentData, parentCommentId) => {
    try {
        const payload = {
            ...commentData,
            ...(parentCommentId && { parent_comment: parentCommentId }),
        };

        const response = await axios.post(
            `${API_BASE_URL}discussions/${discussionId}/comments/create/`,
            JSON.stringify(payload),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
