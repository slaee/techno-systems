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

// Style Imports
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <NoAuthRoute>
              <Login />
            </NoAuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <NoAuthRoute>
              <Login />
            </NoAuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <NoAuthRoute>
              <Signup />
            </NoAuthRoute>
          }
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/logout" element={<Logout />} />

        {/* Classroom routes */}
        <Route path="classes">
          <Route
            index
            element={
              <PrivateRoute>
                <Classes />
              </PrivateRoute>
            }
          />

          <Route path=":id" element={<ClassroomLayout />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <ViewClass />
                </PrivateRoute>
              }
            />
            <Route
              path="members"
              element={
                <PrivateRoute>
                  <ViewClassMembers />
                </PrivateRoute>
              }
            />
            <Route
              path="teams"
              element={
                <PrivateRoute>
                  <Teams />
                </PrivateRoute>
              }
            />
            <Route
              path="evals"
              element={
                <PrivateRoute>
                  <StudentPeerEval />
                </PrivateRoute>
              }
            />
          </Route>
        </Route>

        <Route
          path="/peer-eval"
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
