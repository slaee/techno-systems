import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import styles from './Rules.module.css';
import Card from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';
import { useBoardTemplate } from '../../../../hooks';
import Header from '../../components/Header/Header';

function Rules() {
  const navigate = useNavigate();
  const { id, templateid } = useParams();
  const { getTemplate } = useBoardTemplate();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTemplate(templateid);
        setTemplate(response.data || '');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [templateid]);

  const onClickView = () => {
    navigate(`/project/${id}/create-board/${templateid}/template`);
  };

  if (!template) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.body}>
      <Header />
      <Card className={styles.card}>
        <div className={styles.container}>
          <h3 className={styles.textColor}>
            Before we proceed, please take note of the following guidelines for a successful
            evaluation of your idea.
          </h3>
          <h3>Teacher's rules:</h3>
          <div> {parse(template.rules)} </div>

          <span className={styles.content}>
            We will now assess your idea based on the data you inputted. It's important that you
            provide accurate and honest information to ensure a proper evaluation of your idea. We
            will evaluate your idea based on the following criteria:
            <br />
            <br />
            <b>Capability:</b> The potential of your idea to address the problem or need you
            identified
            <br />
            <b>Novelty:</b> The level of originality or uniqueness of your idea
            <br />
            <b>Technical Feasibility:</b> The feasibility of your idea from a technical perspective,
            including its scalability, sustainability, and viability Please input your data
            carefully, as this will determine the outcome of your assessment.
          </span>
        </div>
      </Card>
      <Button className={styles.button} onClick={onClickView}>
        Start
      </Button>
    </div>
  );
}

export default Rules;
