import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useActivity, useActivities } from "../../../hooks";

const UpdateActivityPopup = ({ show, handleClose, classId, teamId, activityId, data }) => {
    const navigate = useNavigate();

    const { updateActivity } = useActivity(classId, activityId, teamId);


    const [updateActivityData, setUpdateActivityData] = useState({
        ...data,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateActivityData({
            ...updateActivityData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any of the required fields are empty
        const requiredFields = ['title', 'description', 'due_date', 'total_score'];
        const isEmptyField = requiredFields.some((field) => !updateActivityData[field]);

        if (isEmptyField) {
            window.alert('Please fill in all required fields.');
            return;
        }

        try {

            await updateActivity(updateActivityData);

            setUpdateActivityData(updateActivityData);
            handleClose();
            navigate(0);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size='lg' centered>
            <Modal.Header closeButton>
                <Modal.Title className='fs-6 fw-bold'>Update Activity</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className='d-flex flex-column gap-3'>
                    <Form.Group controlId='title-input'>
                        <Form.Label>Title</Form.Label>

                        <Form.Control
                            type='text'
                            name='title'
                            value={updateActivityData?.title}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId='description-input'>
                        <Form.Label>Description</Form.Label>

                        <Form.Control
                            as='textarea'
                            rows={3}
                            name='description'
                            value={updateActivityData?.description}
                            onChange={handleChange}
                            requ
                        />
                    </Form.Group>

                    <Form.Group controlId='due-date-input'>
                        <Form.Label>Due Date</Form.Label>

                        <Form.Control
                            type='date'
                            name='due_date'
                            value={updateActivityData?.due_date?.split('T')[0]}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId='total-score-input'>
                        <Form.Label>Total Score</Form.Label>

                        <Form.Control
                            type='number'
                            name='total_score'
                            value={updateActivityData?.total_score}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='outline-secondary' onClick={handleClose}>
                    Close
                </Button>

                <Button variant='secondary' onClick={handleSubmit}>
                    Update Activity
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export default UpdateActivityPopup