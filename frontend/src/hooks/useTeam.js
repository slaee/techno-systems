import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClassRoomsService } from '../services';

const useTeam = (classId, teamId) => {
  const navigate = useNavigate();
  const [isRetrieving, setIsRetrieving] = useState(true);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const get = async () => {
      let responseCode;
      let retrievedTeam;

      try {
        const res = await ClassRoomsService.team(classId, teamId);

        responseCode = res?.status;
        retrievedTeam = res?.data;
      } catch (error) {
        responseCode = error?.response?.status;
      }

      switch (responseCode) {
        case 200:
          setTeam(retrievedTeam);
          break;
        case 404:
          navigate(`/classes/${classId}/teams`);
          break;
        case 500:
          navigate('/classes');
          break;
        default:
      }

      setIsRetrieving(false);
    };

    get();
  }, []);

  return { isRetrieving, team };
};

export default useTeam;
