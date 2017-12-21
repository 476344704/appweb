<template>
<div class="myArticle">
    <div class="myArticleHeadImg">
            <router-link to="/">
        <div class="myArticGoBack"><img src="../assets/images/ic_bar_back_white.png" alt=""/></div>
            </router-link>
        <div class="myArticleIco"><img :src="tag.tagpagelogo" alt=""></div>
        <img :src="tag.tagpageimg">
    </div>
    <div class="myArticleName">
        {{ tag.tagpagename }}
    </div>
    <div class="myArticleTime">
            <!-- {{ tag.tagpagetime }} -->
            &nbsp;
    </div>
</div>  
</template>
<style scoped rel="stylesheet/less" lang="less">
  @import '../assets/css/app_tagpage.css';
</style>
<script>
export default {
  name: 'tagheader',
  props: ['tag']
}
</script>
