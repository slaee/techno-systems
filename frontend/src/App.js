// React Imports
import { Route, Routes } from 'react-router-dom';

// Context Imports
import { AuthProvider } from './contexts/AuthContext';
import { NoAuthRoute } from './hocs/NoAuthRoute';
import { PrivateRoute } from './hocs/PrivateRoute';

// Screen Imports
import Login from './screens/login';
import Logout from './screens/logout';
import ForgotPassword from './screens/forgot_password';
import Signup from './screens/signup';
import Classes from './screens/class_management/classes';
import ViewClass from './screens/class_management/view_class';
import ViewClassMembers from './screens/class_management/view_class_members';
import Teams from './screens/team_management/teams';
import PeerEval from './screens/peer_evaluation/view_peer_eval';
import StudentPeerEval from './screens/peer_evaluation/view_student_peer_eval';
import ClassroomLayout from './components/Layouts/ClassroomLayouts';
import ActivityManagement from './screens/activity_management/activities';
import SpringBoardProjects from './screens/springboard/projects';
import SpringBoardAllProjects from './screens/springboard/all_projects';
import TeknoPlat from './screens/teknoplat';


// TODO: temporary
// import { ViewActivity, CreateActivity} from './screens/activity_management/activities/teacher';
// import ViewActivity from './screens/activity_management/activities/teacher';n
import { CreateActivity, ViewActivity } from './screens/activity_management/activities/teacher';


// Style Imports
import './App.css';

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route
					path='/'
					element={
						<NoAuthRoute>
							<Login />
						</NoAuthRoute>
					}
				/>
				<Route
					path='/login'
					element={
						<NoAuthRoute>
							<Login />
						</NoAuthRoute>
					}
				/>
				<Route
					path='/signup'
					element={
						<NoAuthRoute>
							<Signup />
						</NoAuthRoute>
					}
				/>
				<Route
					path='/forgotpassword'
					element={<ForgotPassword />}
				/>
				<Route
					path='/logout'
					element={<Logout />}
				/>

				{/* Classroom routes */}
				<Route path='classes'>
					<Route
						index
						element={
							<PrivateRoute>
								<Classes />
							</PrivateRoute>
						}
					/>

					<Route
						path=':id'
						element={<ClassroomLayout />}
					>
						<Route
							index
							element={
								<PrivateRoute>
									<ViewClass />
								</PrivateRoute>
							}
						/>
						<Route
							path='members'
							element={
								<PrivateRoute>
									<ViewClassMembers />
								</PrivateRoute>
							}
						/>
						<Route
							path='teams'
							element={
								<PrivateRoute>
									<Teams />
								</PrivateRoute>
							}
						/>
						<Route
							path='evals'
							element={
								<PrivateRoute>
									<StudentPeerEval />
								</PrivateRoute>
							}
						/>
						<Route path='activities'>
							<Route
								index
								element={
									<PrivateRoute>
										<ActivityManagement />
									</PrivateRoute>
								}
							/>
							
							<Route
								path=':activityId/teams/:teamId'
								element={
									<PrivateRoute>
										<ViewActivity />
									</PrivateRoute>
								}
							/>
						</Route>
						<Route
							path='new_activity'
							element={
								<PrivateRoute>
									<CreateActivity />
								</PrivateRoute>
							}
						/>
						<Route
							path='projects'
							element={
								<PrivateRoute>
									<SpringBoardProjects />
								</PrivateRoute>
							}
						/>
						<Route
							path='allprojects'
							element={
								<PrivateRoute>
									<SpringBoardAllProjects />
								</PrivateRoute>
							}
						/>
						<Route
							path='teknoplat'
							element={
								<PrivateRoute>
									<TeknoPlat />
								</PrivateRoute>
							}
						/>
					</Route>
				</Route>

				<Route
					path='/peer-eval'
					element={
						<PrivateRoute>
							<PeerEval />
						</PrivateRoute>
					}
				/>
			</Routes>
		</AuthProvider>
	);
}

export default App;
