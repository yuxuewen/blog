<template>
  <div id="homePage">

    <div class="banner">

          <swipper :bannerList="bannerList"></swipper>
    </div>
   <div class="home_content">

     <!--<div class="type_area" ref="tab">-->
       <!--<ul class="tab_content" ref="tabWrapper">-->
         <!--<li class="tab_item" v-for="(item ,index) in typeList" ref="tabitem" :style="index==typeList.length-1?'border-right:none':''">-->
         <!--{{item.type_name}}-->
         <!--</li>-->
       <!--</ul>-->
     <!--</div>-->
     <div class="article_display">
        <div class="leftArea">
          <div class="article_top_bar">
            <p>博主推荐</p>
            <div class="refresh" @click="getBolgSupportArticle()"><i class="iconfont icon-shuaxin" ></i>换一批</div>

          </div>
          <div class="article_content" v-for="item in supportArticle ">
            <div class="left-detial">
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
            <div class="right">
              <img :src="item.imgUrl" v-if="item.imgUrl"/>
            </div>
          </div>
          <div class="article_top_bar"  style="border-bottom: 2px solid #0f9c7c">
            <p style="background-color: #0f9c7c">今日置顶</p>
            <div class="refresh" @click="getTopArticleList()"><i class="iconfont icon-shuaxin" ></i>换一批</div>
          </div>
          <div class="article_content" v-for="item in topArticleList ">
            <div class="left-detial">
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
            <div class="right">
              <img :src="item.imgUrl" v-if="item.imgUrl"/>
            </div>
          </div>

        </div>
        <div class="rightArea">
            <div class="right_bar">
               <p> 推荐作者</p>
              <div class="refresh" @click="getRecommendList()"><i class="iconfont icon-shuaxin" ></i>换一批</div>
            </div>
          <div v-for="item in recommendUserList" class="right_item">
              <img :src="item.user_image_url"/>
               <div class="right_content" @click="checkUserDetial(item.user_id)">
                   <h3>
                     {{item.nickname}}
                   </h3>
                   <p>
                       {{item.recommendCause}}
                   </p>
               </div>
            <div class="guanzhu" @click="attentionUser(item)">
                 <p v-if="!item.hasAttention"><i class="iconfont icon-iconfontadd"></i>关注</p>
                 <p v-if="item.hasAttention" class="has"><i class="iconfont icon-duihao"></i>已关注</p>
            </div>
          </div>
          <div class="right_bar" >
            <p style="background:#CC4646;"> 置顶专题</p>
            <div class="refresh" @click="getSpeciaList()"><i class="iconfont icon-shuaxin" ></i>换一批</div>

          </div>
          <div v-for="item in specialList" class="right_item">
            <img :src="item.specialIcon"/>
            <div class="right_content" @click="checkSpecialDetial(item)">
              <h3>
                {{item.specialName}}
              </h3>
              <p>
                {{item.nickname}}
              </p>
            </div>
            <div class="guanzhu" @click="attentionSpecial(item)">
              <p v-if="!item.hasAttention"><i class="iconfont icon-iconfontadd"></i>关注</p>
              <p v-if="item.hasAttention" class="has"><i class="iconfont icon-duihao"></i>已关注</p>
            </div>
          </div>

        </div>

     </div>

   </div>
    <!--<div class="ad-web">-->
      <!--<ad-swipper :relatedList="bottomBannerList"></ad-swipper>-->
    <!--</div>-->


  </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import  swipper from '../my_components/swipper'
    import  adSwipper from '../my_components/adSwipper'
    import BScroll from 'better-scroll';

    export default {
        data() {
            return {
              bannerList: [],
              bottomBannerList: [],
              typeList: [],
              topArticleList: [],
              supportArticle:[],
              maxBrowseArticleList:[],
              maxCollectArticleList:[],
              recommendUserList:[],
              specialList:[],
              supportArticlePage:0,
              supportArticlePageNo:1,
              topArticlePage:0,
              topArticlePageNo:1,
              recommendUserPageNo:1,
              recommendUserPage:0,
              specialPageNo:1,
              specialPage:0,
            }
        },
        created: function () {
           this.init();

        },
      mounted:function()
      {

      },
        computed: mapGetters({

        }),
        watch: {

        },
        methods: {
          init(){
            this.getBannerList(1);
            this.getBannerList(2);

         //   this.getArticleType();
            this.getTopArticleList();
            this.getBolgSupportArticle();
            // this.getMaxBrowseArticleList();
            // this.getMaxCollectArticleList();
            this.getRecommendList();
            this.getSpeciaList();

          },
          /*
          获得轮播图
        */
          getBannerList(type)
          {
            var params={type:type};
            var self=this;
            this.$api.getBannerList(params).then(res=>{
              if (res.errno==0)
              {
                if (type==1)
                {
                  self.bannerList=res.data;
                }
                if (type==2)
                {
                  self.bottomBannerList=res.data;
                }



              }

            }).catch(e=>{

            })
          },
          getTopArticleList()
          {
            this.topArticlePageNo=this.topArticlePageNo>=this.topArticlePage?1:this.topArticlePageNo+1;

            var params={
               article_up:1,
               pageSize:5,
               pageNo:this.topArticlePageNo,

            };
           this.getArticleList(params,0)

          },
          getRecommendList()
          {
            this.recommendUserPageNo= this.recommendUserPageNo>=this.recommendUserPage?1:this.recommendUserPageNo+1;
            var params={pageNo:this.recommendUserPageNo, pageSize:5};
            var self=this;
            this.$api.getRecommendList(params).then(res=>{
              if (res.code==200)
              {
                 self.recommendUserList=res.data;
                 self.recommendUserPage=res.totalPages;
                 if (localStorage.user_id!='')
                 {
                   var userArray=[];
                   for (var item of self.recommendUserList)
                   {
                      item.hasAttention=false;
                      userArray.push(item.user_id);
                   }
                   self.judgeIsAttentionAuthor(userArray)
                 }

              }

            }).catch(e=>{

            })

          },

          getBolgSupportArticle()
          {

            this.supportArticlePageNo= this.supportArticlePageNo>=this.supportArticlePage?1:this.supportArticlePageNo+1;
            var params={
              article_support:1,
              pageSize:5,
              pageNo:this.supportArticlePageNo
            };
            this.getArticleList(params,1)
          },


          /*
             获取文章列表
           */
          getArticleList(params,type)
          {
            var self=this;
            this.$api.getArticleList(params).then(res=>{
              if (res.code==200)
              {
                self.handleArticleRes(res.data,type,res.totalPages)
              }
            }).catch(e=>{

            })

          },
          getSpeciaList()
          {
            this.specialPageNo= this.specialPageNo>=this.specialPage?1:this.specialPageNo+1;
            var params={pageNo:this.specialPageNo, pageSize:5};
              this.$api.getSpeciaList(params).then(res=>{
                   if(res.errno==0)
                   {
                       let specialIdArray=[];
                       for(let item of res.data.data)
                       {
                           item.hasAttention=false;
                           if(localStorage.user_id)
                           {
                             specialIdArray.push(item.specialId);

                           }

                       }
                     this.judgeIsAttentionSpecial(specialIdArray);
                       this.specialList=res.data.data;
                       this.specialPage=res.data.totalPages;
                   }
              })
          },
          toCheckDetial(item)
          {
              var article_id=item.article_id;
              this.$router.push({name:"blog/articleDetial",query:{article_id:article_id}})
          },
          handleArticleRes(data,type,totalPages)
          {

            for (var item of data)
            {
              var imgArray=this.$util.getHtmlImgUrl(item.article_content+"");

              if (imgArray.length>0)
              {
                  item.imgUrl=imgArray[0];


              }

              item.main_content=this.$util.replaceHtmlContent(item.article_content);
              item.publicDate=this.$util.getFormatOnlyDate(item.createDate);
            }
            if (type==0)
            {
               //console.log(aJSON.stringify(data[0]));
              this.topArticleList=data;
              this.topArticlePage=totalPages;
              //this.topArticleList=data;

            }
            if (type==1)
            {
              this.supportArticle=data;
              this.supportArticlePage=totalPages;


            }
              if (type==2)
              {
                this.maxBrowseArticleList=data;

              }
            if (type==3)
            {
              this.maxCollectArticleList=data;

            }
          },
          checkUserDetial(user_id){

               this.$router.push({name:'blog/userDetial',query:{user_id:user_id}})
          },
          attentionUser(item)
          {
            if (localStorage.user_id=='')
            {
                this.$Message.error('请先登录')
                 return;
            }
            /*
             type:0 关注好友 1:取消关注
            */

            var params={user_id:localStorage.user_id,attention_user_id:item.user_id,type:item.hasAttention?1:0};

            var self=this;
            this.$api.attentionUser(params).then(res=>{
              if (res.code==200)
              {
                  item.hasAttention=!item.hasAttention;
                  self.$set(self.recommendUserList,1,self.recommendUserList[1])
                  self.$Message.info('保存成功');
              }
              else {

              }

            }).then(e=>{

            })


          },
          /*
           判断是否关注了文章作者
          */
          judgeIsAttentionAuthor(user){
            //未登录
            if (this.user_id=='')
            {
              return
            }
            var params={user_id:localStorage.user_id,userarray:user}
            var self=this;
            this.$api.judgeAttentionUserArray(params).then(res=>{
              if (res.code==200)
              {
                for (var item of  res.data)
                {
                    self.recommendUserList.filter(one=>{
                         if( item.attention_user_id==one.user_id)
                         {
                             one.hasAttention=true;
                         }
                    })

                  this.$set(self.recommendUserList,1,self.recommendUserList[1]);

                }

              }

            }).then(e=>{

            })
          },
          /*
             判断是否关注专题
           */
          judgeIsAttentionSpecial(specialArray){
            let params={user_id:localStorage.user_id,specialArray:specialArray}

            var self=this;
            this.$api.judgeAttentionSpecialArray(params).then(res=>{
              if (res.errno==0)
              {
                for (var item of  res.data)
                {
                  self.specialList.filter(one=>{
                    if( item.specialId==one.specialId)
                    {
                      one.hasAttention=true;
                    }
                  })

                  this.$set(self.specialList,1,self.specialList[1]);
                }

              }

            }).then(e=>{

            })
          },
          /*
             关注(取消关注)专题
           */
          attentionSpecial(item)
          {
            if (this.user_id=='')
            {
              this.$Message.error('请先登录');
              return;
            }

            let params={user_id:localStorage.user_id,specialId:item.specialId}
            params.type=item.hasAttention?1:0;
            this.$api.attentionSpecial(params).then(res=>{
              if (res.errno==0)
              {
                item.hasAttention=!item.hasAttention;
                this.$set(this.specialList,0,this.specialList[0]);
                this.$Message.info( item.hasAttention?'关注成功':"取消关注成功");
              }
              else {

              }
            })

          },
          /*
             查看专题详情
           */
          checkSpecialDetial(item)
          {
            this.$router.push({name:this.$constantUtils.SPECIAL_DETIAL_ROUTE,query:{specialId:item.specialId}});
          },


          InitTabScroll(){
            let width=0
            for (let i = 0; i <this.typeList.length; i++) {
              width+=this.$refs.tabitem[0].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
            }
            this.$refs.tabWrapper.style.width=width+'px'
            this.$nextTick(()=>{
              if (!this.scroll) {
                this.scroll=new BScroll(this.$refs.tab, {
                  startX:0,
                  click:true,
                  scrollX:true,
                  scrollY:false,
                  eventPassthrough:'vertical'
                });
              }else{
                this.scroll.refresh()
              }
            });
          }
        },





        filters: {

        },

        components: {
          swipper,
          adSwipper

        }
    }

</script>

<style lang='less'>
  @import './style/homePage';

</style>

