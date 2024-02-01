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
import SpringBoardTeacherAllProjects from './screens/springboard/teacher_view_all_projects';
import ProjectView from './screens/springboard/project_view';
import Rules from './screens/springboard/project_board_view/Rules/Rules';
import AddBoard from './screens/springboard/project_board_view/AddBoard/AddBoard';
import Result from './screens/springboard/project_board_view/Result/Result';
import ViewBoard from './screens/springboard/project_board_view/ViewBoard/ViewBoard';
import EditBoard from './screens/springboard/project_board_view/EditBoard/EditBoard';
import EditBoardResult from './screens/springboard/project_board_view/EditBoard/EditBoardResult';
import ClassTeamProjects from './screens/springboard/class_team_projects/ClassTeamProjects';
import TeamProject from './screens/springboard/team_project_view/TeamProject';
import SearchProject from './screens/springboard/search_project/SearchProject';

import TeknoPlat from './screens/teknoplat';
import ViewActivity from './screens/activity_management/activities/select_activity';

import {
  CreateActivity,
  ViewTemplates,
  ViewTemplate,
} from './screens/activity_management/activities/teacher';

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
            <Route path="activities">
              <Route
                index
                element={
                  <PrivateRoute>
                    <ActivityManagement />
                  </PrivateRoute>
                }
              />

              <Route
                path="new-activity"
                element={
                  <PrivateRoute>
                    <CreateActivity />
                  </PrivateRoute>
                }
              />
              <Route path="templates">
                <Route
                  index
                  element={
                    <PrivateRoute>
                      <ViewTemplates />
                    </PrivateRoute>
                  }
                />

                <Route
                  path=":templateId"
                  element={
                    <PrivateRoute>
                      <ViewTemplate />
                    </PrivateRoute>
                  }
                />
              </Route>

              <Route
                path=":activityId/teams/:teamId"
                element={
                  <PrivateRoute>
                    <ViewActivity />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route
              path="projects"
              element={
                <PrivateRoute>
                  <SpringBoardProjects />
                </PrivateRoute>
              }
            />
            <Route
              path="project/:projId"
              element={
                <PrivateRoute>
                  <ProjectView />
                </PrivateRoute>
              }
            />
            <Route
              path="allteamprojects"
              element={
                <PrivateRoute>
                  <ClassTeamProjects />
                </PrivateRoute>
              }
            />
            <Route
              path="team/:teamid"
              element={
                <PrivateRoute>
                  <TeamProject />
                </PrivateRoute>
              }
            />
            <Route path="allprojects">
              <Route
                index
                element={
                  <PrivateRoute>
                    <SpringBoardAllProjects />
                  </PrivateRoute>
                }
              />
              <Route
                path="search-project/:projId"
                element={
                  <PrivateRoute>
                    <SearchProject />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route
              path="teknoplat"
              element={
                <PrivateRoute>
                  <TeknoPlat />
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

        <Route path="/allprojects">
          <Route
            index
            element={
              <PrivateRoute>
                <SpringBoardTeacherAllProjects />
              </PrivateRoute>
            }
          />
          <Route
            path="search-project/:projId"
            element={
              <PrivateRoute>
                <SearchProject />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/project/:id/create-board">
          <Route
            path=":templateid/rules"
            element={
              <PrivateRoute>
                <Rules />
              </PrivateRoute>
            }
          />
          <Route
            path=":templateid/template"
            element={
              <PrivateRoute>
                <AddBoard />
              </PrivateRoute>
            }
          />
          <Route
            path=":boardid/result"
            element={
              <PrivateRoute>
                <Result />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="project/:id/board/:boardid">
          <Route
            index
            element={
              <PrivateRoute>
                <ViewBoard />
              </PrivateRoute>
            }
          />
          <Route
            path="edit"
            element={
              <PrivateRoute>
                <EditBoard />
              </PrivateRoute>
            }
          />
          <Route
            path="edit/result"
            element={
              <PrivateRoute>
                <EditBoardResult />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
