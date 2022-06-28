import { createRouter, createWebHistory } from 'vue-router'
import Map from '../views/Map.vue'
import Dashboard from '../views/Dashboard.vue'
import Help from '../views/Help.vue'
import About from '../views/About.vue'
import Home from '../components/Home'


const title = 'Reflow Berlin Pilot';

const routes = [
  { path: '/', redirect: { name: 'Home' } },
  { path: '/start/defaultsite', redirect: { name: 'Home' } },
  {
    path: '/start',
    name: 'Home',
    component: Home,
    meta: {
        title,
    },
  },
  {
      path: '/map',
      name: 'Map',
      component: Map,
      meta: {
          title,
      },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
        title,
    },
  },
  {
    path: '/help',
    name: 'Help',
    component: Help,
    meta: {
        title,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
        title,
    },
  },
  {
      path: '/imprint',
      name: 'Imprint',
      component: () => import('../views/Imprint.vue'),
      meta: {
          title,
      },
  },
  {
      path: '/privacypolicy',
      name: 'PrivacyPolicy',
      component: () => import('../views/PrivacyPolicy.vue'),
      meta: {
          title,
      },
  },

  {
    path: "/interest-survey",
    name:'InterestSurvey',
    component: () => import('../views/InterestSurvey.vue'),
    beforeEnter() {
      window.location.href = "https://forms.gle/sg113URQhvmM7EZx9";
    }
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
