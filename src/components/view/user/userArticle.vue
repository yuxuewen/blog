<template>
    <div id="user_article">

            <ul class="ul_area">
                <li v-for="item in articleList">

                    <h3 @click="checkDetial(item)">
                        {{item.article_name}}
                    </h3>
                    <div class="detial_area">
                      <p>
                        {{item.main_content}}
                      </p>
                      <img :src="item.imgUrl" v-if="item.imgUrl"/>

                    </div>

                  <div class="bottom">
                     <div style="flex-grow: 1">
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
                     <div class="item_right" v-if="isPersonal">
                         <div @click="toEdit(item.article_id)">
                            <i class="iconfont icon-bianji"></i>
                         </div>
                       <div style="margin-left: 15px" @click="deleteArticle(item)">
                           <i class="iconfont icon-tuanduicankaoxian-"></i>
                       </div>

                     </div>

                  </div>

                </li>
            </ul>
      <Page :total="totalCount" show-total size="small" @on-change="searchArticle"></Page>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
              user_id:'',
              params:{
                   user_id:'',
                   pageNo:1,
                   pageSize:8,
              },
              articleList:[],
              totalCount:0,
              isPersonal:false,

            }
        },
        created: function () {
          this.init();

        },
        computed: mapGetters({

        }),
        watch: {

        },
        methods: {
          init()
          {
             this.user_id=this.$route.query.user_id;
  ;
             if (this.user_id==localStorage.user_id){
               this.isPersonal=true;

             };
             this.params.user_id=this.user_id;
             this.searchArticle();

          },
          searchArticle(no)
          {
             this.params.pageNo=no>0?no:1;
              var self=this;
              this.$api.getArticleList(this.params).then(res=>{
                 if (res.code==200)
                 {
                   for (var item of res.data)
                   {
                     var imgArray=this.$util.getHtmlImgUrl(item.article_content+"");

                     if (imgArray.length>0)
                     {
                       item.imgUrl=imgArray[0];
                       console.log(item.imgUrl)
                     }

                     item.main_content=this.$util.replaceHtmlContent(item.article_content);

                     if (self.$util.getStrLength(item.main_content)>150)
                     {
                       item.main_content=item.main_content.substring(0,150)+'...';
                     }
                     item.publicDate=self.$util.getFormatOnlyDate(item.createDate);
                   }

                     self.articleList=res.data;
                     self.totalCount=res.count;
                 }

              })
                .then(e=>{

                })
          },
          checkDetial(item)
          {
            var article_id=item.article_id;

            this.$router.push({name:"blog/articleDetial",query:{article_id:article_id}})

          },
          deleteArticle(item)
          {
             this.$util.confirmDialog(this,'确认删除','确认删除文章',self=>{
               self.ensureDelete(item);

             })

          },
          toEdit(article_id)
          {
             this.$router.push({name:"blog/publishArticle",query:{ article_id:article_id}});

          },
          ensureDelete(item)
          {
              var params={article_id:item.article_id};
              var self=this;
              this.$api.deleteArticle(params).then(res=>{
                  if (res.code==200)
                  {
                      self.$Message.info('删除成功');
                      self.searchArticle(self.params.pageNo,3);
                  }

                 })
                .then(e=>{

                })


          },


        },
        filters: {

        },

        components: {

        }
    }

</script>

<style lang='less'>
     .ul_area{
          li{
               border-bottom: 1px solid #f0f0f0;
               word-break: break-word;
               margin: 0 0 15px;
               height: 155px;
               .detial_area{
                    display: -webkit-flex;
                    display: flex;
                    height: 100px;
                    overflow: hidden;
                    align-items: center;
                    img{
                       width: 120px;
                       height: 80px;
                      margin-left: 10px;
                    }
               }
              h3{
                  font-size: 16px;
                  line-height: 28px;
                   &:hover{
                        color:#CC4646;
                   }
              }
             p{
                height: 80px;
               overflow: hidden;
               text-overflow: ellipsis;
               display:-webkit-box; //作为弹性伸缩盒子模型显示。
               -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
               -webkit-line-clamp:4; //显示的行


             }
            .bottom{
                 width:100%;
                 display: -webkit-flex;
                 display: flex;

                .item_right{
                  display: -webkit-flex;
                  display: flex;
                  i:hover{
                       color: #CC4646;
                  }

                }
            }

          }
     }
</style>

