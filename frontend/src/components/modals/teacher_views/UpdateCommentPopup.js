import { useNavigate, useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useActivityComment } from "../../../hooks";

const UpdateCommentPopup = ({ show, handleClose, data, commentId }) => {
    const { user } = useOutletContext();
    const { comment, updateComment } = useActivityComment(commentId);  

    const navigate = useNavigate();

    // State variable and handler for updating comments
    const [commentData, setCommentData] = useState({
        "activity_id": 0,
        "user_id": 0,
        "comment": "",
    });
    // Handle input changes in the comment form
    const handleChange = (e) => {
        const { name, value } = e.target;
        commentData.activity_id = data.id;
        commentData.user_id = user.user_id;
        setCommentData({
            ...commentData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateComment(commentData);
            // must add a conditional statement to check if response is successful

            console.log("Evaluation added successfully!");
            handleClose();
            navigate(0);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (comment){
            setCommentData({
                "activity_id": comment.activity?.id,
                "user_id": comment.user?.id,
                "comment": comment.comment,
            })
        }
    },[comment])

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className='fs-6 fw-bold'>Edit Comment</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className='d-flex flex-column gap-3'>
                    <Form.Group controlId='comment-input'>
                        <Form.Label>Comment</Form.Label>

                        <Form.Control
                            name='comment'
                            as='textarea'
                            rows={3}
                            onChange={handleChange}
                            value={commentData.comment}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='outline-secondary' onClick={handleClose}>
                    Close
                </Button>

                <Button variant='success' onClick={handleSubmit}>
                    Edit Comment
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export default UpdateCommentPopup