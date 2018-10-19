<template>
    <div >
        <vue-editor :id="id"
                    :style="styleInfo"
                    useCustomImageHandler
                    @imageAdded="handleImageAdded"
                    v-model="content">
        </vue-editor>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import { VueEditor } from 'vue2-editor'
    import axios from 'axios'

    export default {
        props:{
            htmlForEditor:{
                default:'',
                type:String,
            },
            id:{
                default:'editor',
                type:String,

            },
            styleInfo:{
                default:'height:600px',
                type:String,

            }
        },
        data() {
            return {
                content:'',
            }
        },
        created: function () {
            this.content=this.htmlForEditor;

        },
        computed: mapGetters({

        }),
        watch: {

        },
        methods: {


              handleImageAdded:function(file, Editor, cursorLocation, resetUploader) {
                var self=this;
                var formData = new FormData();
                formData.append('file', file);
                axios({
                  url: '/api/upload/uploadFile',
                  method: 'POST',
                  data: formData
                })
                  .then((res) => {
                    var  result=res.data
                    if (result.errno==0) {
                       let url = result.data;// Get url from response
                       Editor.insertEmbed(cursorLocation, 'image', url);
                    }
                    else
                    {
                        self.$message.error('上传失败');

                    }

                  })
                  .catch((err) => {
                    console.log(err);
                  })

              },


            getContent()
            {

                return this.content;
            },
            setContent(content)
            {

                this.content=content;
            }

        },
        filters: {

        },

        components: {
            VueEditor,

        }
    }

</script>

<style lang='less'>
</style>

