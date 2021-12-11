<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <github-corner class="github-corner" />
      <div class="dashboard-text">
        name: {{ username }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GithubCorner from '@/components/GithubCorner'

export default {
  name: 'Dashboard',
  components: {
    GithubCorner
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-container{
    .dashboard-editor-container {
      padding: 32px;
      position: relative;

      .github-corner {
        position: absolute;
        top: 0;
        border: 0;
        right: 0;
      }
    }
  }
</style>
