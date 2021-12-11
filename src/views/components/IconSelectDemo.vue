<template>
  <div class="demoContainer">
    <el-form ref="form" :inline="true" size="small" label-width="100px">
      <el-form-item label="菜单图标">
        <el-popover
          placement="bottom-start"
          width="450"
          trigger="click"
          @show="$refs['iconSelect'].reset()"
        >
          <icon-select ref="iconSelect" @selected="selected" />
          <el-input slot="reference" v-model="icon" style="width: 450px;" placeholder="点击选择图标" readonly>
            <item v-if="icon" slot="prefix" :icon="icon" class="el-input__icon" style="height: 32px;width: 16px;" />
            <i v-else slot="prefix" class="el-icon-search el-input__icon" />
          </el-input>
        </el-popover>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import IconSelect from '@/components/IconSelect'
import Item from '@/layout/components/Sidebar/Item'
export default {
  name: 'IconSelectDemo',
  components: { IconSelect, Item },
  data() {
    return {
      icon: ''
    }
  },
  methods: {
    // 选中图标
    selected(name) {
      this.icon = name
    }
  }
}
</script>

<style scoped lang="scss">
.demoContainer{
  padding: 20px
}
</style>
