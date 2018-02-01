<template>
    <div class="header">
        {{headname}}
    </div>
</template>

<script>
export default {
   props:['headname']
}
</script>

<style lang="scss" scoped>
    .header{
        width:100%;
        height:50px;
        text-align:center;
        line-height:50px;
        background: #eeeeee;
        color:#000;
        font-size:1rem;
    }
</style>
