<template>
  <div class="app-container">
    <!--表格渲染-->
    <el-table ref="table" v-loading="loading" :data="data" style="width: 100%;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="请求方法">
              <span>{{ props.row.method }}</span>
            </el-form-item>
            <br>
            <el-form-item label="请求参数">
              <span>{{ props.row.params }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="requestIp" label="IP" />
      <el-table-column :show-overflow-tooltip="true" prop="address" label="IP来源" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="browser" label="浏览器" />
      <el-table-column prop="time" label="请求耗时" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.time <= 300">{{ scope.row.time }}ms</el-tag>
          <el-tag v-else-if="scope.row.time <= 1000" type="warning">{{ scope.row.time }}ms</el-tag>
          <el-tag v-else type="danger">{{ scope.row.time }}ms</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created" label="创建日期" width="180px" />
    </el-table>
    <pagination :total="total" :page.sync="current" :limit.sync="size" @pagination="getInfoLogList" />
  </div>
</template>

<script>
import { logList } from '@/api/sys/SysLog'
import Pagination from '@/components/Pagination'
export default {
  name: 'Info',
  components: {
    Pagination
  },
  data() {
    return {
      loading: true,
      data: [],
      total: 0,
      current: 1,
      size: 10
    }
  },
  created() {
    this.getInfoLogList()
  },
  methods: {
    getInfoLogList() {
      logList('INFO', this.current, this.size).then(res => {
        this.data = res.data.records
        this.size = res.data.size
        this.current = res.data.current
        this.total = res.data.total
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
