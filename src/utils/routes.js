import { Application } from "components/Application/Application";
import { Authorithation } from "../components/Authorithation";
import { CurrentDay } from "../components/currentDay";
import { TodoApp } from "../components/TodoApp";
import { TodoDashboard } from "../components/todoDashboard";
import { START, TODO, TODO_TEST, TODO_DASHBOARD } from './constants/routes'

export const publicRoutes = [
  {
    path: START,
    component: Authorithation
  }
]

export const privateRoutes = [
  {
    path: TODO,
    component: CurrentDay
  },
  {
    path: TODO_TEST,
    component: TodoApp
  },
  {
    path: TODO_DASHBOARD,
    component: TodoDashboard
  },
]