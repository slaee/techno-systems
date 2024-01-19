import React from 'react';
import { useOutletContext } from 'react-router-dom';

function ProjectContent() {
  const { user, classId, classRoom } = useOutletContext();

  // TODO: Your screens

  return (
    <div className="px-5">
      <h1>Render your view here</h1>
    </div>
  );
}

export default ProjectContent;
