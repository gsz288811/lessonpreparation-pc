<template>
	<div class="previewClassEvaluation commonWidth">

		<div class="pceLeft common-left">
			<div class="pceLeftWrap">
				<p class="navTitle">课中备课目录</p>
				<ul class="leftNav">
					<li>
						<a href="javascript:;" @click="Tocont(1)">1.基础项</a>
					</li>
					<li><a href="javascript:;" @click="Tocont(2)">2.教学目标</a></li>
					<li><a href="javascript:;" @click="Tocont(3)">3.重点难点</a></li>
					<li><a href="javascript:;" @click="Tocont(4)">4.教学工具</a></li>
					<li><a href="javscript:;" @click="Tocont(5)">5.教学方法</a></li>
					<li>
						<a href="javascript:;" @click="Tocont(6)">6.教学过程</a>
						<ul class="leftNavChild">
							<li><a href="javascript:;" @click="Tocont(61)">6.1课前</a></li>
							<li><a href="javascript:;" @click="Tocont(62)">6.2课中</a></li>
							<li><a href="javascript:;" @click="Tocont(63)">6.3课后</a></li>
						</ul>
					</li>
					<li><a href="javascript:;" @click="Tocont(7)">7.教学反思</a></li>
				</ul>

				<ul class="navBtn">
					<li>
						<!-- <a href="javascript:;">申请编辑</a> -->
						<a href="javascript:;" @click="makeLessonPlans(2)">编辑教案</a>
					</li>
					<li><a href="javascript:;" @click="deleteLessonPlans()">删除教案</a></li>
					<li><a href="javascript:;" @click="makeLessonPlans(1)">引用教案</a></li>
					<li><a href="javascript:;" @click="makeLessonPlans(3)">制作教案</a></li>
				</ul>

			</div>


		</div>

		<div class="pceRight common-left">
			<div class="rightImg common-right">
				<!-- 金牌 -->
				<img src="../assets/goldmedal.png" alt="" v-if="cpData.rating == 4" class="alreadyEvaluatedImg common-right">
				<!-- 银牌 -->
				<img src="../assets/silvermedal.png" alt="" v-if="cpData.rating == 3" class="alreadyEvaluatedImg common-right">
				<!-- 铜牌 -->
				<img src="../assets/bronzemedal.png" alt="" v-if="cpData.rating == 2" class="alreadyEvaluatedImg common-right">
				<!-- 已评 -->
				<img src="../assets/Haveevaluation.png" alt="" v-if="cpData.rating == 1">
			</div>


			<div class="pceRightText">
				<!-- 头部内容 -->
				<div class="pcHead">

					<div class="previewClassTop">
						<div class="previewClassLeft common-left">
							<img src="../assets/school.png" alt="">{{schoolName}}
						</div>
						<div class="previewClassRight common-right">
							<img src="../assets/reviews.png" alt="" class="viewCommentBtn" @click="viewComments()">

						</div>
					</div>

					<div class="bigTitle">
						<span>
							<h4>{{packageName}}</h4>
						</span>
						<span class="commontBtn" @click="commentVisible = true" v-show="qzhShow"><img src="../assets/comment.png" alt="">评论</span>
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
			<!-- 评论弹框内容 -->
			<div class="commentFrame">
				<el-dialog title="评教评论" :visible.sync="commentVisible" width="40%" center>
					<div class="commentFrameCont">
						<div class="enterComment">
							<p class="teachName">{{this.userName}}</p>
							<div>
								<el-input type="textarea" placeholder="请输入内容" v-model="commentContent" maxlength="1000" show-word-limit size="" style="width: 700px;"
								 :autosize="{ minRows: 6, maxRows: 10}"></el-input>
							</div>
							<div class="operationBtn common-right">
								<a href="javascript:;" @click="commentContent=''">清空</a>
								<a href="javascript:;" @click="commentPublish()">发表</a>
							</div>
						</div>
						<div class="commentDetails">
							<div class="commentList" v-for="(v,inx) in leaveList" :key="inx">
								<p class="commentListTitle">
									<span class="common-left"><b class="orangeDot"></b>{{v.userName}}</span>
									<span class="publicTime common-right">{{v.saveTime}}</span>
								</p>
								<p class="commentText" v-html="v.bbsContent"></p>
							</div>
							<p v-if="leaveList.length == 0">还没有人留言，快来抢沙发吧</p>
						</div>
						<!-- 分页 -->
						<div class="pageWrap common-right" v-if="leaveList.length != 0">
							<el-pagination background layout="total,prev, pager, next,jumper" :total="totalResult" :current-page.sync="currentPage" :page-size="showCount"
							 @size-change="handleSizeChange" @current-change="handleCurrentChange">
							</el-pagination>
						</div>

					</div>
					<span slot="footer" class="dialog-footer" >
						<el-button @click="commentVisible = false">关闭</el-button>
					</span>
				</el-dialog>
			</div>
			<!-- 查看评语弹框 -->
			<div class="viewCommentFrame">
				<el-dialog title="教案评语" :visible.sync="teachcommentVisible" width="20%" center>
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
					<span slot="footer" class="dialog-footer" >
						<el-button @click="teachcommentVisible = false">关闭</el-button>
					</span>
				</el-dialog>
			</div>
		</div>

		<div class="goBack common-right" style="position: fixed;left: 50%;margin-left: 620px;" @click="goBack()"><img src="../assets/hd_back.png"  alt=""></div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				kqchecked: [], //课前复选框值
				kzchecked: [], //课中复选框值
				khchecked: [], //课后复选框值

				teachcommentVisible:false,//教案评语弹框
        viewCommentList:[],
        commentText:'',//评语内容
        commentScore:'',//评论得分
        commentExaminer:'',//检查人

				commentVisible: false, //讨论弹框
				commentContent: '', //评论弹框textAre内容

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
		mounted() {

			this.loading(); //加载

			this.dataV = JSON.parse(this.$route.query.dataV);; //从列表也获取数据
			// console.log(this.dataV)
      this.type = this.dataV.type;
      console.log(this.type)
			this.packageId = this.dataV.packageId; //预览详情分（type 1-集体  2-课中）

			this.hasBeforeClass = this.dataV.hasBeforeClass; //判断是否有课前
			this.hasInClass = this.dataV.hasInClass;//判断是否有课中
			this.hasAfterClass = this.dataV.hasAfterClass;//判断是否有课后

			this.fkSchoolId = this.dataV.fkSchoolId
			this.userName = this.dataV.userName;
			this.userId = this.dataV.userId;
      this.fkSubjectId = this.dataV.fkSubjectId;

			this.previewDetailsData();
			this.commentList(); //评论列表接口


		},
		methods: {

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

			// 返回
			goBack() {
				this.$router.go(-1);
			},
			// 锚点链接
			Tocont(inx){
				document.querySelector("#cont"+inx).scrollIntoView();
			},
			// 删除教案
			deleteLessonPlans(){
				this.$confirm('您确定删除此教案?', '删除提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

          //1-集体 2-课中
					if (type == 1) {

						var data = {
							'packageId':this.packageId
						}
						let _this = this;
						this.$ajax.post('/zhjy/classpackage/deleteClasspackageRemote.action ', this.$qs.stringify(data), {
							headers: {
								"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
							}
						}).then((res) => {
							console.log(res)
							if (res.data.success == 0) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								_this.bkList.splice(inx, 1)
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


					} else {
						var data = {
							'packageId': this.packageId
						}
						let _this = this;
						this.$ajax.post('/zhjy/bkprepare/delBkPrepareRemote.action', this.$qs.stringify(data), {
							headers: {
								"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
							}
						}).then((res) => {
							// console.log(res)
							if (res.data.success == 0) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								_this.bkList.splice(inx, 1)
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
					}





				}).catch(() => {

				})

			},
			// 制作教案
			makeLessonPlans(num){ //num为1-引用  2-编辑  3-制作

        if(num == 1){  //引用
          console.log('引用')
            var data = {
              'userId': this.userId,
            }
					  this.$ajax.post('/zhjy/classpackage/findIsUnfinishedRemote.action', this.$qs.stringify(data), {
						headers: {
							"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
						}
					  }).then((res) => {

              this.dataId = res.data.data.packageId;
              let isUnfinished = res.data.data.isUnfinished;
              //判断当接口返回isUnfinished为1时则表示未完成编辑的课包，为0时表示已完成课包
              if(isUnfinished == 1){

                this.$confirm('您有未完成的备课, 是否继续编辑?', '引用提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {

                  if (res.data.success == 1) {

                      if(this.type == 1){//集体
                          this.$router.push({
                            path: '/makeLesson',
                            query: {
                              dataV:this.dataV,//传列表所有数据
                              'num':1,
                              'quoteType':1,//引用确定状态为1
                              'isUnfinished':1

                            }
                          })
                      }else{//课中
                          this.$router.push({
                            path: '/makeLessonKz',
                            query: {
                              dataV:this.dataV,//传列表所有数据
                              'num':1,
                              'quoteType':1,//引用确定状态为1
                              'isUnfinished':1

                            }
                          })
                      }

                  }


                }).catch(() => {

                  if(this.type == 1){

                     this.$router.push({
                      path: '/makeLesson',
                      query: {
                        dataV:this.dataV,//传列表所有数据
                        'num':1,
                        'quoteType':0,//引用取消状态为0
                        'dataId':this.dataId,
                        'isUnfinished':1
                      }
                    })

                  }else{
                    this.$router.push({
                      path: '/makeLessonKz',
                      query: {
                        dataV:this.dataV,//传列表所有数据
                        'num':1,
                        'quoteType':0,//引用取消状态为0
                        'dataId':this.dataId,
                        'isUnfinished':1
                      }
                    })
                  }




                });


              }else{

                if(this.type == 1){
                    this.$router.push({
                    path: '/makeLesson',
                    query: {
                      dataV:this.dataV,//传列表所有数据
                      'num':1,
                      'isUnfinished':0
                    }
                  })
                }else{
                  this.$router.push({
                  path: '/makeLessonKz',
                  query: {
                    dataV:this.dataV,//传列表所有数据
                    'num':1,
                    'isUnfinished':0
                  }
                })
                }


              }




            }).catch((err) => {

            })




			  }else if(num == 2){ //编辑

            if(this.type == 1){
              console.log('集体编辑')
              this.$router.push({
                  path: '/makeLesson',
                  query: {
                    dataV:this.dataV,//传列表所有数据
                    'num':2,//编辑
                  }
                })
            }else{
              console.log('课中编辑')
              this.$router.push({
                  path: '/makeLessonKz',
                  query: {
                     dataV:this.dataV,//传列表所有数据
                    'num':2,//编辑
                  }
                })
            }

        }else{

        }

			},

			// 预览详情数据
			previewDetailsData() {
				//type(1-集体  2-课中）
				if (this.type == 1) {
            this.kzDetailShow = false;
            var data = {
              'packageId': this.packageId,
              'userId':this.userId
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
			// ------------------------------------------------------------------------集体-评论-----------------------------------------------
			// 分页
			handleSizeChange(val){ //每页展示多少条
				this.showCount = val;
				this.commentList(this.showCount)
			},
			handleCurrentChange(val){ //第几页
				this.loading(); //加载中
				this.currentPage = val;
				this.commentList(this.currentPage)
			},
			// 评论发表接口
			commentPublish(){
				var data = {
					'bbsContent':this.commentContent,
					'fkId': this.packageId,
					'fkType':'classpackage',
					'userId':this.userId,
					'userName':this.userName,
					'fkSchoolId':this.fkSchoolId
				}
				this.$ajax.post('/zhjy/classpackage/saveLeaveRemote.action', this.$qs.stringify(data), {
					headers: {
						"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
					}
				}).then((res) => {
					// console.log(res)
					this.loading(); //加载
					this.commentList(); //评论列表接口
					this.commentContent = '';
				}).catch((err) => {

				})
			},
			// 评论发表后列表接口
			commentList() {
				var data = {
					'fkType': 'classpackage',
					'fkId': this.packageId,
					'currentPage': this.currentPage,
					'showCount': this.showCount,
				}
				this.$ajax.post('zhjy/classpackage/findLeaveGridRemote.action', this.$qs.stringify(data), {
					headers: {
						"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
					}
				}).then((res) => {
					// console.log(res)
					this.leaveList = res.data.data.leaveList; //列表
					this.totalResult = JSON.parse(res.data.data.page).totalResult; //总条数

				}).catch((err) => {

				})
			},

			// 查看评语接口数据
			viewComments(){
				this.teachcommentVisible = true;
				var data = {
					// 'fkPrepareId': '',
					'fkPackageId': this.packageId,
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




		},
	}
</script>

<style>
	.previewClassEvaluation {
		margin-top: 10px;
		overflow: hidden;
	}

	.pceLeft {
		width: 270px;
		height: 700px;
		margin-right: 20px;
	}

	.pceLeftWrap {
		position: fixed;
		-moz-transition: all 0.3s;
		-webkit-transition: all 0.3s;
		-o-transition: all 0.3s;
		width: 270px;
		height: 700px;
		background-color: #fff;
		margin-right: 20px;


	}

	.navTitle {
		height: 50px;
		line-height: 50px;
		text-align: center;
		color: #fff;
		background-color: #55C3B1;
	}

	.leftNav {
		margin-bottom: 20px;
	}

	.leftNav>li>a {
		width: 30%;
		height: 50px;
		line-height: 50px;
		color: #666;
		text-align: left;
		margin: 0 100px;
	}





	.leftNavChild a {
		line-height: 30px;
		width: 100%;
		color: #666;
		text-align: center;
	}

	.navBtn {
		text-align: center;
	}

	.navBtn a {
		padding: 5px 20px;
		color: #fff;
		background-color: #FFA800;
		border-radius: 15px;
		margin-bottom: 15px;
	}

	.pceRight {
		width: 900px;
		background-color: #fff;
		overflow: hidden;

	}

	.alreadyEvaluatedImg {
		width: 60%;
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
	.bigTitle img{
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
	.arQzhTitle img{
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

	/* 评论弹框内容样式 */
	.teachName {
		font-size: 18px;
		font-weight: 700;
		margin-bottom: 10px;
	}

	.operationBtn {
		margin: 20px 0;
	}

	.operationBtn a {
		padding: 5px 20px;
		color: #fff;
		background-color: #55C3B1;
		border-radius: 4px;
		margin: 0 10px;
	}

	.operationBtn a:hover {
		background-color: #4BAC9C;
	}

	.commentDetails {
		clear: both;
	}

	.commentList {
		border-bottom: 1px solid #ddd;
		padding: 10px 0;
	}

	.commentListTitle {
		height: 20px;
		line-height: 20px;
		margin-bottom: 5px;
		font-size: 16px;
	}

	.orangeDot {
		display: inline-block;
		width: 6px;
		height: 6px;
		background-color: #FFA800;
		border-radius: 50%;
		margin: 3px 10px 3px 0;
	}

	.publicTime {
		font-size: 12px;
		color: #999;
	}

	.commentText {
		clear: both;
		font-size: 14px;
		color: #888;
	}

	/* 查看评语弹框 */
	.commentContList{
		margin: 30px 0;
	}
	.ccLeft{
		color: #333;
		font-size: 16px;
		border-left: 3px solid #4BAC9C;
		padding-left: 5px;
	}
	.ccRight{
		color: #999;
		font-size: 14px;

	}
	.tid{
		text-indent: 3em;
	}
</style>
