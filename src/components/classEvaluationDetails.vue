<template>
	<div class="classEvaluationDetails commonWidth">
		<div class="cedWrap">
			<div class="headWrap">
				<div class="cedHead">
					<div class="cedHeadFl common-left"><img src="../assets/lecturer.png" alt="">{{userName}}</div>
					<a href="javascript:;" class="common-right" @click="goBack()"><img src="../assets/hd_back.png" alt=""></a>
				</div>
				<div class="teachPlanBox">
					<p class="titelP">点击选择要评的教案：</p>
					<div class="teachPlanListWrap">
						<div class="teachPlanList common-left" v-for="(v,inx) in teachPlanList" :key="inx" :class="{'tplAct':isnum==inx}" @click="clickList(inx,v)">
              <img src="" alt="" v-if="v.rating ==0 ||v.rating == null">
							<img src="../assets/alreadyEvaluated.png" alt="" style="width:15%;" class="common-left" v-else>
							<div class="listCont common-left">
								<p class="topicP">课题：<span>{{v.packageName}}</span></p>
								<p class="timeCharpter">{{v.gmtCreate.split(" ")[0]}} {{v.dirtreeName.split(" ")[0]}}</p>
							</div>
						</div>
					</div>
					<div class="pageWrap common-right">
						<el-pagination
						  small
						  layout="prev, pager, next"
						  :total="totalResult" :current-page.sync="currentPage" :page-size="showCount" @size-change="handleSizeChange" @current-change="handleCurrentChange">
						</el-pagination>
					</div>
				</div>

			</div>

			<div class="classEvaluationTemplateWrap">
				<div class="cetFl common-left">
					<el-scrollbar style="height: 100%;">
					<div class="cetFlWrap">
						<p class="cetFlBigTitle">【绑定之前章节位置：<span class="chapterList">数学-七年级上册-人教版 ＞ 第一章 有理数 ＞ 1.2 有理数</span> 】</p>
						<div class="cetFlCont">
							<div class="cetFlContList">
								<p class="cetFlTitle">1.基础项</p>
								<el-popover placement="right" title="" trigger="click">
									  <img :src="imgUrl" style="height: 500px;width: 500px">
									  <img slot="reference" :src="imgUrl" alt="" style="max-height: 150px;max-width: 330px">
								</el-popover>
							</div>
							<div class="cetFlContList">
								<p class="cetFlTitle">1.基础项</p>
								<el-popover placement="right" title="" trigger="click">
									  <img :src="imgUrl" style="height: 500px;width: 500px">
									  <img slot="reference" :src="imgUrl" alt="" style="max-height: 150px;max-width: 330px">
								</el-popover>
							</div>
							<div class="cetFlContList">
								<p class="cetFlTitle">1.基础项</p>
								<el-popover placement="right" title="" trigger="click">
									  <img :src="imgUrl" style="height: 500px;width: 500px">
									  <img slot="reference" :src="imgUrl" alt="" style="max-height: 150px;max-width: 330px">
								</el-popover>
							</div>
							<div class="cetFlContList">
								<p class="cetFlTitle">1.基础项</p>
								<el-popover placement="right" title="" trigger="click">
									  <img :src="imgUrl" style="height: 500px;width: 500px">
									  <img slot="reference" :src="imgUrl" alt="" style="max-height: 150px;max-width: 330px">
								</el-popover>
							</div>


						</div>




          </div>

					</el-scrollbar>

				</div>
				<div class="cetFr common-right">
					<el-scrollbar style="height: 100%;">
            <!-- 展示已评模板数据 -->
            <div v-if="alreadyEvaluatedShow">
                <div class="cetFrDetails common-left">
                <div class="bigTitle">
                  <h4>{{pkbTitle}}</h4>
                  <p>{{guideLanguage}}</p>
                </div>
                <div class="standardBox">
                  <div class="standardList" v-for="(v,inx) in  pkbStandard" :key="inx">
                        <p>{{v.number}}.{{v.classEvaluationStandard}}</p>
                        <!-- 客观按钮分数 -->
                        <div class="radioCollect" v-if="v.maxFraction>0">
                          <el-radio :label="n" v-for="(n,num) in v.maxFraction" :key="num" v-model="v.fraction" @change="selectRadio(inx)" :tabindex="num">{{n}}</el-radio>
                        </div>
                        <!-- 主观回答框 -->
                        <div v-else>
                          <el-input type="textarea" placeholder="请输入内容" v-model="subjectiveAnswer" maxlength="100" show-word-limit clearable
                            size="small" style="width: 100%;" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                        </div>
                  </div>
                </div>

              </div>
              <div class="cetFrScore common-left">
                <p class="currentScore">当前分值：<span class="myScore">{{myScore}}</span>/100分</p>
              </div>
            </div>
            <!-- 展示未评模板数据 -->
            <div v-if="noEvaluatedShow">
                <div class="cetFrDetails common-left">
                <div class="bigTitle">
                  <h4>{{pkbTitle}}</h4>
                  <p>{{guideLanguage}}</p>
                </div>
                <div class="standardBox">
                  <div class="standardList" v-for="(v,inx) in  pkbStandard" :key="inx">
                        <p>{{v.number}}.{{v.classEvaluationStandard}}</p>
                        <!-- 客观按钮分数 -->
                        <div class="radioCollect" v-if="v.maxFraction>0">
                          <el-radio :label="n" v-for="(n,num) in v.maxFraction" :key="num" v-model="selectRadioScore[inx]" @change="selectRadio(inx)" :tabindex="num">{{n}}</el-radio>
                        </div>
                        <!-- 主观回答框 -->
                        <div v-else>
                          <el-input type="textarea" placeholder="请输入内容" v-model="subjectiveAnswer" maxlength="100" show-word-limit clearable
                            size="small" style="width: 100%;" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                        </div>


                  </div>
                </div>

              </div>
              <div class="cetFrScore common-left">
                <p class="currentScore">当前分值：<span class="myScore">{{myScore}}</span>/100分</p>
                <a href="javascript:;" class="sureBtn" @click="sureScore()">确定</a>
              </div>
            </div>






					</el-scrollbar>


				</div>
			</div>



		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      userName:'',//名字
      // ------------------------------头部要评的教案--------------------------------
      teachPlanList:[],//教案列表
      currentPage:1,//第几页
      showCount:4,//每页展示条数
      totalResult:'',//分页总数
      isnum:0,//教案默认选中第一份

      //--------------------------------------左侧图片------------------------------
      isChoose:false,
      imgUrl:require('../assets/no_data.png'),
      // -----------------------------------评课表-------------------------------------
      pkbTitle:'',//评课表标题
      guideLanguage:'',//引导语
      pkbStandard:[],

      // 已评课表模板
      alreadyEvaluatedShow:true,//是否显示已评模板的数据
      // 未评课表模板
      noEvaluatedShow:false,//是否显示未评模板的数据
      myScore:0,//当前分值
      selectRadioScore:[],//模板列表每道题所选择的分值

    }
  },
  mounted(){
    this.dataV = JSON.parse(this.$route.query.dataV);//获取上个页面传过来的数据
    this.lessonTemplateId = this.$route.query.lessonTemplateId;//获取模板id

    console.log(this.dataV)
    this.userName = this.dataV.teacherName

    this.lessonPlanList();//教案展示列表

  },
  methods:{
	  // 返回
	  goBack() {
	  	this.$router.go(-1);
	  },
	 chooseImg(){
	 	  this.isChoose = !this.isChoose
	 },


    // 教案展示列表
    lessonPlanList(){
      var data = {
					"startTime":'2016-08-31 23:59:59',
					"endTime": '2020-09-04 20:23:55',
					"schoolId":this.dataV.fkSchoolId,
					"shareType":'',
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
          this.teachPlanList = res.data.data.classPackageNewVos;
          this.totalResult = res.data.data.totalResult;
          let a = this.teachPlanList[0];
          this.timetable(a);//评课表
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

    // 切换教案
    clickList(inx,v) {
      this.isnum = inx;

      if(v.rating ==0 ||v.rating == null){ //未评
        this.alreadyEvaluatedShow = false;
        this.noEvaluatedShow = true;
        this.timetableNo()//未评
        this.myScore = 0;
      }else{//已评
        this.alreadyEvaluatedShow = true;
        this.noEvaluatedShow = false;
        this.timetable(v)//已评数据
      }


    },

    // 评课表--已评
    timetable(v){
      // console.log(v)
      if(v.type == 1){
        var data = {
				  "fkPackageId":v.packageId
				  // "fkPackageId":2
        }
      }else{
        var data = {
          "fkPrepareId":v.prepareId
        }
      }
				this.$ajax.post('/zhjy/lessontemplatefraction/forwardGridRemote.action', this.$qs.stringify(data), {
          headers: {
						"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
					}
				}).then((res) => {

            if(res.data.success == 1){
                this.pkbTitle = res.data.data.title;//标题
                this.guideLanguage = res.data.data.guideLanguage;//引导语
                this.pkbStandard = res.data.data.lessonTemplateDetails;//评课表内容

                // 计算获得的总分值
                for(let i in this.pkbStandard){
                  var a = this.pkbStandard[i].fraction;
                  this.myScore +=a
                }

            }else{
                this.$message({
                  type: 'error',
                  message: res.data.error
                });
            }


				}).catch((err) => {

				})


   },
    // 评课表--未评
    timetableNo(){
      var data = {
        "lessonTemplateId":this.lessonTemplateId
      }
      this.$ajax.post('/zhjy/lessontemplate/selectLessontemplateRemote.action', this.$qs.stringify(data), {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
        }
      }).then((res) => {
        // console.log(res)
        if (res.data.success == 1) {
            this.pkbTitle = res.data.data.title;//标题
            this.guideLanguage = res.data.data.guideLanguage;//引导语
            this.pkbStandard = res.data.data.lessonTemplateDetails;//评课表内容



        } else {
          this.$message({
            type: 'error',
            message: res.data.error
          });
        }


      }).catch((err) => {

      })
    },

    // 获取评课表每道题选择的分数
	  selectRadio(inx){
		   this.myScore += this.selectRadioScore[inx]
	  },
    // 确定按钮接口
	  sureScore(){
        var data =[];
        var a={
          "number":1,
          "fkLessonTemplateId":2,
          "fraction":'2',
          "content":'dassdsd',
          "fkPackageId":'1',
          "fkPrepareId":'',
        }
        data.push(a)
				this.$ajax.post('/zhjy/lessontemplatefraction/saveLessonTemplateFractionRemote.action', data, {

				}).then((res) => {

				}).catch((err) => {

				})


    },



  },
}
</script>

<style>
/* .cedWrap{

} */
.headWrap{
	background-color: #fff;
	overflow: hidden;
	padding: 15px;
}
.cedHead{
	height: 33px;
}
.cedHeadFl img{
	vertical-align: middle;
}
/* 教案列表 */
.teachPlanBox{
	height: 140px;
	border: 1px solid #ddd;
	padding: 10px;
	margin: 15px 0;
}

.titelP{
	font-size: 16px;
	color: #333;
	margin-left: 15px;
	margin-bottom: 10px;
}
.teachPlanList{

	border: 1px solid #ddd;
	border-radius: 4px;
	margin: 0 15px;
	cursor: pointer;
}
.teachPlanList:hover{
	border-color: #55C3B1;
}
.listCont{
	padding: 5px 10px;
}
.tplAct{
	border-color: #55C3B1;
}

.topicP span{
	color: #666;
	font-size: 14px;
}
.timeCharpter{
	color: #999;
	font-size: 14px;
	margin-top: 5px;
	text-align: center;
}
.pageWrap{
	clear: both;
}
/* 主体内容 */
.classEvaluationTemplateWrap{
	margin: 20px 0;
}
/* 左侧教案详情 */
.cetFl{
	width: 26%;
	height: 600px;
	/* border: 1px solid #ddd; */
	background-color: #fff;

}
.cetFlWrap{
	padding: 15px;
}
.cetFlBigTitle{
	font-size: 14px;
	color: #fff;
}
.cetFlBigTitle span{
	color: #999;
}
.cetFlTitle{
	font-size: 14px;
	color: #999;
	margin-bottom: 10px;
}



/* 右侧评课表 */
.cetFr{
	width:72%;
	/* border: 1px solid #ddd; */
	height: 600px;
	background-color: #fff;
}
.cetFrDetails{
	width: 74%;
	border: 1px solid #ddd;
	padding: 10px;
	margin: 10px;
}

.bigTitle{
	/* border-bottom: 1px solid #ddd; */
	font-size: 20px;
}
.bigTitle h4{
	text-align: center;
}
.bigTitle p{
	color: #999;
	font-size: 14px;
	margin: 10px 0;
}
.standardList{
	padding: 10px 0;
	border-bottom: 1px dashed #ddd;
}
.standardList p{
	font-size: 14px;
	margin-bottom: 10px;
}

.cetFrScore{
	width: 20%;
	text-align: center;
	margin: 200px 0;
}
.currentScore{
	font-size: 14px;
	margin-bottom: 10px;
}
.myScore{
	font-size: 16px;
	font-weight: 700;
	color: #55C3B1;
}
.sureBtn{
	padding: 3px 10px;
	color: #fff;
	background-color: #55C3B1;
	border-radius: 4px;
	font-size: 14px;
}
.sureBtn:hover{
	background-color: #4BAC9C;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
