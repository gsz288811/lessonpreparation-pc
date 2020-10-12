<template>
	<div class="makeLesson commonWidth">
		<!-- 树 -->
		<div class="treeWrap common-left"></div>
		<!-- 右侧备课制作内容 -->
		<div class="makeWrap common-left">
			<div class="bindChapterLocation">【绑定之前章节位置：
        <span class="chapterList">{{subjectName}}>{{courseDirtreeName}}>{{dirtreeName}}>{{cpbDirtreeName}}</span>
				】</div>
			<!-- 基础项 -->
			<div class="baseItem common-list">
				<div class="commonTitle">
					<span class="common-left"><img src="../assets/preview_Based.png" alt="">基础项</span>
				</div>
				<div class="baseItemIn">
					<p>
						<span class="iptList">
							<span class="titleGuide"><b>*</b>课题：</span>
							<span>
								<el-input placeholder="请输入内容" v-model="ktIpt" clearable size="small"></el-input>
							</span>
						</span>
						<span class="iptList">
							<span class="titleGuide"><b>*</b>年级：</span>
							<el-select v-model="gradeVal" placeholder="高一" size="small">
								<el-option v-for="item in sysGrades" :key="item.gradeId" :label="item.gradeName" :value="item.gradeId"></el-option>
							</el-select>
						</span>
					</p>
					<p>
						<span class="iptList">
							<span class="titleGuide"><b>*</b>课型：</span>
							<el-select v-model="lessonTypeVal" placeholder="新授课" size="small">
								<el-option v-for="item in ltOptions" :key="item.value" :label="item.lessonType" :value="item.value"></el-option>
							</el-select>

						</span>
						<span class="iptList">
							<span class="titleGuide"><b>*</b>课时：</span>
							<span>
								<el-input placeholder="1" v-model="ksIpt" clearable size="small"></el-input>
							</span>
						</span>
					</p>
					<p>
						<span class="iptList">
							<span class="titleGuide">备课组成员：</span>
							<span>
								<el-input placeholder="请输入内容" v-model="bkzIpt" clearable size="small"></el-input>
							</span>
						</span>
						<span class="iptList">
							<span class="titleGuide">主备课人：</span>
							<span>
								<el-input placeholder="请输入内容" v-model="zbkIpt" disabled size="small" ></el-input>
							</span>
						</span>
					</p>

				</div>
			</div>
			<!-- 教学目标 -->
			<div class="teachObject common-list" v-show="teachObjectShow">
				<div class="commonTitle">
					<span class="common-left"><img src="../assets/preview_objective.png" alt="">教学目标</span>
					<span class="common-right"><img src="../assets/del.png" alt="" @click="deleteStep(1)" class="deleteStepImg"></span>
				</div>
				<div class="edit_container">
					<quill-editor v-model="teachObjectContent" ref="myQuillEditor1" :options="editorOption"></quill-editor>
				</div>
			</div>
			<!-- 重点难点 -->
			<div class="keyDifficultPoints common-list" v-show="keyDifficultPointShow">
				<div class="commonTitle">
					<span class="common-left"><img src="../assets/preview_emphasis.png" alt="">重点难点</span>
					<span class="common-right"><img src="../assets/del.png" alt="" @click="deleteStep(2)" class="deleteStepImg"></span>
				</div>
				<div class="edit_container">
					<quill-editor v-model="keyDifficultPointsContent" ref="myQuillEditor1" :options="editorOption"></quill-editor>
				</div>

			</div>
			<!-- 教学工具 -->
			<div class="instructionalTools common-list" v-show="instructionalToolShow">
				<div class="commonTitle">
					<span class="common-left"><img src="../assets/preview_tool.png" alt="">教学工具</span>
					<span class="common-right"><img src="../assets/del.png" alt="" @click="deleteStep(3)" class="deleteStepImg"></span>
				</div>
				<div class="iptText">
					<el-input placeholder="请输入内容" v-model="itIpt" clearable maxlength="80" show-word-limit></el-input>
				</div>
			</div>
			<!-- 教学方法 -->
			<div class="teachMethod common-list" v-show="teachMethodShow">
				<div class="commonTitle">
					<span class="common-left"><img src="../assets/innovation.png" alt="">教学方法</span>
					<span class="common-right"><img src="../assets/del.png" alt="" @click="deleteStep(4)" class="deleteStepImg"></span>
				</div>
				<!-- <div class="textArea"></div> -->
				<div class="edit_container">
					<quill-editor v-model="teachMethodContent" ref="myQuillEditor1" :options="editorOption"></quill-editor>
				</div>
			</div>
			<!-- 教学过程 -->
			<div class="teachProcess common-list">
				<div class="commonTitle">
					<span class="common-left"><img src="../assets/preview_design.png" alt="">教学过程</span>
					<!-- <span class="common-right"><img src="../assets/del.png" alt=""></span> -->
				</div>
				<!-- <div class="textArea"></div> -->
				<div class="edit_container">
					<quill-editor v-model="teachProcessContent" ref="myQuillEditor1" :options="editorOption"></quill-editor>
				</div>
			</div>
			<!-- 关联资源 -->
			<div class="associatedResources common-list">
				<div class="commonTitle">
					<span class="common-left"><img src="../assets/preview_resource.png" alt="">关联资源</span>
					<span class="common-right"><a href="javascript:;" class="charteredCar" @click="kbcListData()" v-show="kbcShow">课包车</a></span>
				</div>

				<div class="associatResourceBtn">

					<!-- 课中编辑 -->
					<div class="associatResourceList">
						<p>
							<span href="javascript:;" class="oneTitle">课中</span>
							<a href="javascript:;" class="otherBtn" @click="addClassPackageDetail('resource',2,this)">添加课件</a>
							<a href="javascript:;" class="otherBtn" @click="addClassPackageDetail('censor',2,this)">添加检测</a>
							<a href="javascript:;" class="otherBtn" @click="addClassPackageDetail('bk_team_topic',2,this)">添加小组学习</a>
							<a href="javascript:;" class="otherBtn" @click="addClassPackageDetail('url',2,this)">添加网址</a>
							<span class="addNumSpan">当前添加数：<span class="addNum">{{kzAllLength}}</span></span>
						</p>
						<ul v-for="(v,inx) in bkActivities" :key="inx">
							<!-- 添加课件/添加网址 -->
							<li class="commonList" v-for="(u,unx) in v.bkResources" :key="unx">
                <input type="hidden" id="groupResActivityId" :value="v.bkActivityId">
								<div class="commonListLf common-left">
									<div class="guideTitle common-left">
										<span class="recourseType" v-if="u.resourceType==1">课件</span>
										<span class="recourseType" v-if="u.resourceType==2">网址</span>
										<b class="dot"></b>
										<img src="../assets/file/ppt.png" alt="" class="fileImg" v-if="u.resourceType==1">
										<img src="../assets/resource_web.png" alt="" class="fileImg" v-if="u.resourceType==2">
									</div>
									<div class="common-left">
										<h3 class="hTitle">{{u.resourceAlias}}</h3>
										<p class="resText">来源：{{bkPrepare.schoolName}}{{bkPrepare.teacherName}}</p>
									</div>
								</div>
								<div class="commonListRg common-right">
									<img src="../assets/yjxt_del2.png" alt="" @click="kzDelSmallLis(u.bkResourceId,'resource',unx)">
									<img src="../assets/hd_examine2.png" alt="">
								</div>
							</li>
							<!-- 添加检测-练习 -->
							<li class="commonList" v-for="(u,unx) in v.bkTpPractices" :key="unx" >
								<input type="hidden" id="groupPraActivityId" :value="v.bkActivityId">
                <div class="commonListLf common-left">
									<div class="guideTitle common-left">
										<span class="recourseType">练习</span>
										<b class="dot"></b>
										<img src="../assets/practice.png" alt="" class="fileImg">
									</div>
									<div class="common-left">
										<h3 class="hTitle">
                      <input type="text"  v-model="u.practiceName" class="iptName" @change="updateLxName(u.bkPracticeId,u.practiceName)">
                      <!-- {{u.practiceName}} -->
                    </h3>
										<p class="resText">来源：{{bkPrepare.schoolName}}{{bkPrepare.teacherName}}</p>
									</div>
								</div>
								<div class="commonListRg common-right">
									<img src="../assets/yjxt_del2.png" alt="" @click="kzDelSmallLis(u.bkPracticeId,'practice',unx)">
									<img src="../assets/hd_examine2.png" alt="">
								</div>
							</li>
							<!-- 添加检测-问题 -->
							<li class="commonList" v-for="(u,unx) in v.bkTpQuestions" :key="unx" >
								<input type="hidden" id="groupQueActivityId" :value="v.bkActivityId">
                <div class="commonListLf common-left">
									<div class="guideTitle common-left">
										<span class="recourseType">问题</span>
										<b class="dot"></b>
										<img src="../assets/resource_question.png" alt="" class="fileImg">
									</div>
									<div class="common-left">
										<h3 class="hTitle">
                      <input type="text"  v-model="u.tqName" class="iptName" @change="updateWtName(u.bkTqId,u.tqName)">
                      <!-- {{u.tqName}} -->
                    </h3>
										<p class="resText">来源：{{bkPrepare.schoolName}}{{bkPrepare.teacherName}}</p>
									</div>
								</div>
								<div class="commonListRg common-right">
									<img src="../assets/yjxt_del2.png" alt="" @click="kzDelSmallLis(u.bkTqId,'question',unx)">
									<img src="../assets/hd_examine2.png" alt="">
								</div>
							</li>
							<!-- 添加小组学习 -->
							<li class="commonList" v-for="(u,unx) in v.bkTpTeamTopics" :key="unx" >
								<input type="hidden" id="groupTopActivityId" :value="v.bkActivityId">
                <div class="commonListLf common-left">
									<div class="guideTitle common-left">
										<span class="recourseType">小组</span>
										<b class="dot"></b>
										<img src="../assets/resource_group.png" alt="" class="fileImg">
									</div>
									<div class="common-left">
										<h3 class="hTitle">
                      <input type="text"  v-model="u.topicName" class="iptName" @change="updateXzName(u.bkTopicId,u.topicName)">
                      <!-- {{u.topicName}} -->
                    </h3>
										<p class="resText">来源：{{bkPrepare.schoolName}}{{bkPrepare.teacherName}}</p>
									</div>
								</div>
								<div class="commonListRg common-right">
									<img src="../assets/yjxt_del2.png" alt="" @click="kzDelSmallLis(u.bkTopicId,'teamTopic',unx)">
									<img src="../assets/hd_examine2.png" alt="">
								</div>
							</li>

						</ul>

					</div>





				</div>
				<!-- 弹框内容 -->
				<div class="elasticFrame">
					<!-- 课中添加课件弹框 -->
					<div class="addCoursewareFrame">
						<el-dialog title="添加课件" :visible.sync="addCoursewareVisible" width="20%" center>
							<span>
								<a href="javascript:;" class="otherBtn">平台微课资源选择</a>
								<a href="javascript:;" class="otherBtn">本地选择</a>
							</span>
							<span slot="footer" class="dialog-footer">
								<el-button @click="addCoursewareVisible = false">关闭</el-button>
							</span>
						</el-dialog>
					</div>
					<!-- 课中添加检测弹框 -->
					<div class="addTestFrame">
						<el-dialog title="添加检测" :visible.sync="addTestVisible" width="15%" center>
							<span>
								<a href="javascript:;" class="otherBtn">创建练习</a>
								<a href="javascript:;" class="otherBtn">创建问题</a>
							</span>
							<span slot="footer" class="dialog-footer">
								<el-button @click="addTestVisible = false">关闭</el-button>
							</span>
						</el-dialog>
					</div>
					<!-- 课中添加小组学习弹框 -->
					<div class="addGroupLearnFrame">
						<el-dialog title="添加小组学习" :visible.sync="addGroupLearnVisible" width="50%" center>
							<div class="addGroupLearnText">
								<div class="addGroupLearnList">
									<span class="common-left"><b>*</b><span class="frameTitle">主题名称：</span></span>
									<span class="common-left">
										<el-input type="text" placeholder="请输入内容" v-model="topicName" maxlength="50" show-word-limit clearable size="small"
										 style="width: 700px;"></el-input>
									</span>
								</div>
								<div class="addGroupLearnList">
									<span class="common-left"><b>*</b><span class="frameTitle">讨论主题：</span></span>
									<span class="common-left">
										<el-input type="textarea" placeholder="请输入内容" v-model="topicsDiscussion" maxlength="1000" show-word-limit
										 style="width: 700px;margin-bottom: 15px;" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
									</span>
								</div>
								<div class="addGroupLearnList">
									<span class="common-left"><span class="frameTitle">文件资源：</span></span>
									<span class="common-left">
										<input type="file" accept=".jpg,.jpeg,.png,.bmp,.mp3,.mp4,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.txt" id="localSelectFile" @change="upfilealy($event)" style="display: none;"/>
										<a href="javascript:;" class="otherBtn" @click="topicAddLocalFile()">本地选择</a>
										<div class="localChoiceWrap">
											<p class="chioceFileList" v-for="(v,inx) in localSelectList" :key="inx">
                        <span class="common-left">
                          <img src="../assets/file/png.png" alt="" v-if="v.fileSuffix == 'png'" class="fileImg">
                          <img src="../assets/file/jpg.png" alt="" v-if="v.fileSuffix == 'jpg'" class="fileImg">
                          <img src="../assets/file/jpeg.png" alt="" v-if="v.fileSuffix == 'jpeg'" class="fileImg">
                          <img src="../assets/file/bmp.png" alt="" v-if="v.fileSuffix == 'bmp'" class="fileImg">
                          <img src="../assets/file/mp3.png" alt="" v-if="v.fileSuffix == 'mp3'" class="fileImg">
                          <img src="../assets/file/mp4.png" alt="" v-if="v.fileSuffix == 'mp4'" class="fileImg">
                          <img src="../assets/file/doc.png" alt="" v-if="v.fileSuffix == 'doc'" class="fileImg">
                          <img src="../assets/file/docx.png" alt="" v-if="v.fileSuffix == 'docx'" class="fileImg">
                          <img src="../assets/file/ppt.png" alt="" v-if="v.fileSuffix == 'ppt'" class="fileImg">
                          <img src="../assets/file/pptx.png" alt="" v-if="v.fileSuffix == 'pptx'" class="fileImg">
                          <img src="../assets/file/xls.png" alt="" v-if="v.fileSuffix == 'xls'" class="fileImg">
                          <img src="../assets/file/xlsx.png" alt="" v-if="v.fileSuffix == 'xlsx'" class="fileImg">
                          <img src="../assets/file/pdf.png" alt="" v-if="v.fileSuffix == 'pdf'" class="fileImg">
                          <img src="../assets/file/txt.png" alt="" v-if="v.fileSuffix == 'plain'" class="fileImg">
                        </span>
												<span class="fileName common-left">{{v.name}}</span>
												 <span class="fileDel common-right" @click="deleteFileInfo(inx)">删除</span>
											</p>
										</div>
									</span>
								</div>
								<div class="addGroupLearnList">
									<span class="common-left"><span class="frameTitle">网页资源：</span></span>
									<div class="webResourcesBox common-left">
										<span><a href="javascript:;" class="otherBtn" @click="addUrlList()">添加网络链接</a><span class="webResWarn">(名称或地址必须关联添加,只填其一则不保存)</span></span>
										<div class="webResourcesWrap">
											<el-table :data="webResourcesData" :show-header="false" height="300">

												<el-table-column type="index"  width="40"></el-table-column>
												<el-table-column prop="wrName" >
													<template slot-scope="scope">
														<span class="common-left lh">名称：</span>
														<span class="common-left">
															<el-input type="text" clearable size="small" placeholder="显示名称,如:百度文库"
																v-model="webResourcesData[scope.$index].wrName">
															</el-input>
														</span>
													</template>
												</el-table-column>

												<el-table-column prop="wrAddress">
													<template slot-scope="scope">
														<span class="common-left lh">地址：</span>
														<span class="common-left">
															<el-input type="text" clearable size="small" placeholder="网页链接地址,如:http://..."
																v-model="webResourcesData[scope.$index].wrAddress">
															</el-input>
														</span>
													</template>
												</el-table-column>

												<el-table-column width="60">
													<template slot-scope="scope">
														<a href="javascript:;" class="common-right deleteWr" @click="deleteWebResourcesList(scope.$index)">删除</a>
													</template>
												</el-table-column>
											</el-table>


										</div>

									</div>
								</div>
							</div>
							<span slot="footer" class="dialog-footer">
								<el-button @click="groupLearnClear()">清空</el-button>
								<el-button @click="saveTopic()">加入备课</el-button>
								<el-button @click="addGroupLearnVisible = false">取消</el-button>
							</span>
						</el-dialog>
					</div>
					<!-- 课中添加网址弹框 -->
					<div class="addWebsiteFrame">
						<el-dialog title="添加网址" :visible.sync="addWebsiteVisible" width="20%" center>
							<div class="addWzBox">
								<p>
									<span class="common-left">名称：</span>
									<span class="common-left">
										<el-input type="text" placeholder="显示名称,如:百度文库" v-model="addWebName" clearable size="small"></el-input>
									</span>
								</p>
								<p>
									<span class="common-left">地址：</span>
									<span class="common-left">
										<el-input type="text" placeholder="网页链接地址,如:http://..." v-model="addWebAddress" clearable size="small"></el-input>
									</span>
								</p>
							</div>
							<span slot="footer" class="dialog-footer">
								<el-button  @click="saveUrl()">保存网址</el-button>
								<el-button @click="addWebsiteVisible = false">关闭</el-button>
							</span>
						</el-dialog>
					</div>
				</div>




			</div>
			<!-- 教学反思 -->
			<div class="reflectionsTeach common-list" v-show="reflectionsTeachShow">
				<div class="commonTitle">
					<span class="common-left"><img src="../assets/preview_introspection.png" alt="">教学反思</span>
					<span class="common-right"><img src="../assets/del.png" alt="" @click="deleteStep(5)" class="deleteStepImg"></span>
				</div>
				<!-- <div class="textArea"></div> -->
				<div class="edit_container">
					<quill-editor v-model="reflectionsTeachContent" ref="myQuillEditor1" :options="editorOption"></quill-editor>
				</div>
			</div>
			<!-- 分享 -->
			<div class="shareWrap">

				<el-radio-group v-model="shareRadio">
					<el-radio :label="1">平台分享</el-radio>
					<el-radio :label="2">校内分享</el-radio>
					<el-radio :label="3">个人使用</el-radio>课包车
				</el-radio-group>

			</div>
			<!-- 底部按钮 -->
			<div class="bottomBtnWrap">
				<a href="javascript:;" @click="clearData()">清空</a>
				<a href="javascript:;" @click="preserveLessonPreparation()">保存备课</a>
				<a href="javascript:;" @click="goBack()">返回</a>
			</div>

			<!-- 返回顶部	 -->
			<div>
				<el-backtop :right="300" :bottom="100" :visibility-height="600">
					<div style="{height: 100%;width: 100%;background-color: #f2f5f6;box-shadow: 0 0 6px rgba(0,0,0, .12);text-align: center;line-height: 40px;color: #1989fa;}">
						UP
					</div>
				</el-backtop>
			</div>


		</div>
		<div class="goBack common-right" style="position: fixed;left: 50%;margin-left: 620px;" @click="goBack()"><img src="../assets/hd_back.png"
			 alt=""></div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
        num:1,//1-引用 2-编辑 3-新建教案
        kbcShow:false,//课包车
				//----------------------基础项----------------------
				subjectName: '', //学科
				courseDirtreeName: '', //教材
        dirtreeName: '', //章
        cpbDirtreeName:'',//节
				ktIpt: '', //课题
				ksIpt: '', //课时
				lessonTypeVal: '', //课型值
				bkzIpt: '', //备课组成员
				zbkIpt: '', //主备课人
				gradeVal: '', //年级值

				sysGrades: [], //获取年级所有数据

				shareRadio: 1, //1平台、3校本、2个人

				// 课型数组
				ltOptions: [{
						value: 1,
						lessonType: '新授课'
					},
					{
						value: 2,
						lessonType: '复习课'
					},
					{
						value: 3,
						lessonType: '专题训练'
					},
				],

				// ---------------------------添加按钮弹框显示状态---------------------------

				addCoursewareVisible: false, //课中添加课件弹框
				addTestVisible: false, //课中添加检测弹框
				addGroupLearnVisible: false, //课中添加小组学习弹框
				addWebsiteVisible: false, //课中添加网址弹框


				// --------------------添加小组学习弹框--------------------------------
				topicName: '', //课中添加小组学习弹框中的主题名称
        topicsDiscussion: '', //课中添加小组学习弹框中的讨论主题
        //添加网络链接列表
				webResourcesData:[{
					wrName:'',//网页资源的名称
					wrAddress:''//网页资源的地址
        }],
        localSelectList:[],//添加小组学习--本地选择列表展示
        localUploadData:[],//获取本地上传详细内容


				wrName: '', //课中添加小组学习弹框中网页资源的名称
				wrAddress: '', //课中添加小组学习弹框中网页资源的地址

				addWebName: '', //课中添加网址弹框中的名称
				addWebAddress: '', //课中添加网址弹框中的地址






				itIpt: '', //教学工具
				teachObjectContent: `<p>请输入教学目标内容</p>`, //教学目标
				keyDifficultPointsContent: `<p>请输入重点难点内容</p>`, //重点难点
				teachMethodContent: `<p>请输入教学方法内容</p>`, //教学方法
				teachProcessContent: `<p>请输入教学过程内容</p>`, //教学过程
				reflectionsTeachContent: `<p>请输入教学反思内容</p>`, //教学反思
				editorOption: {},

				//--------------------------教学步骤显示状态（点击删除按钮）------------------------------
				teachObjectShow: true, //教学目标显示
				keyDifficultPointShow: true, //重点难点显示
				instructionalToolShow: true, //教学工具显示
				teachMethodShow: true, //教学方法显示
				reflectionsTeachShow: true, //教学反思显示

				//----------------------------课中编辑数据------------------------
				bkPrepare: '',
				bkActivities: '', //课中编辑

				//--------------------------上传文件--------------------------------------
				aliyunKey: '', //阿里云上传
				fname:'', // 文件上传的名称
				suffix:'', //文件上传的类型
				fSize:'',//文件上传的大小
				burl:'',//文件上传的具体


			}
		},
		computed: {
			editor() {
				return this.$refs.myQuillEditor.quill;
			},

			//关联资源下课中所有数据个数
			kzAllLength() {
				let kzAllLength = 0;
				let list = Array.from(this.bkActivities);
				list.forEach(function(i) {
					kzAllLength += i.bkTpQuestions.length + i.bkTpPractices.length + i.bkResources.length + i.bkTpTeamTopics.length
				})
				return kzAllLength
			},



		},
		mounted() {
      console.log('课中页面')
      this.loading(); //加载提示

      this.dataV = JSON.parse(this.$route.query.dataV);//获取上个页面传过来的数据
      //this.dataV = this.$route.query.dataV;//获取上个页面传过来的数据

      this.packageId = this.dataV.packageId; //num为1时是引用获取的userId-----num为2时是编辑获取的packageId

      this.userId = this.dataV.userId;
      this.userName = this.dataV.userName;
      this.fkSchoolId = this.dataV.fkSchoolId;


      this.num = this.$route.query.num;

			this.quoteType = this.$route.query.quoteType; //集体-引用 提示框状态 1-确定 0-取消
			this.dataId = this.$route.query.dataId; //返回查询教师未完成编辑的课包数据
			this.isUnfinished = this.$route.query.isUnfinished;//isUnfinished为1-未完成编辑的课包，为0时-已完成课包




			this.preservationData(); //引用或者编辑过来的数据
			this.getalykey(); // 上传阿里云




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


			// 返回
			goBack() {
				this.$router.go(-1);
			},

			// 删除不需要的教学备课步骤
			deleteStep(num) {
				if (num == 1) {
					this.teachObjectShow = false; //教学目标
				} else if (num == 2) {
					this.keyDifficultPointShow = false; //重点难点显示
				} else if (num == 3) {
					this.instructionalToolShow = false; //教学工具
				} else if (num == 4) {
					this.teachMethodShow = false; //教学方法
				} else {
					this.reflectionsTeachShow = false; //教学反思
				}
			},




			// ------------------------------------------通过上一页引用或者编辑而展示的方法-------------------------------------------------------------
			// num:引用-1  编辑-2  3-新建教案
			preservationData() {

				if (this.num == 1) {

             if(this.isUnfinished == 1){

                this.kbcShow = false; // 课中时隐藏课包车

                if (this.quoteType == 1) {//引用按钮 提示状态(this.quoteType) 1-确定 0-取消
                  this.kzCreat(this.packageId, 2); //继续编辑未完成课包
                } else {
                  this.delClassPackage(this.dataId); //删除课包
                   this.kzQuote(this.packageId);//课中引用课包
                }

             }else{
                 this.kzQuote(this.packageId);//课中引用课包
             }

				} else if (this.num == 2) {

						this.kbcShow = false; //课中时隐藏课包车

						this.kzCreat(this.packageId, 2); //课中制作

				}

			},


//-------------------------------------课中相关接口--------------------

      // 课中引用
      kzQuote(packageId){
        var data = {
          'prepareId': packageId,
          'userId':this.userId,
          'schoolId':this.fkSchoolId
				}

				this.$ajax.post('/zhjy/bkprepare/quoteBkRemote.action', this.$qs.stringify(data), {
					headers: {
						"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
					}
				}).then((res) => {

					if (res.data.success == 1) {
              this.kzCreat(res.data.data,2)

					} else {

					}


				}).catch((err) => {

				})
      },

      // 课中制作(课中现在新版本没有制作，只有更新)
			kzCreat(packageId, type) {
				var data = {
					'prepareId': packageId,
				}
				this.$ajax.post('/zhjy/bkprepare/forwordClassPackagePrepareslessonDetialRemote.action', this.$qs.stringify(data), {
					headers: {
						"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
					}
				}).then((res) => {
					// console.log(res)
					this.bkPrepare = res.data.data;

					this.bkActivities = res.data.data.bkActivities; // 课中编辑

					this.subjectName = this.bkPrepare.subjectName; //学科
					this.courseDirtreeName = this.bkPrepare.courseDirtreeName; //教材
          this.dirtreeName = this.bkPrepare.dirtreeName; //章
          this.cpbDirtreeName = this.bkPrepare.cpbDirtreeName; // 节

					// 基础项
          this.ktIpt = this.bkPrepare.prepareName; // 课题名称
					this.gradeVal = this.bkPrepare.gradeName; //年级
					this.lessonTypeVal = this.bkPrepare.lessonTypeName; //课型名称
					this.ksIpt = this.bkPrepare.period; //课时
					this.bkzIpt = this.bkPrepare.components; //备课组成员
					this.zbkIpt = this.bkPrepare.teacherName; //主备课人


					this.teachObjectContent = this.bkPrepare.teachingAims; //教学目标
					this.keyDifficultPointsContent = this.bkPrepare.importance; //重点难点
					this.teachMethodContent = this.bkPrepare.teachingMethod; //教学方法
					this.teachProcessContent = this.bkPrepare.teachingProcess; //教学过程
					this.reflectionsTeachContent = this.bkPrepare.teachingReflect; //教学反思
					this.itIpt = this.bkPrepare.teachingTools; //教学工具

					this.shareRadio = this.bkPrepare.status; //1-平台分享 2-校内分享 3-个人分享



				}).catch((err) => {

				})
			},
      // 课中删除
      kzDelClassPackage(packageId){
        var data = {
					'prepareId':packageId,
				}

				this.$ajax.post('/zhjy/bkprepare/delBkPrepareRemote.action', this.$qs.stringify(data), {
					headers: {
						"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
					}
				}).then((res) => {

					if (res.data.success == 1) {


					} else {

					}


				}).catch((err) => {

				})
      },

      // 课中更新
      kzUpdate(){
          var data = {
					'prepareId':'', //课中备课的id（必填）因为是更新必填 （已校验）
          'prepareName':'', //备课的名字（必填）（已校验）
          'fkCourseDirtreeId':'',//教材的id（必填）（已校验）
          'courseDirtreeName':'', //教材的名称（必填）（已校验）
          'fkDirtreeId':'', //章节目录id（必填）（已校验）
          'dirtreeName':'', //章节目录名称（必填）（已校验）
          'status':'', //分享类型 (1平台；2学校；3个人；)
          'teacherId':'',// 教师的id（已校验）
          'teacherName':'',//教师的名称（已校验）
          'fkSchoolId':'', //学校的id（已校验）
          'bkStatus':'', //备课状态0：未完成，1：完成
          'period':'', //基础项-课时（已校验）
          'fkGradeId':'', //基础项-年级id（已校验）
          'fkLessonTypeId':'',//基础项-课型 表外键（已校验）
          'classPackageTeachingId':'', // 课包id
          'teachingAims':'', //教学目标 500字
          'importance':'', //重点难点 500字
          'teachingTools':'', //教学工具 40字
          'teachingMethod':'',//教学方法 500字
          'teachingProcess':'', //教学过程 800字
          'teachingReflect':'',// 教学反思 500字
          'components':'',//备课组成员
				}

				this.$ajax.post('/zhjy/bkprepare/updateBkPrapareRemote.action', this.$qs.stringify(data), {
					headers: {
						"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
					}
				}).then((res) => {

					if (res.data.success == 1) {


					} else {

					}


				}).catch((err) => {

				})
      },







			//----------------------------------------------------------关联资源下的方法-------------------------------------------------------------------

        // 关联资源下-课中下的列表删除(未处理完)
      kzDelSmallLis(id,type,unx){

          	this.$confirm('您确定清楚资源?', '删除提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              var data = {
                'type': type,
                'prepareId':this.packageId,
                'fkId':id,
              }
              let _this = this;
              this.$ajax.post('/zhjy/bkprepare/clearBkPrapareDetailRemote.action', this.$qs.stringify(data), {
                headers: {
                  "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
                }
              }).then((res) => {
                console.log(res)

                if (res.data.success == 1) {
                  this.$router.go(0);//刷新页面展示数据
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });

                } else {
                  this.$message({
                    type: 'error',
                    message: '删除失败!'
                  });
                }

              }).catch((err) => {

              })



            }).catch(() => {

            })

      },

      // 课前课中课后的添加事件
			addClassPackageDetail(btnType, classType, obj) {


				if (classType == 1) { //课前

					let minicourseNum = 0,
						homeworkNum = 0;
					for (let i in this.beforeDetailVos) {
						if (this.beforeDetailVos[i].fkType == 'minicourse') {
							minicourseNum++
						}
						if (this.beforeDetailVos[i].fkType == 'homework') {
							homeworkNum++
						}

					}
					if (btnType == 'minicourse') { //课前微课

						if (minicourseNum > 0) {
							this.$alert('课前只允许添加一份微课!', '提示信息', 'error');
							return false;
						} else {
							this.addMicroLessonVisible = true
						}
					} else if (btnType == 'homework') { //课前作业
						if (homeworkNum > 0) {
							this.$alert('课前只允许添加一份作业!', '提示信息', 'error');
							return false;
						} else {
							// 跳转至添加课后作业的页面
						}
					}

				} else if (classType == 2) { //课中

					if (btnType == 'resource') { //课中课件
						this.addCoursewareVisible = true
					} else if (btnType == 'censor') { //课中检测
						this.addTestVisible = true
					} else if (btnType == 'bk_team_topic') { //课中添加小组学习
						this.addGroupLearnVisible = true
					} else if (btnType == 'url') { //课中添加网址
						this.addWebsiteVisible = true
					}

				} else { //课后
					if (btnType == 'homework') { //课后添加作业

					}
				}
			},

			// 课前添加附件单独处理
			addLocalFile(btnType, classType, obj) {
				let enclosureNum = 0;
				for (let i in this.beforeDetailVos) {
					if (this.beforeDetailVos[i].fkType == 'doc') {
						enclosureNum++
					}
				}
				if (classType == 1) {
					if (enclosureNum >= 5) {
						this.$alert('课前最多只允许添加5份附件!', '提示信息', 'error');
						return false;
					}
				}

				document.getElementById('attachmentFile').click()

			},

      //--------------------------------------------添加检测-----------------------------------------------
      // 更改问题的名字接口
      updateWtName(id,name){
          var data = {
            'questionId':id,
            'questionName':name,
          }
          var that = this;
          this.$ajax.post('/zhjy/bkquestion/updateBkQuestionNameRemote.action', this.$qs.stringify(data), {
            headers: {
              "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
            }
          }).then((res) => {
            if(name == null || name == ''){
              this.$message({
                type: 'error',
                message: '名称不能为空'
              });
          }
            if (res.data.success == 1) {
              this.$message({
                type: 'success',
                message: res.data.data
              });
            } else {
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
      // 更改练习的名字接口
      updateLxName(id,name){
          var data = {
            'practiceId':id,
            'practiceName':name,
          }
          var that = this;
          this.$ajax.post('/zhjy/bktppractice/updateBkTpPracticeNameRemote.action', this.$qs.stringify(data), {
            headers: {
              "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
            }
          }).then((res) => {
            if(name == null || name == ''){
              this.$message({
                type: 'error',
                message: '名称不能为空'
              });
          }
            if (res.data.success == 1) {
              this.$message({
                type: 'success',
                message: res.data.data
              });
            } else {
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

			getalykey() {//--------------上传阿里云-----------------

				this.$ajax.post('http://192.168.0.252/jypaper-customer/ossremote/getWebOss.do', {
					modelName: "beike"
				}).then((res) => {
					// console.log(res)
					if (res.data.success == 1) {
						this.aliyunKey = res.data.data
					} else {

					}
				}).catch((err) => {
					// console.log(err.Error)
					// this.$toast.info('未连接服务');
				})
			},

			//-------------------------------------------添加小组学习-----------------------------------

       // 获取弹框本地选择内容
			upfilealy(e) {

				//获取当前日期
				var nowDate = new Date();
				let date = {
					year: nowDate.getFullYear(),
					month: nowDate.getMonth() + 1,
					date: nowDate.getDate(),
				}
				let systemDate = date.year + '-' + date.month + '-' + date.date;


				var files = e.target.files; //获取文件
				// console.log(files)
				let tfile = files[0];

				this.fname = tfile.name; //获取上传文件的名称
				// console.log(this.fname)
				this.suffix = tfile.type.split("/")[1]; //获取文件的类型
				this.fSize = tfile.size; //获取文件大小
				if(this.fSize/(1024*1024)>50){
					this.$alert('文件大小不能超过50M!', '提示信息', 'warn');
				}

				let ossData = new FormData();
				ossData.append('OSSAccessKeyId', this.aliyunKey.accessId);
				ossData.append('policy', this.aliyunKey.policy);
				ossData.append('Signature', this.aliyunKey.signature);
				ossData.append('key', this.aliyunKey.dir + this.fname);
				ossData.append('Content-Type', 'application/octet-stream');
				ossData.append('success_action_status', 200); // 指定返回的状态码
				ossData.append("file", tfile);
				this.burl = this.aliyunKey.host + "/" + this.aliyunKey.dir + this.fname;
				// console.log(burl)
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				let that = this;
				this.$ajax.post(this.aliyunKey.host, ossData, config).then((res) => {

					// console.log(res)
          // 添加小组学习--本地选择上传列表数据
          that.localSelectList.push({
              name:this.fname,
              fileSuffix: this.suffix,
              gmtCreate: systemDate,
						  gmtModified: systemDate,
          })
          // console.log(that.localSelectList)
          // 获取小组学习上传接口参数
          that.localUploadData.push({
            "isUseAliyun": 1,
						"resourceName": this.burl,
            "resourceAlias": this.fname,
            "resourceType":1
          })

					// console.log(that.localUploadData)




				}).catch((err) => {

					console.log(err)
				});


      },
      // 弹框本地选择
			topicAddLocalFile(){
				document.getElementById('localSelectFile').click()
      },
      // 弹框本地选择---删除
      deleteFileInfo(inx){
        this.localSelectList.splice(inx,1)
      },

			// 添加网络链接列表
			addUrlList(){
				this.webResourcesData.push({});
				if(this.webResourcesData.length>=10){
					this.$alert('网络连接最多只能添加10条!', '提示信息', 'warn');

				}

			},
			// 删除网络链接列表
			deleteWebResourcesList(inx){
				this.webResourcesData.splice(inx,1)
			},

			//弹框清空事件--添加小组学习
			groupLearnClear() {
				this.topicName = '' //主题名称
        this.topicsDiscussion = ''//讨论主题
        this.localSelectList = ''//本地选择清空
			},
			// 加入备课事件--添加小组学习
			saveTopic(){
				if(this.topicName == ''){
					this.$alert('主题名称不能为空!', '提示信息', 'warn');
				}else if(this.topicsDiscussion == ''){
					this.$alert('主题内容不能为空!', '提示信息', 'warn');
				}else{

          let newArr=[];// 获取网络链接的数据
          for(let i in this.webResourcesData){
             this.wrName = this.webResourcesData[i].wrName;
             this.wrAddress = this.webResourcesData[i].wrAddress;
             newArr.push({
              "resourceAlias":this.wrName,
              "resourceName":this.wrAddress,
              "resourceType":2
            })
          }
          var resourceArr = this.localUploadData.concat(newArr);// 合并本地选择数组与网络链接的数据-this.localUploadData为本地选择数组
          // console.log(resourceArr)

          let activityName='';//获取每个的类别
          for(let i in this.bkActivities){
              activityName = this.bkActivities[i].activityName
          }

          if(activityName == '小组活动'){//通过这个判断下面是否存在资源，如果不存在，则不传activityId

            let activityId = document.getElementById('groupTopActivityId').value;//获取activityId

            var data = {
              'topicName':this.topicName,//主题名称
              'topicContent':this.topicsDiscussion,//讨论主题
              'fkSchoolId':this.fkSchoolId,
              'resourceJson':JSON.stringify(resourceArr),
              'prepareId':this.packageId,
              'source':'bkPrepare',
              'activityId':activityId,//当存在小组学习时（即第二次加入）
            }
          }else{
            var data = {
              'topicName':this.topicName,//主题名称
              'topicContent':this.topicsDiscussion,//讨论主题
              'fkSchoolId':this.fkSchoolId,
              'resourceJson':JSON.stringify(resourceArr),
              'prepareId':this.packageId,
              'source':'bkPrepare',
            }
          }


          this.$ajax.post('/zhjy/bkteamtopic/saveRemote.action', this.$qs.stringify(data), {
            headers: {
              "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
            }
          }).then((res) => {
            console.log(res)
            if (res.data.success == 1) {
                this.$router.go(0);//刷新页面展示新添数据
                this.addGroupLearnVisible = false;

            } else {

            }


          }).catch((err) => {

          })


				}

      },

      // 更改小组学习的名字（课中为单独接口，不共用）
      updateXzName(id,name){
          var data = {
            'topicId':id,
            'topicName':name,
          }
          var that = this;
          this.$ajax.post('/zhjy/bkteamtopic/updateBkTeamTopicNameRemote.action', this.$qs.stringify(data), {
            headers: {
              "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
            }
          }).then((res) => {
            if(name == null || name == ''){
              this.$message({
                type: 'error',
                message: '名称不能为空'
              });
          }
            if (res.data.success == 1) {
              this.$message({
                type: 'success',
                message: res.data.data
              });
            } else {
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


			//--------------------------------------------------添加网址----------------------------------------
			// 保存网址到关联资源下的课中
			saveUrl(){
					if(this.addWebName == ''){ //名称
					this.$alert('网址名称不能为空!', '提示信息', 'warn');
				}else if(this.addWebAddress == ''){ //地址
					this.$alert('网址地址不能为空!', '提示信息', 'warn');
				}else{

          let activityName='';
          for(let i in this.bkActivities){
              activityName = this.bkActivities[i].activityName
          }
          // console.log(activityName)
          if(activityName == '资源'){ //通过这个判断下面是否存在资源，如果不存在，则不传activityId

              let activityId = document.getElementById('groupResActivityId').value;//获取activityId
              var data = {
                'resourceName':this.addWebName,//网址名称
                'resourceAlias':this.addWebAddress,//网址地址
                'fkSchoolId':this.fkSchoolId,
                'resourceType':2,
                'prepareId':this.packageId,
                'source':'bkPrepare',
                'activityId':activityId,
              }

          }else{

            var data = {
                'resourceName':this.addWebName,//网址名称
                'resourceAlias':this.addWebAddress,//网址地址
                'fkSchoolId':this.fkSchoolId,
                'resourceType':2,
                'prepareId':this.packageId,
                'source':'bkPrepare',
            }

          }
          var that = this;
          this.$ajax.post('/zhjy/bkresource/saveRemote.action', this.$qs.stringify(data), {
            headers: {
              "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
            }
          }).then((res) => {
              // console.log(res);
            if (res.data.success == 1) {
                this.$router.go(0);//刷新页面展示新添数据
                this.addWebsiteVisible = false;//关闭弹框
            } else {

            }


          }).catch((err) => {

          })


				}
			},


			//---------------------------------底部按钮操作事件(清空,保存)----------------------------------------------------------------------------------
			// 清空按钮
			clearData() {
				this.cpData = '';

				this.ktIpt = ''; // 课题名称
				this.gradeVal = ''; //年级
				this.lessonTypeVal = ''; //课型名称
				this.ksIpt = ''; //课时
				this.bkzIpt = ''; //备课组成员
				this.zbkIpt = ''; //主备课人

				this.teachObjectContent = ''; //教学目标
				this.keyDifficultPointsContent = ''; //重点难点
				this.teachMethodContent = ''; //教学方法
				this.teachProcessContent = ''; //教学过程
				this.reflectionsTeachContent = ''; //教学反思
				this.itIpt = ''; //教学工具

				this.beforeDetailVos = ''; //课前
				this.inDetailVos = ''; //课中
				this.afterDetailVos = ''; //课后
			},

			// 保存备课
			preserveLessonPreparation(){

          this.kzUpdate();

			},

		}
	}
</script>

<style scoped>
	/* .ql-editor{
		height: 100px!important;
	} */

	/* .el-dialog__body{height: 50vh;overflow: auto;} */

	.makeLesson {
		margin-top: 10px;
	}

	/* 左侧树 */
	.treeWrap {
		width: 270px;
		height: 500px;
		background-color: #fff;
		margin-right: 10px;
	}

	/* 右侧制作备课内容 */
	.makeWrap {
		width: 900px;
		background-color: #fff;
		padding: 15px;
	}

	.chapterList {
		color: #666;
	}

	.common-list {
		margin-top: 40px;
		clear: both;
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

	/* 基础项 */
	.baseItemIn {
		clear: both;
		padding: 0 30px;
	}

	.baseItemIn p {
		margin: 15px 0;
	}

	.iptList {
		margin-right: 80px;
	}

	.iptList b {
		color: orange;
		vertical-align: middle;
	}

	.charteredCar {
		width: 80px;
		height: 26px;
		text-align: center;
		line-height: 26px;
		border-radius: 13px;
		background-color: #FFA800;
		color: #fff;
		font-size: 16px;
	}

	.deleteStepImg {
		cursor: pointer;
	}

	/* 关联资源 */
	.associatResourceBtn .associatResourceList {
		margin: 20px 0;
	}

	.oneTitle {
		padding: 5px 25px;
		background-color: #FBD14B;
		color: #fff;
		border-top-right-radius: 15px;
		border-bottom-right-radius: 15px;
	}

	.otherBtn {
		padding: 4px 10px;
		border: 1px solid #55C3B1;
		color: #55C3B1;
		border-radius: 4px;
		margin: 0 10px;
	}

	.otherBtn:hover {
		background-color: #55C3B1;
		border-color: #55C3B1;
		color: #fff;
	}

	.addNumSpan {
		color: #999;
	}

	.addNum {
		color: #55C3B1;
		font-weight: 700;
	}

	.enclosureWarn {
		font-size: 12px;
	}


	.commonList {
		height: 40px;
		border-bottom: 1px solid #ddd;
		padding: 10px 5px;
		margin-left: 90px;
		font-size: 12px;
	}

	.guideTitle {
		margin-right: 10px;
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
		font-size: 14px;
		font-weight: 100;
		margin-bottom: 5px;
	}

	.resText {
		color: #666;
		font-size: 12px;
	}

	.resText span {
		margin-right: 30px;
	}

	.commonListRg {
		margin: 15px 0;
	}

	.commonListRg img {
		cursor: pointer;
		margin-right: 10px;
		vertical-align: middle;
	}
  .iptName{
    padding: 0 5px;
  }




	/* 分享按钮 */
	.shareWrap {
		text-align: center;
		margin: 40px 0;
	}

	/* 底部操作按钮 */
	.bottomBtnWrap {
		text-align: center;
	}

	.bottomBtnWrap a {
		padding: 5px 20px;
		color: #fff;
		background-color: #55C3B1;
		border-radius: 4px;
		margin: 0 20px;
	}

	.bottomBtnWrap a:hover {
		background-color: #4BAC9C;
	}

	/* 课中添加小组弹框内容样式 */

	.addGroupLearnList {
		clear: both;
		min-height: 40px;
		margin: 15px 0;
	}

	.addGroupLearnList b {
		color: red;
	}
	.webResourcesBox{
		width: 720px;
	}
	.webResourcesWrap {

		border: 1px solid #ddd;
		padding: 10px;
		border-radius: 4px;
		margin: 10px 10px 30px;
	}

	.webResourcesList {
		height: 32px;
		line-height: 32px;
		margin: 15px 0;
	}

	.listSpan {
		margin-right: 20px;
	}

	.deleteWr {
		color: #55C3B1;
	}

	.deleteWr:hover {
		color: #4BAC9C;
	}

	.webResWarn {
		color: #999;
	}

	.localChoiceWrap{
		width: 700px;
		margin: 0 10px;
	}
	.chioceFileList{
		height: 33px;
		line-height: 33px;
	}
	.fileName{
		width: 600px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.fileDel{
		color: #55C3B1;
		cursor: pointer;
	}
	.lh{
		line-height: 30px;
	}

	/* 课中添加网址弹框内容样式 */
	.addWzBox p {
		clear: both;
		height: 32px;
		line-height: 32px;
		margin-bottom: 20px;
	}

	/* 课包车弹框内容样式 */
	.charteredCarList {
		height: 50px;
		border-bottom: 1px solid #ddd;
		margin-bottom: 15px;
	}

	.fileIcon {
		margin: 10px 10px 10px 0;
	}

	.charteredCarText h5 {
		font-size: 14px;
		margin-bottom: 5px;
		width: 550px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.carResource {
		font-size: 12px;
		color: #666;
	}

	.charteredCarLeft {
		width: 80%;
	}

	.charteredCarRight {
		width: 20%;
		margin: 10px 0;
	}

	.qzhWrap span {
		padding: 2px;
		color: #fff;
		background-color: #bfbfbf;
		font-size: 12px;
		margin: 0 3px;
	}

	.qzhWrap .qzhBlue {
		background-color: #009BFF;
	}

	.otherCz img {
		margin: 0 3px;
	}
</style>
