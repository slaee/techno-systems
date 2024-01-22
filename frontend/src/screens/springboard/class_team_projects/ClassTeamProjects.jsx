import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';
import ClassroomTable from '../components/Table/ClassroomTable';
import { useProjects } from '../../../hooks';
import styles from './ClassTeamProjects.module.css';

function ClassTeamProjects() {
  const { user, classId, classRoom } = useOutletContext();
  const { getProjectsByClassId } = useProjects();

  const [teams, setTeams] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProjectsByClassId(classId);
        setTeams(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(`Error fetching data: ${error}`, error);
      }
    };
    fetchData();
  }, []);

  if (!teams) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-5">
      <div className={styles.body}>
        <h2 style={{ fontSize: '25px', color: '#9c7b16', margin: '0px' }}>Team Projects</h2>
      </div>
      <ClassroomTable teams={teams} />
    </div>
  );
}

export default ClassTeamProjects;
