<template>
  <div class="icon-body">
    <el-input v-model="name" style="position: relative;" clearable placeholder="请输入图标名称" @clear="filterIcons" @input.native="filterIcons">
      <i slot="suffix" class="el-icon-search el-input__icon" />
    </el-input>
    <el-tabs type="border-card">
      <el-tab-pane label="svg-icons">
        <div class="icon-list">
          <div v-for="(item, index) in iconList" :key="index" class="svgList" @click="selectedIcon(item)">
            <svg-icon :icon-class="item" style="height: 30px;width: 16px;" />
            <span>{{ item }}</span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div class="icon-list">
          <div v-for="(item, index) in elementIconList" :key="index" class="elementList" @click="selectedElementIcon(item)">
            <i :class="'el-icon-' + item" />
            <span>{{ item }}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import icons from '../../views/icons/svg-icons'
import elementIcons from '../../views/icons/element-icons'
export default {
  name: 'IconSelect',
  data() {
    return {
      name: '',
      iconList: icons,
      elementIconList: elementIcons
    }
  },
  methods: {
    filterIcons() {
      this.iconList = icons
      this.elementIconList = elementIcons
      if (this.name) {
        this.iconList = this.iconList.filter(item => item.includes(this.name))
        this.elementIconList = this.elementIconList.filter(item => item.includes(this.name))
      }
    },
    selectedIcon(name) {
      this.$emit('selected', name)
      document.body.click()
    },
    selectedElementIcon(name) {
      this.$emit('selected', 'el-icon-' + name)
      document.body.click()
    },
    reset() {
      this.name = ''
      this.iconList = icons
      this.elementIconList = elementIcons
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icon-body {
  width: 100%;
  padding: 10px;
  .icon-list {
    height: 200px;
    overflow-y: scroll;
    div {
      height: 30px;
      margin-bottom: -5px;
      cursor: pointer;
      width: 33%;
      float: left;
      line-height: 30px;
    }
    .elementList {
      i {
        font-size: 16px;
        line-height: 16px;
      }
      span {
        font-size: 16px;
        line-height: 16px;
        width: 100px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    span {
      display: inline-block;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
      text-overflow: clip;
    }
  }
}
</style>
