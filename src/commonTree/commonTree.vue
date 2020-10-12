<template>
	<div class="commonTree commonWidth" >
		<div class="treeBox">
			<div class="treeHead">
				<div class="treeTop">
					<div class="treeTopShow">
						<p class="allName common-left">{{detailMessage}}</p>
						<a herf="JavaScript:;" class="xiala-btn common-left" @click="xialaBtn()"><img src="../assets/xiala.png" alt=""></a>
					</div>
					<!-- <ul class="zhjytree_books_ul" v-show="xialaShow">
						<li :class="{'liAct':xialaNum==inx}" v-for="(v,inx) in xialaData" :key="inx" @click="changeXiala(inx,v.courseDirtreeName)">{{v.courseDirtreeName}}</li>
					</ul> -->
				</div>
				<div class="gradeSearch">
					<a href="javascript:;" class="gradeMoreBtn" :class="Isdisplay?'xialaimg1':'xialaimg2'" @click="gradeMoreBtn()" v-show="imgShow">更多</a>
					<div class="slideup" v-show="Isdisplay">
						<div class="grade-box" id="grade-box">
							<p class="textbook-slc-title">教材选择</p>
							<div class="textbook-slc-box">
								<div class="slcListWrap">
									<!-- 学段 -->
									<div class="slcList">
										<span class="textbook-slcBox-name">学段:</span>
										<span class="grade-slc-btn" id="grade-slc-btn">
											<!-- <a href="javascript:;" :class="{gsbactive:acton==3}" @click="selectSegment(3)">高中</a>
											<a href="javascript:;" :class="{gsbactive:acton==2}" @click="selectSegment(2)">初中</a>
											<a href="javascript:;" :class="{gsbactive:acton==1}" @click="selectSegment(1)">小学</a> -->
											<a href="javascript:;" v-for="(v,inx) in learnSection" :key="inx" :class="{'gsbactive':acton==inx}" @click="selectSegment(inx)">{{v.gradeTypeName}}</a>
										</span>
									</div>
								
									<!-- 科目 -->
									<div class="slcList">
										<span class="textbook-slcBox-name">科目:</span>
										<div class="select-div">
											<el-select v-model="subjectVal" placeholder="请选择科目" @change="showsubjectlist(subjectVal)" size="mini"  style="width: 150px;">
												<el-option v-for="(v,index) in subjectList" :key="index" :value="v">{{v.subjectName}}</el-option>
											</el-select>
										</div>
									</div>	
								
									<!-- 年级 -->
									<div class="slcList">
										<span class="textbook-slcBox-name">年级:</span>
										<div class="select-div">
											<el-select v-model="gradeVal" placeholder="请选择年级" @change="showgradelist(gradeVal)" size="mini"  style="width: 150px;">
												<el-option v-for="(v,index) in gradeValList" :key="index" :value="v">{{v.gradeName}}</el-option>
											</el-select>
										</div>
									</div>
								
									<!-- 版本 -->
									<div class="slcList">
										<span class="textbook-slcBox-name">版本:</span>
										<div class="select-div">
											<el-select v-model="bookversionVal" placeholder="请选择教材版本" @change="bookversionshowlist(bookversionVal)" size="mini"  style="width: 150px;">
											<el-option v-for="(v,index) in bookversionList" :key="index" :value="v">{{v.publisherName}}</el-option>
										 </el-select>
										</div>
									</div>
								</div>
								<!-- 学科册数或者必修 -->
								<el-scrollbar style="height: 100%;">
									<div class="bookNumCompulsory" style="height: 100px;">
										<p v-for=" (v,inx) in bookNumCompulsoryData" :key="inx" :class="{'bncAct':manageNum == inx}" @click="manageNum = inx">{{v.courseDirtreeName}}</p>
									</div>
								</el-scrollbar>
								<!-- 按钮 -->
								<div class="textbook-btn-box">
									<a href="javascript:;" class="textbookBtn" @click="textbookSureBtn()">确定</a>
									<a href="javascript:;" class="textbookBtn" @click="textbookCloseBtn()">取消</a>
								</div>
							</div>
							
						</div>
					</div>

				</div>

			</div>
			<div class="treeCont" v-show="treeShow">
				<el-scrollbar style="height: 100%;">
					<el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" empty-text="暂时没有数据"></el-tree>
				</el-scrollbar>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				xialaShow:false, //下拉内容显示情况
				Isdisplay:false,//点击更多展示学段/科目/年级/版本等
				imgShow:true,//下拉按钮显示情况
				treeShow:true, //树显示情况
				
				// 下拉数据
				detailMessage:'',
				xialaData:[],
				xialaNum:0,
				// 学段
				acton:2,
				learnSection:[],
				// 科目
				subjectVal:'',
				subjectList:[],
				// 年级
				gradeVal:'',
				gradeValList:[],

				// 教材版本
				bookversionVal:'',
				bookversionList:[],
				// 学科册数或者必修(更多版本下面的)
				bookNumCompulsoryData:[],
				manageNum:0,
				
				// 树数据
				treeData: [{
						  label: '第一单元',
						  children: [{
							label: '毛泽东词二首',
							children: [
								{label: '沁园春 长沙',},
								{label: '采桑子 重阳',},
							]
						  }]
						}, {
						  label: '一级 2',
						  children: [{
							label: '二级 2-1',
							children: [{
							  label: '三级 2-1-1'
							}]
						  }, {
							label: '二级 2-2',
							children: [{
							  label: '三级 2-2-1'
							}]
						  }]
						}, {
						  label: '一级 3',
						  children: [{
							label: '二级 3-1',
							children: [{
							  label: '三级 3-1-1'
							}]
						  }, {
							label: '二级 3-2',
							children: [{
							  label: '三级 3-2-1'
							}]
						  }]
						}],
				defaultProps: {
					children: 'children',
					label: 'label'
				}
				
				
				
			}
		},
		mounted(){
			// 学段接口
			this.learnSectionData();
			
			this.subjectlistData(2);	// 科目接口
			
			this.gradelistData(2);// 年级接口
			
			this.bookversionshowlistData(2);// 版本接口
			
			
			// 版本下的接口
			this.moreEdition();
			//树的详细内容数据
			this.treeDetails();
		},
		methods: {
			xialaBtn(){
				this.xialaShow = !this.xialaShow;
				this.imgShow = !this.imgShow;
				this.treeShow = !this.treeShow;
				
				if(this.Isdisplay == true){
					this.Isdisplay = false;
					this.treeShow = false;
				}else{

				}
			},
			
			gradeMoreBtn(){
				this.Isdisplay = !this.Isdisplay;
				this.treeShow = !this.treeShow;
			},
			
			
			 handleNodeClick(data) {
				console.log(data);
			},
			// 选择下拉
			changeXiala(inx,courseDirtreeName){
				this.xialaNum= inx;
				this.detailMessage = courseDirtreeName;

				this.xialaShow = !this.xialaShow;
				this.imgShow = !this.imgShow;
				this.treeShow = !this.treeShow;
			},
			// 选择学段
			selectSegment(inx){
				this.acton = inx;
				
				//this.subjectlistData(inx);	// 科目接口
				
				//this.gradelistData(inx);// 年级接口
				
				//this.bookversionshowlistData(inx);// 版本接口
			},
			// 选择科目
			showsubjectlist(val){
				// console.log(val)
				this.subjectVal = val.subjectName;
				this.bookversionshowlistData(val.subjectId)
			},
			// 选择年级
			showgradelist(val){
				this.gradeVal = val.gradeName;
			},
			// 选择版本	
			bookversionshowlist(val){
				this.bookversionVal = val.publisherName;
				
			},
			// 更多-确定按钮
			textbookSureBtn(){
				// console.log('学段：'+this.acton)
				if(this.acton == 1){
					
				}
				// console.log('科目：'+this.subjectVal)
				// console.log('年级：'+this.gradeVal)
				// console.log('版本：'+this.bookversionVal)
				console.log('版本下的选择：'+this.manageNum)
			},
			// 更多-取消按钮
			textbookCloseBtn(){
				this.Isdisplay = false;
				this.treeShow = true;
			},
			
			// 学段接口
			learnSectionData(){
				var data = {
					"dataType":1,
				}
				this.$ajax.post('/zhjy-basedata-customer/basedata/getAllSysGradeType.action',data, {
					headers: {
						"Authorization":this.changeData().Authorization
					}
				}).then((res) => {
					// console.log(res);
					this.learnSection = res.data.data.reverse()
				
				}).catch((err) => {
				
				})
			},
				
			// 科目接口数据
			subjectlistData(){
				// console.log(inx)
				var data = {
					"dataType":1,
					"gradeTypeId":inx+1,
				}
				this.$ajax.post('/zhjy-basedata-customer/basedata/getAllSysGradeTypeSubjectVo.action',data, {
					headers: {
						"Authorization":this.changeData().Authorization
					}
				}).then((res) => {
					// console.log(res);
					
					this.subjectList = res.data.data;
					this.subjectVal = this.subjectList[0].subjectName;
				
				}).catch((err) => {
				
				})
			},
			// 年级接口数据
			gradelistData(inx){
				var data = {
					"dataType":1,
					"gradeTypeId":inx+1,
				}
				this.$ajax.post('/zhjy-basedata-customer/basedata/getAllBaseSysGrade.action',data, {
					headers: {
						"Authorization":this.changeData().Authorization
					}
				}).then((res) => {
					// console.log(res);
					this.gradeValList = res.data.data;
					this.gradeVal = this.gradeValList[0].gradeName;
				
				}).catch((err) => {
				
				})
			},
			// 版本接口
			bookversionshowlistData(inx,subjectId){
				console.log(subjectId)
				var data = {
					"dataType":1,
					"gradeTypeId":inx+1,
					"subjectId":2,
				}
				this.$ajax.post('/zhjy-basedata-customer/basedata/getAllBasePublisher.action',data, {
					headers: {
						"Authorization":this.changeData().Authorization
					}
				}).then((res) => {
					// console.log(res);
					this.bookversionList = res.data.data;
					this.bookversionVal = this.bookversionList[0].publisherName 
				
				}).catch((err) => {
				
				})
			},
			
			// 更多下面版本教材
			moreEdition(gradeTypeId,subjectId,gradeId,publisherId){
				var data = {
					"dataType":1,
					"gradeTypeId":1,
					"subjectId": 2,
					"gradeId":2,
					"publisherId":10902
				}
				this.$ajax.post('zhjy-basedata-customer/basedata/getAllBaseSysCourseDirtree.action',data, {
					headers: {
						"Authorization":this.changeData().Authorization
					}
				}).then((res) => {
					this.bookNumCompulsoryData = res.data.data;
					// console.log(res)
				
				}).catch((err) => {
				
				})
			},	
			
			// 树的详细内容
			treeDetails(){
				var data = {
					"dataType":1,
					"courseDirtreeId":6137,
					"rootDirtreeId":'1006137'
				}
				console.log(333)
				this.$ajax.post('/zhjy-basedata-customer/basedata/getBaseSysDirtreeVoTree.action', data, {
					headers: {
						"Authorization":this.changeData().Authorization
					}
				}).then((res) => {
				
					// console.log(res)
					this.detailMessage = res.data.data.dirtreeName;
					this.treeData = res.data.data.childSysDirtrees;
				
				}).catch((err) => {
				
				})
			},	
			
			
			
			
			
		},
		
	}	
</script>

<style scoped>
	/* .el-scrollbar .el-scrollbar__wrap {overflow-x: hidden!important;} */
	.el-scrollbar__wrap {
	  overflow-x: hidden;
	}
	
	.commonTree {
		margin-top: 10px;
	}

	.treeBox {
		width: 270px;
		height: 600px;
		background-color: #fff;
	}


	/* 头部 */
	.treeTopShow {
		height: 60px;
		line-height: 60px;
		background-color: #55C3B1;
		color: #fff;
	}

	.allName {
		width: 210px;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 14px;
		padding: 0 5px;
		text-indent: 13px;
	}

	.xiala-btn {
		width: 50px;
		text-align: center;
	}
	.xiala-btn img{
		vertical-align: middle;
	}
	.xialaimg1{
		background: url('../assets/nav_up.png') no-repeat right center;
	}
	.xialaimg2{
		background: url('../assets/nav_down.png') no-repeat right center;
	}
	/* 点击更多出现列表样式 */
	.zhjytree_books_ul{
		border: 1px solid #fff;
	}
	.zhjytree_books_ul li{
		width: 100%;
		height: 32px;
		line-height: 32px;
		border-bottom: 1px solid #ececec;
		text-indent: 18px;
		font-size: 13px;
		cursor: pointer;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.zhjytree_books_ul>.liAct{
		background-color: #55C3B1;
		color: #CAEED7;
	}
	.zhjytree_books_ul li:hover{
		background-color: #55C3B1;
		color: #CAEED7;
	}
	/* ----------------------------------------------------------------------------------------------- */
	.gradeSearch {
		clear: both;
		overflow: hidden;
		font-size: 14px;
		text-align: center;
		border-bottom: 1px solid #f3f3f3;
	}

	.gradeMoreBtn {
		margin-top: 5px;
		padding-right: 25px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		font-size: 16px;
		cursor: pointer;
		
		
	}
	/*-----------------------------------------------点击更多选择的内容样式-------------------------------- */
	.slideup{
		background-color: #fff;
	}
	.textbook-slc-title{
		width: 240px;
		height: 30px;
		line-height: 30px;
		margin: 0 auto;
		border-bottom: 1px solid #ececec;
		border-top: 1px solid #f3f3f3;
		text-align: left;
		text-indent: 0;
		font-size: 14px;
	}
	.slcListWrap{
		width: 240px;
		margin: auto;
		height: 200px;
		border-bottom: 1px solid #f3f3f3;
	}
	.slcList{
		float: left;
		/* width: 240px; */
		padding: 10px 0;
		/* margin-left: 24px; */
	}
	.grade-slc-btn a{
		margin-left: 5px;
		padding: 2px 8px;
		border-radius: 4px;
	}
	.grade-slc-btn .gsbactive{
		color: #fff;
		background-color: #55C3B1;
	}
	.textbook-slcBox-name {
		float: left;
		width: 45px;
		text-indent: 0;
		text-align: right;
	}
	.select-div{
		float: left;
		margin-left: 10px;
	}
	.bookNumCompulsory{
		background-color: white;
		height: auto;
		max-height: 300px;
		padding: 15px 0 30px 0;
		overflow: hidden;
		overflow-y: auto;
	}
	.bookNumCompulsory p{
		width: 198px;
		cursor: pointer;
		height: 30px;
		line-height: 30px;
		text-align: left;
		text-indent: 20px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin: 0 auto;
	}
	.bookNumCompulsory>.bncAct{
		background-color: #55C3B1;
		color: #CAEED7;
	}
	.textbook-btn-box{
		margin-bottom: 10px;
		margin-top: 20px;
	}
	.textbookBtn{   
		width: 70px;
		height: 28px;
		text-indent: 0;
		text-align: center;
		line-height: 28px;
		background-color: #55C3B1;
		color: #fff;
		border-radius: 5px;
	}
	
	/* 树 */
	.treeCont{
		height: 520px;
	}
	
</style>

