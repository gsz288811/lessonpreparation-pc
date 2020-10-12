<template>
	<div class="prepareLessonIndex commonWidth">

		<!-- 树 -->
		<div id="MyTree" class="treeWrap common-left" style="width: 270px;height: 500px;background-color: #fff;margin-right: 20px;" v-show="treeShow">
			<!-- <commonTree></commonTree> -->
			<!-- <common-tree message="bbguhui"></common-tree> -->
		 </div>

		<div class="prepareLessonWrap common-left commonWidth" :class="{commonWidth950:isAct}">
			<!-- 备课删选title  -->
			<div class="bk-title">
				<div class="bk-title-left common-left">
					<span class="bk-title-screen">

						<a href="javascript:;" :class="{'screenAct':ipInx==1}" @click="changeTimePopularity(1)" v-show = "downTshow">时间↓</a>
						<a href="javascript:;" :class="{'screenAct':ipInx==2}" @click="changeTimePopularity(2)" v-show="upTshow">时间↑</a>
						<a href="javascript:;" :class="{'screenAct':ipInx==3}" @click="changeTimePopularity(3)" v-show = "downRshow">人气↓</a>
						<a href="javascript:;" :class="{'screenAct':ipInx==4}" @click="changeTimePopularity(4)" v-show="upRshow">人气↑</a>

					</span>
					<span class="bk-title-screen borderFlRl">
						<a href="javascript:;" :class="{'screenAct2':rcInx==1}" @click="changeResourceList(1)">平台</a>
						<a href="javascript:;" :class="{'screenAct2':rcInx==2}" @click="changeResourceList(2)">校内</a>
						<a href="javascript:;" :class="{'screenAct2':rcInx==3}" @click="changeResourceList(3)">个人</a>
					</span>
					<span class="bk-title-screen">
						<a href="javascript:;" :class="{'screenAct3':dcInx==0}" @click="changeDataTimeCharpter(0)">日期</a>
						<a href="javascript:;" :class="{'screenAct3':dcInx==1}" @click="changeDataTimeCharpter(1)">章节</a>
					</span>
				</div>
				<div class="bk-title-right common-right">
					<span class="bk-right-year">
						<el-select v-model="yearVal" size="small" placeholder="全部年份" style="width: 100px;" @change="yearList(yearVal)">
							<el-option v-for="(item,inx) in arrYear" :key="inx" :value="item">{{item+'年'}}</el-option>
						</el-select>
					</span>
					<span class="bk-right-result">共<a href="javascript:;" class="rightNum">{{totalResult}}</a>个结果</span>
					<span><a href="javascript:;" class="newTeachPlan" @click="newMakeLesson(3)">新建教案</a></span>
				</div>
			</div>
			<!-- 备课列表 -->
			<div class="bk-cont-wrap">
				<div class="bk-cont-list common-left" v-for="(v,inx) in bkList" :key="inx">
					<div class="bk-cont-inf" @click="bkDetails(v)" >
						<div class="bk-cont-left common-left">
							<div class="bk-cont-inf-img common-left">
								<img src="../assets/parcel_2.png" alt="" class="parcelImg">
								<ul class="qzhUl" >
									<li>
										<a href="javascript:;" v-if="v.hasBeforeClass==1" class="liBlue">前</a>
										<a href="javascript:;" v-else>前</a>
									</li>
									<li>
										<a href="javascript:;" v-if="v.hasInClass == 1" class="liBlue">中</a>
										<a href="javascript:;" v-else>中</a>
									</li>
									<li>
										<a href="javascript:;" v-if="v.hasAfterClass == 1" class="liBlue">后</a>
										<a href="javascript:;" v-else>后</a>
									</li>
								</ul>
							</div>
							<div class="bk-cont-text common-left">
								<h4>{{v.packageName}}</h4>
								<p class="text-center"><span>来源：{{v.schoolName}}</span><span>{{v.userName}}</span></p>
								<p class="text-foot">
									<span><img src="../assets/time_icon.png" alt="">上传日期：{{v.gmtCreate}}</span>
									<span><img src="../assets/check_icon.png" alt="">查看：{{v.bNum}}</span>
								</p>
							</div>
						</div>
						<div class="common-right">
							<span class="left-top-icon">
								<!-- 金牌 -->
								<img src="../assets/goldmedal.png" alt="" v-if="v.rating == 4">
								<!-- 银牌 -->
								<img src="../assets/silvermedal.png" alt="" v-if="v.rating == 3">
								<!-- 铜牌 -->
								<img src="../assets/bronzemedal.png" alt="" v-if="v.rating == 2">
							</span>
							<!-- 已评 -->
							<img src="../assets/Haveevaluation.png" alt="" v-if="v.rating == 1">
						</div>
					</div>
					<!-- 集体展示按钮 （平台、校内只展示引用按钮  个人展示所有）-->
					<div class="bk-cont-btn" v-if="v.type == 1">
						<a href="javascript:;" class="orangeSty"  @click="jumpMakeLesson(v,1)">引用</a>
						<a href="javascript:;" class="greenSty" v-if="rcInx==3" @click="jumpMakeLesson(v,2)">编辑</a>
						<a href="javascript:;" class="greenSty" v-if="rcInx==3" @click="deleteBkList(v.type,v.packageId,inx)">删除</a>
					</div>
					<!-- 课中展示按钮 （平台引用  校内展示所有 个人展示所有）-->
					<div class="bk-cont-btn" v-if="v.type == 2">
						<a href="javascript:;" class="orangeSty"  @click="jumpMakeLessonKz(v,1)">引用</a>
						<a href="javascript:;" class="greenSty" v-if="rcInx==3||rcInx == 2" @click="jumpMakeLessonKz(v,2)">编辑</a>
						<a href="javascript:;" class="greenSty" v-if="rcInx==3||rcInx == 2" @click="jumpMakeLessonKz(v.type,v.packageId,inx)">删除</a>
					</div>


				</div>
				<!-- 没有数据时显示该图片 -->
				<div id="imgBox" v-show="imgBoxShow" >
					<img src="../assets/no_data.png" alt="">
				</div>



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
	//import commonTree from '@/commonTree/commonTree' //树


	export default {
		data() {
			return {
				treeShow: false,
				isAct: false,
				arrYear: [], //获取年份
				yearVal: '', //绑定年份

				downTshow:true, //时间↓
				upTshow:false,//时间↑
				downRshow:true,//人气↓
				upRshow:false,//人气↑

				ipInx: 1, // 定义时间和人气

				rcInx: 3, // 定义来源

				dcInx: 0, // 定义日期与章节
				bkList: '', //备课列表


				imgBoxShow: false, //没有数据是显示图片

				// 分页
				currentPage: 1, // 初始页
				showCount:8,
				totalResult: 0, //总数
				pageShow:true,//没有数据时不显示分页

				dataId:'',

			}
		},
		mounted() {

			this.loading(); //加载中


			//获取年份
			var myDate = new Date();
			var thisYear = myDate.getFullYear(); // 获取当年年份
			var Section = thisYear - 2014; // 声明一个变量 获得当前年份至想获取年份差 eg.2014
			var arrYear = []; // 声明一个空数组 把遍历出的年份添加到数组里
			for (var i = 0; i <= Section; i++) {
				this.arrYear.push(thisYear--)
			}



			this.lessonPreparationListData(); //备课列表页数据




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

			// -----------------------------------------------------------------头部操作方法----------------------------------------------------------
			// 时间与人气
			changeTimePopularity(inx) {
				this.loading(); //加载中

				this.ipInx = inx;
				if(inx == 1){
					this.downTshow = false;
					this.upTshow = true;
				}else if(inx == 2){
					this.downTshow = true;
					this.upTshow = false;
				}else if(inx == 3){
					this.downRshow = false;
					this.upRshow = true;
				}else{
					this.downRshow = true;
					this.upRshow = false;
				}

				this.lessonPreparationListData(this.ipInx)
			},
			// 来源
			changeResourceList(inx) {

				this.loading(); //加载中
				this.rcInx = inx
				this.lessonPreparationListData(this.rcInx)

			},
			// 日期与章节
			changeDataTimeCharpter(inx) {

				this.loading(); //加载中

				this.dcInx = inx
				// 跳转至章节页面
				if (this.dcInx == 1) {
					this.treeShow = true;
					this.isAct = true;
				} else {
					this.treeShow = false;
					this.isAct = false;
				}
				this.lessonPreparationListData(this.dcInx)

			},

			// 选择年份
			yearList(val) {
				this.loading(); //加载中

				this.yearVal = val
				// console.log(this.yearVal)
				this.lessonPreparationListData(this.yearVal)

			},

			// 新建教案（进入集体协同备课制作页面）
			newMakeLesson(num) {

				this.$router.push({
					path: '/makeLesson',
					query: {
						num:num
					}
				})

			},



			// ----------------------------------------------------------中间列表---------------------------------------------------------------------
			// 备课列表接口
			lessonPreparationListData() {
				var data = {
					sort: this.ipInx, //1:时间↓ 2:时间↑ 3:人气↓ 4:人气↑
					shareType: this.rcInx, //1平台 2校内 3个人
					isChapter: this.dcInx, //0日期 1章节
					selYear: this.yearVal, //前端设置的年份
					fkCourseDirtreeId: '', //教材id
					fkSysDirtreeIds: '', //章节id
					currentPage: this.currentPage,
					showCount:this.showCount,
					moldType: 0,
					userId: 'bc81b418-5ef8-4e22-8d93-21e4229ea0db',
					fkSchoolId:'1'
				}
				this.$ajax.post('/zhjy/classpackage/forwardGridRemote.action', this.$qs.stringify(data),{
					headers: {
						"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
					}
				}).then((res) => {
					// console.log(res)
					// console.log(res.data.success)
					// 没数据时出现提示图片
					if (res.data.success == 0) {
						// console.log(1111)
						this.bkList = '';
						this.imgBoxShow = true; //没有数据时提示图片显示
						this.pageShow = false;//没有数据时分页隐藏
					} else {
						// console.log(222)
						this.bkList = res.data.data.classPackages;
						this.totalResult = JSON.parse(res.data.data.page).totalResult; //总条数

						// console.log(this.totalResult)
						this.currentPage = JSON.parse(res.data.data.page).currentPage //页数
						this.imgBoxShow = false;
						this.pageShow = true;
					}

				})

			},

			// 备课详情页
			bkDetails(v){
				this.$router.push({
					path: '/previewClassEvaluation',
					query: {
						// 'type':type,
						// 'packageId':packageId,
						// 'hasBeforeClass':hasBeforeClass,
						// 'hasInClass':hasInClass,
						// 'hasAfterClass':hasAfterClass,
						 dataV:JSON.stringify(v),
					}
				})
			},




			// 集体 - 跳转至制作协同备课页面  1-引用  2-编辑
			jumpMakeLesson(v,num){
				// console.log(v)

				if(num == 1){  //引用
					var data = {
						'userId': v.userId,
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
									this.$router.push({
										path: '/makeLesson',
										query: {
											// packageId:pId,
											// 'type':type,
											dataV:JSON.stringify(v),//传列表所有数据
											'num':num,
											'quoteType':1,//引用确定状态为1
											'isUnfinished':1

										}
									})
								}


							}).catch(() => {
								this.$router.push({
									path: '/makeLesson',
									query: {
										// packageId:pId,
										// 'type':type,
										dataV:JSON.stringify(v),//传列表所有数据
										'num':num,
										'quoteType':0,//引用取消状态为0
										'dataId':this.dataId,
										'isUnfinished':1
									}
								})



							});


						}else{
							this.$router.push({
								path: '/makeLesson',
								query: {
									// packageId:pId,
									// 'type':type,

									dataV:JSON.stringify(v),//传列表所有数据
									'num':num,
									'isUnfinished':0
								}
							})

						}




					}).catch((err) => {

					})


				}else{ //编辑

					this.$router.push({
						path: '/makeLesson',
						query: {
							// packageId: pId,
							// 'type':type,

							dataV:JSON.stringify(v),//传列表所有数据
							'num':num,
						}
					})

				}
			},

      // 课中 - 跳转至制作协同备课页面  1-引用  2-编辑
      jumpMakeLessonKz(v,num){
				// console.log(v)
        // console.log(22222)
				if(num == 1){  //引用
					var data = {
						'userId': v.userId,
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
									this.$router.push({
										path: '/makeLessonKz',
										query: {
											// packageId:pId,
											// 'type':type,
											dataV:JSON.stringify(v),//传列表所有数据
											'num':num,
											'quoteType':1,//引用确定状态为1
											'isUnfinished':1

										}
									})
								}


							}).catch(() => {
								this.$router.push({
									path: '/makeLessonKz',
									query: {
										// packageId:pId,
										// 'type':type,
										dataV:JSON.stringify(v),//传列表所有数据
										'num':num,
										'quoteType':0,//引用取消状态为0
										'dataId':this.dataId,
										'isUnfinished':1
									}
								})



							});


						}else{
							this.$router.push({
								path: '/makeLessonKz',
								query: {
									// packageId:pId,
									// 'type':type,

									dataV:JSON.stringify(v),//传列表所有数据
									'num':num,
									'isUnfinished':0
								}
							})

						}




					}).catch((err) => {

					})


				}else{ //编辑

					this.$router.push({
						path: '/makeLessonKz',
						query: {
							// packageId: pId,
							// 'type':type,
              dataV:JSON.stringify(v),
							//dataV:v,//传列表所有数据
							'num':num,
						}
					})

				}
			},



			// 删除备课列表
			deleteBkList(type, packageId, inx) {
				// console.log(type)
				// console.log(packageId)

				this.$confirm('是否要删除这个集体备课?', '删除提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					//1-集体 2-课中
					if (type == 1) {

						var data = {
							'packageId': packageId
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
							'packageId': packageId
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
					//取消
				});
			},


			//-------------------------------------------------底部分页方法-----------------------------------------------------------------------
			handleSizeChange(val){ //每页展示多少条

				this.showCount = val;
				this.lessonPreparationListData(this.showCount)
			},
			handleCurrentChange(val){ //第几页

				this.loading(); //加载中
				this.currentPage = val;
				this.lessonPreparationListData(this.currentPage)
			},










		}
	}
</script>

<style scoped>
	.commonWidth950 {
		width: 950px;
	}

	.prepareLessonIndex {
		overflow: hidden;
		margin-top: 10px;
	}

	.prepareLessonWrap {
		background-color: #fff;

	}

	/* 备课删选title样式	 */
	.bk-title {
		height: 45px;
		border-bottom: 2px solid #55C3B1;
		font-size: 14px;
		margin-bottom: 10px;
	}

	.bk-title-screen {
		margin: 9px 0;
	}

	.bk-title-screen a {
		padding: 3px 10px;
		border: 1px solid #ddd;
		background-color: #fff;
		border-radius: 4px;
		color: #666;
		margin: 0 8px;
	}

	.bk-title-screen a img {
		margin-right: 3px;
	}

	.bk-title-screen .screenAct {
		background-color: #55C3B1;
		border-color: #55C3B1;
		color: #fff;
	}

	.bk-title-screen .screenAct2 {
		background-color: #55C3B1;
		border-color: #55C3B1;
		color: #fff;
	}

	.bk-title-screen .screenAct3 {
		background-color: #55C3B1;
		border-color: #55C3B1;
		color: #fff;
	}

	.borderFlRl {
		border-left: 2px solid #999;
		border-right: 2px solid #999;
	}

	.newTeachPlan {
		padding: 5px 14px;
		background-color: #55C3B1;
		border-radius: 15px;
		font-size: 14px;
		color: #fff;
	}

	.newTeachPlan:hover {
		background-color: #4BAC9C;
	}

	.bk-right-result {
		line-height: 45px;
	}

	.rightNum {
		color: #55C3B1;
		font-weight: 700;
		margin: 0 3px;
	}

	.bk-title-right span {
		margin: 0 10px;
	}

	/* 备课列表 */
	.bk-cont-wrap{
		height: 680px;
	}
	.bk-cont-list {
		width: 48%;
		height: 150px;
		border: 1px solid #ECECEC;
		margin: 8px;
	}

	.bk-cont-list:hover {
		border-color: #55C3B1;
	}

	.bk-cont-left {
		padding: 15px 0;
	}

	.left-top-icon {
		margin-right: 10px;
		margin-top: 15px;
	}

	.left-top-icon img {
		width: 80%;
	}

	.bk-cont-text h4 {
		width: 300px;
		font-size: 16px;
		color: #333;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		cursor: pointer;
	}
	.bk-cont-text h4:hover{
		color: #55C3B1;
	}

	.text-center {
		line-height: 30px;
		color: #666;
		font-size: 12px;
	}

	.text-center span {
		margin-right: 10px;
	}

	.text-foot {
		font-size: 12px;
		color: #B6B6B6;
	}

	.text-foot span {
		margin-right: 10px;
	}

	.text-foot span img {
		vertical-align: middle;
		margin-right: 4px;
	}

	.qzhUl li a{
		float: left;
		padding: 0 2px;
		font-size: 12px;
		color: #fff;
		background-color: #ddd;
		margin: 0 2px;
	}

	.qzhUl .liBlue {
		background-color: #009BFF;
	}

	.bk-cont-inf-img {
		width: 60px;
		text-align: center;
		margin: 0 10px;
	}

	.parcelImg {
		margin: 7px 0;
	}

	.bk-cont-btn {
		clear: both;
		text-align: center;
	}

	.bk-cont-btn a {
		padding: 4px 10px;
		border-radius: 4px;
		margin: 0 10px;
		font-size: 16px
	}

	.bk-cont-btn .orangeSty {
		border: 1px solid #FFA800;
		color: #FFA800;
	}

	.bk-cont-btn .orangeSty:hover {
		color: #fff;
		background-color: #FFA800;
	}

	.bk-cont-btn .greenSty {
		border: 1px solid #55C3B1;
		color: #55C3B1;
	}

	.bk-cont-btn .greenSty:hover {
		color: #fff;
		background-color: #55C3B1;
	}
</style>
