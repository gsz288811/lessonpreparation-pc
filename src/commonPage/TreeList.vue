<template>
	<div class="hd-dirtreediv" id="hd-dirtreediv"> 
	   	<!-- <p class="tree-select-nav" v-show="false">
	   		<a class="tree-select-nav-a" treety="0"><i><em></em></i>考点</a>
	   		<a class="tree-select-nav-a act" treety="1"><i><em></em></i>同步章节</a>
	   	</p> -->
   		<div id="dirtreediv" style="position: inherit; top: 0px;">
	    	<div class="nav-tree" style="height:656px;"> 
	     		<div class="grade-slc"> 
	      			<a class="xiala-btn" id="textbook-xiala-btn" act="0"></a> 
	      			<p id="zhjytree_courseDirtree_select_name" v-if="initMess">{{mess}}</p>
	      			<p id="zhjytree_courseDirtree_select_name" v-if="loadMess">{{bookname}}</p>
	     		</div> 
	     		<div class="grade-search" > 
	      			<a class="grade-search-btn" :class="Isdisplay?'xialaimg1':'xialaimg2'" id="grade-search-btn" @click="isShow()">更多</a> 
	      			<transition name="slideup">
						<div class="grade-box" id="grade-box" v-show="Isdisplay"> 
	       				<p class="textbook-slc-title">教材选择</p> 
	       				<div class="textbook-slc-box"> 
					        <div> 
						        <span class="textbook-slcBox-name">学段:</span> 
						        <span class="grade-slc-btn" id="grade-slc-btn">
						        	<a :class="{gsbactive:acton==3}" @click="showmore(3)">高中</a>
						        	<a :class="{gsbactive:acton==2}" @click="showmore(2)">初中</a>
						        	<a :class="{gsbactive:acton==1}" @click="showmore(1)">小学</a>
						        </span> 
			        		</div> 
	        				<div> 
			        			<span class="textbook-slcBox-name">科目:</span> 
			         			<div class="select-div tree-select-div" id="select-div-subject">
					          		<span id="sysSubjects-select-name">英语</span>
	         					</div> 
	        				</div> 
		        			<div class="border-btm">
								 <el-select v-model="bookversion" placeholder="请选择教材版本" @change="showlist">
								 	<el-option
								 	  v-for="(item,index) in listdata"
								 	  :key="index"
								 	  :value="item">{{item.materials}}
								 	</el-option>
								 </el-select>
		        			</div> 
			        		<div id="selectCourseDirtree">
			         			<p v-for=" v in gradedata" @click="choosebook(v.unit,v.unit_id)" :class="{active:isActive==v.unit_id }" >{{v.unit}}</p>
			        		</div> 
	       				</div> 
	      			</div> 
					</transition>
				</div> 
     			<div class="tree-cont no-bg" id="tree-cont" style="display: block;">
			      	<ul>
				       	<li v-for=" (val,i) in unitdata" :key="i" >
				       		<p id="treeId_P7790" class="tree-chapter-name" :class="{acton:active == val.data.group_id}" @click="chooseUnit(val,i)">{{val.data.group}}</p>
				        	<transition name="slide-fade">
								<ul class="unit_list" v-show="val.flag">
									<li class="lessonlist" :class="{acton:active == z.lessons_id}" v-for="(z,x) in val.data.children" @click="sendVal($event,z.lessons,z.lessons_id,x)">
										<span class="">{{z.lessons}}</span>
									</li>
								</ul>
							</transition>
				       	</li>
			      	</ul>
     			</div> 
	   		</div>
	  	</div>
		<!-- 查询框 -->
		<Loading v-show="loadFlag"></Loading>
	</div>
</template>

<script>
	import Loading from './Loading.vue'  
	export default {
	  	name: 'TreeList',
		components:{Loading},
		props:{
			message:{
				type:Number,
				required:true
			}
		},
	  	data(){
		    return{
			    mess:'请选择听力教材',
			    listdata:[],
			    gradedata:[],
			    unitdata:[],
			    lessondata:[],
				initdata:[],
				wordData:[],
			    isActive:false,
			    acton:3,
			    bookversion:"",
			    bookname:"",
			    grade:3,
			    Isdisplay:true,
			    Isdisplay1:false,
			    initMess:true,
			    loadMess:false,
			    showdata:0,
				getlesson:'',
				index:-1,
				courseId:'',
				unitId:'',
				unitname:'',
				active:-2,
				userId:'',      //获取用户参数
				fkSchoolId:null,  //学校参数
				accountName:'',
				loadFlag:false,  //加载框开关
			    baseurl:this.GLOBAL.baseUrl+'singsound/basecode/',
				judageNum:0,
				materialsId:null,    //教材版本id
				materials:null		 //教材名
		    }
   		}, 
		created(){
			console.log("创建完成之后",this)
		},
	   	mounted:function(){
			this.userId = this.GetQueryString("userId")
			this.fkSchoolId = this.GetQueryString("fkSchoolId")
			// console.log(this.userId,this.fkSchoolId)
			// 获取上一次的教材
			this.$ajax.post(this.GLOBAL.baseUrl+'singsound/homework/getLastCourse.do',{"userId":this.userId}).then((res)=>{
				if(res.data.success == 0){
					this.$alert(res.data.error,'提示', {
					  confirmButtonText: '确定'
					});
					return false;
				}
				console.log('获取',res)
				let fkCourseId = res.data.data.fkCourseId
				let bookname = res.data.data.courseName
				this.acton = res.data.data.gradeTypeId
				this.materials = res.data.data.materialTypeName
				this.materialsId = res.data.data.materialTypeId
				this.bookversion = res.data.data.materialTypeName
				// 传默认值
				this.$emit("defaultUnit",this.acton,this.materials,this.materialsId,bookname,fkCourseId)
				if(res.data.data.fkCourseId !=""){
					this.getLastbook(bookname,fkCourseId)
				}
				this.$ajax.post(this.baseurl+'findPublisherByGradeTypeId.do',{
						"userId":this.userId,
						"schoolId":this.fkSchoolId,
						"gradeTypeId":this.acton
					})
					.then((res)=>{				
					this.listdata = res.data.data;
					this.$ajax.post(this.baseurl+'findCourseDirtreeByPublisherId.do',{'userId':this.userId,"schoolId":this.fkSchoolId,'materialsId':this.materialsId})
						.then((res)=>{					
						this.gradedata = res.data.data
						this.isActive= fkCourseId
					})
				})
			})		
	   	},
	   	methods:{
		//获取参数 
		GetQueryString(key){			
	  		var url = document.location.toString();
	  		var arrObj = url.split("?");
		　　　　if (arrObj.length > 1) {
		　　　　　　var arrPara = arrObj[1].split("&");
		　　　　　　var arr;	  
		　　　　　　for (var i = 0; i < arrPara.length; i++) {
		　　　　　　　　arr = arrPara[i].split("=");	  						
		　　　　　　　　if (arr != null && arr[0] == key) {
		　　　　　　　　　　return arr[1];
		　　　　　　　　}
		　　　　　　}
		　　　　　　return "";
		　　　　}
		　　　　else {
		　　　　　　return "";
		　　　　}
	  		}, 		 
	   		showmore(num){
	   			this.acton = num;
	   			var that = this;
				this.bookversion = "请选择教材"
	   			//获取教材版本数据
		        this.$ajax.post(this.baseurl+'findPublisherByGradeTypeId.do',{'userId':this.userId,"schoolId":this.fkSchoolId,'gradeTypeId':num}).then(function(res){
		            // console.log('版本',res);
		            that.listdata = res.data.data;
					// console.log('版本',that.listdata,num)
		        },function(res){
		            console.log(res.status);
		        });
	   		},
			// 获取上次选择的教材
			getLastbook(bookname,uid){
				this.bookname = bookname
				//uid --- courseId
				this.initMess = false
				this.loadMess = true
				this.loadFlag = true
				this.courseId = uid
				this.$ajax.post(this.baseurl+'findUnitByUnitId.do',{'userId':this.userId,"schoolId":this.fkSchoolId,'unitId':uid}).then((res)=>{
					this.loadFlag = false
					this.unitdata = []
					res.data.data.forEach((o,i)=>{
						var _j = {
							"flag":false,
							data:o
						}
						this.unitdata.push(_j)
					})								
			    })
				this.Isdisplay = false
			},
	   		//选择最终使用的教材
	   		choosebook(uname,uid){
				// this.index = -1
	   			this.isActive= uid
	   			this.bookname = uname
				this.courseId = uid
				console.log("教材id",uid)
	   			this.initMess = false
	   			this.loadMess = true
				this.loadFlag = true
	   			this.$ajax.post(this.baseurl+'findUnitByUnitId.do',{'userId':this.userId,"schoolId":this.fkSchoolId,'unitId':uid}).then((res)=>{
					this.loadFlag = false
					this.unitdata = []
					res.data.data.forEach((o,i)=>{
						var _j = {
							"flag":false,
							data:o
						}
						this.unitdata.push(_j)
						// console.log("获取111",that.unitdata)
					})								
		        })
				
				this.Isdisplay = false
	   		},
			//选择课时
	   		chooseUnit(v,i){
				this.unitId = v.data.group_id
				this.unitname = v.data.group
				this.active = v.data.group_id
				// return false
				v.flag = v.flag == true?false:true; 
				if(v.flag){
					this.loadFlag = true
					this.$ajax.post(this.baseurl+'findTestByGroupIdAndTestType.do',
					{
						"testType":"word",
						"gradeTypeId":this.acton,
						"materialsId":this.materialsId,
						"materialsName":this.materials,
						"unitId":this.courseId,
						"unitName":this.bookname,
						"groupId":v.data.group_id,
						"groupName":v.data.group
					}).then((res)=>{
						this.loadFlag = false
						console.log(res)
						this.lessondata.push(res.data.data.lessons);						
						this.unitdata[i].data.children = res.data.data.lessons
						this.$emit('getAllList',res.data.data.tests,0,this.unitId,this.unitname,this.courseId,this.bookname,this.materialsId,this.materials,this.acton)
						console.log("测试：最终课时",this.lessondata);
						console.log("获取111",this.unitdata)
					});
				}  								
	   		},
	   		
	   		//视图控制
	   		isShow(){
	   			console.log(this.Isdisplay)
	   			this.Isdisplay = !this.Isdisplay;
	   		},
	   		//点击显示列表
	   		showlist(val){
	   			this.bookversion = val.materials
				this.materialsId = val.materials_id
				this.materials = val.materials
				this.$ajax.post(this.baseurl+'findCourseDirtreeByPublisherId.do',{'userId':this.userId,"schoolId":this.fkSchoolId,'materialsId':val.materials_id})
					.then((res)=>{					
					this.gradedata = res.data.data;
					console.log('教材',this.gradedata)
				})
	   		},
	   		sendVal(e,lesson,Lid,i){
				console.log("课程",lesson)				
				this.$emit('getlesson',lesson,Lid,this.bookname,this.courseId,this.unitId,this.unitname,this.acton,this.materials,this.materialsId)
				this.active = Lid			
	   		},
	   		/* changeColor(e){
				e.currentTarget.className = "act_on"
			} */
	   	}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#dirtreediv{
	    display: table;
	    float: left;
	    background-color: #fff;
	    z-index: 5;
	}
	.nav-tree{
	    float: left;
	    width: 268px;
	    height: 678px;
	    border: 1px solid #f3f3f3;
	    border-radius: 5px;
	    background-color: #fff;
	    /*margin-left: 10px;*/
	}
	.nav-treeMoveDevices{
	    height: 478px;
	}
	.nav-treeMoveDevices .tree-cont{
	    height: 357px;
	}
	.tree-cont{
	    float: left;
	    width: 268px;
	    height: 85%;
	    overflow: hidden;
	    overflow-y: auto;
	    background-color: #fff;
	}
	.grade-slc{
	    position: relative;
	    float: left;
	    width: 100%;
	    height: 60px;
	    font-size: 14px;
	    background-color: #55C3B1;
	    color: #CAEED7;
	    z-index: 5;
	}
	.grade-slc>p{
	    width: 220px;
	    height: 60px;
	    line-height: 60px;
	    text-indent: 18px;
	    font-size: 14px;
	    color: #fff;
	    font-weight: 600;
	    white-space:nowrap;
	    overflow:hidden;
	    text-overflow:ellipsis;
	}
	.grade-slc>span{
	    display: inline-block;
	    height: 60px;
	    line-height: 60px;
	    text-indent: 18px;
	}
	.xiala-btn{
	    position: absolute;
	    display: block;
	    right: 18px;
	    top: 18px;
	    width: 20px;
	    height: 20px;
	    line-height: 24px;
	    /*background: url(../images/xiala.png) no-repeat center center;*/
	
	}
	.grade-search{
	    position: relative;
	    width: 100%;
	    /*height: 40px;*/
	    float: left;
	    z-index: 4;
	    text-align: center;
	    /*margin-bottom:12px;*/
	    border-bottom: solid 1px #f3f3f3;
	}
	.grade-search .tree-input{
	    display: block;
	    width: 240px;
	    height: 35px;
	    margin: 7px auto;
	    border-radius: 5px;
	    text-indent: 8px;
	    font-size: 14px;
	}
	.grade-search .grade-inputSearch-btn{
	    display: block;
	    position: absolute;
	    width: 22px;
	    height: 22px;
	    right: 10px;
	    top: 15px;
	    /*background: url('../images/sousuo.png') no-repeat center center;*/
	    background-size: 80%;
	}
	.grade-search-btn{
	    display: inline-block;
	    margin-top: 5px;
	    padding-right: 25px;
	    height: 30px;
	    text-align: center;
	    line-height: 30px;
	    font-size: 16px;
	    /*background: url('../assets/images/xiala-2.png') no-repeat right center;*/
	    cursor: pointer;
	}
	.xialaimg1{
		background: url('../assets/images/xiala-2.png') no-repeat right center;
	}
	.xialaimg2{
		background: url('../assets/images/xiala-3.png') no-repeat right center;
	}
	.grade-box{
	    position: absolute;
	    top:36px;
	    width: 268px;
	    left: 0px;
	    height: 528px;
	    padding: 10px 0;
	    background-color: #fff;
	    line-height: 24px;
	    color: #333;
	    z-index: 99;
	    /*display: none;*/
	}
	.textbook-slc-title{
	    width: 240px;
	    margin: 0 auto;
	    border-bottom: 1px solid #ececec;
	    text-align: left;
	    text-indent: 0;
	}
	.textbook-slc-box p{
	    width: 240px;
	    margin: 0 auto;
	    height: 40px;
	    line-height: 40px;
	    font-size: 12px;
	}
	.textbook-slc-box p span{
	    display: inline-block;
	}
	span.textbook-slcBox-name{
	    float: left;
	    width: 45px;
	    text-indent: 0;
	    text-align: right;
	}
	span.grade-slc-btn{
	    float: left;
	    text-indent: 0;
	    cursor: default;
	}
	span.grade-slc-btn a{
	    /*display: inline-block;*/
	    margin-left: 5px;
	    padding: 2px 8px;
	    border-radius: 4px;
	    
	}
	span.grade-slc-btn a:hover{
	    color: #fff;
	    background-color: #55C3B1;
	}
	.gsbactive{
	    color: #fff;
	    background-color: #55C3B1;
	}
	.tree-select-nav-a{
		cursor: default;
	}
	.textbook-btn-box{
	    position: relative;
	    margin: 10px 0 0 0;
	    width: 100%;
	    height: 30px;
	    line-height: 30px;
	    text-align: center;
	}
	.textbook-btn-box>a{
	    display: inline-block;
	    width: 70px;
	    height: 28px;
	    text-indent: 0;
	    text-align: center;
	    line-height: 28px;
	    background-color: #55C3B1;
	    color: #fff;
	    border-radius: 5px;
	}
	.textbook-btn-box>a:hover{
	    background-color: #4BAC9C;
			cursor: pointer;
	}
	.textbook{
	    position: relative;
	    float: left;
	    width: 100%;
	    height: 50px;
	    line-height: 50px;
	    text-indent: 18px;
	    border-bottom: 1px solid #ececec;
	    color: #333;
	    font-size: 16px;
	}
	.textbook-btn{
	    display: inline-block;
	    float: right;
	    margin: 18px 10px 0 0;
	    width: 20px;
	    height: 20px;
	    /*background: url(../images/1.png) no-repeat center center;*/
	}
	ul.grade-ul{
	    display: block;
	    position: absolute;
	    top: 0;
	    left: 269px;
	    height: auto;
	    width: 98px;
	    border-right: 1px solid #ececec;
	    border-top: 1px solid #ececec;
	    z-index: 3;
	    display: none;
	}
	ul.grade-ul li{
	    width: 100%;
	    height: 49px;
	    line-height: 50px;
	    text-align: center;
	    background-color: #fff;
	    color: #999;
	    font-size: 13px;
	    text-indent: 0;
	    cursor: pointer;
	    border-bottom: 1px solid #ececec;
	}
	ul.grade-ul li:hover{
	    color: #CAEED7;
	    background-color: #55C3B1;
	}
	div.tree-cont>ul{
	    position: relative;
	    width: 100%;
	    height: auto;
	    background-color: #fff;
	}
	div.tree-cont>ul li{
		cursor: default;
	    position: relative;
	}
	ul.tree-ul>li:first-child>p {
	    border-top: none;
	}
	div.tree-cont>ul li p {
	    position: relative;
	    width: 100%;
	    height: 39px;
		padding-left:0.6rem;
		text-overflow: ellipsis;
	    line-height: 39px;
	    border-bottom: 1px solid #f3f3f3;
	    /* border-top: 1px solid #dcdcdc; */
	    white-space:nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	div.tree-cont>ul li p span{
	    position: absolute;
	    display: inline-block;
	    left: 0;
	    width: 96%;
	    text-indent: .6em;
	    text-align: left;
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    font-size: 16px;
	    color: #333;
	}
	div.tree-cont>ul ul li p span{
	    font-size: 14px;
	    color: #666;
	}
	div.tree-cont>ul ul {
	    /*display: none;*/
	    /* float: left; */
	    border-bottom: 1px solid #ececec;
	}
	div.tree-cont>ul li a {
	    display: block;
	    position: absolute;
	    right: 10px;
	    top: 8px;
	    width: 20px;
	    height: 20px;
	    /*background: url('../images/2.png') no-repeat center center;*/
	    z-index: 3;
	}
	/*ul.tree-ul ul li p a {
	    display: block;
	    position: absolute;
	    right: 10px;
	    top: 8px;
	    width: 20px;
	    height: 20px;
	    background: url('../images/2.png') no-repeat center center;
	}*/
	div.tree-cont>ul ul li {
	    display: block;
	    position: relative;
	    width: 100%;
	    height: auto;
	    /* cursor: pointer; */
	}
	div.tree-cont>ul ul li p {
	    position: relative;
	    width: 100%;
	    height: 39px;
	    border: 1px solid #fff;
	    line-height: 39px;
	    font-size: 14px;
	}
	div.tree-cont>ul ul li p span{
	    text-indent: 20px;
	}
	div.tree-cont>ul ul ul li p span{
	    text-indent: 40px;
	}
	i.blue_line {
	    /* display: block; */
	    position: absolute;
	    top: 0;
	    left: -1px;
	    height: 40px;
	    width: 4px;
	    background-color: #0CA4CB;
	    display: none;
	}
	i.green_line{
	    position: absolute;
	    top: -1px;
	    left: -1px;
	    height: 40px;
	    width: 4px;
	    background-color: #55C3B1;
	    display: none;
	
	}
	div.tree-cont>ul>li>p>i.green_line{
	    top: 0;
	    left: 0;
	}
	div.tree-cont.no-bg>ul li p.cc_hover{
	    background-color: #DDF3EF;
	    /*color: #55C3B1;*/
	}
	div.tree-cont.no-bg>ul li p.cc_hover>i{
	    display: block;
	}
	div.tree-cont.no-bg>ul li p.cc_active{
	    background-color: #DDF3EF;
	}
	div.tree-cont.no-bg>ul li p.cc_active>i{
	    display: block;
	}
	div.tree-cont.t-bg>ul li p span{
	    text-indent: 40px;
	    cursor: pointer;
	}
	
	.zhjytree_courseDirtree_ul,
	.zhjytree_books_ul{
	    display: none;
	    position: absolute;
	    left: 0;
	    top: 59px;
	    width: 266px;
	    height: auto;
	    max-height: 480px;
	    overflow: hidden;
	    overflow-y: auto;
	    background-color: white;
	    color: #333;
	    border: 1px solid #ececec;
	    border-bottom: none;
	}
	.zhjytree_courseDirtree_ul li,
	.zhjytree_books_ul li{
	    width: 100%;
	    height: 32px;
	    line-height: 32px;
	    border-bottom: 1px solid #ececec;
	    text-indent: 18px;
	    font-size: 13px;
	    cursor: pointer;
	    white-space:nowrap;
	    overflow:hidden;
	    text-overflow:ellipsis;
	}
	.zhjytree_courseDirtree_ul li.act,
	.zhjytree_books_ul li.act{
	    background-color: #55C3B1;
	    color: #CAEED7;
	}
	.zhjytree_courseDirtree_ul li:hover,
	.zhjytree_books_ul li:hover{
	    background-color: #55C3B1;
	    color: #CAEED7;
	}
	#selectCourseDirtree{
	    background-color: white;
	    /*width: 100%;*/
	    height: auto;
	    max-height: 300px;
	    padding: 15px 0 30px 0;
	    overflow: hidden;
	    overflow-y: auto;
	    /*display: none;*/
	}
	#selectCourseDirtree>p{
	    width: 198px;
	    cursor: pointer;
	    height: 30px;
	    line-height: 30px;
	    text-align: left;
	    text-indent: 20px;
	    white-space:nowrap;
	    overflow:hidden;
	    text-overflow:ellipsis;
	}
	#selectCourseDirtree>p:hover{
	    background-color: #55C3B1;
	    color: #CAEED7;
	}
	#selectCourseDirtree>p.active{
	    background-color: #55C3B1;
	    color: #CAEED7;
	}
	.border-btm{
	    border-bottom: 1px solid #ececec;
	}
	.tree-cont::-webkit-scrollbar {/*滚动条整体样式*/
	    width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
	    height: 1px;
	}
	.tree-cont::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
	    border-radius: 5px;
	    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	    background: #55C3B1;
	}
	.tree-cont::-webkit-scrollbar-track {/*滚动条里面轨道*/
	    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	    /*border-radius: 10px;*/
	    background: #eaeaea;
	}
	.textbook-slc-box>div{
	    float: left;
	    width: 240px;
	    padding: 10px 0;
	    margin-left: 12px;
	}
	div.select-div{
	    position: relative;
	    float: left;
	    margin-left: 10px;
	    width: 150px;
	    height: 24px;
	    color: #000;
	    border: 1px solid #ececec;
	    border-radius: 4px;
	    font-size: 12px;
	}
	.textbook-select{
	    position: absolute;
	    width: 150px;
	    max-height: 240px;
	    top: 25px;
	    left: -1px;
	    background-color: #fff;
	    border: 1px solid #ececec;
	    border-top: none;
	    border-bottom-left-radius: 4px;
	    border-bottom-right-radius: 4px;
	    overflow: hidden;
	    overflow-y: auto;
	    z-index: 999;
	}
	.textbook-select li{
	    padding: 2px 0;
	    border-bottom: solid 1px #ececec;
	    cursor: pointer;
	}
	.textbook-select li:hover{
	    background-color: #55C3B1;
	    color: #fff;
	}
	.textbook-select li.act{
	    background-color: #55C3B1;
	    color: #fff;
	}
	.books-select-btn{
	    display: block;
	    position: absolute;
	    width: 20px;
	    height: 24px;
	    right: 0;
	    top: 0;
	    border-radius: 4px;
	    background-color: #fff;
	}
	.sub-select-div{
	    position: relative;
	    float: left;
	    margin-left: 10px;
	    width: 150px;
	    height: 24px;
	    color: #000;
	    border: 1px solid #ececec;
	    border-radius: 4px;
	    font-size: 12px;
	}
	.textbook-slc-box{
	    display: table;
	}
	.grade-search.zsd-grade-search{
	    height: 100%;
	}
	.hd-dirtreediv{
	    display: table;
	    float: left;
	    width: 270px;
	    background-color: #fff;
	    z-index: 5;
	}
	.tree-select-nav{
	    position: relative;
	    float: left;
	    width: 266px;
	    height: 38px;
	    margin-bottom: -1px;
	    margin-left: 1px;
	    border: 1px solid #55C3B1;
	    background-color: #fff;
	    text-align: center;
	    border-top-right-radius: 5px;
	    border-top-left-radius: 5px;
	    border-bottom: none;
	}
	.tree-select-nav a{
	    display: inline-block;
	    margin: 0 20px;
	    height: 40px;
	    line-height: 40px;
	}
	.tree-select-nav a i{
	    display: block;
	    float: left;
	    margin: 14px 10px 0 0;
	    width: 12px;
	    height: 12px;
	    border: 1px solid #dedede;
	    border-radius: 50%;
	}
	.tree-select-nav a i em{
	    width: 6px;
	    height: 6px;
	    margin: 3px auto;
	    border-radius: 50%;
	    background-color: #ffa800;
	    display: none;
	}
	.tree-select-nav a.act i{
	    border-color: #ffa800;
	}
	.tree-select-nav a.act i em{
	    display: block;
	}
	/*勾选树*/
	.tree-cont.t-bg ul{
	    /*background: url("../images/dash-line.png") repeat-y 6px top;*/
	    border-bottom: none;
	}
	div.tree-cont.t-bg>ul li p{
	    border-bottom:none;
	    text-indent: 30px;
	}
	div.tree-cont.t-bg>ul ul li p{
	    border-bottom:none;
	    text-indent: 12px;
	}
	div.tree-cont.t-bg>ul ul ul li p{
	    border-bottom:none;
	    text-indent: 5px;
	}
	div.tree-cont.t-bg>ul{
	    margin-left: 8px;
	}
	div.tree-cont.t-bg>ul ul{
	    margin-left: 20px;
	}
	div.tree-cont.t-bg>ul ul ul{
	    margin-left: 20px;
	}
	div.tree-cont.t-bg .select-down-btn{
	    display: block;
	    position: absolute;
	    left: 0;
	    top: 13px;
	    width: 40px;
	}
	div.tree-cont.t-bg .select-down-btn b{
	    display: block;
	    float: left;
	    width: 13px;
	    height: 13px;
	}
	div.tree-cont.t-bg .select-down-btn b.jia{
	    margin-top: 1px;
	    /*background: url("../images/jia.png") no-repeat center center;*/
	}
	div.tree-cont.t-bg .select-down-btn b.jian{
	    margin-top: 1px;
	    /*background: url("../images/jian.png") no-repeat center center;*/
	}
	div.tree-cont.t-bg b.select-b-btn{
	    margin-left: 6px;
	    border: solid 1px #dedede;
	    cursor: pointer;
	    text-align: center;
	}
	div.tree-cont.t-bg .select-down-btn b.no-child-b{
	    margin-left: 4px;
	    line-height: 13px;
	    color: #dedede;
	}
	div.tree-cont.t-bg b.select-b-btn.act{
	    border-color: #55C3B1;
	    color: #55C3B1;
	    font-size: 12px;
	    line-height: 13px;
	}
	div.tree-cont b.wrongRate{
	    /*font-size: 13px;*/
	    color: #55C3B1;
	    padding-right: 8px;
	    font-weight: normal;
	}
	@media screen and (max-width: 1240px) {
	    .tree-cont{
	        height: 530px;
	    }
	}
	/*列表样式*/
	#publishers-select-name{
		display: inline-block;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
		width: 140px;
		height: 24px;
		margin-left: -5px;
	}
	/**/
	.books-select-btn{
		cursor: pointer;
	}
	/*树列表样式*/
	.lessonlist{
		padding-left: 20px;
		line-height: 34px;
		color: #7A7A7A;
		border-bottom: 1px solid #eee;
	}
	.lessonlist:hover{
		background-color: #55C3B1;
		color: #fff;
		
	}
	.acton{
		background-color: #55C3B1;
		color: #fff;
	}
	/* 新增样式 */
	#select-div-publisher{
		cursor: pointer;
	}
	/* 动画样式 */
	/* 动画 */
	.slide-fade-enter-active{
		transition: all 0.7s ease;
		min-height:100px;
		overflow: hidden;
	}
	.slide-fade-leave-active {
		transition: all 0.6s ease;
		height:80px;
		overflow: hidden;
	}
	.slide-fade-enter, .slide-fade-leave-to{
		transform: translateX(200px);
		opacity: 1;
		height: 0;
	}
	/* 菜单切换 */
	.slideup-enter-active,.slideup-leave-active{
		transition: opacity .5s
	}
	.slideup-enter, .slideup-leave-to{
		opacity:0;
	}
</style>
