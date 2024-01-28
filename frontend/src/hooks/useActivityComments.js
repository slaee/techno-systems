import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActivityCommentService } from '../services';

const useActivityComments = (activityId) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);


  // use for getting all comments 
  useEffect(() => {
    if (!activityId) {
      return
    }
    const get = async () => {
      let responseCode;
      let retrievedComments;
      try {
        const res = await ActivityCommentService.getAllCommentsForActivity(activityId);

        responseCode = res?.status;
        retrievedComments = res?.data;
      } catch (error) {
        responseCode = error?.response?.status;
      }

      switch (responseCode) {
        case 200:
          setComments(retrievedComments);
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
  }, [activityId]);


  // const getAllCommentsForActivity = async () => {
  //   let responseCode;
  //   let retrievedComments;
  //   try {
  //     const res = await ActivityCommentService.getAllCommentsForActivity(activityId);

  //     responseCode = res?.status;
  //     retrievedComments = res?.data;
  //   } catch (error) {
  //     responseCode = error?.response?.status;
  //   }

  //   switch (responseCode) {
  //     case 200:
  //       setComments(retrievedComments);
  //       break;
  //     case 404:
  //     case 500:
  //       navigate('/classes');
  //       break;
  //     default:
  //   }

  //   setIsLoading(false);
  // };

  const addComment = async (comment) => {
    let responseCode;

    try {
      console.log("asd", comment)

      const res = await ActivityCommentService.addComment(comment);
      responseCode = res?.status;
    } catch (error) {
      responseCode = error?.response?.status;
    }

    switch (responseCode) {
      case 200:
        break;
      case 404:
      case 500:
        navigate('/classes');
        break;
      default:
    }
  };

  const deleteComment = async (commentId) => {
    let responseCode;

    try {
      const res = await ActivityCommentService.deleteComment(commentId);
      responseCode = res?.status;
    } catch (error) {
      responseCode = error?.response?.status;
    }

    switch (responseCode) {
      case 200:
        break;
      case 404:
      case 500:
        navigate('/classes');
        break;
      default:
    }
  };



  return { isLoading, comments, addComment, deleteComment };
};

export default useActivityComments;
