<!--swagger文档-->
<template>
  <Iframe :src="swaggerApi" />
</template>

<script>
import Iframe from '@/components/Iframe'
import { mapGetters } from 'vuex'
export default {
  name: 'SysApi',
  components: { Iframe },
  computed: {
    ...mapGetters([
      'swaggerApi'
    ])
  }
}
</script>
