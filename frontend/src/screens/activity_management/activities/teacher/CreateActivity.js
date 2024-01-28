import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { useActivity, useTeams } from '../../../../hooks';
import Select from 'react-select';


const CreateActivity = () => {
	const navigate = useNavigate();
	const { classId } = useOutletContext();
	const { teams } = useTeams(classId);

	const [activityData, setActivityData] = useState({
		"classroom_id": classId,
		"team_id": [],
		"title": "",
		"description": "",
		"submission_status": false,
		"due_date": "",
		"evaluation": 0,
		"total_score": null,
	});


	useEffect(() => {

		console.log("id",classId);
		console.log("teams",teams);
	}, [teams]);
	const { createActivity } = useActivity(classId, null, null);

	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setActivityData({
			...activityData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const isConfirmed = window.confirm("Please confirm if you want to create this activity");

		if (isConfirmed) {
			try {
				await createActivity(activityData);
				navigate(-1);
			} catch (error) {
				console.error(error);
			}
		}
		else {
			// The user canceled the deletion
			console.log("Creation canceled");	
		}
	};

	const [selectedTeams, setSelectedTeams] = useState([]);
	const [teamOptions, setTeamOptions] = useState([]);

	const handleTeamChange = (selectedOptions) => {
		let selectedTeams;
		if (selectedOptions.some(option => option.value === 'all')) {
		  selectedTeams = teamOptions.filter(option => option.value !== 'all')
		  	.map(option => option.value);
		} else {
		  selectedTeams = selectedOptions.map(option => option.value);
		}
	  
		setSelectedTeams(selectedTeams);
	  
		// Update activityData with the selected teams
		setActivityData(prevState => ({
		  ...prevState,
		  team_id: selectedTeams,
		}));
	  };

	useEffect(() => {
		if (teams){
			const options = teams.map(team => ({ value: team.id, label: team.name }));
			options.unshift({ value: 'all', label: 'select all' });
			setTeamOptions(options);
		}
	}, [teams]);

	return (
		<div className='container-md'>
			<div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
				<div className='d-flex flex-row justify-content-between'>
					<div className='d-flex flex-row align-items-center gap-2'>
						<span
							className='nav-item nav-link'
							onClick={() => navigate(-1)}
						>
							<FiChevronLeft />
						</span>
						<h4 className='fw-bold m-0'>Create Activity</h4>
					</div>
					<div className='d-flex flex-row gap-3 '>
						<button
							className='btn btn-activity-secondary btn-block fw-bold bw-3 m-0 '
							onClick={() => {
								navigate('/teacher/activities/templates');
							}}
						>
							Use Templates
						</button>
					</div>
				</div>
				<hr className='text-dark' />
				<form onSubmit={handleSubmit}>
					{/* title */}
					<div className='mb-3'>
						<label
							htmlFor='title'
							className='form-label'
						>
							Title
						</label>
						<input
							type='text'
							className='form-control'
							id='title'
							name='title'
							value={activityData.title}
							onChange={handleChange}
						/>
					</div>
					{/* desc */}
					<div className='mb-3'>
						<label
							htmlFor='description'
							className='form-label'
						>
							Description
						</label>
						<textarea
							className='form-control'
							id='description'
							name='description'
							value={activityData.description}
							onChange={handleChange}
						/>
					</div>
					{/* team */}
					<div className='mb-3'>
						<label
							htmlFor='team_id'
							className='form-label'
						>
							Team
						</label>
						<Select
							defaultValue={selectedTeams}
							onChange={handleTeamChange}
							options={teamOptions}
							isMulti
						/>
					</div>
					{/* date */}
					<div className='mb-3'>
						<label
							htmlFor='due_date'
							className='form-label'
						>
							Due Date
						</label>
						<input
							type='date'
							className='form-control'
							id='due_date'
							name='due_date'
							value={activityData.due_date}
							onChange={handleChange}
						/>
					</div>
					{/* score */}
					<div className='mb-3'>
						<label
							htmlFor='total_score'
							className='form-label'
						>
							Total Score
						</label>
						<input
							type='number'
							className='form-control'
							id='total_score'
							name='total_score'
							value={activityData.total_score}
							onChange={handleChange}
						/>
					</div>
					<button
						type='submit'
						className='btn btn-activity-primary'
					>
						Create Activity
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateActivity;