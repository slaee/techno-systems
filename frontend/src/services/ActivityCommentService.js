import axios from 'axios';
import apiConfig from './config';
import { api } from './axiosConfig';


///TODO: change this if okay na 
const ACTIVITY_COMMENT_BASE_URL = `http://127.0.0.1:8000/activity-comments`;

const ActivityCommentService = {
	/// POST /activity-comments
	/*
    data: {
        "user_id": 1,
        "activity_id": 1,
        "comment": "This is a test comment"
    }
    */
	addComment: (data) => api.post(`${ACTIVITY_COMMENT_BASE_URL}`, data),

	/// PUT /activity-comments/{id}
	/*
    data: {
        "user_id": 1,
        "activity_id": 1,
        "comment": "This is an updated test comment"
    }
    */
	updateComment: (id, data) => api.put(`${ACTIVITY_COMMENT_BASE_URL}/${id}`, data),

	/// DELETE /activity-comments/{id}
	deleteComment: (id) => api.delete(`${ACTIVITY_COMMENT_BASE_URL}/${id}`),

	/// GET /activity-comments/activities/{id}
	getAllCommentsForActivity: (id) =>
		api.get(`${ACTIVITY_COMMENT_BASE_URL}/activities/${id}`),

	/// GET /activity-comments
	listAllCommentsForActivity: () => api.get(`${ACTIVITY_COMMENT_BASE_URL}`),
};

export default ActivityCommentService;
