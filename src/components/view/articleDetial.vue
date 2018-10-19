<template>
    <div id="article_detial">
      <div class="detial_main">
           <h1>
              {{articleData.article_name}}
           </h1>
        <div class="person">
           <img :src="articleData.user_image_url" class="icon_person" @click="toCheckUser"/>
           <div class="detial">
               <h >
                   {{articleData.nickname}}
                   <p v-if="attentionUserState!=2" :class="{guanzhu_person:true,active:attentionUserState==1}" @click="handleAttention(attentionUserState)">
                       <i class="iconfont icon-iconfontadd" v-if="attentionUserState==0"></i>
                     {{attentionUserState==1?'已关注':'关注'}}
                   </p>
               </h>
              <div>

                  <span>
                    {{articleData.updateDate}}
                  </span>
                &nbsp
                &nbsp

                <i class="iconfont icon-liulan">
                </i>

                <span>
                   {{articleData.praise_num}}
                </span>
                &nbsp
                &nbsp
                <i class="iconfont icon-dianzan1">
                </i>
                <span>
                   {{articleData.praise_num}}
                </span>
                &nbsp
                &nbsp
                <i class="iconfont icon-pinglun1">
                </i>
                <span>
                   {{articleData.comment_num}}
                </span>
                &nbsp
                &nbsp
                <i class="iconfont icon-shoucang">
                </i>
                <span>
                   {{articleData.collect_num}}
                </span>
              </div>
           </div>

        </div>
        <div v-html="articleData.article_content"></div>

         <div class="praise_area">
             <div :class="{btn:true,active:praise}" style="margin-right: 25px" @click="praiseArticle">
                 <i class="iconfont icon-dianzan1"></i>
                <span>{{praise?'已赞':'赞'}}</span>
                {{articleData.praise_num}}
             </div>

           <div :class="{ btn:true,btn_collect:true ,collectactive:collect}" @click="collectArticle">
             <i class="iconfont icon-shoucang"></i>
             <span>{{collect?'已收藏':'收藏'}}</span>
             {{articleData.collect_num}}

           </div>
         </div>
        <div class="login_btn" v-if="user_id==''">
              <div class="btn" @click="toLogin">[ 登录 ]</div><span>登录后发表评论</span>

        </div>

          <div class="article_input_area" v-if="user_id!=''">
              <img :src="user_image_url" class="icon_person"/>
              <textarea class="text_area" placeholder="写下你的评论" v-model="commentParms.content" name="comment"></textarea>
          </div>
        <div class="send"  v-if="user_id!=''">
           <Button type="primary" style="margin-right: 20px"  size="large"  @click="cancelComment">取消</Button>
           <Button type="success" size="large" @click="" @click="saveComment">确定</Button>
        </div>
        <div class="totalComment">
          <span>{{totalComment}}</span>条评论
        </div>
        <div class="comment_item" v-for="(item ,index) in commentList">
            <div class="comment_person">
              <img :src="item.user_image_url" class="icon_person"/>
              <h1>
                 {{ item.user_name}}
              </h1>
              <p>
                 {{item.time}}
              </p>
            </div>
          <p class="p_content">
             {{item.content}}
          </p>
          <div class="p_bottom">
              <p style="float: left" @click="praiseComment(item)" :style="item.isPraise?'color:#CC4646':''">
                 <i class="iconfont icon-dianzan1">
                 </i>
                <span >赞{{item.praise_num}}</span>
              </p>
            <p>
              &nbsp&nbsp
            <p  @click="replayShow(index)" >
              <i class="iconfont icon-pinglun1">
              </i>
              <span>回复</span>
          </p>
            <div class="article_input_area" v-if="item.replayShowInput" >

              <textarea class="text_area" placeholder="回复" v-model="replayContent" name="replay"></textarea>
            </div>
            <div class="send"  v-if="item.replayShowInput">
              <Button type="primary" style="margin-right: 20px"  size="large"  @click="cancelReplay">取消</Button>
              <Button type="success" size="large" @click="" @click="clickReplay">确定</Button>
            </div>
            </p>
          </div>
          <div class="replay_area">
              <div class="item" v-for="replayitem in item.replayList">
                  <h1>
                     {{ replayitem.nickname}}
                  </h1>
                 <p>
                    {{replayitem.content}}
                 </p>
              </div>
          </div>
          <div>

          </div>
        </div>
       </div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
              article_id:'',
              articleData:'',
              commentList:[],
              totalComment:0,
              user_id:'',
              collect:false,
              praise:false,
              replayContent:'',//回复内容
              replayIndex:0,//选中的评论索引
              attentionUserState:0,//0:未关注 1:已关注 2:作者是自己
              commentParms:{
                article_id:'',
                content:'',
                commit_user_id:''
              },
            }
        },
        created: function () {
           this.init();

        },
        computed: mapGetters({
            loginState:'getLoginState'
        }),
        watch: {
          loginState:'init'

        },
        methods: {

          init(){
            this.article_id=this.$route.query.article_id;
            this.user_id=localStorage.user_id;
            this.user_image_url=localStorage.user_image_url;
            this.user_name=localStorage.user_name;
            this.getArticleDetial();
            this.getCommentList();
            if (this.user_id!='')
            {
                this.getPersonalArticleState();
            }
          },
          toCheckUser()
          {
            this.$router.push({name:'blog/userDetial',query:{user_id:this.articleData.user_id}})
          },
          toLogin()
          {
              var name=this.$route.name;
              this.$router.push({name:'login',query:{from:this.$route.name}});
          },
          getArticleDetial()
          {
            var params={ article_id:this.article_id}
            var self=this;
            this.$api.getArticleList(params).then(res=>{
              if (res.code==200&res.count>=1)
              {
                  self.handleArticleDetialRes(res.data[0])
              }
              else {
                  self.$Message.error('文章不存在,或已删除');
              }
            }).catch(e=>{

            })

          },
          /*
            文章评论列表
           */
          getCommentList()
          {


            var params={ article_id:this.article_id}
            if (this.user_id)
            {
                params.comment_user_id_array=[];
                params.comment_user_id_array.push(this.user_id);
            }
            var self=this;
            this.$api.getCommentlist(params).then(res=>{
              {
                 self.handleCommentRes(res);
              }

            }).catch(e=>{

            })

          },
          praiseComment(item)
          {
              var comment_id=item.comment_id;
              var params={comment_id:comment_id,user_id:this.user_id};
              this.$api.praiseComment(params).then(res=>{
                if (res.code==200)
                {
                    item.isPraise=!item.isPraise;
                    item.praise_num=item.isPraise?item.praise_num+1:item.praise_num-1;
                }

              }).catch(e=>{

              })
          },
          /*
            查询是否浏览 收藏 点赞文章
           */
          getPersonalArticleState()
          {
              /*
                 选填参数 collect praise browise 填1 ,即可查询 单独的数据
               */
              var params={article_id:this.article_id,user_id:this.user_id}
              var self=this;
              this.$api.getPersonalArticleState(params).then(res=>{
                   if(res.code==200)
                   {
                     if(res.count>0)
                     {
                          self.collect=res.data[0].collect==0?false:true;
                          self.praise=res.data[0].praise==0?false:true;
                     }
                   }

              }).then(e=>{

              })
          },
          //点赞文章
          praiseArticle(){
            if (this.user_id=='')
            {
               this.$Message.error('请先登录');
               return;
            }


             var params={article_id:this.article_id,user_id:this.user_id,author_id:this.articleData.user_id}
             var self=this;
             this.$api.praiseArticle(params).then(res=>{
               if (res.code==200)
               {
                  this.$Message.info('保存成功');
                  self.getPersonalArticleState();
                  self.getArticleDetial();
               }
               else {

               }
             }).then(e=>{

             })

          },

          handleAttention()
          {
            /*
               type:0 关注好友 1:取消关注
             */

              var params={user_id:this.user_id,attention_user_id:this.articleData.user_id,type:this.attentionUserState};
              var self=this;
              this.$api.attentionUser(params).then(res=>{
                   if (res.code==200)
                   {
                      self.attentionUserState=self.attentionUserState==0?1:0;
                   }
                   else {

                   }

              }).then(e=>{

              })


          },
          //收藏文章
          collectArticle(){

            if (this.user_id=='')
            {
              this.$Message.error('请先登录');
              return;
            }
            var params={article_id:this.article_id,user_id:this.user_id,author_id:this.articleData.user_id}
            var self=this;
            this.$api.collectArticle(params).then(res=>{
              if (res.code==200)
              {
                this.$Message.info('保存成功');
                self.getPersonalArticleState();
                self.getArticleDetial();
              }
              else {
              }


            }).then(e=>{

            })

          },
          saveComment()
          {
            if (this.user_id=='')
            {
              this.$Message.error('请先登录');
              return;
            }
              if (this.commentParms.content=='')
              {
                 this.$Message.error('请输入评论内容')
                 return

              }
              var length=this.$util.getStrLength(this.commentParms.content)

              if (length>255)
              {
                this.$Message.error('评论不超过255个字符')
                return
              }
              this.commentParms.article_id=this.article_id;
              this.commentParms.commit_user_id=this.user_id;
              var self=this;
              this.$api.saveComment(this.commentParms).then(res=>{

                   if (res.code==200)
                   {
                     self.commentParms.content='';
                     self.$Message.info('评论成功');
                     self.getCommentList();

                   }
                   else {
                       self.$Message.error('评论失败');
                   }

              })
                .then(e=>{

                })
          },
          /*
             判断是否关注了文章作者
            */
          judgeIsAttentionAuthor(author){
            //未登录
               if (this.user_id=='')
               {
                 return
               }
               var params={user_id:this.user_id,userarray:[author]}
               var self=this;
               this.$api.judgeAttentionUserArray(params).then(res=>{
                    if (res.code==200)
                    {
                        if (res.data.length>0)
                        {
                          self.attentionUserState=1;

                        }
                        else
                        {
                          self.attentionUserState=0;
                        }
                    }

               }).then(e=>{

               })
          },
          /*
              判断是否点赞了评论
            */
          judgePraiseComment(commentArray)
          {
            var params={user_id:this.user_id,commentArray:commentArray}
            var self=this;
            this.$api.judgePraiseComment(params).then(res=>{
              if (res.code==200)
              {
                 var data=res.data;


                  for (var item of self.commentList) {


                      var filterData= data.filter(one=>{
                          return one.comment_id==item.comment_id;
                      })
                    if (filterData.length>0)
                    {
                        item.isPraise=true;

                    }
                  }

              }


            })

          },
          cancelComment()
          {
              this.commentParms.content='';
          },
          /*
             处理
           */
          handleArticleDetialRes(data)
          {
            data.time=this.$util.getFormatDate(data.createDate);
            this.articleData=data;
            if (this.articleData.user_id==this.user_id)
            {
              this.attentionUserState=2;
            }
            else {
              this.judgeIsAttentionAuthor(this.articleData.user_id);
            }

          },
          handleCommentRes(res)
          {
             this.totalComment=res.count;
             this.commentList=res.data;
             var commentArray=[];
             for (var item of res.data)
             {
                item.time=this.$util.getFormatDate(item.updateDate);
                commentArray.push(item.comment_id);
                item.isPraise=false;
                item.replayShowInput=false;//显示回复框

                for (var replay of item.replayList)
                {

                }
             }
            if (this.user_id=='')
            {
              this.judgePraiseComment(commentArray)
               return;
            }

          },
          replayShow(index)
          {
            this.replayIndex=index;
            var self=this
            this.commentList[index].replayShowInput=true;
            this.$set(self.commentList,index,self.commentList[index])
          },
          clickReplay()
          {
            if (this.replayContent=='')
            {
                this.$Message.error('请输入回复内容');
                return;
            }
            var length=this.$util.getStrLength(this.replayContent)

            if (length>255)
            {
              this.$Message.error('回复内容不超过255个字符')
              return
            }
            this.replayComment(0)
          },
          cancelReplay()
          {
            var index=this.replayIndex;
            var self=this
            this.commentList[index].replayShowInput=false;
            this.$set(self.commentList,index,self.commentList[index])

          },

          replayComment(type)
          {
            var index=this.replayIndex;
             var comment_id=this.commentList[index].comment_id;
             var to_user_id=this.commentList[index].commit_user_id;
             var params={comment_id:comment_id,type:type,user_id:this.user_id,to_user_id:to_user_id,content:this.replayContent}
             var self=this;
             this.$api.replayComment(params).then(res=>{
               if(res.code==200)
               {
                  self.getCommentList();
                  self.replayContent='';
                  self.$Message.info('回复成功')
               }
               else
               {
                   self.$Message.error(res.message)
               }

             })
          }



        },
        filters: {

        },

        components: {

        }
    }

</script>

<style lang='less'>
     #article_detial{
         width: 100%;
         padding: 20px;
         margin-top: 50px;
         display: flex;
         justify-content: center;
        .detial_main{
              width: 100%;
              max-width: 1200px;


           h1{
               font-size: 25px;
               font-weight: bold;
               line-height: 80px;
           }
           .person{
               overflow: hidden;
               height: 70px;
               display: -webkit-flex;
               display: flex;
               .detial{
                  span{
                    color: #657180;
                  }

                 h{
                     font-weight: bold;
                     color: #CC4646;
                     display: -webkit-flex;
                     display: flex;
                   .guanzhu_person{
                      background-color:#33d685;
                      padding: 2px;
                      border-radius: 5px;
                      margin-left: 10px;
                      color: #fff;
                    }
                   .active{
                       background-color:#CC4646;
                    }
                 }
               }
           }
         }
       .login_btn{
           width: 100px;
           margin: 0 auto;
           margin-top: 20px;
          text-align: center;
          .btn{
              margin-bottom: 5px;
            &:hover{
                color:#CC4646;
            }
          }
           span{
               font-size: 12px;
           }



       }
       .praise_area{
            display: -webkit-flex;
            display: flex;
            justify-content: center;
            margin-top: 20px;
            .btn{
               width: 150px;
               height: 40px;
               border-radius: 20px;
               border: 1px solid #CC4646;
               font-size: 20px;
               line-height: 40px;
               text-align: center;
               span{
                   display: inline-block;
                   height: 100%;
                   border-right: 1px solid #CC4646;
                   padding-left: 5px;
                   padding-right: 15px;
                   font-size: 16px;
               }
           }


         .active{
              background-color: #CC4646;
              color: #ffffff;
              span{
                border-right: 1px solid #ffffff;
              }
          }
         .btn_collect{
           border: 1px solid #0c6;
            span{
              border-right: 1px solid #0c6;
            }
         }
         .collectactive{
           background-color: #0c6;
           color: #ffffff;
           span{
             border-right: 1px solid #ffffff;
           }

         }

       }
       .article_input_area{
          display: flex;
          overflow: hidden;
          margin-top: 20px;
           .text_area{
             padding: 10px 15px;
             width: 100%;
             height: 80px;
             font-size: 13px;
             border: 1px solid #dcdcdc;
             border-radius: 4px;
             background-color: hsla(0,0%,71%,.1);
             resize: none;
             display: inline-block;
             vertical-align: top;
             outline-style: none;
           }



       }

       .send{
         width: 100%;
         margin-top: 10px;
         display: -webkit-flex;
         display: flex;
         justify-content: flex-end;
       }

       .totalComment{
           height: 60px;
           line-height: 60px;
           border-bottom: 1px solid #f0f0f0;
       }
       .comment_item{
           display: -webkit-flex;
           display: flex;
           flex-direction: column;
           padding-bottom: 20px;
           padding-top: 20px;
           border-bottom: 1px solid #f0f0f0;

         .comment_person{
           overflow: hidden;
           img{
                float: left;
             }
           h1{
               font-weight: bold;
               color: #000000;
               font-size: 14px;
              line-height: 30px;
           }
           p{
               font-size: 12px;
               line-height: 20px;
           }


         }
         .p_content{
           padding: 10px;
         }
         .p_bottom{
             clear: both;
             p{
                 display: inline-block;
             }
             p > i {
                 &:hover{
                   color: #CC4646;
                 }
             }
            p > span {
             &:hover{
               color: #CC4646;
             }
           }


         }
         .replay_area{
             width: 100%;
             height: auto;
             border-left: 2px solid #999999;
            .item{
                margin-left: 20px;
                h1{
                    font-size: 14px;
                    line-height: 30px;
                 }
            }
         }
       }

     }
</style>

