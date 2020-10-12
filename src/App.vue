<template>
	<div id="app">
		<div class="v-header">
			<ul class="headUl">
				<!-- <li class="liAct" @click="prepareLessonIndexPage()">协同备课</li>
				<li @click="teachResearchPage()">教学教研</li>
				<li @click="teachPlanAssessmentPage()">教案评审</li>
				<li @click="lessonTemplate()">评课模板</li>
				<li @click="treeList()">树</li> -->
				<!-- <router-link :to="{path:'/prepareLessonIndex',query:{name:'jack',age:18}}">协同备课</router-link> -->
				<router-link :to="{path:'/prepareLessonIndex'}" active-class="liAct" tag="li">协同备课</router-link>
				<router-link :to="{path:'/teachResearch'}" active-class="liAct" tag="li">教学教研</router-link>
				<router-link :to="{path:'/teachPlanAssessment'}" active-class="liAct" tag="li">教案评审</router-link>
				<router-link :to="{path:'/assessmentTemplateManagement'}" active-class="liAct" tag="li">评课模板</router-link>
				<router-link :to="{path:'/commonTree'}" active-class="liAct" tag="li">树</router-link>
				
				
				
			</ul>
		</div>
		<router-view />
	</div>
</template>

<script>
	export default {
		name: 'App',
		data () {
		  return {
			  
		  }
		},
		methods:{
			// 协同备课
			prepareLessonIndexPage(){
				this.$router.push({
					path: '/prepareLessonIndex',
					query: {
						
					}
				})
			},
			// 教学教研
			teachResearchPage(){
				this.$router.push({
					path: '/teachResearch',
					query: {
						
					}
				})
			},
			
			// 教案评审
			teachPlanAssessmentPage(){
				this.$router.push({
					path: '/teachPlanAssessment',
					query: {
						
					}
				})
			},
			// 评课模板
			lessonTemplate(){
				this.$router.push({
					path: '/assessmentTemplateManagement',
					query: {
						
					}
				})
			},
			
			// 树
			treeList(){
				this.$router.push({
					path: '/commonTree',
					query: {
						
					}
				})
			}
			
		},
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}

	* {
		margin: 0;
		padding: 0;
	}

	a {
		text-decoration: none;
		color: #000;
		display: inline-block;
	}
	span{
		display: inline-block;
	}
	html,
	body {
		width: 100%;
		height: 100%;
		background-color: #F6F6F6;
	}

	ul {
		list-style: none
	}

	ul>li {
		padding: 0;
		margin: 0;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	
	/* 头部共用页面样式 */
	.v-header{
		width: 100%;
		height: 50px;
		line-height: 50px;
		background-color: #55C3B1;
	}
	.headUl{
		width: 1240px;
		margin: auto;
	}
	.headUl li{
		width: 155px;
		float: left;
		color: #fff;
		text-align: center;
		cursor: pointer;
	}
	.headUl .liAct{
		background-color: #4BAC9C;
	}
	/* 固定宽度 */
	.commonWidth{
		width: 1240px;
		margin: auto;
	}
	.common-left{
		float: left;
	}
	.common-right{
		float: right;
	}
	/* 分页 */
	.pageWrap{
		clear: both;
		margin: 15px 0;
	}
	/* 页面提示图片 */
	#imgBox {
		text-align: center;
		padding: 5rem 0;
	}
	
	#imgBox img {
		/* width: 70%; */
	}
</style>
