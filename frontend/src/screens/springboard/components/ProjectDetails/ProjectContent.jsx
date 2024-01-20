import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import styles from './ProjectContents.module.css';
import BoardContainer from '../Boards/BoardContainer';
import BoardCreation from '../BoardCreation/BoardCreation';
import ProjectDetails from './ProjectDetails';
import { useClassMemberTeam, useProjects, useBoardTemplate } from '../../../../hooks';
import Loading from '../../../../components/loading';

const ProjectContents = (props) => {
  const { user, classId, classRoom, classMember } = useOutletContext();
  const { team } = useClassMemberTeam(classId, classMember?.id);
  const { getProject } = useProjects();
  const { getAllTemplate } = useBoardTemplate();

  const currentPath = window.location.pathname;
  const [refresh, setRefresh] = useState(true);

  const [allTemplate, setAllTemplate] = useState();
  const [boardTemplateIds, setBoardTemplateIds] = useState([]);
  const [numTemplates, setNumTemplates] = useState(0);
  const [project, setProject] = useState();

  const [createAction, setCreateAction] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const projectResponse = await getProject(props.selected);
      if (projectResponse.success) {
        setProject(projectResponse.data.project);
      } else {
        console.error('Error fetching team projects:', projectResponse.error);
      }
      const templateResponse = await getAllTemplate();
      setAllTemplate(templateResponse.data);
      setNumTemplates(templateResponse.data.length);
      sessionStorage.setItem('goToClass', currentPath);
    };
    fetchData();
  }, [props.selected, refresh]);

  const onProjectUpdate = () => {
    setRefresh(!refresh);
  };

  if (!project) {
    return <Loading />;
  }

  return (
    <div className="px-5">
      <div className={styles.container}>
        {project && !user.staff && user.group_fk === project.group_fk && createAction ? (
          <BoardCreation
            selected={props.selected}
            setCreateAction={setCreateAction}
            boardTemplateIds={boardTemplateIds}
            allTemplate={allTemplate}
          />
        ) : (
          <BoardContainer
            selected={props.selected}
            setSelected={props.setSelected}
            project={project}
            onProjectUpdate={onProjectUpdate}
            setBoardTemplateIds={setBoardTemplateIds}
            projectUpdateKey={props.projectUpdateKey}
            setCreateAction={setCreateAction}
            isClass={props.isClass}
          />
        )}
        {project && (
          <ProjectDetails
            project={project}
            numTemplates={numTemplates}
            onProjectUpdate={onProjectUpdate}
            user={user}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectContents;
