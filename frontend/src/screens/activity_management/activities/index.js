import { useOutletContext } from 'react-router-dom';
import { Teacher } from './teacher';
import './index.scss';

function ActivityManagement() {
	const { user } = useOutletContext();
	
	return user?.role === 1 ? <Teacher /> : null;
}

export default ActivityManagement;