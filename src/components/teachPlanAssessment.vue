<template>
	<div class="teachPlanAssessment commonWidth">
		<div class="tpaWrap">
			<div class="tpaHead">
				<div class="semester">
					<el-select v-model="semesterVal" placeholder="请选择学期" size="small">
						<el-option v-for="(v,inx) in semesterOptions" :key="inx" :label="v.archiveName" :value="v.archiveId"></el-option>
					</el-select>
				</div>
				<div class="timeFrame">
					<ul class="tfUl">
						<li :class="{'liAct':liInx==0}" @click="selectLi(0)">本周</li>
						<li :class="{'liAct':liInx==1}" @click="selectLi(1)">本月</li>
						<li :class="{'liAct':liInx==2}" @click="selectLi(2)">自定义</li>
					</ul>
					<span class="dataPicker" v-show="dataShow">
						<el-date-picker
						  v-model="dataValue"
						  type="daterange"
						  range-separator="至"
						  start-placeholder="开始日期"
						  end-placeholder="结束日期" size="small">
						</el-date-picker >
					</span>
				</div>
				<div class="queryDetails">
					<span class="qdHeadSpan">学科：
						<el-select v-model="subjectVal" filterable  placeholder="请选择学科" @change="changeSubject(subjectVal)" style="width: 100px;" size="small">
							<el-option v-for="(v,inx) in subjectOptions" :key="inx" :label="v.subjectName" :value="v.subjectId"></el-option>
						</el-select>
					</span>
					<span class="qdHeadSpan">年级：
						<el-select v-model="gradeVal" filterable  placeholder="请选择年级" @change="changeGrade(gradeVal)" style="width: 100px;" size="small">
							<el-option v-for="(v,inx) in gradeOptions" :key="inx" :label="v.gradeName" :value="v.gradeId"></el-option>
						</el-select>
					</span>
					<span class="qdHeadSpan">
						<el-input placeholder="请输入老师姓名查询" v-model="teachNameIpt" clearable size="small" style="width: 150px;"></el-input>
					</span>
					<span><a href="javascript:;" class="searchBtn" @click="searchList()">搜索</a></span>
				</div>
			</div>
			<div class="trTable">
				<table>
					<tr>
						<th>序号</th>
						<th>教案作者（点击姓名可评教案）</th>
						<th>教案数量</th>
						<th>年级</th>
						<th>科目</th>
						<th>状态</th>
						<th>申请修改状态</th>
					</tr>
					<!-- 搜索前 -->
					<tr v-for="(v,inx) in tableList" :key="inx" >
						<td>{{inx+1}}</td>
						<td><a href="javascript:;" class="teachNameBtn" @click="classEvaluationDetailsPage(v)">{{v.teacherName}}</a></td>
						<td>{{v.total}}</td>
						<td>{{v.gradeName}}</td>
						<td>{{v.subjectName}}</td>
						<td><span class="orangeColor">已评({{v.count}})</span></td>
						<td v-if="v.editorCount == 0">无</td>
						<td v-else>有</td>
					</tr>
					<tr v-if="!tableList.length">
						<td colspan="7">暂时没有数据</td>
					</tr>
				</table>
			</div>

      <!-- 分页 -->
					<div class="pageWrap common-right" v-show="pageShow">
						<el-pagination background layout="total,prev, pager, next,jumper" :total="totalResult" :current-page.sync="currentPage" :page-size="showCount"
						 @size-change="handleSizeChange" @current-change="handleCurrentChange">
						</el-pagination>
					</div>

		</div>


	</div>
</template>

<script>
export default {
  data () {
    return {
		//学期
		semesterVal:'',
		semesterOptions:[],
		// 学科
		subjectVal:'',
		subjectOptions:[],
		// 年级
		gradeVal:'',
		gradeOptions:[],

		teachNameIpt:'',

		dataValue:'',//日期
		liInx:0,
		dataShow:false,
    //-----------------------------------------------列表数据----------------------------------------------------------------------
		tableList:[],// 搜索前展示的数据
    afterTableList:[],// 搜索后展示的数据
    currentPage:1,//当前页
    showCount:10,//展示条数
    totalResult:0,//总数
    pageShow:true,//没有数据时不显示分页

	}
  },
  mounted(){
    this.loading () //加载中......
    this.getTerm();//学期接口
    this.getSubjectData();//学科接口
    this.getGradeData();//年级接口
    this.getList();//列表页数据
  },
  methods:{
	  // 加载中......
	  loading(){
	  	const loading = this.$loading({
	  		lock: true,
	  		text: '拼命加载中',
	  		spinner: 'el-icon-loading',
	  		background: 'rgba(255, 255, 255, 0.7)'
	  	});
	  	setTimeout(() => {
	  		loading.close();
	  	}, 2000);
	  },
	  // 选择(本周,本月,当为自定义时出现日期选择)
	  selectLi(num){
		  this.liInx = num;
		  if(num == 2){
			  this.dataShow = true;
		  }else{
			  this.dataShow = false;
      }

      // 获取本周
      this.showWeekFirstDay()

      // 获取本月
      //获得本月时间
    },














    // 学期接口
    getTerm() {
				this.$ajax.post(this.contentPath().baseUrl + '/basedata/getArchives', {}, {
				}).then((res) => {

					this.semesterOptions = res.data.data;
          this.semesterVal = this.semesterOptions[0].archiveName;//默认获取第一个学期

				}).catch((err) => {

				})
      },
      // 获取学科接口
      getSubjectData(){
        var data = {
        }
				this.$ajax.post( '/zhjy/teachingresearch/forwardInitSubjectRemote.action',data, {
				}).then((res) => {
          this.subjectOptions = res.data.data.sysSubjects;
          this.subjectVal = res.data.data.sysSubjects[0].subjectName;//默认选择第一个
				}).catch((err) => {

				})
      },
      // 切换学科改变列表
      changeSubject(val){
          // console.log(val)
          this.getList(val)
      },
    // 获取年级数据接口
      getGradeData(){
        var data = {
          "dataType":1,//1-21 2-菁优
          "gradeTypeId":'',
          "fkSchoolId":3007,
          "fkTeacherId":''
        }
				this.$ajax.post(this.contentPath().baseUrl + '/basedata/getAllBaseSysGrade.action',data, {
				}).then((res) => {
          this.gradeOptions = res.data.data;
          this.gradeVal = res.data.data[0].gradeName;//默认选择第一个
				}).catch((err) => {

				})
      },
      // 切换年级改变列表
      changeGrade(val){
        this.getList(val)
      },

      // 列表
      getList(subjectVal,gradeId){
        var data = {
					"startTime": '2016-08-31 23:59:59',
					"endTime": '2020-09-04 20:23:55',
          "fkSchoolId": 1,
          "subjectId":subjectVal,
          "gradeId":10,
					"currentPage":this.currentPage,
					"showCount":this.showCount
				}
				this.$ajax.post('/zhjy/teachingresearch/forwardLessonPlanReviewListRemote.action', this.$qs.stringify(data), {
					headers: {
						"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
					}
				}).then((res) => {
					// console.log(res)
					if(res.data.success == 0){
						this.tableList = '';
						this.pageShow = false;//没有数据时分页隐藏
					}else{
						this.tableList = res.data.data.teachingStudyVoList;
						this.pageShow = true;

						this.currentPage = res.data.data.currentPage;//获取当前页
						this.showCount = res.data.data.showCount;//获取每页多少条
						this.totalResult = res.data.data.total;//总数
					}

				}).catch((err) => {

				})
      },

    	// 列表分页
			handleSizeChange(val){ //每页展示多少条

				this.showCount = val;
				this.getList(this.showCount)
			},
			handleCurrentChange(val){ //第几页

				this.loading(); //加载中
				this.currentPage = val;
				this.getList(this.currentPage)
			},




	  // 根据教师姓名搜索
	  searchList(){
		  if(this.teachNameIpt){

			let afterTableList = [];
			this.loading () //加载中
		  	this.tableList.filter(item => {
		  	   if (item.teacherName.indexOf(this.teachNameIpt) !== -1) {
		  		   afterTableList.push(item);
				}
		  	})

		  	this.tableList = afterTableList;
		  	console.log('新数组',afterTableList)

		  }else{
		  	this.$message({
		  	    message:'请输入名称再搜索' ,
		  	    title: "温馨提示",//可传空
		  	});
		  }

	  },

    // 进入教案评审详情页
	  classEvaluationDetailsPage(v){
		  this.$router.push({
		  	path: '/teachPlanEvaluatDetailsOne',
		  	query: {
            dataV:JSON.stringify(v)
		  	}
		  })
	  },








  },


}
</script>

<style scoped>
.teachPlanAssessment{
	overflow: hidden;
	border: 1px solid #ddd;
	background-color: #fff;
	margin: 10px auto;
}
.tpaWrap{
	padding: 15px;
}
.timeFrame{
	margin: 20px 0;
	height: 32px;
}
.tfUl li{
	padding: 5px 15px;
	border: 1px solid #ddd;
	float: left;
	font-size: 14px;
	cursor: pointer;
}
.tfUl .liAct{
	color: #fff;
	background-color: #55C3B1;
	border-color: #55C3B1;
}
.dataPicker{
	margin-left: 10px;
}
.queryDetails{
	clear: both;
}
.qdHeadSpan{
	margin-right: 30px;
}
.searchBtn{
	padding: 5px 15px;
	color: #fff;
	background-color:#FFA800 ;
	border-radius: 4px;
}


.trTable{
	clear: both;
	margin: 20px 0;
}
.trTable table{
	width: 100%;
	color: #666;
}
.trTable table td,th{
	text-align: center;
	padding: 5px 3px;
	border: 1px solid #ddd;
}
.trTable table th{
	background-color: #FAFAFA;
	padding: 8px 3px;
}
.orangeColor{
	color:#FFA800 ;
}
.tdA{
	color: #55C3B1;
	margin: 0 5px;
}
.tdA:hover{
	color: #4BAC9C;
}

.teachNameBtn {
    color: #55C3B1;
}
.teachNameBtn:hover{
	color: #4BAC9C;
}


</style>
