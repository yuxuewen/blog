<template>
  <div id="article_edit">
    <Row :gutter="16">
      <Col  :md="24" :lg="18">
        <div class="article_area">
          <Form :model="formItem" ref="formItem" :label-width="80" :rules="ruleValidate" >
            <FormItem label="文章标题" prop="article_name">
              <Input v-model="formItem.article_name" placeholder="文章标题"></Input>
            </FormItem>
            <FormItem label="文章内容" prop="article_content">
              <vue-editor :htmlForEditor="formItem.article_content" ref="article_editor"></vue-editor>
            </FormItem>
          </Form>

        </div>
      </Col>
      <Col  :md="24" :lg="6">
        <div class="public_area">
          <div class="public">
            <p class="title">
              <Icon type="paper-airplane"></Icon>
              发布
            </p>
            <Form :model="formItem" ref="formItem2" :label-width="40" :rules="ruleValidate">
              <FormItem label="状态">
                <RadioGroup v-model="formItem.publicState">
                  <Radio label="0" >草稿</Radio>
                  <Radio label="1">发布</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="模式">
                <Select v-model="formItem.article_patten" >
                  <Option v-for="item in patton" :value="item.type" :key="item.type">{{ item.name }}</Option>
                </Select>
              </FormItem>

              <FormItem>
                <Button type="success" @click="handleSubmit('formItem')">发布</Button>
                <Button type="error" >删除</Button>
                <Button type="warning">重置</Button>
                <Button type="default">预览</Button>
              </FormItem>
            </Form>
          </div>
          <div class="public" style="margin-top: 20px">
            <p class="title">
              <Icon type="ios-paper-outline"></Icon>
                专题
            </p>
            <p>专题名称:{{typeName}}</p>

            <Tree :data="typeList" @on-select-change="changeType"></Tree>
          </div>
          <div class="public" style="margin-top: 20px">
            <p class="title">
              <Icon type="ios-pricetag-outline"></Icon>
              标签
            </p>
            <div class="tag">
               <Tag closable color="blue" v-for="item in tagArray" @on-close="deleteTag" :name=item>{{item}}</Tag>
              <Form    inline style="margin-top: 10px">
                <FormItem >
                   <Input type="text" v-model="tag" placeholder="标签名称">
                   </Input>
                </FormItem>
                <FormItem>
                  <Button type="primary"  @click="addTag">新建</Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import vueEditor from '../my_components/vueEditor'
  export default{
    data()
    {
      return{
        formItem:{
          article_name:'',
          article_content:'',
          user_id:'',
          keyword:'',
          article_patten:1,
          publicState:1,
          type_id:'',
          state:0
        },
        content:'',
        ruleValidate:{
          article_name: [
            { required: true, message: '文章标题不能为空', trigger: 'blur' }
          ],
          article_content: [
            { required: true, message: '文章内容不能为空', trigger: 'blur' }
          ]

        },
        patton:[
          {type:0,name:"私有"},
          {type:1,name:"公开"},
          {type:2,name:"仅未关注者查看"},
        ],
        params:{},
        typeList:[],
        tagArray:[],
        tag:'',
        typeName:'',

      }
    },
    created:function(){
      this.init();
      this.getArticleType();

    },
    computed:mapGetters({

    }),
    watch:{

    },
    methods:{
      init(){
        /*
           文章编辑
         */
        var article_id=this.$route.query.article_id;
        var self=this;
        if (article_id!=undefined&article_id!='')
        {

          var params={article_id:article_id};
          this.$api.getArticleList(params).then(res => {
            if(res.code==200)
            {
               self.handleArticleRes(res)
            }
            else
            {
              self.$Message.error(res.message);
            }
          })
            .catch(error => {
              console.log(error)
            })


        }
      },
      handleArticleRes(res)
      {

        this.formItem=res.data[0];
        this.tagArray=this.formItem.keyword.split(',');
        this.$refs.article_editor.setContent(this.formItem.article_content);
      },
      getArticleType()
      {
        var self=this;
        this.$api.getArticleTypeList(this.params).then(res => {
          if(res.code==200)
          {
            self.handleRes(res.result.data)
          }
          else
          {
            self.$Message.error(res.message);
          }
        })
          .catch(error => {
            console.log(error)
          })
      },
      deleteTag(event,name){
        Array.prototype.remove = function(val) {
          var index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        };
        this.tagArray.remove(name);

      },
      changeType(data)
      {
          this.formItem.type_id=data[0].type_id;
          this.typeName=data[0].type_name;

      },
      addTag()
      {

        if (this.tag=='')
        {
          return;
        }
        this.tagArray.push(this.tag);
        this.tag='';

      },

      handleRes(result)
      {
        var firstType=result.filter(item=>{
          item.title=item.type_name;
          return item.parent_id==0
        })
        for (var i in firstType)
        {
          var id=firstType[i].type_id;
          var secType=result.filter(item=>{
            return id==item.parent_id;
          })
          for (var s of secType)
          {
            s.showAdd=false;

          }
          firstType[i].children=secType;
        }
        this.typeList=firstType;
      },
      handleSubmit(name)
      {
        this.formItem.keyword='';
        for (let item of this.tagArray)
        {
           this.formItem.keyword=item+this.formItem.keyword;

        }
        this.formItem.article_content=this.$refs.article_editor.getContent();
        this.$refs[name].validate((valid) => {
          if (valid) {
            //this.toLogin();
            this.saveArticle();

          }
        });

      },
      saveArticle()
      {

        this.formItem.user_id=localStorage.user_id;
        this.$util.confirmDialog(this,"确认保存","您确认保存吗?",self=>{
          self.formItem.keyword=self.tagArray.toString();
          self.$api.publishArticle(this.formItem).then(res=>{
            if(res.code==200)
            {
                self.$router.back(-1);
            }
            else {



            }

          })

        });


      }

    },
    filters:{

    },

    components:{
      vueEditor,

    }
  }

</script>

<style lang='less'>
  .promise(@css, @args) {
      @{css}: @args;
    -webkit-@{css}: @args;
    -moz-@{css}: @args;
    -ms-@{css}: @args;
    -o-@{css}: @args;
  }
  #article_edit{
    width: 100%;
    height: auto;
    margin-top: 10px;
    background-color: #fff;
    overflow-y: auto;
    .article_area{
      background-color: #ffffff;
      padding: 10px;

    }
    @media(max-width:992px){
      .public_area{
        .promise(display,flex);
        flex-direction: row;
      }
    }
    @media(max-width:600px){
      .public_area{
        .promise(display,flex);
        flex-direction: column;

      }
    }

    @media(min-width:992px) {
      .public_area {
        .promise(display, flex);
        flex-direction: column;
      }
    }
    .public_area{


      .public{

        .promise(display,flex);
        flex-direction: column;
        border-radius: 5px;
        background-color: #fff;
        padding: 10px;
        .title{
          height: 30px;
          line-height: 30px;
          border-bottom: 1px solid #d9d9d9;
          max-height: 300px;
          overflow-y: auto;

        }
        .tag{
          margin-top: 10px;
        }


      }
    }
  }
</style>

