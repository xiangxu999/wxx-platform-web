<template>
  <div class="list">
    <el-form v-loading="listLoading" :inline="true" size="mini">
      <el-form-item>
        <el-input v-model="searchForm.name" prefix-icon="el-icon-search" placeholder="请输入要查询的角色名称" clearable />
      </el-form-item>

      <el-form-item>
        <el-button icon="el-icon-search" type="success" @click="getRoleList">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button v-permission="['admin']" icon="el-icon-plus" type="primary" @click="dialogVisible = true">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="确定批量删除吗？" @confirm="delHandle(null)">
          <el-button slot="reference" v-permission="['admin']" icon="el-icon-delete" type="danger" :disabled="delBtlStatu">批量删除</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>

    <el-table
      ref="multipleTable"
      size="mini"
      :data="tableData"
      tooltip-effect="dark"
      stripe
      @selection-change="handleSelectionChange"
    >

      <el-table-column type="selection" align="center" />

      <el-table-column prop="name" label="名称" />

      <el-table-column prop="code" label="唯一编码" show-overflow-tooltip align="center" />

      <el-table-column prop="remark" label="描述" show-overflow-tooltip />

      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" size="mini" type="success">正常</el-tag>
          <el-tag v-else-if="scope.row.status === 0" size="mini" type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column v-if="checkPermission(['admin'])" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="permHandle(scope.row.roleId)">分配权限</el-button>
          <el-divider direction="vertical" />

          <el-button size="mini" type="text" @click="editHandle(scope.row.roleId)">编辑</el-button>
          <el-divider direction="vertical" />

          <template>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.roleId)">
              <el-button slot="reference" v-permission="['admin']" size="mini" type="text">删除</el-button>
            </el-popconfirm>
          </template>

        </template>
      </el-table-column>

    </el-table>

    <pagination :total="total" :page.sync="current" :limit.sync="size" @pagination="getRoleList" />

    <!--新增对话框-->
    <el-dialog
      title="角色设置"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >

      <el-form
        ref="editForm"
        size="mini"
        :model="editForm"
        :rules="editFormRules"
        label-width="100px"
        class="demo-editForm"
      >

        <el-form-item label="角色名称" prop="name" label-width="100px">
          <el-input v-model="editForm.name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="唯一编码" prop="code" label-width="100px">
          <el-input v-model="editForm.code" autocomplete="off" />
        </el-form-item>

        <el-form-item label="描述" prop="remark" label-width="100px">
          <el-input v-model="editForm.remark" autocomplete="off" />
        </el-form-item>

        <el-form-item label="状态" prop="status" label-width="100px">
          <el-switch
            v-model="editForm.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="resetForm('editForm')">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>

    </el-dialog>

    <el-dialog title="分配权限" :visible.sync="permDialogVisible">

      <el-form :model="permForm">
        <el-tree
          ref="permTree"
          :data="permTreeData"
          show-checkbox
          :default-expand-all="true"
          node-key="menuId"
          :check-strictly="true"
          :props="defaultProps"
        />
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="permDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitPermFormHandle('permForm')">确 定</el-button>
      </span>

    </el-dialog>

  </div>
</template>

<script>
import { roleList, perm, permSubmit, roleDelete, roleInfo, roleSave, roleUpdate } from '@/api/sys/SysRole'
import { menuList } from '@/api/sys/SysMenu'
import Pagination from '@/components/Pagination'
import checkPermission from '@/utils/permission'

export default {
  name: 'Role',
  components: {
    Pagination
  },
  data() {
    return {
      listLoading: true,
      searchForm: {},
      delBtlStatu: true,

      total: 0,
      size: 10,
      current: 1,

      dialogVisible: false,
      editForm: {},

      tableData: [],

      editFormRules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入唯一编码', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      },

      multipleSelection: [],

      permDialogVisible: false,
      permForm: {},
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      permTreeData: []
    }
  },
  created() {
    this.getRoleList()

    menuList().then(res => {
      this.permTreeData = res.data
    })
  },
  methods: {
    checkPermission,
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      console.log('勾选')
      console.log(val)
      this.multipleSelection = val

      this.delBtlStatu = val.length === 0
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
      this.editForm = {}
    },
    handleClose() {
      this.resetForm('editForm')
    },
    getRoleList() {
      this.listLoading = true
      roleList(this.searchForm.name, this.current, this.size).then(res => {
        this.tableData = res.data.records
        this.size = res.data.size
        this.current = res.data.current
        this.total = res.data.total
        this.listLoading = false
      })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.editForm.roleId) {
            roleUpdate(this.editForm).then(res => {
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              })
              this.getRoleList()
              this.dialogVisible = false
              this.resetForm('editForm')
            })
          } else {
            roleSave(this.editForm).then(res => {
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              })
              this.getRoleList()
              this.dialogVisible = false
              this.resetForm('editForm')
            })
          }
        } else {
          return false
        }
      })
    },
    editHandle(id) {
      roleInfo(id).then(res => {
        this.editForm = res.data

        this.dialogVisible = true
      })
    },
    delHandle(id) {
      var ids = []

      if (id) {
        ids.push(id)
      } else {
        this.multipleSelection.forEach(row => {
          ids.push(row.roleId)
        })
      }

      console.log(ids)

      roleDelete(ids).then(res => {
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success'
        })
        this.getRoleList()
      })
    },
    permHandle(id) {
      this.permDialogVisible = true

      perm(id).then(res => {
        this.$refs.permTree.setCheckedKeys(res.data.menuIds)
        this.permForm = res.data
        console.log(this.permForm)
      })
    },

    submitPermFormHandle(formName) {
      var menuIds = this.$refs.permTree.getCheckedKeys()

      console.log(menuIds)
      permSubmit(this.permForm.roleId, menuIds).then(res => {
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success'
        })
        this.getRoleList()
        this.permDialogVisible = false
        this.resetForm(formName)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.list{
  padding: 20px;
}
</style>
