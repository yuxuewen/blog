<template>
  <div id="search_main">
        <div class="main_area">
             <div class="left">
               <ul >
                 <li>
                   <i class="iconfont icon-msnui-article"></i>  文章
                 </li>
                 <li>
                   <i class="iconfont icon-iconset01100"></i>   用户
                 </li>
                 <li>
                   <i class="iconfont icon-zhuanti1"></i> 专题
                 </li>
               </ul>
                <div class="hot_search">
                    <div style="overflow: hidden">
                       <span >最近搜索</span>
                       <ul>
                           <li v-for="item in searchKeyList" @click="toSearch(item)">
                               {{item}}
                           </li>
                       </ul>
                    </div>

                </div>
             </div>

               <div class="right" v-if="type==0">
                   <div class="top">
                       <p class="title">
                          相关用户
                       </p>
                       <ul>
                           <li v-for='item in userList' @ >
                               <img :src="item.user_image_url" class="icon_person"/>
                               <div>
                                   <p>
                                       {{item.nickname}}
                                   </p>
                                 <p>
                                     {{item.user_says}}
                                 </p>
                               </div>
                           </li>

                       </ul>

                     <p class="title">
                       相关专题
                     </p>
                     <ul>
                       <li v-for='item in specialList' @click="toCheckSpecial(item)" >
                         <img :src="item.specialIcon" class="icon_special"/>
                         <div>
                           <p >
                             {{item.specialName}}
                           </p>
                           <p>
                             {{item.specialDesc}}
                           </p>
                         </div>
                       </li>

                     </ul>
                   </div>
                   <div class="bottom">
                       <div class="item" v-for="item in articleList">
                           <div class="person">
                              <img :src="item.user_image_url" class="icon"/>
                              <p>
                                 {{item.nickname}}
                              </p>
                             <p style="color: #969696">
                                {{item.createDate}}
                             </p>
                           </div>
                          <div class="article">
                            <p v-html="item.article_name" class="article_title" @click="toCheckArticleDetial(item)"></p>
                             <p class="main_content" v-html="item.article_content">
                             </p>
                          </div>
                       </div>
                      <Page :page-size='articleParams.pageSize' :total="totalArticleCount" show-total size="small" @on-change="searchArticleByKey"></Page>
                   </div>

               </div>
        </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default{
    data()
    {
      return{
          type:0,
          userList:[],
          articleList:[],
          specialList:[],
          searchKeyList:[],
          totalArticleCount:0,
          articleParams:{
               keywords:'',
               pageSize:5,
               pageNo:1
          },
        userParams:{
          keywords:'',
          pageSize:3,
          pageNo:1
        },
        specialParams:{
          keywords:'',
          pageSize:10,
          pageNo:1
        }


      }
    },
    created:function(){
       this.init();

    },
    computed:mapGetters({
        keywords:'getKeywords'

    }),
    watch:{
        keywords:"searchData"

    },
    methods:{
       init()
       {
           localStorage.keywords=localStorage.keywords?localStorage.keywords:'[]';
           this.searchKeyList=JSON.parse(localStorage.keywords);
           this.searchData();

       },
      searchData()
      {
         this.addKeywords();

         var type=this.type;

        if (type==0)
        {
            this.searchSpecialByKey();
            this.searchArticleByKey();
            this.searchUserByKey();
            return;
        }
        if (type==1)
        {
          this.searchUserByKey();
          return;
        }
        if (type==2)
        {
            this.searchArticleByKey();
            return;
        }
        if (type==3)
        {
          this.searchSpecialByKey();
          return;
        }

      },

      searchArticleByKey(no)
      {
        var  self=this;
        this.articleParams.pageNo=no?no:1;

         this.articleParams.keywords=this.keywords;
           this.$api.searchArticleByKey(this.articleParams).then(res=>{
             if (res.errno==0) {
               for (var item of res.data.data)
               {
                   item.article_name=self.$util.ruleKeywords(item.article_name,self.keywords);
                  item.article_content=self.$util.replaceHtmlContent(item.article_content);
                   item.article_content=self.$util.ruleKeywords(item.article_content,self.keywords);
               }
               self.articleList=res.data.data;
               self.totalArticleCount=res.data.count;

             }

        })
      },

      searchSpecialByKey(params)
      {
        var  self=this;
        this.specialParams.keywords=this.keywords;
        this.$api.searchSpecialByKey(this.specialParams).then(res=>{
          if (res.errno==0)
          {
            self.specialList=res.data.data;

          }

        })
      },
      searchUserByKey(params)
      {
        var  self=this;
        this.userParams.keywords=this.keywords;
        this.$api.searchUserByKey(this.userParams).then(res=>{
             if (res.errno==0)
             {
                self.userList=res.data.data;

             }

        })
      },

      toCheckArticleDetial(item)
      {
        var article_id=item.article_id;
        this.$router.push({name:"blog/articleDetial",query:{article_id:article_id}})

      },
      toCheckSpecial(item)
      {
        this.$router.push({name:this.$constantUtils.SPECIAL_DETIAL_ROUTE,query:{specialId:item.specialId}});

      },
      addKeywords()
      {
        if (this.keywords=='')
        {
            return;
        }



        var keywords=JSON.parse(localStorage.keywords);
        keywords.unshift(this.keywords);
        keywords=this.$util.arrayDeweighting(keywords);
        if (keywords.length>5)
        {
           keywords.length=5;
        }
        this.searchKeyList=keywords;

        localStorage.keywords=JSON.stringify(keywords);

      },
      toSearch(item)
      {
        this.$store.commit(this.$constantUtils.SEARCH_KEYWORDS,item);
      }



    },
    filters:{

    },

    components:{

    }
  }

</script>

<style lang='less'>
     #search_main{
          .search-text{
            color: #f23000;
          }
          width: 100%;
          display: -webkit-flex;
          display: flex;
          justify-content: center;
          margin-top: 100px;
          .main_area{
              width: 60%;
              min-width: 800px;
              display: -webkit-flex;
              display: flex;
              .left{
                  min-width: 150px;
                  margin-right: 15px;
                  li{
                      height: 40px;
                      line-height: 40px;
                      padding-left: 20px;
                      &:active{
                         background: #337ab7;
                      }
                      &:hover{
                        background: #f0f0f0;
                      }
                  }

              }
              .right{

                   display: flex;
                   display: -webkit-flex;
                   flex-direction: column;
                   width: auto;
                   overflow: auto;
                   flex-grow: 1;
                   .top
                   {
                        border-radius: 4px;
                        border: 1px solid #f0f0f0;
                        margin-bottom: 30px;
                        background: #f0f0f0;
                        height: 200px;
                        padding-left: 20px;
                       .title{
                           margin-top: 10px;
                       }

                        ul{
                          display: flex;
                          display: -webkit-flex;
                          margin-top: 10px;

                          li{
                            display: flex;
                            display: -webkit-flex;
                            padding-right: 20px;

                          }

                        }

                   }
                   .bottom{
                         margin-top: 20px;
                        .ivu-page mini{
                            display: -webkit-flex;
                            display: flex;
                            justify-content: center;
                        }
                       .item{
                         display: -webkit-flex;
                         display: flex;
                         flex-direction: column;

                          .person{
                             display: -webkit-flex;
                             display: flex;
                              align-items: center;
                             padding: 10px;
                            p{
                                margin-left: 10px;
                            }
                            .icon{
                              width: 30px;
                              height: 30px;
                              border-radius: 50%;
                            }

                          }
                         .article{
                              width: 100%;
                              overflow: hidden;
                              .main_content{
                                  height: 100px;
                                  overflow: hidden;
                                  margin-top: 10px;
                              }
                              .article_title{
                                   font-weight: bold;
                                   &:hover{
                                       color: #CC4646;
                                   }
                              }
                            margin-bottom: 10px;
                         }


                       }
                   }

              }
          }

     }
</style>

