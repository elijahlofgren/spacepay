import TodoApp from './TodoApp';
import TodoMain from './TodoMain';
import ClientLogin from './components/Auth/ClientLogin';

export default {
  path: '/',
  component: TodoApp,
  indexRoute: { component: TodoMain },
  childRoutes: [
    { path: 'login', component: ClientLogin }
  ]
};
