<template>
<header class="search-box" @click="goToRouter">
    <div class="placeholder">Search for a template</div>
    <input type="search"/>
</header>
</template>

<style>
/* .search{
    margin:0 auto;
    height: 80px;
    background-color: #FFFFFF;
} */
/* .searchinput{
    height: 30px;
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color:#f1f1f1;
    border: none;
    margin-top: 20px;
    margin-left:18px;  
} */
.search-box {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-radius: 5px;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  padding: 20px 10px 20px 10px;
  background: #FFFFFF;
  height: 30px;
}
.search-box .placeholder {
  position: fixed;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
          
  text-align: center;
  font-size: 14px;
  color: #9A9A9A;
  cursor: text;
  vertical-align: middle;
   height: 30px;
}
.search-box .placeholder::before {
  /* content: '\e601'; */
  font-family: iconfont;
  font-size: 18px;
}
.search-box input[type="search"] {
  -webkit-appearance: none;
  width: 100%;
  height: 30px;
  border: 0;
  /* border-radius: 15px; */
  /* color: #e4f7ee; */
  background: #f1f1f1;
  font-size: 14px;
  /* padding: 0 10px 0 10px; */
  /* text-align: center; */
  outline: 0;
  margin: 0 5px 0 5px;
}
.search-box input[type="search"]::-webkit-input-placeholder {
  color: #9A9A9A;
}
.search-box input[type="search"]::-moz-placeholder {
  color: #9A9A9A;
}
.search-box input[type="search"]:-ms-input-placeholder {
  color: #9A9A9A;
}
.search-box input[type="search"]::placeholder {
  color: #9A9A9A;
}
</style>
<script>
export default {
  props: {
  },
  methods: {
    goToRouter () {
      this.$router.push({
        path: 'search'
      })
    }
  }
}
</script>