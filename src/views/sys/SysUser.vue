<template>
  <div class="list">
    <el-form v-loading="listLoading" :inline="true" size="mini">
      <el-form-item>
        <el-input
          v-model="searchForm.blurry"
          prefix-icon="el-icon-search"
          placeholder="请输入查询的用户名"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.gender" placeholder="请选择用户的性别">
          <el-option
            key="0"
            label="女"
            value="0"
          />
          <el-option
            key="1"
            label="男"
            value="1"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="success" @click="getUserList">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button v-permission="['admin']" icon="el-icon-plus" type="primary" @click="dialogVisible = true">新增</el-button>
        <!--<el-button icon="el-icon-plus" type="primary" @click="dialogVisible = true">新增</el-button>-->
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="这是确定批量删除吗？" @confirm="delHandle(null)">
          <el-button slot="reference" v-permission="['admin']" icon="el-icon-delete" type="danger" :disabled="delBtlStatu">批量删除
          </el-button>
          <!--<el-button icon="el-icon-delete" type="danger" slot="reference" :disabled="delBtlStatu">批量删除</el-button>-->
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

      <el-table-column type="selection" />

      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <el-avatar size="small" :src="scope.row.avatar" />
        </template>
      </el-table-column>

      <el-table-column prop="username" label="用户名" align="center" />

      <el-table-column prop="code" label="角色名称" align="center" width="100px">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.roles" :key="item.roleId" size="mini" :index="item.roleId">{{ item.name }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="email" label="邮箱" align="center" />

      <el-table-column prop="tel" label="手机号" align="center" />

      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" size="mini" type="success">正常</el-tag>
          <el-tag v-else-if="scope.row.status === 0" size="mini" type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="created" label="创建时间" align="center" />

      <el-table-column v-if="checkPermission(['admin'])" label="操作" width="250px" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="roleHandle(scope.row.userId)">分配角色</el-button>
          <el-divider direction="vertical" />

          <el-button size="mini" type="text" @click="repassHandle(scope.row.userId, scope.row.username)">重置密码</el-button>
          <el-divider direction="vertical" />

          <el-button size="mini" type="text" @click="editHandle(scope.row.userId)">编辑</el-button>
          <el-divider direction="vertical" />

          <template>
            <el-popconfirm title="确定删除吗？" @confirm="delHandle(scope.row.userId)">
              <el-button slot="reference" v-permission="['admin']" size="mini" type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="current" :limit.sync="size" @pagination="getUserList" />

    <!--新增对话框-->
    <el-dialog
      title="用户设置"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >

      <el-form ref="editForm" :model="editForm" :rules="editFormRules" size="mini">
        <el-form-item label="用户名" prop="username" label-width="100px">
          <el-input v-model="editForm.username" autocomplete="off" />
          <el-alert
            title="初始密码为123456"
            :closable="false"
            type="info"
            style="line-height: 12px;"
          />
        </el-form-item>

        <el-form-item label="邮箱" prop="email" label-width="100px">
          <el-input v-model="editForm.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone" label-width="100px">
          <el-input v-model="editForm.tel" autocomplete="off" />
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

    <!-- 分配权限对话框 -->
    <el-dialog title="分配角色" :visible.sync="roleDialogFormVisible" width="600px">

      <el-form :model="roleForm" size="mini">
        <el-tree
          ref="roleTree"
          :data="roleTreeData"
          show-checkbox
          :check-strictly="checkStrictly"
          node-key="roleId"
          :props="defaultProps"
        />
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="roleDialogFormVisible=false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitRoleHandle('roleForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { userList, userInfo, userSave, userUpdate, userDelete, repass, roleHandle } from '@/api/sys/SysUser'
import { roleList } from '@/api/sys/SysRole'
import Pagination from '@/components/Pagination'
import checkPermission from '@/utils/permission'
export default {
  name: 'SysRole',
  components: { Pagination },
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
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      },

      multipleSelection: [],

      roleDialogFormVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleForm: {},
      roleTreeData: [],
      treeCheckedKeys: [],
      checkStrictly: true

    }
  },
  created() {
    this.getUserList()

    roleList().then(res => {
      this.roleTreeData = res.data.records
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
    getUserList() {
      this.listLoading = true
      userList(this.searchForm, this.current, this.size).then(res => {
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
          if (this.editForm.userId) {
            userUpdate(this.editForm).then(res => {
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              })
              this.getUserList()
              this.dialogVisible = false
              this.resetForm('editForm')
            })
          } else {
            userSave(this.editForm).then(res => {
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              })
              this.getUserList()
              this.dialogVisible = false
              this.resetForm('editForm')
            })
          }
        } else {
          return false
        }
      })
    },
    editHandle(userId) {
      userInfo(userId).then(res => {
        this.editForm = res.data

        this.dialogVisible = true
      })
    },
    delHandle(userId) {
      var ids = []
      if (userId) {
        ids.push(userId)
      } else {
        this.multipleSelection.forEach(row => {
          ids.push(row.userId)
        })
      }
      userDelete(ids).then(res => {
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success'
        })
        this.getUserList()
      })
    },
    roleHandle(userId) {
      this.roleDialogFormVisible = true

      userInfo(userId).then(res => {
        this.roleForm = res.data

        const roleIds = []
        res.data.roles.forEach(row => {
          roleIds.push(row.roleId)
        })
        this.$refs.roleTree.setCheckedKeys(roleIds)
      })
    },
    submitRoleHandle(formName) {
      const roleIds = this.$refs.roleTree.getCheckedKeys()

      console.log(roleIds)
      roleHandle(this.roleForm.userId, roleIds).then(res => {
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success'
        })
        this.getUserList()
        this.roleDialogFormVisible = false
      })
    },
    repassHandle(userId, username) {
      this.$confirm('将重置用户【' + username + '】的密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        repass(userId).then(res => {
          this.$message({
            showClose: true,
            message: '操作成功',
            type: 'success'
          })
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.list{
  padding: 20px
}
</style>
