<!-- 文字提示 -->
<template>
  <div
    class="tip"
    :style="{fontSize: fontSize + 'px', borderColor: borderColor, color: color, backgroundColor: backgroundColor, fontWeight: fontWeight ? 'bolder' : 'normal' }"
  >
    <slot name="preAppend" />
    <span :class="{link: link !== ''}" @click="openLink">{{ text }}</span>
    <slot name="append" />
  </div>
</template>

<script>
export default {
  name: 'TextTip',
  props: {
    /** 提示文本 */
    text: {
      type: String,
      default: ''
    },
    /** 字体大小 */
    fontSize: {
      type: Number,
      default: 18
    },
    /** 边框颜色 */
    borderColor: {
      type: String,
      default: '#50bfff'
    },
    /** 字体颜色 */
    color: {
      type: String,
      default: '#5e6d82'
    },
    /** 背景颜色 */
    backgroundColor: {
      type: String,
      default: '#f3f5f7'
    },
    /** 字体是否加粗 */
    fontWeight: {
      type: Boolean,
      default: true
    },
    /** 链接地址 */
    link: {
      type: String,
      default: ''
    },
    hoverColor: {
      type: String,
      default: '#50bfff'
    }
  },
  methods: {
    openLink() {
      if (this.link !== '') {
        window.open(this.link, '_blank')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tip {
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 8px 16px;
  border-left-width: 5px;
  border-left-style: solid;
  border-radius: 4px;
}
.link {
  &:hover {
    cursor: pointer;
    text-decoration:underline;
    color: #50bfff;
  }
}

</style>
