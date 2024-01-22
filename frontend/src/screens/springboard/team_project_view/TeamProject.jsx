import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';
import ProjectContents from '../components/ProjectDetails/ProjectContent';
import { useClassMemberTeam, useProjects } from '../../../hooks';
import styles from './TeamProject.module.css';

function TeamProject() {
  const { id, teamid } = useParams();
  const { user, classId, classRoom, classMember } = useOutletContext();
  const { teamProjects } = useProjects();
  const isClass = user.role === 1;

  const [team, setTeam] = useState('');
  const [selected, setSelected] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await teamProjects(teamid);
        if (response.data.projects.length > 0) {
          const activeProject = response.data.projects.find((project) => project.is_active);
          if (activeProject) {
            setSelected(activeProject.id);
          } else {
            setSelected(response.data.projects[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const goBack = () => {
    navigate(`/classes/${classId}/allteamprojects`);
  };

  if (!selected) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-5 d-flex justify-content-start">
      <span style={{ cursor: 'pointer' }} onClick={goBack}>
        <IoArrowBackSharp />
      </span>
      <p className={styles.text}>{team.name}</p>
      <ProjectContents selected={selected} setSelected={setSelected} isClass={isClass} />
    </div>
  );
}

export default TeamProject;
