<template>
	<div class="teachResearch commonWidth">
		<div class="teachResearchWrap">
			<div class="teachResearchNav common-left">
				<ul class="navUl">
					<li :class="{'liAct':liInx==0}" @click="clickNav(0)"><img src="../assets/target.png" alt="">目标计划</li>
					<li :class="{'liAct':liInx==1}" @click="clickNav(1)"><img src="../assets/elementary.png" alt="">听课评课</li>
					<li :class="{'liAct':liInx==2}" @click="clickNav(2)"><img src="../assets/analytics.png" alt="">教案统计</li>
				</ul>
			</div>
			<div class="teachResearchCont common-left">



				<!---目标计划 -->
				<div class="teachResearchBox" v-if="isShowNum == 0">
					<div class="trHead ">
						<div class="trHeadFl common-left">
							<span class="trHeadSpan">
								<el-select v-model="semesterVal" placeholder="请选择学期" size="small" @change="changeSemester(semesterVal)">
									<el-option v-for="(v,inx) in semesterOptions" :key="inx" :label="v.archiveName" :value="v"></el-option>
								</el-select>
							</span>
							<span class="trHeadSpan">
								<el-input placeholder="请输入计划名称或年级或学科" v-model="entIptOne" clearable size="small"></el-input>
							</span>
							<span class="trHeadSpan"><a href="javascript:;" class="searchBtn" @click="searchList()">搜索</a></span>

						</div>
						<div class="trHeadFr common-right">
							<a href="javascript:;" class="newPlanBtn" @click="planFramInfo(null,1)">新建计划</a>
						</div>
					</div>
					<div class="trTable">
						<table>
							<tr>
								<th>教研计划名称</th>
								<th>评课时间范围</th>
								<th>年级</th>
								<th>学科</th>
								<th>状态</th>
								<th>操作</th>
							</tr>
							<tr v-for="(v,inx) in targetPlanList" :key="inx">
								<td><a href="javascript:;" class="teachNameBtn" @click="jumpRelationPage(v)">{{v.planName}}</a></td>
								<td>{{v.startTime.split(" ")[0]}}/{{v.endTime.split(" ")[0]}}</td>
								<td><span v-for="(u,unx) in v.sysGrades" :key="unx">{{u.gradeName}}</span></td>
								<td>{{v.subjectName}}</td>
								<td><span class="orangeColor">已评({{v.state}})</span></td>
								<td>
									<a href="javascript:;" class="tdA" @click="planFramInfo(v,2)">修改</a>
									<a href="javascript:;" class="tdA" @click="deleteList(v.teachingResearchPlanId)">删除</a>
									<a href="javascript:;" class="tdA" @click="planFramInfo(v,3)">查看</a>
								</td>
							</tr>
							<tr v-if="!targetPlanList.length">
								<td colspan="6">暂时没有数据</td>
							</tr>
						</table>
					</div>

					<!-- 分页 -->
					<div class="pageWrap common-right" v-show="pageShowOne">
						<el-pagination background layout="total,prev, pager, next,jumper" :total="totalResultOne" :current-page.sync="currentPageOne" :page-size="showCountOne"
						 @size-change="handleSizeChange" @current-change="handleCurrentChange">
						</el-pagination>
					</div>

				</div>









				<!-- 听课评课 -->
				<div class="teachStudyBox" v-if="isShowNum == 1">
					<div class="teachStudyHead">
						<span class="tsHeadSpan">计划名称：
							<el-select v-model="planNameVal" placeholder="请选择计划名称" size="small" style="width: 220px;" v-bind:disabled="isAble" @change="changePlanName(planNameVal)">
								<el-option v-for="(v,inx) in planNameOptions" :key="inx" :label="v.planName" :value="v.id"></el-option>
							</el-select>
						</span>
						<span class="tsHeadSpan">学科：
							<el-select v-model="subjectVal" placeholder="请选择学科" style="width: 100px;" size="small" v-bind:disabled="isAble" @change="changeSub(subjectVal)">
								<el-option v-for="(v,inx) in subjectOptions" :key="inx" :label="v.subjectName" :value="v.subjectId"></el-option>
							</el-select>
						</span>
						<span class="tsHeadSpan">年级：
							<el-select v-model="gradeVal" placeholder="请选择年级" style="width: 100px;" size="small" @change="changeGrade(gradeVal)">
								<el-option v-for="(v,inx) in gradeOptions" :key="inx" :label="v.gradeName" :value="v.gradeId"></el-option>
							</el-select>
						</span>
						<span class="tsHeadSpan">
							<el-input placeholder="请输入老师姓名查询" v-model="teachNameIpt" clearable size="small" style="width: 150px;"></el-input>
						</span>
						<span><a href="javascript:;" class="searchBtn" @click="searchTeacherName()">搜索</a></span>
					</div>
					<div class="scoreCriteria common-right">
						<span class="checkScoreCriteria"><img src="../assets/hd_examine2.png" alt="">评分标准</span>
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
							</tr>
							<tr v-for="(v,inx) in lectureReviewsList" :key="inx">
								<td>{{inx+1}}</td>
								<td><a href="javascript:;" class="teachNameBtn" @click="classEvaluationDetailsPage(v)">{{v.teacherName}}</a></td>
								<td>{{v.total}}</td>
								<td>{{v.gradeName}}</td>
								<td>{{v.subjectName}}</td>
								<td><span class="orangeColor">{{v.count}}</span></td>
							</tr>
							<tr>
								<td colspan="6" v-if="!lectureReviewsList.length">暂时没有数据</td>
							</tr>
						</table>
					</div>

				</div>





				<!-- 教案统计 -->
				<div class="lessonPlanStatistics" v-if="isShowNum == 2">
					教案统计
				</div>




				<!-- 教学教研-新建计划弹框 -->
				<div class="newPlanFram">
					<el-dialog title="新建教研计划" :visible.sync="newPlanVisible" width="50%" center>
						<div class="newPlanDiv">
							<div class="newPlanList newPlanHigth32">
								<span class="newPlanIntroducer common-left">计划名称：</span>
								<span class="newPlandetails common-left">
									<el-input placeholder="请输入计划名称" v-model="entIpt" clearable size="small" maxlength="20"></el-input>
								</span>
							</div>
							<div class="newPlanList newPlanHigth32">
								<span class="newPlanIntroducer common-left">评课时间范围：</span>
								<span class="newPlandetails">
									<el-date-picker v-model="dataValue"
                  type="datetimerange"
                  format="yyyy-MM-dd HH:mm:ss"
									value-format="yyyy-MM-dd HH:mm:ss"
									range-separator="至" start-placeholder="开始日期"
									end-placeholder="结束日期" @change="changeData(dataValue)">
									</el-date-picker>
								</span>
							</div>
							<div class="newPlanList newPlanHigth62">
								<span class="newPlanIntroducer common-left">选择评课模板：</span>
								<div class="newPlandetails">
									<!-- <span class="classTemplateList common-left" v-for="(v,inx) in lessonTemplateList" :key="inx"  :class="{'spanAct':ttInx==inx}" @click="timetable(inx,v.lessonTemplateId)">{{v.title}}</span> -->
									<span class="classTemplateList common-left" v-for="(v,inx) in lessonTemplateList" :key="inx"  :class="{'spanAct':ttInx==v.lessonTemplateId}" @click="timetable(v.lessonTemplateId)">{{v.title}}</span>
									<span class="classTemplateList common-left"><img src="../assets/popup_add.png" alt="">新增评课模板</span>
								</div>
							</div>

							<div class="newPlanList newPlanHigth62">
								<span class="newPlanIntroducer common-left">选择年级：</span>
								<div class="newPlandetails common-left">
									<el-checkbox-group v-model="checkBoxVal" @change="changeCheckBox(checkBoxVal)">
										<el-checkbox v-for="(v,inx) in checkBoxList" :key="inx" :label="v.gradeId">{{v.gradeName}}</el-checkbox>
									</el-checkbox-group>
								</div>
							</div>

							<div class="newPlanList newPlanHigth62">
								<span class="newPlanIntroducer common-left">选择科目：</span>
								<div class="newPlandetails common-left subjectList">
									<!-- <span v-for="(v,inx) in subjectNameList" :key="inx" :class="{'sjAct':subNum==inx}" @click="changeSubeject(inx,v.subjectId)">{{v.subjectName}}</span> -->
									<span v-for="(v,inx) in subjectNameList" :key="inx" :class="{'sjAct':subNum==v.subjectId}" @click="changeSubeject(v.subjectId)">{{v.subjectName}}</span>
								</div>
							</div>
							<div class="newPlanList">
								<span class="newPlanIntroducer common-left">选择评分人：</span>
								<div class="newPlandetails common-left">
									<div class="teacherNameBox">
										<span class="teacherNameList">{{this.selectTeacherName}}<img src="../assets/popup_del.png" alt="" @click="delTeacherName()"></span>
										<!-- <span class="teacherNameList" v-for="(v,inx) in tNList" :key="inx">{{v.teacherName}}<img src="../assets/popup_del.png" alt="" @click="delTeacherName()"></span> -->
									</div>
									<div class="searchName">
										<span class="common-left">
											<el-input placeholder="请输入老师姓名" v-model="tNIpt" clearable size="small" maxlength="20"></el-input>
										</span>
										<a href="javascript:;" class="searchBtn common-left" @click="searchName()">搜索</a>
									</div>
									<div class="teacherNameModel">
										<span class="teacherNameModelList " :class="{'teacherAct':teachNum == inx}" v-for="(v,inx) in teacherNameList"
										 :key="inx" @click="selectTeacher(v.teacherName,inx,v.teacherId)">{{v.teacherName}}</span>
									</div>
								</div>
							</div>
						</div>
						<span slot="footer" class="dialog-footer">
							<el-button @click="newPlanVisible = false">取消</el-button>
							<el-button @click="submitNewPlan()" v-if="submitShow">提交</el-button>
						</span>
					</el-dialog>
				</div>


			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				liInx: 0,
				isShowNum: 0,

				//-----------------------------目标计划-------------------------------------------------------------
				//学期
				semesterVal: '',
				semesterOptions: [], //学期arr

				entIptOne: '', //input框v-model值

				targetPlanList: [], //初始化列表数据
				afterTargetPlanList: [],//搜索后列表数据

				// 分页
				currentPageOne: 1, // 初始页
				showCountOne:8,
				totalResultOne: 0, //总数
				pageShowOne:true,//没有数据时不显示分页

        //--------------------------------听课评课----------------------------------------------------------
        isAble:false,//是否禁用下拉框
				// 计划名称
				planNameVal: '',
				planNameOptions: [],

				// 学科
				subjectVal: '',
				subjectOptions: [],

				// 年级
				gradeVal: '',
				gradeOptions: [],

				teachNameIpt: '', //v-model老师姓名
				lectureReviewsList: [],//初始化列表数据
				afterLectureReviewsList: [], //搜索后的列表

        fkSchoolId:'',//学校id
        startTime:'',//开始时间
        endTime:'', //结束时间
				//-------------------------------------------------新建计划-------------------------------------------------------
        newPlanVisible: false, //新建计划显示
        submitShow:true,//新建计划弹框里提交按钮是否显示
        submitType:'',// 1-新建里面提交 2-修改提交

				entIpt: '', //计划名称

				dataValue: [], //评课时间范围

				checkBoxVal:[], //选中年级值
				checkBoxList:[],//年级列表

				lessonTemplateList:[],
        ttInx: 0, //新建计划-选择评课表默认选中第一个
        lessonTemplateId:'',//评课模板id

				subNum: 0,// 选中学科值
        subjectNameList: [],//学科列表

				teacherNameList: [],
				tNIpt: '', //老师姓名
				afterTeacherNameList: [], //搜索后教师姓名列表
				selectTeacherName: '',
        teachNum: 0,

        teachingResearchPlanId:'',


			}
		},
		mounted() {
			this.loading(); //加载提示


//-----------------------目标计划-----------------------------------------------------
			this.getTerm(); //获取学期数据

		},
		methods: {

			// 加载中......
			loading() {
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
			// 左侧列表展示
			clickNav(num) {
				this.liInx = num;
        this.isShowNum = num;

        this.loading(); //加载提示
        this.isAble = false;//禁用下拉框

        if(num == 1){ //听课评课页面
          this.subjectData();//获取全部学科
          this.getGradeData();//获取全部年级接口

          this.getSubjectGridData();//学科年级数据获取
          this.teachStudyList();//听课评课--列表展示数据
        }

			},












			//-------------------------------------------------------------------新建计划弹框------------------------------------------------------------
			// 新建计划弹框
      planFramInfo(v,type) { //type为1时-新建计划  2-目标计划修改列表  3-目标计划查看列表

        this.newPlanVisible = true;
        this.getGradeData();//年级接口数据
        this.newPlanInit(); //新建计划初始化数据

				if(type == 1){

          this.entIpt = '';//计划名称
          this.dataValue = [];//评课时间范围

          this.submitShow = true;
          this.submitType = 1;//新建提交按钮

				}else if(type == 2){
          this.submitShow = true;
          this.submitType = 2;//修改提交按钮
          this.teachingResearchPlanId = v.teachingResearchPlanId

          this.checkBoxVal = [];//初始化年级集合
          this.viewList(v.teachingResearchPlanId)//查看列表接口

				}else{
          this.submitShow = false;//隐藏提交按钮

          this.checkBoxVal = [];//初始化年级集合
					this.viewList(v.teachingResearchPlanId)//查看列表接口
				}

			},

			// 新建计划列表初始化（获取学科数据及模板数据及教师数据）
			newPlanInit(){
				var data = {
					"fkSchoolId":1
				}
				this.$ajax.post('/zhjy/teachingresearch/forwardCreateRemote.action', this.$qs.stringify(data), {
					headers: {
						"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
					}
				}).then((res) => {
          // console.log(res)
					this.lessonTemplateList = res.data.data.lessonTemplates;//评课模板数据
          this.subjectNameList = res.data.data.sysSubjects;//学科数据


				}).catch((err) => {

				})
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

          this.checkBoxList = res.data.data;
          this.gradeOptions = res.data.data;


				}).catch((err) => {

				})
      },

      // 选择评分人接口数据
      ratersList(){
          var data = {
            "fkSchoolId": 1,
            "fkSubjectId":this.subNum,
          }
          this.$ajax.post('/zhjy/teachingresearch/forwardAllSubjectTeachersRemote.action', this.$qs.stringify(data), {
            headers: {
              "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
            }
          }).then((res) => {

              if(res.data.success == 1){
                  this.teacherNameList = res.data.data;

              }else{
                this.$message({
                  type: 'error',
                  message: res.data.error
                });
              }

          }).catch((err) => {
              this.$message({
                  type: 'error',
                  message: res.data.error
                });
          })
      },

			// 切换日期范围
			changeData(dataValue){
				// console.log(dataValue)
			},


			// 选择评课表
			timetable(id) {
        this.ttInx = id
			},
      // 切换年级
			changeCheckBox(val){
        this.checkBoxVal.concat(JSON.stringify(val))
			},
			// 切换学科
			changeSubeject(id){
        this.subNum = id
        this.ratersList();
      },




			// 删除教师姓名
			delTeacherName() {

        if(this.teacherNameList.length > 1){
          console.log(1111)
          // this.teacherNameList.splice(inx,1)
        }else{
          this.$message({
            type: 'warning',
            message: '至少一名老师'
          });
        }
			},
			// 选择教师
			selectTeacher(teacherName, inx) {

				for (let i = 0; i < this.teacherNameList.length; i++) {
					this.selectTeacherName = this.teacherNameList[i].teacherName;
					// console.log(this.selectTeacherName)
				}
				this.selectTeacherName = teacherName;
				this.teachNum = inx;
			},
			// 根据老师姓名搜索
			searchName() {
				if (this.tNIpt) {

					let afterTeacherNameList = [];
					this.loading() //加载中
					this.teacherNameList.filter(item => {
						if (item.teacherName.indexOf(this.tNIpt) !== -1) {
							afterTeacherNameList.push(item);
						}
					})

					this.teacherNameList = afterTeacherNameList;
					console.log('新数组', afterTeacherNameList)

				} else {
					this.$message({
						message: '请输入名称再搜索',
						title: "温馨提示", //可传空
					});
				}
			},



			// 提交-----保存数据
			submitNewPlan(){
        if(this.submitType ==1){
          // alert('新建提交')
          this.newSubmitData();//新建弹框 --提交

        }else {
          //  alert('修改提交')
          this.modifyList()//列表修改功能--提交
        }

			},

      // 新建提交接口
      newSubmitData(){
        if(this.entIpt == ''){
            this.$message({
              type: 'warning',
              message: '计划名称不能为空!'
            });
          }else if(this.dataValue == ''){
            this.$message({
              type: 'warning',
              message: '时间范围不能为空!'
            });
          }else{
            var sysGradesStr = [];
            for(let i in this.checkBoxVal){
              sysGradesStr.push({fkSysGradeId:this.checkBoxVal[i]})
            }
            console.log(sysGradesStr)
            var data = {
              "planName":this.entIpt,
              "startTime":this.dataValue[0],
              "endTime":this.dataValue[1],
              "fkLessonTemplateId":this.ttInx,
              "sysGradesStr":sysGradesStr,
              "fkSysSubjectId":this.subNum,
              "scorerStr":[],
              "fkSchoolId":1
            }
            this.$ajax.post('/zhjy/teachingresearch/saveTeachingResearchPlanRemote.action', data, {
            }).then((res) => {
              // console.log(res)
              if(res.data.success == 1){
                this.$message({
                  type: 'success',
                  message: res.data.data
                });

              }else{
                this.$message({
                  type: 'error',
                  message: res.data.error
                });
              }
              this.newPlanVisible = false;
              //this.$router.go(0);//刷新页面展示新增数据

            }).catch((err) => {

            })
          }
      },
			// ------------------------------------------------------------------------右侧展示内容--------------------------------------------------





			//-----------------------------目标计划--------------------
			// 获取学期接口
			getTerm() {
				this.$ajax.post(this.contentPath().baseUrl + '/basedata/getArchives', {}, {
				}).then((res) => {
					// console.log(res)
					this.semesterOptions = res.data.data;
          this.semesterVal = this.semesterOptions[0].archiveName;//默认获取第一个学期

					this.listShow(); //列表展示

				}).catch((err) => {

				})
			},
			// 切换学期时选中的学期信息
			changeSemester(semesterVal) {
				// console.log(this.semesterVal)
				this.listShow(this.semesterVal.startTime,this.semesterVal.endTime)
			},
			// 列表展示
			listShow(startTime,endTime) {
				var data = {
					"startTime": '2016-08-31 23:59:59',
					"endTime": '2020-09-04 20:23:55',
					"fkSchoolId": 1,
					"currentPage":this.currentPageOne,
					"showCount":this.showCountOne
				}
				this.$ajax.post('/zhjy/teachingresearch/forwardTeachingResearchPlanRemote.action', this.$qs.stringify(data), {
					headers: {
						"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
					}
				}).then((res) => {
					// console.log(res)
					if(res.data.success == 0){
						this.targetPlanList = '';
						this.pageShowOne = false;//没有数据时分页隐藏
					}else{
						this.targetPlanList = res.data.data.teachingResearchPlans;
						this.pageShowOne = true;

						this.currentPageOne = res.data.data.currentPage;//获取当前页
						this.showCountOne = res.data.data.showCount;//获取每页多少条
						this.totalResultOne = res.data.data.total;//总数
					}



				}).catch((err) => {

				})
			},

			// 搜索列表功能
			searchList() {

				if (this.entIptOne) {

					let afterTargetPlanList = [];
					this.loading() //加载中
					this.targetPlanList.filter(item => {
						if (item.planName.indexOf(this.entIptOne) !== -1) {
							afterTargetPlanList.push(item);
						} else if (item.subjectName.indexOf(this.entIptOne) !== -1) {
							afterTargetPlanList.push(item);
						} else if (item.sysGrades[0].gradeName.indexOf(this.entIptOne) !== -1) {
							afterTargetPlanList.push(item);
						}
					})

					this.targetPlanList = afterTargetPlanList;
					// console.log('新数组', afterTargetPlanList)

				} else {
					this.$message({
						message: '请输入名称再搜索',
						title: "温馨提示", //可传空
					});
				}
			},

			//列表-删除功能
			deleteList(teachingResearchPlanId) {
				// console.log(teachingResearchPlanId)
				this.$confirm('您确定要删除么?', '删除提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

						var data = {
							'teachingResearchPlanId':teachingResearchPlanId,
						}
						this.$ajax.post('/zhjy/teachingresearch/deleteTeachingResearchPlanRemote.action', this.$qs.stringify(data), {
							headers: {
								"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
							}
						}).then((res) => {
							// console.log(res)
							if (res.data.success == 1) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								this.targetPlanList.splice(inx, 1)
							} else {
								this.$message({
									type: 'error',
									message: '删除失败!'
								});
							}


						}).catch((err) => {
							this.$message({
								type: 'error',
								message: '删除失败!'
							});
						})

				}).catch((err) => {

				})


			},
			//列表-查看功能
			viewList(teachingResearchPlanId) {

				var data = {
					"teachingResearchPlanId":teachingResearchPlanId
				}
				this.$ajax.post('/zhjy/teachingresearch/forwardShowTeachingResearchRemote.action', this.$qs.stringify(data), {
					headers: {
						"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
					}
				}).then((res) => {

          this.entIpt = res.data.data.planName;//计划名称

          this.ttInx = res.data.data.fkLessonTemplateId;//选取选中的模板


					let startTime = res.data.data.startTime;//开始时间
					let endTime = res.data.data.endTime;//结束时间
          this.dataValue = [startTime,endTime];//时间范围

          var gradeId = '';
          var sysGrades = res.data.data.sysGrades;
          for(let i in sysGrades){
            gradeId = sysGrades[i].gradeId;
            this.checkBoxVal.push(JSON.stringify(gradeId));//选中年级
          }
					console.log(this.checkBoxVal)

          this.subNum = res.data.data.fkSysSubjectId;//选中的学科id
					this.teacherNameList = res.data.data.scorer;//展示教师姓名
          // console.log(this.teacherNameList)
          this.ratersList();//评分人
				}).catch((err) => {

				})
			},

      //列表-修改里弹框(提交)接口
			modifyList(){
          var sysGradesStr = [];
          for(let i in this.checkBoxVal){
            sysGradesStr.push({fkSysGradeId:this.checkBoxVal[i]})
          }
          var data = {
             "teachingResearchPlanId":this.teachingResearchPlanId,
             "planName":this.entIpt,
             "startTime":this.dataValue[0],
             "endTime":this.dataValue[1],
             "fkLessonTemplateId":this.ttInx,
             "sysGradesStr":sysGradesStr,//年级集合
             "fkSysSubjectId":this.subNum,
             "scorerStr" :'',//评分人集合
             "fkSchoolId":1
          }
          this.$ajax.post('/zhjy/teachingresearch/updateTeachingResearchPlanRemote.action',data, {
          }).then((res) => {
            if(res.data.success == 1){
                this.newPlanVisible = false;
                this.$message({
									type: 'success',
									message: res.data.data
								});
            }else{
                this.$message({
									type: 'error',
									message: res.data.error
								});
            }

          }).catch((err) => {
              this.$message({
									type: 'error',
									message: res.data.error
							});
          })
			},

			// 底部分页
			handleSizeChange(val){ //每页展示多少条

				this.showCountOne = val;
				this.listShow(this.showCountOne)
			},
			handleCurrentChange(val){ //第几页

				this.loading(); //加载中
				this.currentPageOne = val;
				this.listShow(this.currentPageOne)
			},

      // 根据教研计划名称跳转到对应的听课评课页面
      jumpRelationPage(v){
          console.log(v)
          this.liInx=1;
          this.isShowNum =1;

          this.planNameVal = v.planName;//计划名称
          this.gradeOptions = v.sysGrades;//年级数组
          this.gradeVal = v.sysGrades[0].gradeId;//默认选中第一个
          this.subjectVal = v.fkSysSubjectId;//获取学科
          this.fkSchoolId = v.fkSchoolId;//获取学校id
          this.startTime = v.startTime;//获取开始时间
          this.endTime = v.endTime;//获取结束时间
          this.teachStudyList();//初始化列表接口

          this.isAble = true;//禁用下拉框
          this.lessonTemplateId = v.fkLessonTemplateId//获取模板id

      },




      //---------------------------听课评课-------------------------
      // 计划名称切换
      // changePlanName(val){
      //   this.planNameVal = val;
      //   this.teachStudyList()
      // },
      // 学科接口
      subjectData(){
          var data = {
            "dataType":1,//1-21 2-菁优
            "gradeTypeId":'',
          }
          this.$ajax.post(this.contentPath().baseUrl + '/basedata/getAllSysGradeTypeSubjectVo.action',data, {
          }).then((res) => {
              this.subjectOptions = res.data.data
          }).catch((err) => {

          })
      },

      //学科名称切换
      changeSub(val){
          this.subjectVal = val;
          this.teachStudyList();
      },
      // 年级切换
      changeGrade(val){
        //  console.log(val)
         this.gradeVal = val
         this.teachStudyList()
      },

			// 点击听课评课展示所有计划名称，根据计划名称展示对应的学科及年级，若年级为多个，则展示全部
			getSubjectGridData(){
				var data = {
          "startTime": '2016-08-31 23:59:59',
					"endTime": '2020-09-04 20:23:55',
					"fkSchoolId": 1,
				}
				this.$ajax.post('/zhjy/teachingresearch/initTeachingStudyRemote.action', this.$qs.stringify(data), {
					headers: {
						"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
					}
				}).then((res) => {
          // console.log(res)
          this.planInfoData = res.data.data.teachingResearchPlans
          for(let i in this.planInfoData){
            this.planNameOptions.push({
              planName:this.planInfoData[i].planName,
              id:this.planInfoData[i].teachingResearchPlanId
            })

            // this.subjectOptions.push({
            //   subjectName:this.planInfoData[i].subjectName,
            //   subjectId:this.planInfoData[i].fkSysSubjectId
            // })
            // this.gradeOptions=this.planInfoData[i].sysGrades.concat(this.planInfoData[i].sysGrades)

          }
          // console.log(this.planNameOptions)
          // console.log(this.gradeOptions)
          this.planNameVal = this.planNameOptions[0].planName;//计划名称
          // this.subjectVal =this.subjectOptions[0].subjectName;
          // this.gradeVal = this.gradeOptions.sysGrades[0].gradeName;

					//this.subjectOptions = res.data.data.sysSubjects;//学科
					//this.gradeOptions = res.data.data.sysGradides;//年级

				}).catch((err) => {

				})
			},
			// 列表数据获取
			teachStudyList(){
        var data = {
					"startTime":this.startTime,
					"endTime":this.endTime,
					"fkSchoolId":this.fkSchoolId,
					"subjectId":this.subjectVal,
					"gradeId":this.gradeVal,
					"currentPage":1,
					"showCount":10,
				}
				this.$ajax.post('/zhjy/teachingresearch/forwardTeachingStudyListRemote.action', this.$qs.stringify(data), {
					headers: {
						"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
					}
				}).then((res) => {
					// console.log(res)
					this.lectureReviewsList = res.data.data.teachingStudyVoList;

				}).catch((err) => {

				})
			},

			// 搜索老师姓名模糊查询列表信息
			searchTeacherName() {
				if (this.teachNameIpt) {

					let afterLectureReviewsList = [];
					this.loading() //加载中
					this.lectureReviewsList.filter(item => {
						if (item.teacherName.indexOf(this.teachNameIpt) !== -1) {
							afterLectureReviewsList.push(item);
						}
					})

					this.lectureReviewsList = afterLectureReviewsList;
					console.log('新数组', afterLectureReviewsList)

				} else {
					this.$message({
						message: '请输入名称再搜索',
						title: "温馨提示", //可传空
					});
				}
			},


			// 点击姓名跳转至评课详情
			classEvaluationDetailsPage(v) {
				this.$router.push({
					path: '/classEvaluationDetails',
					query: {
              dataV:JSON.stringify(v),
              lessonTemplateId:this.lessonTemplateId
					}
				})
			},





		},
	}
</script>

<style scoped>
	.teachResearchWrap {
		overflow: hidden;
		margin-top: 10px;
	}

	.teachResearchNav {
		width: 15%;
		margin-right: 20px;
		height: 500px;
		background-color: #fff;
	}

	.navUl li {
		height: 50px;
		line-height: 50px;
		text-align: center;
		cursor: pointer;
		border-left: 3px solid transparent;
	}

	.navUl li img {
		vertical-align: middle;
		margin-right: 10px;

	}

	.navUl .liAct {
		border-color: #55C3B1;
		background-color: #DDF3EF;

	}

	.navUl li:hover {
		border-color: #55C3B1;
		background-color: #DDF3EF;
	}

	/* ------------------------------------------右侧内容------------------------------------- */
	.teachResearchCont {
		width: 80%;
		height: 600px;
		background-color: #fff;
		padding: 15px;
	}

	/* 教研 */
	.trHead {
		height: 34px;
	}

	.trHeadSpan {
		margin-right: 30px;
	}

	.searchBtn {
		padding: 5px 15px;
		color: #fff;
		background-color: #FFA800;
		border-radius: 4px;
	}

	.searchBtn:hover {
		background-color: #FBD14B;
	}

	.newPlanBtn {
		padding: 3px 15px;
		border: 1px solid #FFA800;
		color: #FFA800;
		border-radius: 15px;
	}

	.newPlanBtn:hover {
		color: #fff;
		background-color: #FFA800;
	}

	.trTable {
		clear: both;
		margin: 20px 0;
	}

	.trTable table {
		width: 100%;
		color: #666;
	}

	.trTable table td,
	th {
		text-align: center;
		padding: 5px 3px;
		border: 1px solid #ddd;
	}

	.trTable table th {
		background-color: #FAFAFA;
		padding: 8px 3px;
	}

	.orangeColor {
		color: #FFA800;
	}

	.tdA {
		color: #55C3B1;
		margin: 0 5px;
	}

	.tdA:hover {
		color: #4BAC9C;
	}

	/* 听课评课 */
	.teachStudyHead {
		height: 34px;
		border-bottom: 1px solid #ddd;
		padding-bottom: 15px;
	}

	.tsHeadSpan {
		margin-right: 20px;
	}

	.teachNameBtn {
		color: #55C3B1;
	}

	.teachNameBtn:hover {
		color: #4BAC9C;
	}

	.checkScoreCriteria {
		padding: 3px 15px;
		border: 1px solid #FFA800;
		color: #FFA800;
		border-radius: 15px;
		margin: 20px 0;
		cursor: pointer;
	}

	.checkScoreCriteria img {
		vertical-align: middle;
		margin-right: 4px;
	}

	/* 教学教研-新建计划弹框样式 */
	/* .newPlanFram {} */

	.newPlanIntroducer {
		width: 13%;
		text-align: right;
		color: #000;
		margin-right: 10px;
	}

	.newPlandetails {
		width: 85%;
	}

	.newPlanList {
		clear: both;
		margin: 20px 0;
	}

	.newPlanHigth32 {
		height: 32px;
	}

	.newPlanHigth62 {
		height: 62px;
	}

	.classTemplateList {
		width: 140px;
		height: 40px;
		text-align: center;
		border: 1px solid #ddd;
		padding: 10px;
		margin-right: 20px;
		cursor: pointer;
	}

	.classTemplateList:hover {
		border-color: #55C3B1;
		color: #55C3B1;
	}

	.spanAct {
		border-color: #55C3B1;
		color: #55C3B1;
	}

	.classTemplateList img {
		vertical-align: middle;
		margin-right: 4px;
	}

	.subjectList span {
		padding: 3px 10px;
		border: 1px solid #ddd;
		background-color: #FAFAFA;
		color: #999;
		margin-right: 5px;
		margin-bottom: 5px;
		cursor: pointer;
	}

	.subjectList span:hover {
		color: #55C3B1;
		background-color: #DDF3EF;
		border-color: #DDF3EF;
	}

	.subjectList .sjAct {
		color: #55C3B1;
		background-color: #DDF3EF;
		border-color: #DDF3EF;
	}

	.teacherNameBox {
		border: 1px solid #ddd;
		padding: 6px;
	}

	.teacherNameList {
		padding: 3px 15px;
		border: 1px solid #ddd;
		background-color: #FAFAFA;
		margin-right: 5px;
		margin-bottom: 5px;
	}

	.teacherNameList img {
		margin-left: 6px;
		vertical-align: middle;
		cursor: pointer;
	}

	.searchName {
		height: 34px;
		margin: 10px 0;
	}

	.teacherNameModel {
		min-height: 100px;
		border: 1px solid #ddd;
		margin-bottom: 20px;
		padding: 8px;
	}

	.teacherNameModelList {
		padding: 3px 10px;
		border: 1px solid #ddd;
		background-color: #FAFAFA;
		cursor: pointer;
		margin-right: 5px;
		margin-bottom: 5px;
	}

	.teacherNameModelList:hover {
		background-color: #DDF3EF;
		color: #55C3B1;
		border-color: #DDF3EF;
	}

	.teacherAct {
		background-color: #DDF3EF;
		color: #55C3B1;
		border-color: #DDF3EF;
	}
</style>
