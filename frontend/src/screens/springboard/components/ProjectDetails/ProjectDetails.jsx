import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaPen } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import ModalCustom from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import styles from './ProjectDetails.module.css';
import { useClassMemberTeam, useProjects } from '../../../../hooks';

const ProjectDetails = ({ project, numTemplates, onProjectUpdate }) => {
  const { user, classId, classRoom, classMember } = useOutletContext();
  const { team } = useClassMemberTeam(classId, classMember?.id);

  const { teamProjects, updateProjects } = useProjects();

  const [group, setGroup] = useState('');
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // eslint-disable-next-line no-use-before-define
  const updateProjectDetails = async (newName, newDesc) => {
    const wordsArray = newDesc.split(/\s+/);
    const numberOfWords = wordsArray.length;
    if (numberOfWords <= 50 && numberOfWords >= 10) {
      try {
        await updateProjects(project.id, {
          body: {
            name: newName,
            description: newDesc,
            team_id: project.team_id,
          },
        });
        Swal.fire({
          title: 'Project Updated',
          icon: 'success',
          confirmButtonColor: '#9c7b16',
        });
        onProjectUpdate();
      } catch (error) {
        Swal.fire('Error', 'Update Error.', 'error');
      }
      handleCloseModal();
    } else {
      handleCloseModal();
      Swal.fire({
        title: 'Error',
        text: `Description should have 10 - 50 words. You have ${numberOfWords} words.`,
        icon: 'error',
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // eslint-disable-next-line no-use-before-define
          handleEditDetailModal(newName, newDesc);
        }
      });
    }
  };

  // eslint-disable-next-line no-use-before-define
  const handleEditDetailModal = (projname, desc) => {
    setIsModalOpen(true);
    setModalContent(
      <div style={{ margin: '0 30px' }}>
        <div style={{ margin: '20px 0' }}>
          <b>Project Name:</b>
          <input
            type="text"
            id="projectname"
            defaultValue={projname ?? project.name}
            className={styles.textInput}
          />
        </div>
        <div>
          <b>Description:</b>
          <textarea
            id="projectdesc"
            defaultValue={desc ?? project.description}
            className={styles.textInput}
            style={{ height: '70px', resize: 'none' }}
          />
        </div>
        <div className={styles.btmButton}>
          <Button
            className={styles.button}
            onClick={() => {
              const proj = document.getElementById('projectname').value;
              const projdesc = document.getElementById('projectdesc').value;
              updateProjectDetails(proj, projdesc);
            }}
          >
            Update
          </Button>

          <Button
            className={styles.button}
            style={{ backgroundColor: '#8A252C' }}
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.side}>
      <p className={styles.title}>Overall Project Rating</p>
      <span className={styles.number}>
        {numTemplates > 0 ? Math.round((project.score / numTemplates) * 10) : 0} %
      </span>

      <hr style={{ color: '#E5E4E2' }} />
      <div style={{ margin: '15px 0' }}>
        <p className={styles.title}>
          Project Details &nbsp;
          {user.group_fk === project.group_fk && (
            <span className={styles.pen} onClick={() => handleEditDetailModal()}>
              <FaPen />
            </span>
          )}
          {isModalOpen && (
            <ModalCustom width={500} isOpen={isModalOpen} onClose={handleCloseModal}>
              {modalContent}
            </ModalCustom>
          )}
        </p>
        <p className={styles.title_body}>Name:</p>
        <p className={styles.body}>{project.name}</p>
        <p className={styles.title_body}>Description:</p>
        <p className={styles.body}>{project.description}</p>
      </div>
      {(user.is_staff || user.group_fk !== project.group_fk) && (
        <>
          <hr style={{ color: '#E5E4E2' }} />
          <p className={styles.title_body}>Created by: Group {group}</p>
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
