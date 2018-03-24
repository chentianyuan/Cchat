<template>
    <div class="alerting" v-show="isAlert">
        <section>
             <div>
                <h3>Warning</h3>
                <p>{{alertInfo}}</p>
             </div>
             <a href="javascript:" @click="SETALERT(false)">Cancel</a>
        </section>    
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
    computed:{
        ...mapState([
            "isAlert",
            "alertInfo"
        ])
    },
    methods:{
        ...mapMutations([
			'SETALERT'
        ]),
    }
}
</script>

<style lang="scss" scoped>
 .alerting{
        z-index:10;
        transition:1s all;
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.3);   
        z-index:9;
        section{
            transition:1s all;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 280px;
            height: 120px;
            background: #fff;
            text-align: center;
            box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.6);    
            user-select: none;
            overflow: hidden;
            border-radius: 12px;
            div{
                color:#111;
                h3{
                    padding:5px 0;
                }
                p{
                    padding:15px 0;
                    font-size:1rem;
                }
            }
           a{
                display: block;
                line-height: 35px;
                color: #228BFE;
                font-size: 16px;
                font-weight: bold;
                border-top: #B5B5B5 solid 1px;
                &:hover{
                    background:#f8f8f8;
                }
           }
        }
    }
</style>
