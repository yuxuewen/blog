<template>
    <div id="user_detial">

         <div class="left">
            <div class="user_top_bar" v-if="userInfo.user_name">
                   <img :src="userInfo.user_image_url" class="icon_person" style="width: 60px;height: 60px"/>
                   <div class="bar_content">
                        <h1>
                           {{userInfo.nickname}}
                        </h1>
                        <div class="content_bottom" >
                           <div class="small_item" @click="changeTab(0)">
                             <p>
                               {{userStatistics.attentionNum}}
                             </p>
                             <p>
                                 关注
                             </p>
                           </div>
                          <div class="small_item"  @click="changeTab(1)">
                            <p>
                              {{userStatistics.fansNum}}
                            </p>
                            <p>
                              粉丝
                            </p>
                          </div>
                          <div class="small_item" @click="changeTab(2)">
                            <p>
                              {{userStatistics.articleNum}}
                            </p>
                            <p>
                              发表文章
                            </p>
                          </div>
                          <div class="small_item">
                            <p>
                              {{userStatistics.praiseNum}}
                            </p>
                            <p>
                              获得点赞
                            </p>
                          </div>
                        </div>

                   </div>
                  <div class="bar_right_btn">
                       <div :class="{btn:true,active:attentionAuthorState}" v-if="!isMyself" @click="attentionAuthor">
                          <p v-if="!attentionAuthorState"><i class="iconfont icon-guanzhuxuanzhong"   ></i>关注作者</p>
                          <p v-if="attentionAuthorState"><i class="iconfont icon-duihao"   ></i>已关注</p>
                       </div>
                       <div class="btn" style="background: #CC4646;margin-left: 20px" @click="publishArticle" v-if="isMyself"><i class="iconfont icon-xiezi"></i>发表文章</div>
                  </div>
            </div>
           <div >
             <menu-horizontal :menuArray="attentionTab" v-if="tab==0||tab==1&user_id!=''"></menu-horizontal>
             <menu-horizontal :menuArray="articleTab"  v-if="tab==2&user_id!=''"></menu-horizontal>
           </div>
            <router-view ></router-view>
         </div>
      <div class="right">
        <h4 class="h4label">
          个人介绍
        </h4>

         <p class="plabel">
             {{userInfo.user_description!=""?userInfo.user_description:"暂无"}}
         </p>
         <h4 class="h4label">
           人生格言
         </h4>
        <p class="plabel">
           {{ userInfo.user_says!=""?userInfo.user_says:"暂无"}}
        </p>

      </div>


    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import  menuHorizontal from '../my_components/menuHorizontal'

    export default {
        data() {

            return {
              user_id:'',
              userInfo:{},
              isMyself:false,
              userStatistics:{},
              attentionAuthorState:false,
              tab:0,
              attentionTab:[
                {menuName:'关注用户',icon:'iconfont icon-guanzhuxuanzhong',key:'user/attention',query:{user_id:'',type:0}},
                {menuName:'我的粉丝',icon:'iconfont icon-icon-fensi',key:'user/fans',query:{user_id:'',type:1}},
              ],
              articleTab:[
                 {menuName:'我的文章',icon:'iconfont icon-msnui-article',key:'user/articlelist',query:{user_id:'',type:0}},
                // {menuName:'我的动态',icon:'iconfont icon-dongtai',key:'',query:{user_id:'',type:0}},
                 {menuName:'我的评论',icon:'iconfont icon-pinglun',key:'user/comment',query:{user_id:'',type:0}},
                ]
            }
        },
        created: function () {
          this.init();

        },
        computed: mapGetters({
          refresh_user_id:'getRefreshUserId'

        }),
        watch: {
          refresh_user_id:'init',
          '$route' (to, from) {
              this.init();
          }
        },
        methods: {
          init(){
              this.user_id=this.$route.query.user_id;
              this.attentionTab[0].query.user_id=this.user_id;
              this.attentionTab[1].query.user_id=this.user_id;
              this.articleTab[0].query.user_id=this.user_id;
              this.articleTab[1].query.user_id=this.user_id;
              this.getUserInfo();
              this.getUserStatistics();

              if(localStorage.user_id==this.user_id)
              {
                 this.isMyself=true;
              }
              else {
                this.isMyself=false;
                this.judgeIsAttentionAuthor();
              }
          },
          /*

          /*
             获得用户信息
           */
          getUserInfo()
          {

            var params={user_id:this.user_id};
            var self=this;
            this.$api.getUserDetialInfo(params).then(res=>{
              if (res.code==200||res.code==0)
              {
                  self.userInfo=res.result
              }


            }).catch(e=>{

            })
          },
          publishArticle()
          {
            if (localStorage.user_id==''||localStorage.user_id==undefined)
            {
                this.$Message.error('请先登录');
                return;
            }
             this.$router.push({name:"blog/publishArticle"});

          },
          getUserStatistics()
          {
              var params={user_id:this.user_id};
              var self=this;
              this.$api.getUserStatistics(params).then(res=>{
                if (res.code==200)
                {
                   self.userStatistics=res.data

                }

              }).catch(e=>{

              })
          },
          /*
          判断是否关注了文章作者
          */
        judgeIsAttentionAuthor(){
          //未登录
          if (localStorage.user_id=='')
          {
             return
          }
         var params={user_id:localStorage.user_id,userarray:[this.user_id]}

          var self=this;
          this.$api.judgeAttentionUserArray(params).then(res=>{
            if (res.code==200)
            {

              if (res.data.length>0)
              {
                self.attentionAuthorState=true;
              }
              else
              {
                self.attentionAuthorState=false;
              }
            }

          }).then(e=>{

          })
        },
          attentionAuthor()
          {

              /*
                 type:0 关注好友 1:取消关注
               */
              var params={user_id:localStorage.user_id,attention_user_id:this.user_id,type:this.attentionAuthorState?1:0};
              var self=this;
              this.$api.attentionUser(params).then(res=>{
                if (res.code==200)
                {
                  self.attentionAuthorState=!self.attentionAuthorState
                  self.$Message.info( self.attentionAuthorState?'关注成功':'已取消关注');

                }
                else {
                  self.$Message.error('操作失败');

                }

              }).then(e=>{

              })
          },
          changeTab(tab)
          {
             this.tab=tab;
             if (tab==0)
             {
                var name=this.attentionTab[0].key;
                var query=this.attentionTab[0].query;
                this.$router.push({name:name,query:query});

             }
             else if (tab==1)
             {
               var name=this.attentionTab[1].key;
               var query=this.attentionTab[1].query;
               this.$router.push({name:name,query:query});

             }
             else if (tab==2)
             {
               var name=this.articleTab[0].key;
               var query=this.articleTab[0].query;
               this.$router.push({name:name,query:query});
             }

          }

        },
        filters: {

        },

        components: {
          menuHorizontal

        }
    }

</script>

<style lang='less'>
     #user_detial{
         display: -webkit-flex;
         display:flex;
         flex-direction:row;
         justify-content: center;
         flex-wrap: wrap;
         max-width: 1000px;
         margin: 0 auto;
        .left{
            width: 60%;
            display: -webkit-flex;
            display: flex;
            justify-content: flex-end;
            margin: 30px;
            flex-direction: column;
             .user_top_bar{
                width: auto;
                min-width: 10%;
                display: -webkit-flex;
                display: flex;
               .bar_content{
                   flex-grow: 1;
                   h1{
                       font-size: 20px;
                       line-height: 25px;
                   }
                 .content_bottom{
                      display: -webkit-flex;
                      display: flex;
                      margin-top: 5px;
                     .small_item{
                          padding-left: 10px;
                          padding-right: 10px;
                          border-right: 1px solid #999999;
                          text-align: center;
                          font-size: 12px;
                          line-height: 15px;

                     }
                 }

               }
               .bar_right_btn{
                 display: -webkit-flex;
                 display: flex;
                 .btn{
                   width: 100px;
                   height: 40px;
                    border-radius: 20px;
                    padding: 8px 0;
                    background: #42c02e;
                    color: #ffffff;
                    text-align: center;
                 }
                 .active{
                     background: #CC4646;
                 }

               }

            }

        }
       .right{

         width: 40%;
         max-width: 160px;
         display: -webkit-flex;
         display: flex;
         justify-content: flex-start;
         margin: 30px;
         flex-direction: column;
         .h4label{
             line-height: 30px;
         }
         .plabel{
             line-height: 20px;
              padding-bottom: 10px;
             border-bottom: 1px solid #d6ebff;
         }

       }
     }
</style>

