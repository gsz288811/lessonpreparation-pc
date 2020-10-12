<template>
	<div class="assessmentTemplateManagement commonWidth">
		<div class="atmWrap">
			<div class="leftWrap common-left">
				<p class="leftTitle">评课模板</p>
				<div class="mobanBox">
					<el-scrollbar style="height: 100%;">
						<p class="templateList" v-for="(v,inx) in thumbnailImg" :key="inx">
							<a href="javascript:;" class="templateImg" :class="{'borderAct':imgInx==inx}" @click="clickImg(inx,v.lessonTemplateId)">
								<img :src="v.thumbnailUrl" alt="" class="thumbnail">
								<!-- <img src="../assets/Previewrelease_btn.png" alt=""> -->
							</a>
							<span class="templateTitle">{{v.thumbnailTitle}}</span>
						</p>
						<div class="templateList">
							<a href="javascript:;" class="addtemplate" @click="clickImg(100)">+</a>
						</div>
					</el-scrollbar>
				</div>
			</div>
			<div class="centerWrap common-left">
				<!-- 当没有点击左侧模板时，添加模板 -->
				<div class="addCenterCont" v-show="isShowNum == 100">
					<div class="addCenterWrap" ref="imageWrapper">
						<div class="guideLanguageTitle" @click="pkbTitleBtn()">
							<h4 class="hTitle">{{pkbTitle}}</h4>
							<p class="guideLanguage">
								{{pkbGuideLanguage}}
							</p>
						</div>
						<div class="gradProblemWrap">

							<div class="standardList" v-for="(v,inx) in  pkbStandard" :key="inx">
								<p>{{v.number}}.{{v.subjectTitle}}</p>
                <!-- 客观按钮分数 -->
								<div class="radioCollect" v-if="v.type == 1">
									<el-radio :label="n" v-for="(n,num) in v.radioNum" :key="num" :tabindex="num">{{n}}</el-radio>
									<a href="javascript:;" class="common-right deleteBtn" @click="deleteStandardList(inx)" v-show="deleteShow">X</a>
								</div>
                <!-- 主观回答框 -->
                <div v-else>
                  <el-input type="textarea" placeholder="请输入内容" v-model="subjectiveAnswer" maxlength="100" show-word-limit clearable
							      size="small" style="width: 100%;" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                </div>

							</div>

						</div>
					</div>

					<p class="addBtnBox">
						<a href="javascript:;" class="commona" @click="addScoreQuestions()">添加评分题</a>
						<a href="javascript:;" class="commona" @click="addSubComment()">添加主观评价</a>
						<a href="javascript:;" class="commona" @click="addSure()">确定</a>
						<a href="javascript:;" class="commona" @click="clearList()">清除表单</a>
					</p>

				</div>
				<!-- 点击左侧小图模板右侧出现大图 -->
				<div class="bigImgBox">
					<!-- <a href="javascript:;" class="bigImg" v-for="(v,inx) in bigImg" :key="inx" v-show="isShowNum == inx">
						<img :src="v.thumbnailUrl" alt="">
					</a> -->
          <a href="javascript:;" class="bigImg">
						<img :src="bigImgUrl" alt="">
					</a>
				</div>

			</div>
			<div class="rightWrap common-left">

				<div class="teachPlanStandard">
					<p class="jaList"><span>金牌教案>=</span><input type="text" class="smallIpt" placeholder="90" v-model="goldMedal"></p>
					<p class="jaList"><span>银牌教案>=</span><input type="text" class="smallIpt" placeholder="80" v-model="silverMedal"></p>
					<p class="jaList"><span>铜牌教案>=</span><input type="text" class="smallIpt" placeholder="70" v-model="bronzeMedal"></p>
					<p class="jaList">当前分值<span class="currentScore">{{currentScore}}</span>/100分</p>
				</div>
        <input type="file" accept=".jpg,.jpeg,.png,.bmp,.mp3,.mp4,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.txt" id="localSelectFile" @change="upfilealy($event)" style="display: none;"/>
				<a href="javascript:;" class="commona saveMessage" @click="saveImg()">保存</a>
			</div>

			<!-- 修改评课表标题弹框 -->
			<div class="pkbTitleFrame">
				<el-dialog title="修改评课表标题" :visible.sync="pkbTitleVisible" width="50%" center>
					<div class="pkbCont">
						<p>
							<span class="ltSpan">大标题：</span>
							<el-input type="text" placeholder="请输入内容" v-model="pkbTitle" maxlength="50" show-word-limit clearable size="small"
							 style="width: 700px;"></el-input>
						</p>
						<p>
							<span class="ltSpan">引导语：</span>
							<el-input type="textarea" placeholder="请输入内容" v-model="pkbGuideLanguage" maxlength="100" show-word-limit
							 clearable size="small" style="width: 700px;" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
						</p>
					</div>
					<span slot="footer" class="dialog-footer">
						<el-button @click="pkbTitleSure()">确定</el-button>
						<el-button @click="pkbTitleVisible = false">关闭</el-button>
					</span>
				</el-dialog>
			</div>
			<!-- 添加评分题弹框 -->
			<div class="addScoreQuestionsFrame">
				<el-dialog title="添加评分题" :visible.sync="addScoreExamVisible" width="50%" center>
					<div class="pkbCont">
						<p>
							<span class="ltSpan">题目：</span>
							<el-input type="textarea" placeholder="请输入内容" v-model="pkbTopic" maxlength="100" show-word-limit clearable size="small"
							 style="width: 700px;" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
						</p>
						<p>
							<span class="ltSpan">分数：</span>
							<el-select v-model="scoreVal" size="small" style="width: 100px;" @change="scoreList(scoreVal)">
								<el-option v-for="(item,inx) in scoreVal" :key="inx" :value="item">{{item}}</el-option>
							</el-select>
						</p>

					</div>
					<span slot="footer" class="dialog-footer">
						<el-button @click="addScoreExamSure()">确定</el-button>
						<el-button @click="addScoreExamVisible = false">关闭</el-button>
					</span>
				</el-dialog>
			</div>
			<!-- 添加主观评价弹框 -->
			<div class="subjectCommentsFrame">
				<el-dialog title="添加主观评价" :visible.sync="subCommentsVisible" width="50%" center>
					<div class="pkbCont">
						<p>
							<span class="ltSpan">题目：</span>
							<el-input type="text" placeholder="请输入内容" v-model="subTopic" maxlength="100" show-word-limit clearable size="small"
							 style="width: 700px;" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
						</p>
						<!-- <p>
							<span class="ltSpan">评语：</span>
							<el-input type="textarea" placeholder="请输入内容" v-model="commentVal" maxlength="100" show-word-limit clearable
							 size="small" style="width: 700px;" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
						</p> -->
					</div>
					<span slot="footer" class="dialog-footer">
						<el-button @click="addCommentSure()">确定</el-button>
						<el-button @click="subCommentsVisible = false">关闭</el-button>
					</span>
				</el-dialog>
			</div>



		</div>


	</div>
</template>

<script>
	import html2canvas from "html2canvas" //将HTML生成图片
	export default {
		data() {
			return {
				imgInx: 0,
				isShowNum: 0,
				dataURL: '',
				deleteShow: true,
				// 缩略图
				imgNum:2,
				thumbnailImg:[
					// {dataURL:require('../assets/Previewrelease_btn.png'),thumbnailTitle:'缩略图1'},
					// {dataURL:require('../assets/comment.png'),thumbnailTitle:'缩略图2'},
				],
        // 大图
        bigImgUrl:'',
				bigImg:[
					// {dataURL:require('../assets/Previewrelease_btn.png')},
					// {dataURL:require('../assets/comment.png')},
				],
				//---------------------评课表标题----------------------
				pkbTitle: '评课表标题', //评课表标题v-model
				pkbGuideLanguage: '完善引导语能更好的介绍本次评课表的标准及依据', //引导语
				pkbTitleVisible: false,
				//-------------------添加评分题弹框---------------------------
				addScoreExamVisible: false,
				pkbTopic: '',
				scoreVal: 10,//弹框展示分数按钮总数

				pkbStandard: [],
				radioNum: 10,
				//---------------------添加主观题评语弹框--------------------------
				subCommentsVisible: false,
				subTopic: '', //评价标题
				subjectiveAnswer: '', //主观评价内容

				currentScore: 0, //当前分值

        // -------------------------------------------金银铜---------------------------------------
        goldMedal:'',
        silverMedal:'',
        bronzeMedal:'',

				//-----------------------上传阿里云---------------------------------
				aliyunKey: '', //阿里云上传
				fname:'', // 文件上传的名称
				suffix:'', //文件上传的类型
				fSize:'',//文件上传的大小
				burl:'',//文件上传的具体

        // classList:[
        //   {id:1,name:'一班'},
        //   {id:2,name:'二班'},
        // ],
        // classArr:[]



			}
		},
		mounted() {
      this.getalykey(); // 上传阿里云
      this.lessonTemplate();//评课模板列表

		},
		methods: {
			// 点击左侧中间显示不同内容
			clickImg(num,id) {
				this.imgInx = num;
        this.isShowNum = num;
        // console.log(id)
        this.checkLessonTemplate(id)
      },

      // 左侧评课表列表接口
      lessonTemplate(){
          var data = {
            "fkSchoolId":1
          }
          this.$ajax.post('/zhjy/lessontemplate/forwardGridRemote.action', this.$qs.stringify(data), {
            headers: {
              "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
            }
          }).then((res) => {
            // console.log(res)
            if (res.data.success == 1) {

               this.thumbnailImg = res.data.data;

            } else {
              this.$message({
                type: 'error',
                message: res.data.error
              });
            }


          }).catch((err) => {

          })
      },

      // 查看评课模板
      checkLessonTemplate(id){
         var data = {
            "lessonTemplateId":id
          }
          this.$ajax.post('/zhjy/lessontemplate/selectLessontemplateRemote.action', this.$qs.stringify(data), {
            headers: {
              "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
            }
          }).then((res) => {
            // console.log(res)
            if (res.data.success == 1) {
              this.bigImgUrl = res.data.data.thumbnailUrl;


            } else {
               this.$message({
                type: 'error',
                message: res.data.error
              });
            }


          }).catch((err) => {

          })
      },


			//-----------------------------------评课表标题-----------------------------------
			// 评课表标题弹框
			pkbTitleBtn() {
				this.pkbTitleVisible = true;
			},
			// 评课表标题弹框-确定按钮
			pkbTitleSure() {
				if (this.pkbTitle == '') {
					this.$message({
						message: '请输入评课表标题',
						title: "温馨提示", //可传空
						type: "warning"
					});
				} else if (this.pkbGuideLanguage == '') {
					this.$message({
						message: '请输入引导语',
						title: "温馨提示", //可传空
						type: "warning"
					});
				} else {
					this.pkbTitleVisible = false;
				}

			},
			//-------------------------------添加评课表内容--------------------------------------
			// 添加评分题
			addScoreQuestions() {
				this.addScoreExamVisible = true;
      },
      // 评分题弹框切换选择按钮分数
			scoreList(val){
        // console.log(val)
				 this.radioNum = val;
			},
			// 添加评分题确定事件
			addScoreExamSure() {

				if (this.pkbTopic == '') {
					this.$message({
						message: '请输入评课表题目',
						title: "温馨提示", //可传空
						type: "warning"
					});
				} else {

					let pkbStandard = [];
          let number = 1;
					this.pkbStandard.push({
            type:1,//为1时表示客观题
            number:number++, //序号
            subjectTitle: this.pkbTopic,//题目
            radioNum:this.radioNum//按钮分数

          });
          console.log(this.pkbStandard)
            // 初始化数据
            this.scoreVal = 10;
            this.pkbTopic = '';
            this.addScoreExamVisible = false;
        }

			},
			// 删除
			deleteStandardList(inx) {
				this.pkbStandard.splice(inx, 1)
			},
			addSure() {
				this.deleteShow = false;
			},

			//--------------------------------------添加主观评论-----------------------------

			addSubComment() {
				this.subCommentsVisible = true;


			},
			// 主观评论确定按钮
			addCommentSure() {
				if (this.subTopic == '') {
					this.$message({
						message: '请输入评课表标题',
						title: "温馨提示", //可传空
						type: "warning"
					});
				}else {

          let pkbStandard = [];
          let number=1;
					this.pkbStandard.push({
            type: 2,//为2时为主观题
            number:number++,//序号
						subjectTitle: this.subTopic//题目
					});

          this.subTopic = '';
					this.subCommentsVisible = false;
				}
			},
      //-------------------清除表单-----------
      clearList(){

      },

      // --------------------------------------保存并上传阿里云------------------------------------------------

			getalykey() { //上传阿里云

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

			upfilealy(e){

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
				this.$ajax.post(this.aliyunKey.host, ossData, config).then((res) => {

					// 获取添加附件上传接口参数
					// var attachmentArr = [{
					// 	"isUseAliyun": 1,
					// 	"browserUrl": this.burl,
					// 	"attachmentName": this.fname,
					// 	"suffix": this.suffix,
					// 	"fileSize":this.fSize,
					// 	"userId": 'bc81b418-5ef8-4e22-8d93-21e4229ea0db'
					// }, ]


				}).catch((err) => {

					console.log(err)
				});




			},
      // 保存
      saveImg() {
				if (this.deleteShow == true) {
					this.$message({
						message: '请先确定你添加和修改完毕再保存',
						title: "温馨提示", //可传空
						type: "warning"
					});
				} else {
					html2canvas(this.$refs.imageWrapper, {
						backgroundColor: null
					}).then((canvas) => {
						let dataURL = canvas.toDataURL("image/png");
						this.dataURL = dataURL;
						// console.log(this.dataURL)

						this.thumbnailImg.push({thumbnailUrl:this.dataURL,thumbnailTitle:this.pkbTitle}) //保存缩略图
            //this.bigImg.push({bigImgUrl:this.dataURL})//保存到大图
            this.bigImgUrl = this.dataURL
						// console.log(num)
						this.pkbTitle='评课表标题';
						this.pkbGuideLanguage = '完善引导语能更好的介绍本次评课表的标准及依据';
						this.pkbStandard = [];


          });

          //保存接口
          var dataStr = [];
          // console.log(this.pkbStandard)
          for(let i in this.pkbStandard){
              this.type = this.pkbStandard[i].type;
              this.number = this.pkbStandard[i].number;
              this.subjectTitle = this.pkbStandard[i].subjectTitle;
              if(this.type == 1){
                this.radioNum = this.pkbStandard[i].radioNum;
              }else{
                this.radioNum = 0;
              }

              dataStr.push({
                "number":this.number,
                "classEvaluationStandard":this.subjectTitle,
                "fraction":this.radioNum
              })
          }

          console.log(dataStr)

          var data = {
            "title":this.pkbTitle,//标题
            "guideLanguage":this.pkbGuideLanguage,//引导语
            "goldMedal":this.goldMedal,//金牌分数
            "silverMedal":this.silverMedal,//银牌分数
            "bronzeMedal":this.bronzeMedal,//铜牌分数
            "fkSchoolId":1,
            "thumbnailUrl":'',//缩略图地址
            "lessonTemplateDetailsStr":JSON.stringify(dataStr),
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


		}
	}
</script>

<style scoped>
	.atmWrap {
		width: 100%;
		/* height: 700px; */
		margin: 10px 0;
		/* border: 1px solid #ddd; */
		background-color: #fff;
	}

	/* 左侧模板内容 */
	.leftWrap {
		width: 17%;
		height: 700px;
		background-color: #fff;
	}

	.leftTitle {
		text-align: center;
		font-size: 16px;
		height: 40px;
		line-height: 40px;
		background-color: #DDF3EF;
		color: #4BAC9C;
	}

	.mobanBox {
		height: 660px;
		overflow: hidden;
	}

	.templateList {
		width: 160px;
		/* height: 100px; */
		text-align: center;
		margin: 15px auto;
		cursor: pointer;
	}

	.templateImg {
		width: 100%;
		height: 180px;
		/* background-color: #dfdfdf; */
		border: 2px solid transparent;
	}

	.borderAct {
		border-color: #4BAC9C;
	}

	.addtemplate {
		width: 80px;
		height: 80px;
	}
	.thumbnail{
		width: 160px;
		height: 180px;
	}

	/* 中间内容 */
	.centerWrap {
		width: 70%;
		min-height: 700px;
		border-left: 1px solid #ddd;
		border-right: 1px solid #ddd;
		text-align: center;
		overflow: hidden;
		background-color: #fff;
	}

	.bigImg {
		width: 100%;
		height: 700px;
		/* background-color: #dfdfdf; */
	}

	.hTitle {
		cursor: pointer;
		margin-top: 30px;
		margin-bottom: 10px;
		font-size: 16px;
	}

	.guideLanguage {
		color: #999;
		font-size: 14px;
		margin: 0 15px;
		text-align: left;
	}

	.addBtnBox {
		margin: 30px 0;
	}

	.standardList {
		padding: 10px 0;
		margin: 0 15px;
		border-bottom: 1px dashed #ddd;
		text-align: left;
		clear: both;
	}

	.standardList p {
		font-size: 14px;
		margin-bottom: 10px;
	}

	.deleteBtn {
		color: #4BAC9C;
	}

	/* .addCenterCont{
	height: 700px;
	overflow: hidden;
} */
	.addCenterWrap {
		overflow: hidden;
	}

	/* 右侧主要内容 */
	.rightWrap {
		width: 12%;
		height: 700px;
		text-align: center;
		background-color: #fff;
	}

	.commona {
		display: inline-block;
		padding: 4px 15px;
		color: #fff;
		background-color: #55C3B1;
		border-radius: 4px;
	}

	.clearbd {
		margin: 30px 0;
	}

	/* .teachPlanStandard {} */

	.teachPlanStandard p {
		margin: 15px 0;
	}

	.smallIpt {
		width: 50px;
		height: 30px;
		line-height: 30px;
		border: 1px solid #ddd;
		text-align: center;
		border-radius: 4px;
		margin-left: 5px;
	}

	.currentScore {
		font-weight: 700;
		color: #55C3B1;
		margin: 0 3px;
	}

	/* 修改评课表标题弹框样式 */
	.pkbCont p {
		margin-bottom: 15px;
	}

	.ltSpan {
		text-align: right;
		vertical-align: middle;
	}
</style>
