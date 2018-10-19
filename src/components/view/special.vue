<template>
    <div id="special">
      <div class="top_title">
           <p> <i class="iconfont icon-fenlei"></i>热门专题</p>
      </div>
      <ul class="special_list">
          <li class="item" v-for="item in specialList">
              <img :src="item.specialIcon" class="icon">
              <h3>
                 {{item.specialName}}
              </h3>
              <p>
                 关注人数:{{item.attentionUser}}
              </p>
            <p>
              投稿数量:{{item.submitNum}}
            </p>
              <button @click="toCheckDetial(item)">查看详情</button>
          </li>
      </ul>
      <Page :total="totalCount" show-total size="small" @on-change="getSpeciaList" :page-size="6"></Page>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
              specialList:[],
              totalCount:0,
            }
        },
        created: function () {

          this.getSpeciaList();

        },
        computed: mapGetters({

        }),
        watch: {

        },
        methods: {
          getSpeciaList(no)
          {
            var params={};
            params.pageNo=no?no:1;
            params.pageSize=6;
            var self=this;
            this.$api.getSpeciaList(params).then(res=>{
              if (res.errno==0)
              {
                self.specialList=res.data.data;
                self.totalCount=res.data.count;

              }

            }).catch(e=>{

            })

          },
          toCheckDetial(item)
          {
              this.$router.push({name:this.$constantUtils.SPECIAL_DETIAL_ROUTE,query:{specialId:item.specialId}});
          },
        },
        filters: {},

        components: {}
    }

</script>

<style lang='less'>
     #special{
          display: -webkit-flex;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          .top_title{
            width: 70%;
            height: 75px;
            border-radius: 10px;
            background:#FFA500 ;
            margin-top: 50px;
            line-height: 75px;
            font-size: 25px;
            color: #ffffff;
            padding-left: 30px;
            i{
              font-size: 25px;
              margin-right: 5px;
            }
          }
        .special_list{
          width: 70%;
          display: -webkit-flex;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          .item{
              width: 30%;
              min-width: 200px;
              padding: 10px;
              border-radius: 4px;
              border: 1px solid #e6e6e6;
              height: 280px;
              margin-top: 80px;
              display: -webkit-flex;
              display: flex;
              align-items: center;
               flex-direction: column;
              .icon{
                  width: 60px;
                  height: 60px;
                  border-radius: 5px;
                  margin-top: -40px;
                  &:hover{
                      border: 1px dashed #CC4646;
                  }
              }
            h3{
                font-weight: bold;
                font-size: 20px;
                line-height: 30px;
                &:hover{
                    color: #CC4646;
                }
            }
            p{
                margin-top: 10px;
                padding-left: 20px;
                padding-right: 20px;
                height: 20px;
                overflow: hidden;
                color: #454c5b;
              /*text-overflow: ellipsis;*/
              /*display:-webkit-box; //作为弹性伸缩盒子模型显示。*/
              /*-webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列*/
              /*-webkit-line-clamp:3; //显示的行*/

            }
            button{
                width: 90px;
                height: 40px;
                background: #CC4646;
                border: none;
                color: #fff;
                border-radius: 10px;
                margin-top: 20px;
                &:hover{
                    border: 1px solid #CC4646;
                    background: #fff;
                    color: #CC4646;
                }
            }

          }

       }
     }
</style>

