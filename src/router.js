import Vue from 'vue'
import Router from 'vue-router'
import router1 from './views/router1.vue'

import router2 from './views/router2.vue'
import router3 from './views/router3.vue'
import router4 from './views/router4.vue'
Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			redirect: 'login'
		},
		{
			path: '/login',
			name: 'login',
			component: () => import( /* webpackChunkName: "about" */ './views/login.vue')
		},
		{
			path: '/home',
			name: 'home',
			component: () => import( /* webpackChunkName: "about" */ './views/home.vue'),
			children: [{
					path: '/router1',
					name: 'router1',
					component: () => import( /* webpackChunkName: "about" */ './views/router1.vue')
				},
				{
					path: '/router2',
					name: 'router2',
					component: () => import( /* webpackChunkName: "about" */ './views/router2.vue')
				},
				{
					path: '/router3',
					name: 'router3',
					component: () => import( /* webpackChunkName: "about" */ './views/router3.vue')
				},
				{
					path: '/router4',
					name: 'router4',
					component: () => import( /* webpackChunkName: "about" */ './views/router4.vue')
				},
			]
		},
		{
			path: '*',
			redirect: 'login'
		}
		// {
		//   path: '/about',
		//   name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		// component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		// }

	]
})
