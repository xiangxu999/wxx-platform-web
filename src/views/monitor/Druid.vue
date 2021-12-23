<!--druid数据源-->
<template>
  <Iframe :src="druidApi" />
</template>

<script>
import Iframe from '@/components/Iframe'
import { mapGetters } from 'vuex'
export default {
  name: 'Druid',
  components: { Iframe },
  computed: {
    ...mapGetters([
      'druidApi'
    ])
  }
}
</script>
