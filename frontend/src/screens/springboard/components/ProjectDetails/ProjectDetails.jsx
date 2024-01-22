import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaPen } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import ModalCustom from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import styles from './ProjectDetails.module.css';
import { useClassMemberTeam, useProjects } from '../../../../hooks';

const ProjectDetails = ({ project, numTemplates, onProjectUpdate, team_name, isClass }) => {
  const { user, classId, classMember } = useOutletContext();
  const { team } = !isClass ? useClassMemberTeam(classId, classMember?.id) || { id: 0 } : { id: 0 };
  const teamId = team?.id || 0;

  const { updateProjects } = useProjects();

  // const [group, setGroup] = useState('');
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
  // const handleEditDetailModal = (projname, desc) => {
  //   setIsModalOpen(true);
  //   setModalContent(
  //     <div style={{ margin: '0 30px' }}>
  //       <div style={{ margin: '20px 0' }}>
  //         <b>Project Name:</b>
  //         <input
  //           type="text"
  //           id="projectname"
  //           defaultValue={projname ?? project.name}
  //           className={styles.textInput}
  //         />
  //       </div>
  //       <div>
  //         <b>Description:</b>
  //         <textarea
  //           id="projectdesc"
  //           defaultValue={desc ?? project.description}
  //           className={styles.textInput}
  //           style={{ height: '80px', resize: 'none' }}
  //         />
  //       </div>
  //       <div className={styles.btmButton}>
  //         <Button
  //           className={styles.button}
  //           onClick={() => {
  //             const proj = document.getElementById('projectname').value;
  //             const projdesc = document.getElementById('projectdesc').value;
  //             updateProjectDetails(proj, projdesc);
  //           }}
  //         >
  //           Update
  //         </Button>

  //         <Button
  //           className={styles.button}
  //           style={{ backgroundColor: '#8A252C' }}
  //           onClick={handleCloseModal}
  //         >
  //           Close
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // };

  const handleEditDetailModal = (projname, desc) => {
    Swal.fire({
      html: `
      <label style="font-size: 14px; font-weight: 400; ">Project Name:</label>
        <input type="text" id="input1" value="${
          projname ?? project.name
        }" placeholder="Enter new project name" class="swal2-input" style="height: 35px; width: 86%; font-size: 16px; font-family: 'Calibri', sans-serif; display: flex;"/>
        <br>
        <label style="font-size: 14px; font-weight: 400; ">Description:</label>
        <textarea id="input2" placeholder="Enter project description" class="swal2-textarea" style="margin: 0 auto; width: 86%; height: 100px; resize: none; font-size: 16px; font-family: 'Calibri', sans-serif;" >${
          desc ?? project.description
        }</textarea>
        <div id="charCount" style="text-align: right; color: #555; font-size: 12px; margin-top: 5px;">0/200 characters</div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: '#9c7b16',
      cancelButtonText: 'Close',
      cancelButtonColor: 'rgb(181, 178, 178)',
      didOpen: () => {
        const input2 = document.getElementById('input2');
        const charCount = document.getElementById('charCount');

        const updateCharCount = () => {
          const currentLength = input2.value.length;
          charCount.innerText = `${currentLength}/200 characters`;

          if (currentLength > 200) {
            input2.value = input2.value.slice(0, 200);
          }
        };

        updateCharCount();

        input2.addEventListener('input', updateCharCount);
      },
      preConfirm: async () => {
        const input1Value = document.getElementById('input1').value;
        const input2Value = document.getElementById('input2').value;
        try {
          if (!input1Value) {
            throw new Error('Project name cannot be empty');
          } else if (!input2Value) {
            throw new Error('Please enter the project description.');
          }
          return true;
        } catch (error) {
          Swal.showValidationMessage(
            `Project with the name '${input1Value}' already exists. Please enter another project name.`
          );
          return false;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const input1Value = document.getElementById('input1').value;
        const input2Value = document.getElementById('input2').value;
        updateProjectDetails(input1Value, input2Value);
        Swal.fire({
          title: 'Project Updated',
          icon: 'success',
          confirmButtonColor: '#9c7b16',
        });
      }
    });
  };

  // if (!team && !isClass) {
  //   return <Loading />;
  // }

  return (
    <div className={styles.side}>
      <p className={styles.title}>Overall Project Rating</p>
      <span className={styles.number}>
        {numTemplates > 0 ? Math.round((project.score / numTemplates) * 10) : 0} %
      </span>

      <hr />
      <div style={{ margin: '15px 0' }}>
        <p className={styles.title}>
          Project Details &nbsp;
          {user.role === 1 ||
            (project.team_id === teamId && (
              <span className={styles.pen} onClick={() => handleEditDetailModal()}>
                <FaPen />
              </span>
            ))}
          {isModalOpen && (
            <ModalCustom width={500} isOpen={isModalOpen} onClose={handleCloseModal}>
              {modalContent}
            </ModalCustom>
          )}
        </p>
        <p className={styles.title_body}>Name:</p>
        <p className={styles.bodyName}>{project.name}</p>
        <p className={styles.title_body}>Description:</p>
        <p className={styles.body}>{project.description}</p>
      </div>
      {(user.role === 1 || project.team_id !== teamId) && (
        <>
          <hr style={{ color: '#E5E4E2' }} />
          <p className={styles.title_body}>Created by: Group {team_name}</p>
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
