<!--druid数据源-->
<template>
  <iframe :src="src" :style="'height:'+ height" style="width: 100%" />
</template>

<script>
export default {
  name: 'Druid',
  data() {
    return {
      src: process.env.VUE_APP_BASE_API + '/druid',
      height: document.documentElement.clientHeight + 'px;'
    }
  }
}
</script>
