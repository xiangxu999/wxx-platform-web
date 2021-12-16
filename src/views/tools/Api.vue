<!--swagger文档-->
<template>
  <iframe :src="src" :style="'height:'+ height" style="width: 100%" />
</template>
<script>
export default {
  name: 'SysApi',
  data() {
    return {
      src: process.env.VUE_APP_BASE_API + '/swagger-ui/',
      height: document.documentElement.clientHeight + 'px;'
    }
  }
}
</script>
