const SIDENAV_DEFAULT = [{ id: 1, label: 'Classes', className: 'classes', path: '/classes' }];

const SIDENAV_MODERATOR = [
  { id: 1, label: 'Classes', className: 'classes', path: '/classes' },
  {
    id: 2,
    label: 'Peer Evaluation',
    className: 'peer-eval',
    path: '/peer-eval',
  },
];

const SIDENAV_TEACHER = (classId) => [
  {
    id: 1,
    label: 'Dashboard',
    className: 'classes',
    path: `/classes/${classId}`,
  },
  {
    id: 2,
    label: 'Teams',
    className: 'teams',
    path: `/classes/${classId}/teams`,
  },
  {
    id: 3,
    label: 'Members',
    className: 'members',
    path: `/classes/${classId}/members`,
  },
];

const SIDENAV_CLASSMEMBER = (classId) => [
  {
    id: 1,
    label: 'Teams',
    className: 'teams',
    path: `/classes/${classId}/teams`,
  },
  {
    id: 2,
    label: 'Members',
    className: 'members',
    path: `/classes/${classId}/members`,
  },
  {
    id: 3,
    label: 'Peer Evals',
    className: 'peer-evals',
    path: `/classes/${classId}/evals`,
  },
];

export { SIDENAV_DEFAULT, SIDENAV_TEACHER, SIDENAV_CLASSMEMBER, SIDENAV_MODERATOR };
