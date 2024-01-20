import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Card from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';
import { Tiptap } from '../../components/UI/RichTextEditor/TipTap';
import styles from './AddBoard.module.css';
import ModalCustom from '../../components/UI/Modal/Modal';
import Loading from '../../components/UI/Loading/Loading';
import { useBoardTemplate, useProjects } from '../../../../hooks';

function AddBoard() {
  const { id, templateid } = useParams();
  const { createProjectBoard } = useProjects();
  const { getTemplate } = useBoardTemplate();
  const [template, setTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContent, setNewContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTemplate(templateid);
        setTemplate(response.data);
        setNewContent(response.data.content || '');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [templateid]);

  const addProjectBoard = async () => {
    setIsModalOpen(true);
    try {
      const response = await createProjectBoard(id, {
        body: {
          title: template.title,
          content: newContent,
          template_id: templateid,
          novelty: 0,
          capability: 0,
          technical_feasibility: 0,
          feedback: 's',
          recommendation: 's',
          references: 's',
          project_id: id,
        },
      });
      navigate(`/project/${id}/create-board/${response.data.id}/result`);
    } catch (error) {
      console.error('Error creating ProjectBoard:', error);
    }
    setIsModalOpen(false);
  };

  if (!template) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.body}>
      <Header />
      <div className={styles.container}>
        <span className={styles.title}>{template.title}</span>
        <Card className={styles.cardContainer}>
          <div className={styles.box} />
          <div className={styles.containerStyle}>
            <Tiptap setDescription={setNewContent} value={newContent} />
          </div>
        </Card>
        {isModalOpen && (
          <ModalCustom width={200} isOpen={isModalOpen}>
            <Loading timeout="auto" style={{ height: 'auto' }} />
          </ModalCustom>
        )}
        <Button className={styles.button} onClick={addProjectBoard}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default AddBoard;
