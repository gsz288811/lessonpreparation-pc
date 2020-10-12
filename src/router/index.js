import Vue from 'vue'
import Router from 'vue-router'
import prepareLessonIndex from '@/components/prepareLessonIndex' //备课列表页
import makeLesson from '@/components/makeLesson' //制作集体协同备课
import makeLessonKz from '@/components/makeLessonKz' //制作课中协同备课
import previewClassEvaluation from '@/components/previewClassEvaluation' //预览评课协同备课

import commonTree from '@/commonTree/commonTree' //树


import teachResearch from '@/components/teachResearch' //教学教研
import classEvaluationDetails from '@/components/classEvaluationDetails' //评课详情

import teachPlanAssessment from '@/components/teachPlanAssessment' //教案评审
import teachPlanEvaluatDetailsOne from '@/components/teachPlanEvaluatDetailsOne' //教案评审详情1


import assessmentTemplateManagement from '@/components/assessmentTemplateManagement' //评课模板管理



Vue.use(Router)

export default new Router({
	routes: [{
			path: '/prepareLessonIndex',
			name: 'prepareLessonIndex',
			component: prepareLessonIndex
		},
		{
			path: '/makeLesson',
			name: 'makeLesson',
			component: makeLesson
    },
    {
			path: '/makeLessonKz',
			name: 'makeLessonKz',
			component: makeLessonKz
		},
		{
			path: '/previewClassEvaluation',
			name: 'previewClassEvaluation',
			component: previewClassEvaluation
		},
		{
			path: '/teachResearch',
			name: 'teachResearch',
			component: teachResearch
		},
		{
			path: '/classEvaluationDetails',
			name: 'classEvaluationDetails',
			component: classEvaluationDetails
		},
		{
			path: '/teachPlanAssessment',
			name: 'teachPlanAssessment',
			component: teachPlanAssessment
		},
		{
			path: '/teachPlanEvaluatDetailsOne',
			name: 'teachPlanEvaluatDetailsOne',
			component: teachPlanEvaluatDetailsOne
		},

		{
			path: '/assessmentTemplateManagement',
			name: 'assessmentTemplateManagement',
			component: assessmentTemplateManagement
		},
		{
			path: '/commonTree',
			name: 'commonTree',
			component: commonTree
		},
	]
})


