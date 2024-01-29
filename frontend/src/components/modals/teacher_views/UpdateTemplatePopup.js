import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useActivityTemplates, useActivityTemplate } from "../../../hooks";
import CreatableSelect from 'react-select/creatable';
import { useParams } from "react-router-dom";

const UpdateTemplatePopup = ({ show, handleClose, data }) => {
    const { templateId } = useParams();
    const { courses } = useActivityTemplates();
    const { updateTemplate } = useActivityTemplate(templateId);
    
    const navigate = useNavigate();

    
    const [courseOptions, setCourseOptions] = useState([]);
    const [templateData, setTemplateData] = useState({
        "title": "",
        "description": "",
        "course_name": "",
    });

    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleCourseChange = (selectedOption) => {
        setSelectedCourse(selectedOption); 

        setTemplateData(prevState => ({
            ...prevState,
            course_name: selectedOption.value,
        }));
      };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setTemplateData({
            ...templateData,
            [name]: value,
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if any of the required fields are empty
        const requiredFields = ['title', 'description', 'course_name'];
        const isEmptyField = requiredFields.some(field => !templateData[field]);
        if (isEmptyField) {
            window.alert('Please fill in all required fields.');
            return;
        }

        try {
            await updateTemplate(templateData);
            await handleClose();
            navigate(0);
        } catch (error) {
            console.error("Error creating template:", error);
            // Handle error, e.g., show an error message to the user
        }
    };

    useEffect(() => {
        if (courses){
            const options = courses.map(course => ({ value: course.course_name, label: course.course_name }));
            setCourseOptions(options);
        }
    }, [courses]);


    useEffect(() => {
        if (data) {
            setSelectedCourse({ value: data.course_name, label: data.course_name });
            setTemplateData({...data});
        }
    }, [data]);

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className="fs-6 fw-bold">Create Template</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column gap-3">
                    <Form.Group controlId="title-input">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={templateData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="description-input">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={templateData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId='course-id-input'>
                        <Form.Label>Course</Form.Label>
                        <CreatableSelect
                            onChange={handleCourseChange}   
                            options={courseOptions}
                            value={selectedCourse}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-outline-secondary btn-block fw-bold"
                    onClick={handleClose}
                >
                    Close
                </button>
                <button
                    className="btn btn-activity-primary btn-block fw-bold"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateTemplatePopup;