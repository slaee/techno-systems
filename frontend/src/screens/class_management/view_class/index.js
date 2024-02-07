import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import './index.scss';

function ViewClass() {
  const { classRoom } = useOutletContext();

  const [numberOfStudents, setNumberOfStudents] = useState(classRoom?.number_of_students);
  const [numberOfTeams, setNumberOfTeams] = useState(classRoom?.number_of_teams);

  useEffect(() => {
    if (classRoom) {
      setNumberOfStudents(classRoom?.number_of_students);
      setNumberOfTeams(classRoom?.number_of_teams);
    }
  }, [classRoom?.number_of_students, classRoom?.number_of_teams]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(classRoom?.class_code);
  };

  const renderSubheader = () => (
    <div className="d-flex pt-2 pb-2">
      <div className="px-5">
        <div className="d-flex align-items-center fw-bold fs-5 brown-text">
          {classRoom?.name} {classRoom?.sections}
        </div>
        <div className="d-flex py-2">
          <div className="d-flex align-items-center fw-semibold fs-6">{classRoom?.schedule}</div>
          <div className="d-flex align-items-center ps-4 pe-2 fw-semibold fs-6">
            {classRoom?.class_code}
          </div>
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleCopyCode}>
            Copy
          </button>
        </div>
      </div>
    </div>
  );

  const renderBody = () => (
    <div className="d-flex justify-content-center pt-3 pb-3 px-5">
      <div className="d-flex flex-row">
        <div className="pe-5">
          <div className="students-container">
            <div className="fw-bold fs-1">{numberOfStudents}</div>
            <div className="ms-auto fw-semibold fs-3 mx-5">Students</div>
          </div>
        </div>
        <div className="ps-5">
          <div className="teams-container">
            <div className="fw-bold fs-1">{numberOfTeams}</div>
            <div className="ms-auto fw-semibold fs-3 mx-5">Teams</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => <div>{renderBody()}</div>;

  return (
    <div>
      {renderSubheader()}
      {renderContent()}
    </div>
  );
}

export default ViewClass;
