<template>
  <div class="list">
    <el-form v-loading="listLoading" :inline="true" size="mini">
      <el-form-item>
        <el-input v-model="searchForm.name" placeholder="请输入菜单名称" prefix-icon="el-icon-search" clearable />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="success" @click="getMenuTree">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <!--操作部分-->
        <el-button v-permission="['admin']" icon="el-icon-plus" type="primary" @click="dialogVisible = true">新增</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="tableData" size="small" row-key="menuId" stripe lazy :tree-props="{children: 'children'}">
      <el-table-column prop="title" label="菜单名" />

      <el-table-column prop="icon" label="图标" align="center">
        <template slot-scope="scope">
          <item :icon="scope.row.icon" style="height: 32px;width: 16px;" />
        </template>
      </el-table-column>

      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 0" size="mini">目录</el-tag>
          <el-tag v-else-if="scope.row.type === 1" size="mini" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.type === 2" size="mini" type="warning">按钮</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="菜单路由名" />

      <el-table-column prop="perms" label="权限编码" />

      <el-table-column prop="path" label="菜单URL" />

      <el-table-column prop="component" label="菜单组件" />

      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" size="mini" type="success">正常</el-tag>
          <el-tag v-else-if="scope.row.status === 0" size="mini" type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="sort" label="排序号" align="center" />

      <el-table-column v-if="checkPermission(['admin'])" label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="editHandle(scope.row.menuId)">编辑</el-button>
          <el-divider direction="vertical" />
          <template>
            <el-popconfirm title="确定删除吗？" @confirm="delHandle(scope.row.menuId)">
              <el-button slot="reference" size="mini" type="text" icon="el-icon-delete">删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!--新增对话框-->
    <el-dialog title="菜单管理" :visible.sync="dialogVisible" :before-close="handleClose" width="600px">

      <el-form ref="editForm" :inline="true" :model="editForm" :rules="editFormRules" class="demo-editForm" size="mini" label-width="100px">
        <el-form-item label="上级类目" prop="pid" label-width="100px">
          <treeselect
            v-model="editForm.pid"
            :options="menus"
            placeholder="选择上级类目"
            style="width: 450px;"
          />
        </el-form-item>

        <el-form-item label="菜单路由名" prop="name">
          <el-input v-model="editForm.name" autocomplete="off" style="width: 450px;" />
        </el-form-item>

        <el-form-item label="菜单名" prop="title">
          <el-input v-model="editForm.title" autocomplete="off" style="width: 450px;" />
        </el-form-item>

        <el-form-item label="菜单图标" prop="icon">
          <el-popover
            placement="bottom-start"
            width="450"
            trigger="click"
            @show="$refs['iconSelect'].reset()"
          >
            <icon-select ref="iconSelect" @selected="selected" />
            <el-input slot="reference" v-model="editForm.icon" style="width: 450px;" placeholder="点击选择图标" readonly>
              <item v-if="editForm.icon" slot="prefix" :icon="editForm.icon" class="el-input__icon" style="height: 32px;width: 16px;" />
              <i v-else slot="prefix" class="el-icon-search el-input__icon" />
            </el-input>
          </el-popover>
        </el-form-item>

        <el-form-item label="权限编码" prop="perms">
          <el-input v-model="editForm.perms" autocomplete="off" style="width: 450px;" />
        </el-form-item>

        <el-form-item label="菜单URL" prop="path">
          <el-input v-model="editForm.path" autocomplete="off" style="width: 450px;" />
        </el-form-item>

        <el-form-item label="菜单组件" prop="component">
          <el-input v-model="editForm.component" autocomplete="off" style="width: 450px;" />
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="editForm.type">
            <el-radio-button :label="0">目录</el-radio-button>
            <el-radio-button :label="1">菜单</el-radio-button>
            <el-radio-button :label="2">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="editForm.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>

        <el-form-item label="排序号" prop="sort">
          <el-input-number v-model="editForm.sort" :min="1" label="排序号" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="submitForm('editForm')">保 存</el-button>
        <el-button size="mini" @click="resetForm('editForm')">取 消</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>

import { menuList, menuDelete, menuInfo, menuSave, menuUpdate } from '@/api/sys/SysMenu'
import Item from '@/layout/components/Sidebar/Item'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import checkPermission from '@/utils/permission'
import IconSelect from '@/components/IconSelect'
export default {
  name: 'SysMenu',
  components: { Item, Treeselect, IconSelect },
  data() {
    return {
      menus: [{ id: 0, label: '顶级类目', children: [] }],
      listLoading: true,
      searchForm: {},
      dialogVisible: false,
      editForm: {
        icon: null
      },
      editFormRules: {
        parentId: [
          { required: true, message: '请选择上级菜单', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        perms: [
          { required: true, message: '请输入权限编码', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请填入排序号', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  created() {
    menuList(this.searchForm.name).then(res => {
      this.tableData = res.data
      res.data.forEach(item => {
        const treeMenuItem = this.toTreeMenuItem(item)
        this.menus[0].children.push(treeMenuItem)
      })
      this.listLoading = false
    })
  },
  methods: {
    checkPermission,
    getMenuTree() {
      this.listLoading = true
      menuList(this.searchForm.name).then(res => {
        this.tableData = res.data
        this.listLoading = false
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.editForm.menuId) {
            menuUpdate(this.editForm).then(res => {
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              })
              this.getMenuTree()
              this.dialogVisible = false
              this.resetForm('editForm')
            })
          } else {
            menuSave(this.editForm).then(res => {
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              })
              this.getMenuTree()
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
      menuInfo(id).then(res => {
        this.editForm = res.data

        this.dialogVisible = true
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
      this.editForm = {}
    },
    handleClose() {
      this.resetForm('editForm')
    },
    delHandle(id) {
      menuDelete(id).then(res => {
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success'
        })
        this.getMenuTree()
      })
    },
    toTreeMenuItem(menu) {
      if (menu.type !== 2 && menu.status === 1) {
        // 构建路由
        const treeMenuItem = {
          id: menu.menuId,
          label: menu.title,
          children: []
        }
        // 存在下级菜单和目录
        if (menu.children.length > 0) {
          for (let i = 0; i < menu.children.length; i++) {
            if (menu.children[i].type !== 2) {
              treeMenuItem.children.push(this.toTreeMenuItem(menu.children[i]))
            }
          }
        }
        return treeMenuItem
      } else {
        return null
      }
    },
    /**
     * 图标选择
     * @param name
     */
    selected(name) {
      this.editForm.icon = name
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px
}

</style>
