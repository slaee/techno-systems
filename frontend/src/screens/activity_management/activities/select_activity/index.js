import { useOutletContext } from 'react-router-dom';
import { ViewActivityStudent } from '../select_activity/view_student';
import { ViewActivityTeacher } from '../select_activity/view_teacher';

function ViewActivity() {
	const { user } = useOutletContext();
	
	if (user?.role === 1)
		return  <ViewActivityTeacher />;
	else if(user?.role === 2)
		return  <ViewActivityStudent />;
}

export default ViewActivity;