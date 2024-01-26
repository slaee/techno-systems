import axios from 'axios';
import apiConfig from './config';
import { api } from './axiosConfig';


///TODO: change this if okay na 
const CLASS_BASE_URL = `http://127.0.0.1:8000/classes`;
const AWA_BASE_URL = `http://127.0.0.1:8000/activity-work-attachments`;
const AC_BASE_URL = `http://127.0.0.1:8000/activity-comments`;

const ActivityService = {
	/// GET /classes/{class_id}/activities
	allActivities: (classId) =>
		api.get(`${CLASS_BASE_URL}/${classId}/activities`),

	/// POST /classes/{class_id}/activities
	/*
    data: {
        "template_id": 1,
        "team_ids": [1, 2],
        "due_date": "2024-02-01T12:00:00Z",s
        "total_score": 100
    }
    */
	create: (data) => api.post(`${CLASS_BASE_URL}/activities`, data),

	/// POST /classes/{class_id}/activities/from_template
	/*
    data: {
        "template_id": 1,
        "team_ids": [1, 2],
        "due_date": "2024-02-01T12:00:00Z",
        "total_score": 100
    }
    */
	createFromTemplate: (classId, data) =>
		api.post(`${CLASS_BASE_URL}/${classId}/activities/from_template`, data),

	/// POST /classes/${classId}/teams/${teamId}/activities/${activityId}/submit
	/*
    data: {
        "submission_status": true
    }
    */
	submitOrUnsubmit: (classId, teamId, activityId, data) =>
		api.post(
			`${CLASS_BASE_URL}/${classId}/teams/${teamId}/activities/${activityId}/submit`,
			{
				data,
			}
		),

	/// POST /classes/${classId}/teams/${teamId}/activities/${activityId}/add-evaluation
	/*
    data: {
        "evaluation": 80
    }
    */
	addEvaluation: (classId, teamId, activityId, data) =>
		api.post(
			`${CLASS_BASE_URL}/${classId}/teams/${teamId}/activities/${activityId}/add-evaluation`,
			{
				data,
			}
		),

	/// DELETE /classes/${classId}/teams/${teamId}/activities/${activityId}/delete-evaluation
	deleteEvaluation: (classId, teamId, activityId) =>
		api.delete(
			`${CLASS_BASE_URL}/${classId}/teams/${teamId}/activities/${activityId}/delete-evaluation`
		),

	/// POST /activity-work-attachments
	/*
    data: {
        "activity_id": 1,
        "description": "Work attachment description",
        "file_attachment": "<please insert actual file path>" 
    }
    */
	addWorkAttachments: (data) => api.post(`${AWA_BASE_URL}`, data),

	/// PUT /activity-work-attachments/{id}
	/*
    data: {
        "activity_id": 1,
        "description": "Updated work attachment description",
        "file_attachment": "<please insert actual file path>" 
    }
    */
	updateWorkAttachments: (id, data) => api.put(`${AWA_BASE_URL}/${id}`, data),

	/// DELETE /activity-work-attachments/{id}
	deleteWorkAttachments: (id) => api.delete(`${AWA_BASE_URL}/${id}`),

	/// GET /activity-work-attachments/activities/{id}
	getAllWorkAttachmentsForActivity: (id) =>
		api.get(`${AWA_BASE_URL}/activities/${id}`),

	/// POST /activity-comments
	/*
    data: {
        "user_id": 1,
        "activity_id": 1,
        "comment": "This is a test comment"
    }
    */
	createComment: (data) => api.post(`${AC_BASE_URL}`, data),

	/// PUT /activity-comments/{id}
	/*
    data: {
        "user_id": 1,
        "activity_id": 1,
        "comment": "This is an updated test comment"
    }
    */
	updateComment: (id, data) => api.put(`${AC_BASE_URL}/${id}`, data),

	/// DELETE /activity-comments/{id}
	deleteComment: (id) => api.delete(`${AC_BASE_URL}/${id}`),

	/// GET /activity-comments/activities/{id}
	getAllCommentsForActivity: (id) =>
		api.get(`${AC_BASE_URL}/activities/${id}`),

	/// GET /activity-comments
	listAllCommentsForActivity: () => api.get(`${AC_BASE_URL}`),
};

export default ActivityService;
