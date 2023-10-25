import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    beforeEnter: requireAuth,
    name: 'home',
    component: () => import("@/views/authentication/Home.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: () => import ("@/views/authentication/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/authentication/Registration.vue") 
  },
  {
    path: '/administrator',
    beforeEnter: requireAuth,
    name: 'admin',
    component: () => import ("@/views/administrator/Administrator.vue"),
  },
  {
    path: "/profile",
    beforeEnter: requireAuth,
    name: "profile",
    component: () => import("@/views/authentication/Profile.vue")
  },
  {
    path: "/requests",
    beforeEnter: requireAuth,
    name: "requests",
    component: () => import("@/views/client/Requests.vue")
  },
  {
    path: "/tasks/:taskType",
    beforeEnter: requireAuth,
    name: "tasks",
    component: () => import("@/views/executor/Tasks.vue"),
    children: [
      {
        path: "filter/:taskFilter",      
        component: () => import("@/views/executor/TasksFilter.vue")
      },
    ]
  },  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function requireAuth(to, from, next) {  
  let token = localStorage.getItem("token");

  if (typeof token !== "undefined" && token !== "" && token !== null) {
    return next();
  } else {
    if (router.currentRoute.path !== "/login") {
      router.push("/login");
    }
  }
}

export default router
