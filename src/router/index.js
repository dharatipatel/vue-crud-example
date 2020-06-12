import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "../views/EventCreate.vue";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import Nprogress from "nprogress";
import store from "@/store/index";
import NotFound from "../views/NotFound.vue";
import NetworkIssue from "../views/NetworkIssue.vue";
import Example from "../views/Example.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: true
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch("event/fetchEvent", routeTo.params.id)
        .then(event => {
          routeTo.params.event = event;
          next();
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: "404", params: { resource: "event" } });
          } else {
            next({ name: "network-issue" });
          }
        });
    }
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate
  },
  {
    path: "404",
    name: "404",
    component: NotFound,
    props: true
  },
  {
    path: "*",
    redirect: { name: "404", params: { resource: "page" } }
  },
  {
    path: "network-issue",
    name: "network-issue",
    component: NetworkIssue
    // props: true
  },
  {
    path: "/example",
    name: "example",
    component: Example
  }
  // {
  //   // path: "/about-us",
  //   // name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((routeTo, routeFrom, next) => {
  Nprogress.start();
  next();
});

router.afterEach(() => {
  Nprogress.done();
});

export default router;
