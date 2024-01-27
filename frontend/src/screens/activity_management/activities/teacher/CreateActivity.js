import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const CreateActivity = () => {
	// const createNewActivity = null;
	// const teams = null;

	const navigate = useNavigate();
	// const [activityData, setActivityData] = useState({
	// 	classroom_id: '',
	// 	team_id: [],
	// 	title: '',
	// 	description: '',
	// 	due_date: '',
	// 	total_score: 0,
	// });

	// const handleChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setActivityData({
	// 		...activityData,
	// 		[name]: name === 'description' ? value.replace(/\n/g, '<br>') : value,
	// 	});
	// };

	// const handleSubmit = async () => {
	// 	// Check if any of the required fields are empty
	// 	const requiredFields = [
	// 		'title',
	// 		'description',
	// 		'link',
	// 		'due_date',
	// 		'total_score',
	// 		'team_id',
	// 	];
	// 	const isEmptyField = requiredFields
	// 		.some
	// 		// (field) => !updateActivityData[field]
	// 		();

	// 	if (isEmptyField) {
	// 		window.alert('Please fill in all required fields.');
	// 		return;
	// 	}

	// 	try {
	// 		// await createNewActivity(activityData);
	// 		handleClose();

	// 		if (window.confirm('Created Successfully.')) {
	// 			window.location.reload();
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	return (
		<div className='container-md'>
			<div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
				<div className='d-flex flex-row justify-content-between'>
					<div className='d-flex flex-row'>
						<span
							className='nav-item nav-link m-0 p-0'
							onClick={() => navigate(-1)}
						>
							<FiChevronLeft />
						</span>
						<h4 className='fw-bold m-0'>Activities</h4>
					</div>
					<div className='d-flex flex-row gap-3 '>
						<button
							className='btn btn-outline-secondary btn-block fw-bold bw-3 m-0'
							// onClick={() => {
							// 	// navigate("templates");
							// }}
						>
							Use Templates
						</button>
					</div>
				</div>
				<hr className='text-dark' />
				<Form>
					<Form.Group
						className='mb-3'
						controlId='name-input'
					>
						<Form.Label>Title</Form.Label>
						<Form.Control
							type='text'
							name='title'
							// value={activityData.name}
							// onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group
						className='mb-3'
						controlId='description-input'
					>
						<Form.Label>Description</Form.Label>
						<Form.Control
							type='text'
							name='description'
							// value={activityData.description}
							// onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group
						className='mb-3'
						controlId='due-date-input'
					>
						<Form.Label>Due Date</Form.Label>
						<Form.Control
							type='datetime-local'
							name='due_date'
							// value={activityData.due_date}
							// onChange={handleChange}
						/>
					</Form.Group>
					{/*
					<Form.Group className="mb-3" controlId="evaluation-input">
						<Form.Label>Evaluation</Form.Label>
						<Form.Control
							type="number"
							name="evaluation"
							value={activityData.evaluation}
							onChange={handleChange}
						/>
					</Form.Group>
					*/}
					<Form.Group
						className='mb-3'
						controlId='total-score-input'
					>
						<Form.Label>Total Score</Form.Label>
						<Form.Control
							type='number'
							name='total_score'
							// value={activityData.total_score}
							// onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group
						className='mb-3'
						controlId='team-select'
					>
						<Form.Label>Select Team</Form.Label>
						<Form.Control
							as='select'
							name='team_id'
							// value={activityData.team_id}
							// onChange={handleChange}
						>
							<option value=''>Select a Team</option>
							{/* {teams &&
							teams.map((team) => (
								<option
									key={team.id}
									value={team.id}
								>
									{team.name}
								</option>
							))} */}
						</Form.Control>
					</Form.Group>
					<button
						type='submit'
						className='btn btn-primary'
					>
						Create Activity
					</button>
				</Form>
			</div>
		</div>
	);
};

export default CreateActivity;
