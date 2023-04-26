<template>
  <div>
    <wxx-table-edit ref="tableEdit" :query-action="userListTest">
      <!--<template v-slot:query="scope">-->
      <!--<el-form-item label="用户名：">-->
      <!--  &lt;!&ndash;<el-input v-model="scope.params.blurry" placeholder="请输入用户名" clearable />&ndash;&gt;-->
      <!--</el-form-item>-->
      <!--<el-form-item label="性别：">-->
      <!--  <el-select v-model="scope.params.gender" placeholder="请选择用户的性别" clearable>-->
      <!--    <el-option :key="0" label="女" :value="0" />-->
      <!--    <el-option :key="1" label="男" :value="1" />-->
      <!--  </el-select>-->
      <!--</el-form-item>-->
      <!--</template>-->
      <template v-slot:data>
        <el-table-column prop="username" label="姓名" align="center"/>
        <el-table-column prop="email" label="邮箱" align="center" />
        <el-table-column prop="gender" label="性别" align="center" />
        <el-table-column prop="tel" label="电话" align="center" />
        <el-table-column prop="status" label="状态" align="center" />
      </template>
    </wxx-table-edit>
  </div>
</template>

<script>
import WxxTableEdit from '@/components/wxx-ui/wxx-table-edit'
import { userListTest } from '@/api/sys/SysUser'

export default {
  name: 'Test',
  components: {
    WxxTableEdit
  },
  methods: {
    userListTest
  }
}
</script>
