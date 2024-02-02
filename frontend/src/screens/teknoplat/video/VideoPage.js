import { Box } from '@mui/material';
import { MeetingProvider } from '@videosdk.live/react-sdk';
import { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useMeeting } from '../../../hooks';
import VideoView from './VideoView';

function VideoPage() {
  const { user, classId, classRoom, classMember } = useOutletContext();
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const { isLoading, meeting } = useMeeting(meetingId);
  const videoAccessToken = '';
  useEffect(() => {
    if (!isLoading && !meeting.video)
      navigate(`/classes/${classId}/teknoplat/meetings/${meetingId}`);
  }, [isLoading]);

  if (isLoading) {
    return <Box />;
  }

  return (
    <Box height="100vh">
      <MeetingProvider
        config={{
          meetingId: meeting.video,
          micEnabled: meeting.owner_id === classMember.id,
          webcamEnabled: meeting.owner_id === classMember.id,
          name: user.full_name,
          participantId: classMember.id,
        }}
        token={meeting.token}
      >
        <VideoView meeting={meeting} />
      </MeetingProvider>
    </Box>
  );
}

export default VideoPage;
