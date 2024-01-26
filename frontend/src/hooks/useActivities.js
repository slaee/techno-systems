import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActivityService } from '../services';

const useActivities = (id) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const get = async () => {
      let responseCode;
      let retrievedActivities;

      try {
        const res = await ActivityService.allActivities(id);

        responseCode = res?.status;
        retrievedActivities = res?.data;
      } catch (error) {
        responseCode = error?.response?.status;
      }

      switch (responseCode) {
        case 200:
          setActivities(retrievedActivities);
          break;
        case 404:
        case 500:
          navigate('/classes');
          break;
        default:
      }

      setIsLoading(false);
    };

    get();
  }, [id]);

  return { isLoading, activities };
};

export default useActivities;
