<template>
  <div id="special_detial">
       <div class="main">
           <div class="left">
             <div class="header" v-if="specialInfo">
               <img :src="specialInfo.specialIcon" class="icon_special"/>
               <div class="center">
                 <h3>
                   {{specialInfo.specialName}}
                 </h3>
                 <p>
                   共收录文章{{totalCount}}篇文章
                 </p>
               </div>
               <button :class="{att_btn:true,active:isHasAttention}" @click="attentionSpecial()">
                   {{isHasAttention?'已关注':"关注"}}
               </button>
               <button class="sub_btn" @click="submission">
                 投稿
               </button>
             </div>
             <div class="article_content" v-for="item in articleList ">
               <div class="left">
                 <h2 @click="toCheckDetial(item)">
                   {{item.article_name}}
                 </h2>
                 <p>
                   {{item.main_content}}

                 </p>
                 <div>

                   <i class="iconfont icon-wode">
                   </i>

                   <span>
                   {{item.user_name}}
                </span>
                   &nbsp
                   &nbsp
                   <i class="iconfont icon-liulan">
                   </i>

                   <span>
                   {{item.praise_num}}
                </span>
                   &nbsp
                   &nbsp
                   <i class="iconfont icon-dianzan1">
                   </i>
                   <span>
                   {{item.praise_num}}
                </span>
                   &nbsp
                   &nbsp
                   <i class="iconfont icon-pinglun1">
                   </i>
                   <span>
                   {{item.comment_num}}
                </span>
                   &nbsp
                   &nbsp
                   <i class="iconfont icon-shoucang">
                   </i>
                   <span>
                   {{item.collect_num}}
                </span>
                   &nbsp&nbsp
                   <span>
                    {{item.publicDate}}
                </span>
                 </div>
               </div>
               <div class="right" v-if="item.imgUrl">
                 <img :src="item.imgUrl" v-if="item.imgUrl"/>
               </div>
             </div>
             <Page :total="totalCount" show-total size="small" @on-change="getSpeciaArticleList" :page-size="params.pageSize"></Page>
           </div>
           <div class="right-area">
                <h4>专题公告</h4>
                <p v-if="specialInfo">
                   {{specialInfo.specialDesc}}
                </p>
             <h4>投稿须知</h4>
             <p v-if="specialInfo">
               {{specialInfo.submitInstructions}}
             </p>
             <h4>创建者</h4>
             <div class="create-area">
                <img :src="specialInfo.user_image_url" class="icon_person"/>
                <p v-if="specialInfo">
                 {{specialInfo.nickname}}
                </p>
             </div>

           </div>
       </div>
    <Modal
      title="我的文章"
      v-model="submissionDialog"
      :mask-closable="false">
      <div class="submission-dialog">
        <p v-for="item in personArticle" @click="submissionArticle(item)">{{item.article_name}}</p>
        <Page :total="personArticleCount" show-total size="small" @on-change="getPersonalArticle" :page-size="5"></Page>
      </div>


    </Modal>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default{
    data()
    {
      return{
        specialId:'',
        specialInfo:{},
        personArticle:[],
        personArticleCount:0,
        submissionDialog:false,
        params:{
            keywords:'',
            pageSize:5,
            specialId:'',
            pageNo:1
        },

        isHasAttention:false,
        articleList:[],
        totalCount:0,
        articleParams:{pageNo:1,pageSize:10,article_name:''}

      }
    },
    created:function(){
      this.init();

    },
    computed:mapGetters({

    }),
    watch:{

    },
    methods:{
       init()
       {
           this.specialId=this.$route.query.specialId;
           this.user_id=localStorage.user_id;
           this.params.specialId=this.specialId;
           this.getSpeciaInfo();
           this.judgeAttentionSpecial();
           this.getSpeciaArticleList(1);
       },
      getSpeciaInfo(){
           var params={specialId:this.specialId};
           this.$api.getSpecialDetial(params).then(res=>{
                if(res.errno==0)
                {
                  this.specialInfo=res.data;

                }
                else {
                    this.$Message.error('获得专题详情失败');
                }
           })
      },
      judgeAttentionSpecial()
      {
        if (this.user_id=='')
        {
          return;
        }
        let params={user_id:this.user_id,specialArray:[this.specialId]}
        this.$api.judgeAttentionSpecialArray(params).then(res=>{
          if (res.errno==0)
          {
            if (res.data.length>0)
            {
                this.isHasAttention=true;
            }
           // this.$Message.info('关注成功');
          }
          else {

          }
        })


      },
      getSpeciaArticleList(no)
      {
        this.params.pageNo=no?no:1;
        this.params.state=1;
        this.$api.getSubmissionArticleList(this.params).then(res=>{
          if(res.errno==0)
          {
            this.totalCount=res.data.count;
            for (var item of res.data.data)
            {
              var imgArray=this.$util.getHtmlImgUrl(item.article_content+"");

              if (imgArray.length>0)
              {
                item.imgUrl=imgArray[0];

              }
              item.main_content=this.$util.replaceHtmlContent(item.article_content);
              item.publicDate=this.$util.getFormatOnlyDate(item.createDate);
            }
            this.articleList=res.data.data;


          }
          else {
            this.$Message.error('获得专题文章列表失败');
          }

        })

      },
      toCheckDetial(item){
        var article_id=item.article_id;
        this.$router.push({name:"blog/articleDetial",query:{article_id:article_id}})

      },
      attentionSpecial(item)
      {
        if (this.user_id=='')
        {
          this.$Message.error('请先登录');
          return;
        }

        let params={user_id:this.user_id,specialId:this.specialId}
        params.type=this.isHasAttention?1:0;
        this.$api.attentionSpecial(params).then(res=>{
             if (res.errno==0)
             {
               this.isHasAttention=!this.isHasAttention;
               this.$Message.info( this.isHasAttention?'关注成功':"取消关注成功");
             }
             else {

             }
        })

      },

      submission()
      {
        if (this.user_id=='')
        {
          this.$Message.error('请先登录');
          return;
        }

        this.getPersonalArticle(1);
       },
      submissionArticle(item)
      {
        var params={userId:this.user_id,specialId:this.specialId,article_id:item.article_id};
        this.$util.confirmDialog(this,"确认","确认投稿?",self=>{

             self.$api.saveSubmission(params).then(res=>{
                  if (res.errno==0)
                  {
                       this.$Message.info("投稿成功,等待审核");
                  }
             })
        })

      },
      getPersonalArticle(no)
      {
        var params={user_id:this.user_id,pageSize:5,pageNo:no};
        this.$api.getArticleList(params).then(res=>{
          if (res.code==200)
          {
             this.personArticleCount=res.count;
             this.personArticle=res.data;
              this.submissionDialog=true;
          }
          else {
               this.$Message.error("获取文章列表失败")
          }


        })
      },

    },

    filters:{

    },

    components:{

    }
  }

</script>

<style lang='less'>

  .submission-dialog{
     width: 100%;
    p{
       line-height: 20px;
       &:hover{
           color: #CC4646;
       }
    }

  }
    #special_detial{
       width: 100%;
      display: -webkit-flex;
      display: flex;
      justify-content: center;
       margin-top: 100px;
       .main{
           width: 60%;
           min-width: 750px;
           display: -webkit-flex;
           display: flex;
           padding-left: 20px;

           .left{
               width: 75%;
              flex-grow: 1;
             .header{
               display: -webkit-flex;
               display: flex;
               width: 100%;
               .center{
                 flex-grow: 1;
               }
               h3{
                   font-size: 20px;
               }
               p{
                   line-height: 14px;
                   color: #9ea7b4;
               }
               button{
                 width: 70px;
                 height: 30px;
                 border: none;
                 color: #fff;
                 border-radius: 10px;
                 &:hover{
                   border: 1px solid #CC4646;
                   background: #fff;
                   color: #CC4646;
                 }
               }
               .att_btn{
                 margin-right: 20px;
                 background: #00cc66;

               }
               .active{
                 background: #CC4646;
               }
               .sub_btn{
                   background: #2db7f5;
               }
             }
             .article_content{
               display: -webkit-flex;
               display: flex;
               padding: 15px 2px 20px 0;
               width: 100%;
               border-bottom: 1px solid #f0f0f0;
               margin: 0 0 15px;
               .left{
                 display: -webkit-flex;
                 display: flex;
                 flex-direction: column;
                 min-width: 75%;
                 flex-grow: 1;
                 justify-content: flex-start;
                 h2{
                   font-size: 18px;
                   color: #000;
                   &:hover{
                     color: #CC4646;
                   }
                 }
                 p{
                   margin: 0 0 8px;
                   line-height: 24px ;
                   max-height: 72px ;
                   overflow: hidden;
                   color: #999999;
                 }
               }
               .right{
                 width: 25%;
                 height: 120px;
                 display: -webkit-flex;
                 display: flex;
                 flex-direction: column;
                 justify-content: flex-start;
                 img{
                   width: 160px;
                   height: 120px;
                 }

               }

             }

           }
           .right-area{
              margin-left: 30px;
              width: 300px;
             h4{
                 line-height: 30px;
                 color: #969696;
             }
             .create-area{
                  display: -webkit-flex;
                  display: flex;
                  align-items: center;

                  &:hover{
                      color: #CC4646;
                  }
             }

           }

       }



    }
</style>

