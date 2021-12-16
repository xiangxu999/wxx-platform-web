<template>
  <div>
    <svg-icon icon-class="github-icon" @click="click" />
  </div>
</template>

<script>
export default {
  name: 'Github',
  methods: {
    click() {
      window.open('https://github.com/xiangxu999', '_blank')
    }
  }
}
</script>
