<template>
  <div class="mine">
      <section class="mineInfo">
        <!-- <input type="file" multiple accept="image/*" data-type="png" @change="changePic($event)"/> -->
      </section>
      <ul>
        <li v-for="(item,key) in muen" @click="logout(key)" :key="key">{{item.til}}</li>
      </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    data(){
      return{
        muen:[{til:'个人信息'},{'til':'聊天记录'},{'til':'退出'}],

      }
    },
    computed:{
      ...mapGetters([
        'getActive',
        'getUserInfo'
      ])
    },
    created(){
      if(this.getActive != 2)
      this.$store.commit('ACTIVE_TOGGLE')

      console.log(this.getUserInfo)
    },
    methods:{
      logout(key){
        switch(key){
          case 2:
              this.$router.push({path:'/'})
              break
        }
      },
      changePic(e){
        // 以后还可上传其他格式文件
        var value = e.target.dataset.type
        var name = e.target.value
        var fileName = name.substring(name.lastIndexOf(".")+1)
        var file = e.target.files[0]
        if(fileName === value){
          var config = {
            //文件上传使用multipart/form-data格式上传，设置ajax参数
            headers: { 'Content-Type': 'multipart/form-data' }
          }
          var file = event.target.files[0]
          var formData = new FormData(); //formData属性
          console.log(file)
          // formData.append('test',66666666666)          
          formData.append('resource',file)
          console.log(formData)
          // 
          this.$axios.post('/api/upload',formData,config).then(res=>{
            console.log(res.data)
          })
        }
      }
    }
}
</script>

<style lang="scss" scoped>
    .mineInfo{
      position: relative;
      width:100%;
      background:url(../../../static/img/img.jpg) center center no-repeat;
      height:14rem;
      box-shadow: 0 0 40px 5px #999999 inset;
      z-index: 1;   
      input{
        display: inline-block;
      }   
    }
    ul li{
        padding:8px 2px;
        font-size:1rem;
        border-bottom:1px solid #f8f8f8;
        &:last-child{
          background: #eb4545;
          text-align: center;
          margin:20px;
          border-radius:4px;
          color:#fff;
        }
    } 
</style>
