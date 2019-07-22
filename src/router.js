import Vue from 'vue'
import Router from 'vue-router'
import customer from './views/customer.vue'
import invoice_o from './views/invoice_o.vue'
import invoice_t from './views/invoice_t.vue'
import analysis from './views/analysis.vue'
import audit from './views/audit.vue'
import notice from './views/notice.vue'
import declare from './views/declare.vue'
import progress from './views/progress.vue'
import statistics from './views/statistics.vue'

import formula from './views/formula.vue'
import template from './views/template.vue'
import rate from './views/rate.vue'
import dictionary from './views/dictionary.vue'
import taxnotice from './views/taxnotice.vue'
import reportForms from './views/reportForms.vue'
import paySheet from './views/paySheet.vue'
import payEdit from './views/payEdit.vue'
import personalIncomeIndex from './views/personalIncomeIndex.vue'
import incomeTaxCalculate from './views/incomeTaxCalculate.vue'
import showReport from './views/showReport.vue'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			redirect: '/index/personalIncomeIndex'
		},
		{
			path: '/login',
			name: 'login',
			component: () => import( /* webpackChunkName: "about" */ './views/login.vue')
		},
		{
			path: '/index',
			name: 'index',
			component: () => import( /* webpackChunkName: "about" */ './views/index.vue'),
			children: [{
					path: 'customer',
					name: 'customer',
					component: () => import( /* webpackChunkName: "about" */ './views/customer.vue')
				},
				{
					path: 'invoice_o',
					name: 'invoice_o',
					component: () => import( /* webpackChunkName: "about" */ './views/invoice_o.vue')
				},
				{
					path: 'analysis',
					name: 'analysis',
					component: () => import( /* webpackChunkName: "about" */ './views/analysis.vue')
				},
				{
					path: 'invoice_t',
					name: 'invoice_t',
					component: () => import( /* webpackChunkName: "about" */ './views/invoice_t.vue')
				},
				{
					path: 'audit',
					name: 'audit',
					component: () => import( /* webpackChunkName: "about" */ './views/audit.vue')
				},
				{
					path: 'audit',
					name: 'audit',
					component: () => import( /* webpackChunkName: "about" */ './views/audit.vue')
				},
				{
					path: 'notice',
					name: 'notice',
					component: () => import( /* webpackChunkName: "about" */ './views/notice.vue')
				},
				{
					path: 'declare',
					name: 'declare',
					component: () => import( /* webpackChunkName: "about" */ './views/declare.vue')
				},
				{
					path: 'progress',
					name: '/progress',
					component: () => import( /* webpackChunkName: "about" */ './views/progress.vue')
				},
				{
					path: 'statistics',
					name: 'statistics',
					component: () => import( /* webpackChunkName: "about" */ './views/statistics.vue')
				},
				
				{
					path: 'formula',
					name: 'formula',
					component: () => import( /* webpackChunkName: "about" */ './views/formula.vue')
				},
				{
					path: 'template',
					name: 'template',
					component: () => import( /* webpackChunkName: "about" */ './views/template.vue')
				},
				{
					path: 'stampduty',
					name: 'stampduty',
					component: () => import( /* webpackChunkName: "about" */ './views/stampduty.vue')
				},
				{
					path: 'rate',
					name: 'rate',
					component: () => import( /* webpackChunkName: "about" */ './views/rate.vue')
				},
				{
					path: 'dictionary',
					name: 'dictionary',
					component: () => import( /* webpackChunkName: "about" */ './views/dictionary.vue')
				},
				{
					path: 'taxnotice',
					name: 'taxnotice',
					component: () => import( /* webpackChunkName: "about" */ './views/taxnotice.vue')
				},
				{
					path: 'incomeTaxCalculate',
					name: 'incomeTaxCalculate',
					component: () => import( /* webpackChunkName: "about" */ './views/incomeTaxCalculate.vue')
				},
				{
					path: 'initialSheet',
					name: 'initialSheet',
					component: () => import( /* webpackChunkName: "about" */ './views/initialSheet.vue')
				},
				{
					path: 'employeeDetail',
					name: 'employeeDetail',
					component: () => import( /* webpackChunkName: "about" */ './views/employeeDetail.vue')
				},
				{
					path: 'reportForms',
					name: 'reportForms',
					component: () => import( /* webpackChunkName: "about" */ './views/reportForms.vue')
				},{
					path: 'paySheet',
					name: 'paySheet',
					component: () => import( /* webpackChunkName: "about" */ './views/paySheet.vue')
				},{
					path: 'payEdit',
					name: 'payEdit',
					component: () => import( /* webpackChunkName: "about" */ './views/payEdit.vue')
				},{
					path: 'personalIncomeIndex',
					name: 'personalIncomeIndex',
					component: () => import( /* webpackChunkName: "about" */ './views/personalIncomeIndex.vue')
				},{
					path: 'showReport',
					name: 'showReport',
					component: () => import( /* webpackChunkName: "about" */ './views/showReport.vue')
				}
				
				
				
			]
		},
		{
			path: '*',
			redirect: '/index/personalIncomeIndex'
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
