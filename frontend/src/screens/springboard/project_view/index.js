import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import ProjectContents from '../components/ProjectDetails/ProjectContent';
import { useClassMemberTeam, useProjects, useBoardTemplate } from '../../../hooks';

function ProjectView(props) {
  const { user, classId, classRoom, classMember } = useOutletContext();
  const { team } = useClassMemberTeam(classId, classMember?.id);

  const { projId } = useParams();

  return (
    <div className="px-5">
      <ProjectContents selected={projId} />
    </div>
  );
}

export default ProjectView;
