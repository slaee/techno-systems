import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectContents from '../components/ProjectDetails/ProjectContent';

function ProjectView(props) {
  const { projId } = useParams();

  return (
    <div className="px-5">
      <ProjectContents selected={projId} />
    </div>
  );
}

export default ProjectView;
