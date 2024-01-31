import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamService, ActivityService } from '../services';

const useActivity = (classId, activityId, teamId) => {
  const navigate = useNavigate();
  const [isRetrieving, setIsRetrieving] = useState(true);
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    if (!classId || !activityId || !teamId) {
      return;
    }
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
  }, [classId, activityId, teamId]);

  const updateActivity = async (data) => {
    let responseCode;

    try {
      console.log(classId, teamId, activityId);
      console.log('data', data);
      const res = await TeamService.updateTeamActivity(classId, teamId, activityId, data);
      responseCode = res?.status;
    } catch (error) {
      responseCode = error?.response?.status;
    }

    switch (responseCode) {
      case 200:
        break;
      case 404:
        navigate(`/classes/${classId}/activities`);
        break;
      case 500:
        navigate('/classes');
        break;
      default:
    }
  };

  const deleteTeamActivity = async () => {
    let responseCode;

    try {
      const res = await TeamService.deleteTeamActivity(classId, teamId, activityId);
      responseCode = res?.status;
    } catch (error) {
      responseCode = error?.response?.status;
    }

    switch (responseCode) {
      case 200:
        break;
      case 404:
        navigate(`/classes/${classId}/activities`);
        break;
      case 500:
        navigate('/classes');
        break;
      default:
    }
  };

  const createActivity = async (data) => {
    let responseCode;

    try {
      const res = await ActivityService.createActivity(classId, data);
      responseCode = res?.status;
    } catch (error) {
      responseCode = error?.response?.status;
    }

    switch (responseCode) {
      case 200:
        break;
      case 404:
        navigate(`/classes/${classId}/activities`);
        break;
      case 500:
        navigate('/classes');
        break;
      default:
    }
  };

  const createFromTemplate = async (data) => {
    let responseCode;

    try {
      const res = await ActivityService.createFromTemplate(classId, data);
      responseCode = res?.status;
    } catch (error) {
      responseCode = error?.response?.status;
    }

    switch (responseCode) {
      case 200:
        break;
      case 404:
        navigate(`/classes/${classId}/activities`);
        break;
      case 500:
        navigate('/classes');
        break;
      default:
    }
  };
  return {
    isRetrieving,
    activity,
    updateActivity,
    deleteTeamActivity,
    createActivity,
    createFromTemplate,
  };
};

export default useActivity;
