import { Authorithation } from '../components/Authorithation';
import { CurrentDay } from '../components/currentDay';
import { Dashboard } from '../components/dashboard';
import { EditPage } from '../components/edit';
import {
  START,
  DASHBOARD,
  EDIT,
  CURRENT_DAY
} from './constants/routes';

export const publicRoutes = [
  {
    path: START,
    component: Authorithation,
  },
];

export const privateRoutes = [
  {
    path: CURRENT_DAY,
    component: CurrentDay,
  },
  {
    path: DASHBOARD,
    component: Dashboard,
  },
  {
    path: EDIT,
    component: EditPage,
  },
];
