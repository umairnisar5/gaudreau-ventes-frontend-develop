export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'Gestion des demandes',
    icon: 'table',
    component: './Welcome',
    className: 'menu-item',
  },
  {
    path: '/rapports',
    name: 'Rapports',
    icon: 'table',
    component: './Welcome',
  },
  {
    path: '/tableau',
    name: 'Tableau de bord',
    disabled: true,
    icon: 'table',
    component: './Welcome',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
