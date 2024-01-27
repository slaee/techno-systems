import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActivityService } from '../services';

const useActivity = (classId, activityId, teamId) => {
  const navigate = useNavigate();
  const [isRetrieving, setIsRetrieving] = useState(true);
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const get = async () => {
      let responseCode;
      let retrievedActivity;

      try {
        const res = await ActivityService.getActivity(classId, teamId, activityId);

        responseCode = res?.status;
        retrievedActivity = res?.data;
      } catch (error) {
        responseCode = error?.response?.status;
      }

      switch (responseCode) {
        case 200:
          setActivity(retrievedActivity);
          break;
        case 404:
          navigate(`/classes/${classId}/activities`);
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

  return { isRetrieving, activity };
};

export default useActivity;
