<template>
  <div>
    <common-header type="course"></common-header>
    <div class="con_main">
      <navigator module="course" menu="categorylist"></navigator>
      <section class="con_main_r">
        <nav>
          <img src="../../../assets/img/house.png" class="vm">
          <span class="vm">您的当前位置 : <span class="">课程管理</span> > <span class="">课程类别管理</span> > <span class="f_blue">编辑课程类别</span></span>
        </nav>
        <div class="con_tab">
          <div class="el-form-item el-form--label-left mt20">
            <label class="el-form-item__label" style="width: 100px;">课程图片</label>
            <img :src="image" class="course_header" />
            <a class="el-button--text cur ml20" v-on:click="toggleShow">上传</a>
            <a class="el-button--text cur ml20" v-on:click="setDefault">使用默认</a>
            <my-upload @input="closeMyUpload" field="file"
              @crop-success="cropSuccess"
              :params="logoFormData"
              @crop-upload-success="cropUploadSuccess"
              @crop-upload-fail="cropUploadFail"
              :url="uploadUrl"
              :no-rotate=false
              :width="80"
              :headers="headers"
              :height="80"
              :value.sync="show"
              :no-circle=true
              img-format="png">
            </my-upload>
          </div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  class="course_left demo-ruleForm">
            <el-form-item label="课程类别" prop="category_name">
              <el-input v-model="ruleForm.category_name" style="width: 50%;"></el-input>
            </el-form-item>
            <div class="" style="margin-left: 100px;margin-top: 40px;">
              <button type="button" class="inf_btn " v-on:click="submitForm('ruleForm')">保  存</button>
            </div>
          </el-form>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import commonHeader from '../../../components/CommonHeader'
  import navigator from '../../../components/Navigator'
  import myUpload from 'vue-image-crop-upload'
  import api from '../../../services/api'
  import axios from 'axios'
  import router from '../../../router'
  import lang from 'vue-image-crop-upload/utils/language'
  export default {
    data: function () {
      return {
        ruleForm: {},
        labelPosition: 'left',
        rules: {
          category_name: [
            { required: true, message: '请输入课程分类名称', trigger: 'blur' }
          ]
        },
        id: '',

        show: false,

        headers: api.getUploadHeaders(),

        // 显示的图像， 有可能是url ， 也可能是剪裁后的 base64
        image: '',

        // 上传API
        // uploadUrl: api.uri.uploadCategoryImage

        uploadUrl: '',
        logoFormData: {
          key: '',
          policy: '',
          OSSAccessKeyId: '',
          signature: '',
          expire: 0,
          success_action_status: '200'
        }
      }
    },
    components: {
      commonHeader,
      navigator,
      myUpload
    },
    created () {
      lang.zh.preview = '课程分类图片'
      this.id = parseInt(this.$route.query.id)
      api.fetch(api.uri.getCategoryByID, {cateid: this.id}).then(data => {
        if (data.status === 1) {
          this.ruleForm = data.result
          this.image = axios.defaults.imageServer + data.result.icon
          api.fetch(api.uri.ossInfo, {businessType: 'course-category-icon'}).then(data => {
            if (data.status === 1) {
              this.logoFormData.OSSAccessKeyId = data.result.accessid
              this.logoFormData.key = data.result.dir
              this.logoFormData.policy = data.result.policy
              this.logoFormData.signature = data.result.signature
              this.logoFormData.expire = data.result.expire
              this.uploadUrl = data.result.host
            }
          })
        }
      }).catch(error => {
        alert(error.message)
      })
    },
    methods: {
      closeMyUpload: function (value) {
        this.show = value
      },
      setDefault () {
        this.image = axios.defaults.imageServer + api.image.category
        this.ruleForm.iconPath = api.image.category
      },
      cropSuccess (data, field) {
        this.image = data
        this.logoFormData.key = this.logoFormData.key + api.guid() + '.png'
      },
      cropUploadSuccess (jsonData, field) {
        // if (jsonData.status === 1) {
        //   this.ruleForm.iconPath = jsonData.result
        // }
        this.ruleForm.iconPath = this.uploadUrl + '/' + this.logoFormData.key
      },
      cropUploadFail (status, field) {
        console.log(status)
      },
      toggleShow: function () {
        this.show = !this.show
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var obj = {
              catename: this.ruleForm.category_name,
              cateid: this.id,
              iconPath: this.ruleForm.iconPath
            }
            if (!obj.iconPath) {
              obj.iconPath = api.image.category
            }
            api.fetch(api.uri.editCategory, obj).then(data => {
              if (data.status === 1) {
                router.push({name: 'courseCategoryList'})
              }
            }).catch(error => {
              alert(error.message)
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped="scope">
  .approve_tab {
    width: 100%;
    text-align: left;
    margin-top: 30px;
    border-right: 1px solid #dcdcdc;
    border-bottom: 1px solid #dcdcdc;
  }

  .approve_tab tr td {
    border-left: 1px solid #dcdcdc;
    border-top: 1px solid #dcdcdc;
    padding: 20px;
  }

  .approve_tab tr {
    text-align: center;
  }

  .approve_tab tr th {
    border-left: 1px solid #dcdcdc;
    border-top: 1px solid #dcdcdc;
    background: #f1efee;
    padding: 20px;
  }

  .approve_sfz .s_sfz img {
    width: 270px;
    height: 170px;
    max-width: 270px;
    max-height: 170px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    padding: 5px;
    margin-top: 10px;
  }

  .yj_p {
    margin-left: 70px;
  }

  .el-button--small {
    font-size: 14px;
    color: #00b553;
  }

  .el-input__inner{
    width:50%;
    min-width: 200px;
    max-width:500px;
  }
  .el-input__inner:focus{
    border-color: #00b553;
  }

</style>
<style>
  .course_left  .el-form-item__label{
    text-align: left;
    margin-left: -5px;
  }
</style>
