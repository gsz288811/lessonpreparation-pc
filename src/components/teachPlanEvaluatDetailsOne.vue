<template>
	<div class="teachPlanEvaluatDetailsOne commonWidth">
		<div class="tpedWrap">
			<div class="headWrap">
				<div class="cedHead">
					<div class="cedHeadFl common-left"><img src="../assets/lecturer.png" alt="">{{userName}}</div>
					<a href="javascript:;" class="common-right" @click="goBack()"><img src="../assets/hd_back.png" alt=""></a>
				</div>
				<div class="teachPlanBox">
					<p class="titelP">点击选择要评的教案：</p>
					<div class="teachPlanListWrap">

            <div class="teachPlanList common-left" v-for="(v,inx) in noTeachPlans" :key="inx" :class="{'tplAct':isnum==inx}" @click="clickList(inx)">
              <img src="" alt="" v-if="v.rating ==0 ||v.rating == null">
							<img src="../assets/alreadyEvaluated.png" alt="" style="width:15%;" class="common-left" v-else>
							<div class="listCont common-left">
								<p class="topicP">课题：<span>{{v.packageName}}</span></p>
								<p class="timeCharpter">{{v.gmtCreate.split(" ")[0]}} {{v.dirtreeName.split(" ")[0]}}</p>
							</div>
              	<img src="../assets/amendmentApplication.png" alt="" class="modifyImg" @click="changeCont()" v-if="v.editor == 1">
						</div>

					</div>
          <!-- 分页 -->
					<div class="pageWrap common-right">
						<el-pagination
						  small
						  layout="prev, pager, next"
						  :total="totalResult" :current-page.sync="currentPage" :page-size="showCount" @size-change="handleSizeChange" @current-change="handleCurrentChange">
						</el-pagination>
					</div>

				</div>
			</div>

			<div class="mainWrap">
				<div class="leftCont common-left">
          <div class="pceRightText">
				<!-- 头部内容 -->
				<div class="pcHead">

					<div class="previewClassTop">
						<div class="previewClassLeft common-left">
							<img src="../assets/school.png" alt="">{{schoolName}}
						</div>
						<!-- <div class="previewClassRight common-right">
							<img src="../assets/reviews.png" alt="" class="viewCommentBtn" @click="viewComments()">

						</div> -->
					</div>

					<div class="bigTitle">
						<span>
							<h4>{{packageName}}</h4>
						</span>
						<!-- <span class="commontBtn" @click="commentVisible = true" v-show="qzhShow"><img src="../assets/comment.png" alt="">评论</span> -->
					</div>
					<p class="specificTime common-right">时间：{{time}}</p>
					<div class="BindChapter">
						<p class="common-left">【绑定之前章节位置：<span class="chapterList">{{subjectName}}>{{courseDirtreeName}}>{{dirtreeName}}</span>
							】</p>
						<p class="previewOther common-right">
							<span><img src="../assets/preview_teacher.png" alt="">{{userName}}</span>
							<span><img src="../assets/preview_download.png" alt="">{{dNum}}</span>
							<span><img src="../assets/preview_admire.png" alt="">{{popularValue}}</span>
						</p>
					</div>
				</div>
				<!-- 主题内容 -->
				<div class="pcWrap">
					<!-- 基础项 -->
					<div class="baseItem common-list" id="cont1">
						<div class="commonTitle" >
							<span class="common-left"><img src="../assets/preview_Based.png" alt="">基础项</span>
						</div>
						<div class="baseItemDetails">
							<p>1.课题：{{topic}}</p>
							<p>2.年级：{{grade}}</p>
							<p>3.课型：{{lessonType}}</p>
							<p>4.课时：{{classHour}}</p>
							<p>5.备课组成员：{{preparatoryTeamMembers}}</p>
							<p>6.主备课人：{{lessonPreparer}}</p>
						</div>
					</div>
					<!-- 教学目标	 -->
					<div class="teachObject common-list" id="cont2">
						<div class="commonTitle">
							<span class="common-left"><img src="../assets/preview_objective.png" alt="">教学目标</span>
						</div>
						<p class="commonText">{{teachObject}}</p>
						<p class="commonText" v-if="teachObject == 'undefined' || teachObject == null || teachObject== ''">暂无数据</p>
					</div>
					<!-- 重点难点 -->
					<div class="keyDifficultPoints common-list" id="cont3">
						<div class="commonTitle">
							<span class="common-left"><img src="../assets/preview_emphasis.png" alt="">重点难点</span>
						</div>
						<p class="commonText" >{{KeyDifficultPoints}}</p>
						<p class="commonText" v-if="KeyDifficultPoints == 'undefined' || KeyDifficultPoints == null || KeyDifficultPoints== ''">暂无数据</p>
					</div>
					<!-- 教学工具 -->
					<div class="instructionalTools common-list" id="cont4">
						<div class="commonTitle" id="c">
							<span class="common-left"><img src="../assets/preview_tool.png" alt="">教学工具</span>
						</div>
						<p class="commonText">{{instructionalTools}}</p>
						<p class="commonText" v-if="instructionalTools == 'undefined' || instructionalTools == null || instructionalTools== ''">暂无数据</p>
					</div>
					<!-- 教学方法 -->
					<div class="teachMethod common-list" id="cont5">
						<div class="commonTitle" id="d">
							<span class="common-left"><img src="../assets/innovation.png" alt="">教学方法</span>
						</div>
						<p class="commonText">{{teachMethod}}</p>
						<p class="commonText" v-if="teachMethod == 'undefined' || teachMethod == null || teachMethod== ''">暂无数据</p>
					</div>
					<!-- 教学过程 -->
					<div class="teachProcess common-list" id="cont5">
						<div class="commonTitle" id="e">
							<span class="common-left"><img src="../assets/preview_design.png" alt="">教学过程</span>
						</div>
						<p class="commonText">{{teachProcess}}</p>
						<p class="commonText" v-if="teachProcess == 'undefined' || teachProcess == null || teachProcess== ''">暂无数据</p>
					</div>
					<!-- 关联资源 -->
					<div class="associatedResources common-list" id="cont6">
						<div class="commonTitle" id="f">
							<span class="common-left"><img src="../assets/preview_resource.png" alt="">关联资源</span>
						</div>
						<div class="arWrap">
							<!-- 集体分-课前-课中-课后 -->
							<div v-show="qzhShow">
								<!-- 课前 -->
								<div class="arQzh" id="cont61" v-if="hasBeforeClass == 1">
									<p class="arQzhTitle">
										<span href="javascript:;" class="oneTitle common-left">课前</span>
										<img src="../assets/Previewrelease_btn.png" alt="" class="common-right" @click="previewRelease()">
									</p>
									<div class="arQzhText">
										<div class="arQzhList" v-for="(v,inx) in beforeDetailVos" :key="inx">
											<div class="arQzhListLf common-left">
												<div class="guideTitle common-left">
													<span class="recourseType">{{v.resourceType}}</span>
													<b class="dot"></b>
													<img src="../assets/file/mp4.png" alt="" class="fileImg" v-if="v.resourceType=='微课'">
													<img src="../assets/resource_homework.png" alt="" class="fileImg" v-if="v.resourceType=='作业'">
													<img src="../assets/file/png.png" alt="" class="fileImg" v-if="v.resourceType=='附件'">
												</div>
												<div class="common-left">
													<h3 class="hTitle">{{v.resourceName}}</h3>
													<p class="resText">来源：{{v.fromSource}}</p>
												</div>
											</div>
											<div class="arQzhListRg common-right">
												<a :download="v.resourceName" @click="downloadRes(v.fkId,v.fkType,v.fkSubjectId)">
                          <img src="../assets/resource_clouddownload.png" alt="" v-if="v.resourceType=='附件'">
                        </a>
												<span>
													<el-checkbox v-model="kqchecked" size="medium" fill="#55C3B1"></el-checkbox>
												</span>
											</div>
										</div>

									</div>
								</div>
								<!-- 课中 -->
								<div class="arQzh" id="cont62" v-if="hasInClass == 1">
									<p class="arQzhTitle">
										<span href="javascript:;" class="oneTitle common-left">课中</span>
										<img src="../assets/Classcollection_btn.png" alt="" class="common-right">
									</p>
									<div class="arQzhText">
										<div class="arQzhList" v-for="(v,inx) in inDetailVos" :key="inx">
											<div class="arQzhListLf common-left">
												<div class="guideTitle common-left">
													<span class="recourseType" v-if="v.resourceType=='小组学习'">小组</span>
													<span class="recourseType" v-else>{{v.resourceType}}</span>

													<b class="dot"></b>
													<img src="../assets/file/ppt.png" alt="" class="fileImg" v-if="v.resourceType=='课件'">
                          <img src="../assets/practice.png" alt="" class="fileImg" v-if="v.resourceType=='练习'">
													<img src="../assets/resource_question.png" alt="" class="fileImg" v-if="v.resourceType=='提问'">
													<img src="../assets/resource_group.png" alt="" class="fileImg" v-if="v.resourceType=='小组学习'">
													<img src="../assets/resource_web.png" alt="" class="fileImg" v-if="v.resourceType=='网站'">
												</div>
												<div class="common-left">
													<h3 class="hTitle">{{v.resourceName}}</h3>
													<p class="resText">来源：{{v.fromSource}}</p>
												</div>
											</div>
											<div class="arQzhListRg common-right">
												<a :download="v.resourceName" @click="downloadRes(v.fkId,v.fkType,v.fkSubjectId)">
                          <img src="../assets/resource_clouddownload.png" alt="" v-if="v.resourceType=='网站' || v.resourceType=='课件'">
                        </a>
												<span>
													<el-checkbox v-model="kzchecked" size="medium" fill="#55C3B1" name="kz"></el-checkbox>
												</span>
											</div>
										</div>

									</div>
								</div>

								<!-- 课后 -->
								<div class="arQzh" id="cont63" v-if="hasAfterClass == 1">
									<p class="arQzhTitle">
										<span href="javascript:;" class="oneTitle common-left">课后</span>
										<img src="../assets/Workpublished_btn.png" alt="" class="common-right">
									</p>
									<div class="arQzhText">
										<div class="arQzhList" v-for="(v,inx) in afterDetailVos" :key="inx">
											<div class="arQzhListLf common-left">
												<div class="guideTitle common-left">
													<span class="recourseType">{{v.resourceType}}</span>
													<b class="dot"></b>
													<img src="../assets/resource_homework.png" alt="" class="fileImg" v-if="v.resourceType=='作业'">
												</div>
												<div class="common-left">
													<h3 class="hTitle">{{v.resourceName}}</h3>
													<p class="resText">来源：{{v.fromSource}}</p>
												</div>
											</div>
											<div class="arQzhListRg common-right">
												<!-- <img src="../assets/resource_clouddownload.png" alt=""> -->
												<span>
													<el-checkbox v-model="khchecked" size="medium" fill="#55C3B1" name="kh"></el-checkbox>
												</span>
											</div>
										</div>

									</div>
								</div>
							</div>

							<!-- 课中详情只有课中 -->
							<div class="arQzh" id="cont62" v-show="kzDetailShow">
								<p class="arQzhTitle">
									<span href="javascript:;" class="oneTitle common-left">课中</span>
									<img src="../assets/Classcollection_btn.png" alt="" class="common-right">
								</p>
								<div class="arQzhText" v-for="(v,inx) in bkActivities" :key="inx">

										<!-- 备课-资源 -->
										<div class="arQzhList" v-for="(u,unx) in v.bkResources" :key="unx" >
											<div class="arQzhListLf common-left">
												<div class="guideTitle common-left">
													<span class="recourseType">{{u.resourceType==1?'课件':'网址'}}</span>
													<b class="dot"></b>
													<img src="../assets/file/ppt.png" alt="" class="fileImg" v-if="u.resourceType==1">
													<img src="../assets/resource_newtest.png" alt="" class="fileImg" v-else>

												</div>
												<div class="common-left">
													<h3 class="hTitle">{{u.resourceAlias}}</h3>
													<p class="resText">来源：{{kzData.schoolName}}{{kzData.teacherName}}</p>
												</div>
											</div>
											<div class="arQzhListRg common-right">
												<a :href="u.resourceName" :download="u.resourceAlias" >
													<img src="../assets/resource_clouddownload.png" alt="">
												</a>
												<span>
													<el-checkbox v-model="kqchecked" :label="1" size="medium" fill="#55C3B1" @change="checkBoxVal()"></el-checkbox>
												</span>
											</div>
										</div>
										<!-- 备课-小组话题 -->
										<div class="arQzhList" v-for="(u,unx) in v.bkTpTeamTopics" :key="unx" >
											<div class="arQzhListLf common-left">
												<div class="guideTitle common-left">
													<span class="recourseType">小组</span>
													<b class="dot"></b>
													<img src="../assets/resource_group.png" alt="" class="fileImg">

												</div>
												<div class="common-left">
													<h3 class="hTitle">{{u.topicName}}</h3>
													<p class="resText">来源：{{kzData.schoolName}}{{kzData.teacherName}}</p>
												</div>
											</div>
											<div class="arQzhListRg common-right">
												<span>
													<el-checkbox v-model="kqchecked" size="medium" fill="#55C3B1"></el-checkbox>
												</span>
											</div>
										</div>
										<!-- 备课-课堂练习 -->
										<div class="arQzhList" v-for="(u,unx) in v.bkTpPractices" :key="unx">
											<div class="arQzhListLf common-left">
												<div class="guideTitle common-left">
													<span class="recourseType">练习</span>
													<b class="dot"></b>
													<img src="../assets/practice.png" alt="" class="fileImg">
												</div>
												<div class="common-left">
													<h3 class="hTitle">{{u.practiceName}}</h3>
													<p class="resText">来源：{{kzData.schoolName}}{{kzData.teacherName}}</p>
												</div>
											</div>
											<div class="arQzhListRg common-right">
												<span>
													<el-checkbox v-model="kqchecked" size="medium" fill="#55C3B1"></el-checkbox>
												</span>
											</div>
										</div>
										<!-- 备课-课堂教师提问 -->
										<div class="arQzhList" v-for="(u,unx) in v.bkTpQuestions" :key="unx" >
											<div class="arQzhListLf common-left">
												<div class="guideTitle common-left">
													<span class="recourseType">提问</span>
													<b class="dot"></b>
													<img src="../assets/resource_question.png" alt="" class="fileImg">
												</div>
												<div class="common-left">
													<h3 class="hTitle">{{u.tqName}}</h3>
													<p class="resText">来源：{{kzData.schoolName}}{{kzData.teacherName}}</p>
												</div>
											</div>
											<div class="arQzhListRg common-right">
												<span>
													<el-checkbox v-model="kqchecked" size="medium" fill="#55C3B1"></el-checkbox>
												</span>
											</div>
										</div>

								</div>
							</div>





						</div>
					</div>
					<!-- 教学反思 -->
					<div class="reflectionsTeach common-list" id="cont7">
						<div class="commonTitle" >
							<span class="common-left"><img src="../assets/preview_introspection.png" alt="">教学反思</span>
						</div>
						<p class="commonText">{{teachReflections}}</p>
						<p class="commonText" v-if="teachReflections == 'undefined' || teachReflections == null || teachReflections== ''">暂无数据</p>
					</div>
				</div>

			</div>


				</div>
				<div class="rightCont common-right">
					<!-- 未评 -->
					<div v-show="noCommentShow">
						<div class="lessonPlanReview">教案点评</div>
						<div class="padCont">
							<div>
								<el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="textarea">
								</el-input>
							</div>
							<div>
								<p class="getScoreTitle">得分：</p>
								<ul class="numUl">
									<li v-for="(num,inx) in 10" :class="{'liNumAct':istrue==inx}" @click="istrue=inx" :key="inx">{{num}}</li>
								</ul>
							</div>
							<div class="btnBox">
								<a href="javascript:;" class="btn" @click="sureBtn()">确定</a>
							</div>

						</div>

					</div>
					<!-- 申请修改 -->
					<div v-show="applicationAmendmentShow">
						<div>
							<div class="lessonPlanReview">申请修改</div>
							<p class="reviewText">{{modifyReasonText}}</p>
							<div class="btnBox">
								<a href="javascript:;" class="btn" @click="agreeModify()">同意</a>
								<a href="javascript:;" class="btn" @click="cancelModify()">取消</a>
							</div>
						</div>

						<div>
							<div class="lessonPlanReview">教案评语</div>
							<div class="teachcommentWrap">
								<div>
									<span class="ccLeft">评语：</span>
									<p class="ccRight tid">{{commentText}}</p>
								</div>
								<div class="commentContList">
									<span class="ccLeft">得分：</span>
									<span class="ccRight">{{commentScore}}</span>
								</div>
								<div>
									<span class="ccLeft">检查人：</span>
									<span class="ccRight">{{commentExaminer}}</span>
								</div>
							</div>
              <div v-if="!viewCommentList.length">
                <p>暂无评语！！！</p>
              </div>
						</div>

					</div>

				</div>
			</div>


		</div>


	</div>

</template>

<script>
	export default {
		data() {
			return {

        userName:'',//名字

        //----------------------------------------------------要评教案列表-------------------------
				noTeachPlans: [],
        currentPage:1,//当前页
        showCount:8,//每页展示条数
        totalResult:0,//总条数
        isnum: 0,//当前选中的教案
        type:1,//默认1-集体，2-课中

        //-----------------------------------------教案点评与申请修改---------------------------------
        noCommentShow: true, //未评（教案点评显示状态）
				applicationAmendmentShow: false, //申请修改显示状态
        textarea: '',//教案点评内容
        istrue: 6,//教案点评选中的分数
        modifyReasonText:'',//修改理由

        viewCommentList:[],//教案评语
        commentText:'',//评语内容
        commentScore:'',//评论得分
        commentExaminer:'',//检查人


        //--------------------------------------------------左侧------------------------------------------------
        kqchecked: [], //课前复选框值
				kzchecked: [], //课中复选框值
				khchecked: [], //课后复选框值

				qzhShow: true, //当type为1是集体时显示所有（课前，课中，课后）以及显示评论，为2是课中时只显示课中（备课详情）并隐藏评论
				kzDetailShow:true, //关联资源下只展示课中资源（课中详情）

				schoolName: '', //学校名称
				packageName: '', //标题
				time: '', //时间
				subjectName: '', //学科
				courseDirtreeName: '', //教材
				dirtreeName: '', //章节
				userName: '', //老师姓名
				dNum: '', //下载次数
				popularValue: '', //人气

				topic: '', //课题
				grade: '', //年级
				lessonType: '', //课型
				classHour: '', //课时
				preparatoryTeamMembers: '', //备课组成员
				lessonPreparer: '', //主备课人
				teachObject: '', //教学目标
				KeyDifficultPoints: '', //重点难点
				instructionalTools: '', //教学工具
				teachMethod: '', //教学方法
				teachProcess: '', //教学过程
				teachReflections: '', //教学反思



				// 集体详情数据
				cpData: '',
				beforeDetailVos: [], //课前
				inDetailVos: [], //课中
				afterDetailVos: [], //课后

				totalResult:0,//分页总条数
				currentPage:1,
				showCount:6,
				leaveList:'',//评论列表
				pageShow:true,

				hasBeforeClass:'',//判断是否有课前
				hasInClass:'',//判断是否有课中
				hasAfterClass:'', //判断是否有课后

				// 课中详情数据
				kzData: '',
				bkActivities: '', //备课详情


			}
    },
    mounted(){
      this.dataV = JSON.parse(this.$route.query.dataV);//获取上个页面传过来的数据
      console.log(this.dataV)
      this.userName = this.dataV.teacherName
      this.lessonPlanList();//教案展示列表
      this.previewDetailsData();//左侧预览详情展示数据
    },
		methods: {
			// 返回
			goBack() {
				this.$router.go(-1);
      },

      //-------------------------------------------------- 左侧接口--------------------------------------------------
      // 预览详情数据
			previewDetailsData() {
				//type(1-集体  2-课中）
				if (this.type == 1) {
            this.kzDetailShow = false;
            var data = {
              'packageId': 41122,
              'userId':this.dataV.teacherId
            }
            this.$ajax.post('/zhjy/classpackage/forwardDetailRemote.action', this.$qs.stringify(data), {
              headers: {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
              }
            }).then((res) => {
              // console.log(res)
              this.cpData = res.data.data.cp;

              this.schoolName = this.cpData.schoolName; //学校名称
              this.packageName = this.cpData.packageName; //标题
              this.time = this.cpData.gmtCreate; //时间

              this.subjectName = this.cpData.subjectName; //学科
              this.courseDirtreeName = this.cpData.courseDirtreeName; //教材
              this.dirtreeName = this.cpData.dirtreeName; //章节

              this.userName = this.cpData.userName; //老师姓名
              this.dNum = this.cpData.dNum; //下载次数
              this.popularValue = this.cpData.popularValue; //人气



              this.topic = this.cpData.cpbDirtreeName; //课题
              this.grade = this.cpData.gradeName; //年级
              this.lessonType = this.cpData.lessonTypeName; //课型
              this.classHour = this.cpData.period; //课时
              this.preparatoryTeamMembers = this.cpData.components; //备课组成员
              this.lessonPreparer = this.cpData.userName; //主备课人



              this.teachObject = this.cpData.teachingAims; //教学目标
              this.KeyDifficultPoints = this.cpData.importance; //重点难点
              this.instructionalTools = this.cpData.teachingTools; //教学工具
              this.teachMethod = this.cpData.teachingMethod; //教学方法
              this.teachProcess = this.cpData.teachingProcess; //教学过程
              this.teachReflections = this.cpData.teachingReflect; //教学反思



              this.beforeDetailVos = res.data.data.beforeDetailVos; //课前
              this.inDetailVos = res.data.data.inDetailVos; // 课中
              this.afterDetailVos = res.data.data.afterDetailVos; //课后

            }).catch((err) => {

            })



				} else {
					this.qzhShow = false; // 当为课中时关联资源下只展示课中的信息
					var data = {
						'packageId': this.packageId,
					}
					this.$ajax.post('/zhjy/bkprepare/forwordClassPackagePrepareslessonDetialRemote.action', this.$qs.stringify(
						data), {
						headers: {
							"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
						}
					}).then((res) => {
						// console.log(res)
						this.kzData = res.data.data;
						this.bkActivities = res.data.data.bkActivities; //备课详情


						this.schoolName = this.kzData.schoolName; //学校名称
						this.packageName = this.kzData.prepareName; //标题
						this.time = this.kzData.saveTime; //时间

						this.subjectName = this.kzData.subjectName; //学科
						this.courseDirtreeName = this.kzData.courseDirtreeName; //教材
						this.dirtreeName = this.kzData.dirtreeName; //章节

						this.userName = this.kzData.teacherName; //老师姓名
						this.dNum = this.kzData.dNum; //下载次数
						this.popularValue = this.kzData.popularValue; //人气

						this.topic = this.kzData.cpbDirtreeName; //课题
						this.grade = this.kzData.gradeName; //年级
						this.lessonType = this.kzData.lessonTypeName; //课型
						this.classHour = this.kzData.period; //课时
						this.preparatoryTeamMembers = this.kzData.components; //备课组成员
						this.lessonPreparer = this.kzData.teacherName; //主备课人

						this.teachObject = this.kzData.teachingAims; //教学目标
						this.KeyDifficultPoints = this.kzData.importance; //重点难点
						this.instructionalTools = this.kzData.teachingTools; //教学工具
						this.teachMethod = this.kzData.teachingMethod; //教学方法
						this.teachProcess = this.kzData.teachingProcess; //教学过程
						this.teachReflections = this.kzData.teachingReflect; //教学反思


					}).catch((err) => {

					})


				}
			},
			// 复选框选中
			checkBoxVal(){
				console.log(this.kqchecked)
      },

      // 下载接口
      downloadRes(fkId,fkType,fkSubjectId){
        var data = {
					'fkId': fkId,
					'fkType':fkType,
					'fkSubjectId':fkSubjectId,
				}
				this.$ajax.post('/zhjy/classpackagedetail/getFkResourceUrlRemote.action', this.$qs.stringify(data), {
					headers: {
						"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
					}
				}).then((res) => {
          console.log(res)
          if(res.data.success == 1){
            window.open(res.data.data)
          }else{
            this.$message({
                type: 'error',
                message: res.data.error
            });
          }

				}).catch((err) => {

				})
      },

      // 预习发布
      previewRelease(){
          this.$confirm('预习发布，生成课前预习?', '引用提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
          }).then(() => {

          }).catch(() => {

          })
      },
      // 课堂收藏
      classroomCollection(){
          this.$confirm('课堂收藏，生成课中备课?', '引用提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
          }).then(() => {

          }).catch(() => {

          })
      },
      // 作业发布
      workPublish(){
        this.$confirm('作业发布，生成课后作业?', '引用提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
          }).then(() => {

          }).catch(() => {

          })
      },




      //--------------------------------------------要评教案列表-----------------------------------------
      // 切换教案
			clickList(inx) {
        this.isnum = inx;
        // console.log(inx)
      },
      // 点击申请修改图片内容改变
			changeCont() {
				this.noCommentShow = false;
        this.applicationAmendmentShow = true;
        this.modifyReason();//申请修改理由
        this.viewComments();//教案评语
      },

      // 教案展示列表
      lessonPlanList(){
        var data = {
            "startTime":'2016-08-31 23:59:59',
            "endTime": '2020-09-04 20:23:55',
            "schoolId":this.dataV.fkSchoolId,
            "shareType":3,
            "userName":this.dataV.teacherName,
            "gradeId":this.dataV.fkGradeId,
            "subjectId":this.dataV.fkSubjectId,
            "currentPage":this.currentPage,
            "showCount":this.showCount,
          }
          this.$ajax.post('/zhjy/teachingresearch/selectListClassPackagePageRemote.action', this.$qs.stringify(data), {
            headers: {
              "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
            }
          }).then((res) => {
            // console.log(res)
            this.noTeachPlans = res.data.data.classPackageNewVos; //教案列表数据
            this.totalResult = res.data.data.totalResult;//总条数

          }).catch((err) => {

          })

      },
      // 分页方法
      handleSizeChange(val){ //每页展示多少条

        this.showCount = val;
        this.lessonPlanList(this.showCount)
      },
      handleCurrentChange(val){ //第几页

        this.currentPage = val;
        this.lessonPlanList(this.currentPage)
      },

	    // 确定按钮(保存教案点评)
			sureBtn() {
        var score = this.istrue + 1;//分数
        // if(this.type == 1){ //集体
           var data = {
            "lessonPlanCommentId":'',
            "comment":this.textarea,
            "score":score,
            "examinerId":this.dataV.teacherId,//检查人的id
            "examinerName":this.dataV.teacherName,//检查人名字
            "fkPackageId":41122,//集体
            "userId":this.dataV.teacherId
          }
        // }else{//课中
        //   var data = {
        //     "lessonPlanCommentId":'',
        //     "comment":this.textarea,
        //     "score":score,
        //     "examinerId":'',//检查人的id
        //     "examinerName":'',//检查人名字
        //     "fkPrepareId":'',//课中
        //     "userId":this.dataV.userId
        //   }
        // }

          this.$ajax.post('/zhjy/lessonplancomment/saveOrUpdateRemote.action', this.$qs.stringify(data), {
            headers: {
              "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
            }
          }).then((res) => {
             if(res.data.success == 1){
               this.$message({
                  type: 'success',
                  message: 'res.data.data'
                });
             }else{
               this.$message({
                  type: 'error',
                  message: 'res.data.error'
                });
             }

          }).catch((err) => {
              this.$message({
                  type: 'error',
                  message: 'res.data.error'
                });
          })
      },

      //--------------------------------------------申请修改---------------------------------------------------------------

      // 申请修改理由
      modifyReason(){
        // 集体id
        var data = {
            "fkPackageId":41122,
        }
        // 课中id
        // var data = {
        //     "fkPrepareId":'',
        // }
          this.$ajax.post('/zhjy/applicationeditor/forwardApplicationeditorRemote.action', this.$qs.stringify(data), {
            headers: {
              "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
            }
          }).then((res) => {
              this.modifyReasonText = res.data.data.content

          }).catch((err) => {

          })
      },

      // 同意修改接口
      agreeModify(){
        // 集体id
        var data = {
            "fkPackageId":41122,
        }
        // 课中id
        // var data = {
        //     "fkPrepareId":'',
        // }
          this.$ajax.post('/zhjy/applicationeditor/forwardAgreeRemote.action', this.$qs.stringify(data), {
            headers: {
              "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
            }
          }).then((res) => {
            console.log(res.data.data)
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

          }).catch((err) => {
              this.$message({
                  type: 'error',
                  message: res.data.error
                });
          })
      },
      // 取消修改接口
      cancelModify(){
        // 集体id
        var data = {
            "fkPackageId":41122,
        }
        // 课中id
        // var data = {
        //     "fkPrepareId":'',
        // }
          this.$ajax.post('/zhjy/applicationeditor/forwardCancelRemote.action', this.$qs.stringify(data), {
            headers: {
              "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
            }
          }).then((res) => {
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

          }).catch((err) => {
              this.$message({
                  type: 'error',
                  message: res.data.error
                });
          })
      },

      // 教案评语接口
      viewComments(){

				var data = {
					// 'fkPrepareId': '',
					'fkPackageId': 41122,
				}
				this.$ajax.post('/zhjy/lessonplancomment/forwardLessonPlanCommentRemote.action', this.$qs.stringify(data), {
					headers: {
						"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
					}
				}).then((res) => {

          this.viewCommentList = res.data.data.lessonPlanComment;
          var listOne = this.viewCommentList[0];
          this.commentText=listOne.comment;//评语内容
          this.commentScore = listOne.score;//评论得分
          this.commentExaminer = listOne.examinerName;//检查人
          // console.log(this.viewCommentList.length)

				}).catch((err) => {

				})
			},

      // test:function(){
      //   var a = [1,2,3,4,5]
      //   a.forEach((item) => {
      //     item = item * 2
      //   })
      //   console.log(a)
      // },





		},
	}
</script>

<style scoped>
	/* .tpedWrap { */
		/* background-color: #fff; */
		/* overflow: hidden;
	padding: 15px; */
	/* } */

	.headWrap {
		background-color: #fff;
		overflow: hidden;
		padding: 15px;
	}

	.cedHead {
		height: 33px;
	}

	.cedHeadFl img {
		vertical-align: middle;
	}

	/* 教案列表 */
	.teachPlanBox {
		height: 140px;
		border: 1px solid #ddd;
		padding: 10px;
		margin: 15px 0;
	}

	.titelP {
		font-size: 16px;
		color: #333;
		margin-left: 15px;
		margin-bottom: 10px;
	}

	.teachPlanList {

		border: 1px solid #ddd;
		border-radius: 4px;
		margin: 0 15px;
		cursor: pointer;
	}

	.teachPlanList:hover {
		border-color: #55C3B1;
	}

	.listCont {
		padding: 5px 10px;
	}

	.tplAct {
		border-color: #55C3B1;
	}

	.topicP span {
		color: #666;
		font-size: 14px;
	}

	.timeCharpter {
		color: #999;
		font-size: 14px;
		margin-top: 5px;
		text-align: center;
	}

	.modifyImg {
		width: 20px;
		margin-top: 30px;
	}

	.mainWrap {
		margin: 20px 0;
	}

	/* 左侧内容 */
	.leftCont {
		width: 78%;
		background-color: #fff;
	}

	.pceRightText {
		padding: 15px;
	}

	.previewClassTop {
		height: 30px;
		line-height: 30px;
	}

	.previewClassLeft {
		color: #999;
		line-height: 30px;
	}

	.previewClassLeft img {
		vertical-align: middle;
		margin-right: 8px;
	}

	.viewCommentBtn {
		cursor: pointer;
	}

	.bigTitle {
		text-align: center;
		margin: 15px 0;
	}

	.bigTitle h4 {
		font-size: 24px;
		color: #333;
		margin-right: 10px;
	}

	.bigTitle img {
		cursor: pointer;
	}

	.commontBtn {
		font-size: 18px;
		color: #FFA800;
	}

	.commontBtn img {
		vertical-align: middle;
	}

	.specificTime {
		font-size: 18px;
		color: #999;
		margin-bottom: 15px;
	}

	.BindChapter {
		clear: both;
		height: 27px;
	}

	.BindChapter p {
		font-size: 16px;

	}

	.BindChapter p img {
		vertical-align: middle;
		margin-right: 4px;
	}

	.chapterList {
		color: #999;
	}

	.previewOther span {
		margin-left: 20px;
		color: #999;
	}

	/* 主体内容 */
	.common-list {
		margin-top: 40px;
	}

	.commonTitle {
		height: 27px;
		line-height: 27px;
		font-size: 18px;
		color: #333;
		margin-bottom: 10px;
	}

	.commonTitle img {
		margin-right: 8px;
		vertical-align: middle;
	}

	.commonText {
		padding: 0 35px;
		color: #999;
		font-size: 14px;
	}

	/* 基础项 */
	.baseItemDetails {
		padding: 0 35px;
	}

	.baseItemDetails p {
		color: #999;
		font-size: 14px;
		margin-bottom: 10px;
	}

	/* 关联资源 */
	.oneTitle {
		padding: 5px 25px;
		background-color: #FBD14B;
		color: #fff;
		border-top-right-radius: 15px;
		border-bottom-right-radius: 15px;
	}

	.arQzhText {
		clear: both;
	}

	.arQzh {
		margin-bottom: 20px;
	}

	.arQzhList {
		height: 40px;
		border-bottom: 1px solid #ddd;
		padding: 10px 5px;
		margin-left: 90px;
		font-size: 14px;
	}

	.guideTitle {
		margin-right: 10px;
	}

	.arQzhTitle img {
		cursor: pointer;
	}

	.recourseType {
		color: #666;
	}

	.dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		background-color: #4BAC9C;
		border-radius: 50%;
		margin: 0 10px;
	}

	.fileImg {
		vertical-align: middle;
	}

	.hTitle {
		font-size: 16px;
		font-weight: 100;
		margin-bottom: 5px;
		cursor: pointer;
	}

	.hTitle:hover {
		color: #55C3B1;
	}

	.resText {
		color: #666;
		font-size: 14px;
	}

	.resText span {
		margin-right: 30px;
	}

	.arQzhListRg {
		margin: 15px 0;
	}

	.arQzhListRg img {
		cursor: pointer;
		margin-right: 10px;
		vertical-align: middle;
	}

	/* 右侧内容 */
	.rightCont {
		width: 20%;
		height: 520px;
		background-color: #fff;
		/* text-align: center; */
	}

	.lessonPlanReview {
		height: 40px;
		line-height: 40px;
		background-color: #DDF3EF;
		color: #666;
		text-align: center;
	}

	.padCont {
		padding: 10px;
	}

	.getScoreTitle {
		margin: 10px 0;
		font-size: 14px;
		text-align: left;
	}

	.numUl li {
		border: 1px solid #ddd;
		float: left;
		width: 43px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		color: #999;
		cursor: pointer;
	}

	.numUl .liNumAct {
		color: #fff;
		background-color: #55C3B1;
	}

	.btn {
		padding: 5px 15px;
		color: #fff;
		background-color: #55C3B1;
		border-radius: 4px;
		margin: 15px 0;
	}

	.btnBox {
		text-align: center;
	}

	/* 评语 */
	.reviewText {
		color: #999;
		font-size: 14px;
		margin: 10px;
	}

	.commentContList {
		margin: 30px 0;
	}

	.teachcommentWrap {
		padding: 10px;
	}

	.ccLeft {
		color: #333;
		font-size: 16px;
		border-left: 3px solid #4BAC9C;
		padding-left: 5px;
	}

	.ccRight {
		color: #999;
		font-size: 14px;

	}

	.tid {
		text-indent: 3em;
	}
</style>
