<template>
  <div class="mine">
      <section class="mineInfo" :style="{background:'url(' + getUserInfo.pic+ ') center center no-repeat'}">
      </section>
      <ul>
        <input type="file" name="avatar" accept="image/*" data-type="png,jpg,jpeg" @change="changePic($event)"/>        
        <li v-for="(item,key) in muen" @click="logout(key)" :key="key">{{item.til}}</li>
      </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters,mapMutations } from 'vuex'
export default {
    data(){
      return{
        muen:[{til:'修改头像'},{'til':'聊天记录'},{'til':'退出'}],
        
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
      this.getUserAvator()
    },
    methods:{
      ...mapMutations([
				'SETALERT',
				'SETALERTINFO'
			]),
      logout(key){
        switch(key){
          case 2:
              this.$router.push({path:'/'})
              break
        }
      },
      getUserAvator(){
        this.$axios.post('/api/getUserAvatar',{userName:this.getUserInfo.username}).then(res=>{
          // 若直接赋值保存之后转义字符\会丢失，在保存之前将其替换
          if(res.data.msg){
            this.getUserInfo.pic = res.data.msg.base.replace(/\\/g,"\/")
          }
        })
      },
      changePic(e){
        // 以后还可上传其他格式文件
        var value = e.target.dataset.type.split(',')
        var name = e.target.value
        var fileName = name.substring(name.lastIndexOf(".")+1).toLocaleLowerCase()
        var avatar = e.target.files[0]
        // 亦可用$refs去获取file文件
        if(value.indexOf(fileName) !== -1){
          var config = {
            //文件上传使用multipart/form-data格式上传，设置ajax参数
            headers: { 'Content-Type': 'multipart/form-data' }
          }
          var formData = new FormData(); //formData属性
          formData.append('user',this.getUserInfo.username)
          formData.append('file',avatar)
          this.$axios.post('/api/upload',formData,config).then(res=>{
            if(res.data.path){
              this.$store.commit('CHANGEAVATAR',res.data.path.replace(/\\/g,"\/"))
            }else{
              this.SETALERTINFO('修改头像失败')
              this.SETALERT(true)
            }
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
      background-position:center center;
      background-repeat:no-repeat;
      height:14rem;
      box-shadow: 0 0 40px 5px #999999 inset;
      z-index: 1;   
      input{
        display: inline-block;
      }   
    }
    ul{
      position: relative;
     li{
        padding:12px 2px;
        font-size:1rem;
        border-bottom:1px solid #f8f8f8;
        text-align:center;
        transition: 1s all;
        &:last-child{
          background: #eb4545;
          text-align: center;
          margin:20px;
          border-radius:4px;
          padding: 8px 2px;
          color:#fff;
        }
        &:hover{
          background: #eee;
        }
    } 
    input{
      display:block;
      position: absolute;
      left:0;
      top:0;
      min-width: 100%;
      padding: 12px 2px;
      opacity: 0;
      -ms-filter: 'alpha(opacity=0)';
    }
  }
</style>
