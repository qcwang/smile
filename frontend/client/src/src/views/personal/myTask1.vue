<template>
  <div id="app">
    <!--<header>-->
      <!--<div class="logo_c">-->
        <!--<a class="tl" href="##"><img src="../../assets/img/back.png" alt="返回" /></a>-->
        <!--<a class="tc" href="##"><img src="../../assets/img/logo.png" alt="smile" class="logo1" /></a>-->
        <!--<a class="tr" href="##"><img src="../../assets/img/home.png" alt="更多" /></a>-->
      <!--</div>-->
    <!--</header>-->
    <common-header></common-header>
    <section>
      <!--<el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="进行中" name="first">
          <ul class="list_border course_line" v-infinite-scroll="loadMore" infinite-scroll-disabled="isBusy_inProgress" infinite-scroll-distance="10">
            <li class="course_list  line_only" v-for="item in dataInProgress" :key="item.course_id">
              <a>
                <img :src="item.icon | formatImage" class="fl img_bg">
                <div class="course_cen">
                  <div class="hidden">
                    <h3 class="fl">{{item.title}}</h3>
                    <ul class="small_icon fr">
                      <li class="fl">
                        <span class="icon icon1"></span>
                        <span class="green00b">{{item.study_count}}</span>
                      </li>
                      <li class="fl">
                        <span class="icon icon2"></span>
                        <span class="redff7">{{item.collect_count}}</span>
                      </li>
                    </ul>
                  </div>
                  <p class="exam_explain">
                    {{item.intro}}
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="未开始" name="second">
          <ul class="list_border course_line" v-infinite-scroll="loadMore" infinite-scroll-disabled="isBusy_notStart" infinite-scroll-distance="10">
            <li class="course_list  line_only"  v-for="item in dataNotStart" :key="item.course_id">
              <a>
                <img :src="item.icon | formatImage" class="fl img_bg">
                <div class="course_cen">
                  <div class="hidden">
                    <h3 class="fl">{{item.title}}</h3>
                    <ul class="small_icon fr">
                      <li class="fl">
                        <span class="icon icon1"></span>
                        <span class="green00b">{{item.study_count}}</span>
                      </li>
                      <li class="fl">
                        <span class="icon icon2"></span>
                        <span class="redff7">{{item.collect_count}}</span>
                      </li>
                    </ul>
                  </div>
                  <p class="exam_explain">
                    {{item.intro}}
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>-->
      <ul class="list_border course_line" v-infinite-scroll="loadMore" infinite-scroll-disabled="isBusy_inProgress" infinite-scroll-distance="10">
        <li class="course_list  line_only" v-for="item in dataInProgress" :key="item.course_id">
          <router-link v-bind:to="{path: '/getCourseDetails', query: {id: item.course_id}}">
            <img :src="item.icon | formatImage" class="fl img_bg">
            <div class="course_cen show_star">
              <div class="hidden effect_right ">
                <h3 class="fl">{{item.title}}</h3>
                <el-rate class="star_time" v-model="item.star" disabled show-text text-color="#ff9900" text-template="{value}"></el-rate>
                <ul class="small_icon fr">
                  <li class="fl">
                    <span class="icon icon1"></span>
                    <span class="green00b">{{item.study_count}}</span>
                  </li>
                  <li class="fl">
                    <span class="icon icon2"></span>
                    <span class="redff7">{{item.collect_count}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <p class="exam_explain">
              {{item.intro}}
            </p>
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import api from '../../services/api'
import axios from 'axios'
import commonHeader from '../../components/CommonHeader'
export default {
  data: function () {
    return {
      activeName: 'first',
      dataInProgress: [],
      dataNotStart: [],
      isBusy_inProgress: false,
      isBusy_notStart: false,
      take: 20,
      currentPage_inProgress: -1,
      currentPage_notStart: -1
    }
  },
  components: {
    commonHeader
  },
  filters: {
    formatImage: function (uri) {
      return axios.defaults.imageServer + uri
    }
  },
  methods: {
    // handleClick: function (tab, event) {
    //   this.loadMore()
    // },
    handleStar: function (data) {
      for (var i = 0; i < data.length; i++) {
        var current = data[i]
        if (current && current.star) {
          current.star = current.star.toFixed(1)
        }
      }
    },
    loadMore: function () {
      this.busy = true
      this.currentPage_inProgress = this.currentPage_inProgress + 1
      api.fetch(api.uri.getMyTaskListInProgress, { take: this.take, skip: this.currentPage_inProgress * this.take }).then(data => {
        if (data.status === 1) {
          this.dataInProgress = this.dataInProgress.concat(data.result)
          this.handleStar(this.dataInProgress)
          if (data.result.length === this.take) {
            this.isBusy_inProgress = false
          }
        } else {
          // todo:
        }
      }).catch(error => {
        console.log(error.message)
      })

      // if (this.activeName === 'second' && this.dataNotStart.length === 0) {
      //   this.currentPage_notStart = this.currentPage_notStart + 1
      //   this.isBusy_notStart = true
      //   api.fetch(api.uri.getMyTaskListNotStart, {take: this.take, skip: this.currentPage_notStart * this.take}).then(data => {
      //     if (data.status === 1) {
      //       this.dataNotStart = this.dataNotStart.concat(data.result)
      //       if (data.result.length === this.take) {
      //         this.isBusy_notStart = false
      //       }
      //     } else {
      //       // todo:
      //     }
      //   }).catch(error => {
      //     console.log(error.message)
      //   })
      // }
    }
  }
}
</script>

<style scoped="scope">
  .el-tabs__active-bar{
    width: 0!important;
    transform: translateX(0rem)!important;
  }
  .el-tabs__item.is-active:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: .7rem;
    right: .7rem;
    height: 3px;
    background: #00b553;
    z-index: 2;
  }
  .el-tabs__item {
    padding: 0 .5rem;
    height: .7rem;
    box-sizing: border-box;
    line-height: .5rem;
    display: inline-block;
    list-style: none;
    font-size: .28rem;
    color: #666;
    position: relative;
    width:50%!important;
  }
  .el-tabs__item.is-active {
    color: #00b553;
  }
  .el-tabs__nav{
    width:100%;
    text-align: center;
    margin-top: -.3rem;
  }
  .el-tabs__header {
    border-bottom:0;
    margin: 0;
  }
  .el-tabs__nav .el-tabs__item:first-child{
    border-right:1px solid #ededed;
  }
</style>
