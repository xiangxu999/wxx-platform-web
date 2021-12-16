<template>
  <div class="app-container">
    <text-tip
      text="这是一段文字提示框"
      :font-size="fontSize"
      :border-color="borderColor"
      :color="color"
      :background-color="backgroundColor"
      :font-weight="fontWeight"
    />
    <el-form label-width="90px" :inline="true" size="mini">
      <el-form-item label="字体大小">
        <el-input-number v-model="fontSize" :min="10" :max="50" label="字体大小" type="String" />
      </el-form-item>
      <el-form-item label="边框颜色">
        <el-color-picker v-model="borderColor" />
      </el-form-item>
      <el-form-item label="字体颜色">
        <el-color-picker v-model="color" />
      </el-form-item>
      <el-form-item label="背景颜色">
        <el-color-picker v-model="backgroundColor" />
      </el-form-item>
      <el-form-item label="字体加粗">
        <el-switch v-model="fontWeight" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import TextTip from '@/components/TextTip'

export default {
  name: 'TextTipDemo',
  components: {
    TextTip
  },
  data() {
    return {
      fontSize: 18,
      borderColor: '#50bfff',
      color: '#5e6d82',
      backgroundColor: '#f3f5f7',
      fontWeight: true
    }
  },
  methods: {
    reset() {
      this.fontSize = 18
      this.borderColor = '#50bfff'
      this.color = '#5e6d82'
      this.backgroundColor = '#f3f5f7'
      this.fontWeight = true
      this.$notify({
        title: '成功',
        message: '样式重置成功',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>

</style>
