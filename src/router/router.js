import { createWebHistory, createRouter } from "vue-router";
import { isLoggedUser } from "@/Hooks/isLoggedUser";
import { updateProjects } from "@/Hooks/updateProjects";

import Home from "@/views/Home/Home";
import HomeGuest from "@/views/Home/HomeGuest";
// import Login from "@/views/Login/Login";
import Panel from "@/views/Panel/Panel";
import Project from "@/views/Project/Project";

import Error_404 from "@/errors/Error_404";
import Error_403 from "@/errors/Error_403";

import Dev from "@/views/Dev/Dev";

const routes = [
  {
    path: "/404",
    name: "Error_404",
    component: Error_404,
  },
  {
    path: "/403",
    name: "Error_403",
    component: Error_403,
  },
  {
    path: "/",
    name: "Home",
    component: isLoggedUser() ? Home : HomeGuest,
  },
  {
    path: "/change-role",
    name: "ChangeRole",
    component: Dev,
  },
  {
    path: "/share",
    name: "HomeGuest",
    component: HomeGuest,
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: Login,
  // },
  {
    path: "/project/:id",
    name: "Project",
    component: Project,
  },
  { path: '/#/panel', redirect: '/panel' },
  {
    path: "/panel",
    name: "Panel",
    component: Panel,
  },
  { path: '/:catchAll(.*)', redirect: '/404', hidden: true }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
  if (to.fullPath.substr(0,2) === "/#") {
    const path = to.fullPath.substr(2);
    next(path);
    return;
  }
  next();
});

router.afterEach((to) => {
  // if (to.path === "/" && from.path === "/") {
  if (to.path === "/") {
    updateProjects()
  }
})

export default router;