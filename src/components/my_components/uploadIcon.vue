<template>
  <div>
  <div class="sys-upload-list" v-for="(item,index) in uploadList">
    <img :src="item.url">
    <div class="sys-upload-list-cover">
      <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
      <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
    </div>
  </div>
  <Upload
    v-if="uploadList.length<maxUpload"
    ref="upload"
    :show-upload-list="false"
    :on-success="handleSuccess"
    :format="['jpg','jpeg','png']"
    :max-size="2048"
    :on-format-error="handleFormatError"
    :on-exceeded-size="handleMaxSize"
    :before-upload="handleBeforeUpload"
    multiple
    type="drag"
    action="/api/upload/uploadFile"
    style="display: inline-block;width:58px;">
    <div style="width: 58px;height:58px;line-height: 58px;">
      <Icon type="ios-camera" size="20"></Icon>
    </div>
  </Upload>
  <Modal title="View Image" v-model="visible">
    <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
  </Modal>
  </div>

</template>
<script>
  export default {
    props:{
      maxUpload:Number
    },
    data () {

      return {

        imgName: '',
        visible: false,
        uploadList: []
      }
    },
    methods: {

      setInit(icon)
      {
        this.uploadList.push(icon)

      },
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove (index) {
          this.uploadList.splice(index,1);

      },
      handleSuccess (res, file) {
        if (res.errno==0) {
          let url = res.data;// Get url from response
          file.url=url;
          this.uploadList.push(file);
          this.$emit('getImageUrl',url);

        }
        else
        {
          this.$Message.error('上传失败');

        }
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: 'Up to five pictures can be uploaded.'
          });
        }
        return check;
      }
    },
    mounted () {



    }
  }
</script>
<style>
  .sys-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .sys-upload-list img{
    width: 100%;
    height: 100%;
  }
  .sys-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .sys-upload-list:hover .sys-upload-list-cover{
    display: block;
  }
  .sys-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
