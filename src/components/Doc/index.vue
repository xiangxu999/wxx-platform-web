<template>
  <div>
    <svg-icon icon-class="doc" @click="click" />
  </div>
</template>

<script>
export default {
  name: 'Doc',
  methods: {
    click() {
      window.open('http://202.202.43.5:91/#/guide/xdialog-edit', '_blank')
    }
  }
}
</script>
