import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styles from './Board.module.css';
import Card from '../UI/Card/Card';
import IdeaIcon from '../images/idea.png';
import Button from '../UI/Button/Button';
import CircularProgressWithLabel from '../UI/ProgressBar/CircularProgressWithLabel';
import Loading from '../../../../components/loading';
import { useClassMemberTeam, useProjects } from '../../../../hooks';

function Board({ selected, project, onProjectUpdate, setBoardTemplateIds, projectUpdateKey }) {
  const { user, classId, classRoom, classMember } = useOutletContext();
  const { team } = useClassMemberTeam(classId, classMember?.id);

  const { getProjectBoard } = useProjects();

  const navigate = useNavigate();
  const [loadCount, setLoadCount] = useState(0);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadCount((prevLoadCount) => prevLoadCount + 1);
        if (selected !== null && selected !== undefined) {
          const boardsResponse = await getProjectBoard(selected);
          console.log(boardsResponse);
          const boardsTemp = boardsResponse.data;
          // Set the templateIds
          // this checks what templates are already accomplished and pass it to BoardCreation
          if (setBoardTemplateIds) {
            const templateIds = new Set(boardsTemp.map((board) => board.templateId));
            setBoardTemplateIds(templateIds);
          }
          const sortedBoards = [...boardsTemp].sort((a, b) => a.templateId - b.templateId);
          setBoards(sortedBoards);
        }
      } catch (error) {
        console.error(`Error fetching data: ${error}`, error);
      }
    };
    fetchData();
  }, [selected, projectUpdateKey]);

  const onClickView = (id) => {
    navigate(`/board/${id}`);
  };

  if (!team) {
    return <p>Loading..</p>;
  }

  return (
    <div className={styles.board}>
      {loadCount === 0 && <Loading />}
      <div className={styles.scrollable}>
        {project && boards.length === 0 && user.role !== 1 && team.id === project.team_id && (
          <p className={styles.centeredText} style={{ width: '45rem' }}>
            It looks like you haven't created any boards yet. <br /> Click on the "Create Board"
            button to get started and create your first board.
          </p>
        )}
        {project && boards.length === 0 && (user.role === 1 || team.id !== project.team_id) && (
          <p className={styles.centeredText} style={{ width: '45rem' }}>
            It looks like the group haven't created any boards yet. <br />
          </p>
        )}
        {boards.map((board) => (
          <div key={board.id}>
            <Card className={styles.card}>
              <div className={styles.container}>
                <div className={styles.subcontainer}>
                  <img className={styles.ideaicon} src={IdeaIcon} alt="IdeaIcon" />
                </div>

                <div>
                  <h3>Board: {board.title}</h3>
                  <div>
                    <div className={styles.cards}>
                      <Card className={styles.smallCard}>
                        <h5 className={styles.ratings}>Novelty</h5>
                        <div className={styles.cardContent}>
                          <CircularProgressWithLabel value={board.novelty * 10} />
                        </div>
                      </Card>

                      <Card className={styles.smallCard}>
                        <h5 className={styles.ratings}>Capability</h5>
                        <div className={styles.cardContent}>
                          <CircularProgressWithLabel value={board.capability * 10} />
                        </div>
                      </Card>

                      <Card className={styles.smallCard}>
                        <h5 className={styles.ratingstech}>Technical Feasibility</h5>
                        <div className={styles.cardContent}>
                          <CircularProgressWithLabel value={board.technical_feasibility * 10} />
                        </div>
                      </Card>
                    </div>
                    <Button className={styles.viewbutton} onClick={() => onClickView(board.id)}>
                      View Board
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
