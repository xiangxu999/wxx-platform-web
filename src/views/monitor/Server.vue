<template>
  <div v-loading="loading" class="app-container" element-loading-text="数据加载中..." :style="loading ? 'height: 500px' : 'height: 100%'">
    <div v-if="!loading">
      <el-card class="box-card">
        <div style="color: #666;font-size: 13px;">
          <svg-icon icon-class="server" style="margin-right: 5px" />
          <span>
            系统：{{ server.sys.osName }}
          </span>
          <span>
            IP：{{ server.sys.computerIp }}
          </span>
          <span>
            项目已不间断运行：{{ server.jvm.runTime }}
          </span>
          <i class="el-icon-refresh" style="margin-left: 40px" @click="initServer" />
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold;color: #666;font-size: 15px">状态</span>
        </div>
        <div>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" style="margin-bottom: 10px">
            <div class="title">CPU使用率</div>
            <el-tooltip placement="top-end">
              <div slot="content" style="font-size: 12px;">
                <div style="padding: 3px;">
                  {{ server.cpu.cpuName }}
                </div>
                <div style="padding: 3px">
                  {{ server.cpu.cpuPackage }}个物理CPU
                </div>
                <div style="padding: 3px">
                  {{ server.cpu.cpuPhysicalNum }}个物理核心
                </div>
                <div style="padding: 3px">
                  {{ server.cpu.cpuLogicalNum }}个逻辑CPU
                </div>
              </div>
              <div class="content">
                <el-progress type="dashboard" :percentage="server.cpu.totalRate" />
              </div>
            </el-tooltip>
            <div class="footer">{{ server.cpu.cpuPhysicalNum }} 核心</div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" style="margin-bottom: 10px">
            <div class="title">内存使用率</div>
            <el-tooltip placement="top-end">
              <div slot="content" style="font-size: 12px;">
                <div style="padding: 3px;">
                  总量：{{ server.mem.total }}GiB
                </div>
                <div style="padding: 3px">
                  已使用：{{ server.mem.used }}GiB
                </div>
                <div style="padding: 3px">
                  空闲：{{ server.mem.free }}GiB
                </div>
              </div>
              <div class="content">
                <el-progress type="dashboard" :percentage="server.mem.usage" />
              </div>
            </el-tooltip>
            <div class="footer">{{ server.mem.used }} GiB / {{ server.mem.total }} GiB</div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" style="margin-bottom: 10px">
            <div class="title">JVM使用率</div>
            <el-tooltip placement="top-end">
              <div slot="content" style="font-size: 12px;">
                <div style="padding: 3px;">
                  总量：{{ server.jvm.total }}M
                </div>
                <div style="padding: 3px">
                  已使用：{{ server.jvm.used }}M
                </div>
                <div style="padding: 3px">
                  空闲：{{ server.jvm.free }}M
                </div>
              </div>
              <div class="content">
                <el-progress type="dashboard" :percentage="server.jvm.usage" />
              </div>
            </el-tooltip>
            <div class="footer">{{ server.jvm.used }} M / {{ server.jvm.total }} M</div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" style="margin-bottom: 10px">
            <div class="title">磁盘使用率</div>
            <div class="content">
              <el-tooltip placement="top-end">
                <div slot="content" style="font-size: 12px;">
                  <div style="padding: 3px">
                    总量：{{ sysFilesTotal.total.toFixed(2) }}GB
                  </div>
                  <div style="padding: 3px">
                    已使用：{{ sysFilesTotal.used.toFixed(2) }}GB
                  </div>
                  <div style="padding: 3px">
                    空闲：{{ sysFilesTotal.free.toFixed(2) }}GB
                  </div>
                </div>
                <div class="content">
                  <el-progress type="dashboard" :percentage="sysFilesTotal.usage" />
                </div>
              </el-tooltip>
            </div>
            <div class="footer">{{ sysFilesTotal.used.toFixed(2) }} GB / {{ sysFilesTotal.total.toFixed(2) }} GB</div>
          </el-col>
        </div>
      </el-card>
      <div>
        <el-row :gutter="6">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-card class="box-card">
              <div slot="header"><span style="font-weight: bold;color: #666;font-size: 15px">CPU信息</span></div>
              <div class="el-table el-table--enable-row-hover el-table--medium">
                <table cellspacing="0" style="width: 100%;">
                  <thead>
                    <tr>
                      <th class="el-table__cell is-leaf"><div class="cell">属性</div></th>
                      <th class="el-table__cell is-leaf"><div class="cell">值</div></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="el-table__cell is-leaf"><div class="cell">核心数</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.cpu" class="cell">{{ server.cpu.cpuPhysicalNum }}</div></td>
                    </tr>
                    <tr>
                      <td class="el-table__cell is-leaf"><div class="cell">用户使用率</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.cpu" class="cell">{{ server.cpu.usedRate }}%</div></td>
                    </tr>
                    <tr>
                      <td class="el-table__cell is-leaf"><div class="cell">系统使用率</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.cpu" class="cell">{{ server.cpu.sysRate }}%</div></td>
                    </tr>
                    <tr>
                      <td class="el-table__cell is-leaf"><div class="cell">当前空闲率</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.cpu" class="cell">{{ server.cpu.free }}%</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-card class="box-card">
              <div slot="header"><span style="font-weight: bold;color: #666;font-size: 15px">内存信息</span></div>
              <div class="el-table el-table--enable-row-hover el-table--medium">
                <table cellspacing="0" style="width: 100%;">
                  <thead>
                    <tr>
                      <th class="el-table__cell is-leaf"><div class="cell">属性</div></th>
                      <th class="el-table__cell is-leaf"><div class="cell">内存</div></th>
                      <th class="el-table__cell is-leaf"><div class="cell">JVM</div></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="el-table__cell is-leaf"><div class="cell">总内存</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.mem" class="cell">{{ server.mem.total }}G</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.jvm" class="cell">{{ server.jvm.total }}M</div></td>
                    </tr>
                    <tr>
                      <td class="el-table__cell is-leaf"><div class="cell">已用内存</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.mem" class="cell">{{ server.mem.used }}G</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.jvm" class="cell">{{ server.jvm.used }}M</div></td>
                    </tr>
                    <tr>
                      <td class="el-table__cell is-leaf"><div class="cell">剩余内存</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.mem" class="cell">{{ server.mem.free }}G</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.jvm" class="cell">{{ server.jvm.free }}M</div></td>
                    </tr>
                    <tr>
                      <td class="el-table__cell is-leaf"><div class="cell">使用率</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.mem" class="cell" :class="{'text-danger': server.mem.usage > 85}">{{ server.mem.usage }}%</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.jvm" class="cell" :class="{'text-danger': server.jvm.usage > 85}">{{ server.jvm.usage }}%</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="6">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold;color: #666;font-size: 15px">服务器信息</span>
              </div>
              <div class="el-table el-table--enable-row-hover el-table--medium">
                <table cellspacing="0" style="width: 100%;">
                  <tbody>
                    <tr>
                      <td class="el-table__cell is-leaf"><div class="cell">服务器名称</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.sys" class="cell">{{ server.sys.computerName }}</div></td>
                      <td class="el-table__cell is-leaf"><div class="cell">操作系统</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.sys" class="cell">{{ server.sys.osName }}</div></td>
                    </tr>
                    <tr>
                      <td class="el-table__cell is-leaf"><div class="cell">服务器IP</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.sys" class="cell">{{ server.sys.computerIp }}</div></td>
                      <td class="el-table__cell is-leaf"><div class="cell">系统架构</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.sys" class="cell">{{ server.sys.osArch }}</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold;color: #666;font-size: 15px">Java虚拟机信息</span>
              </div>
              <div class="el-table el-table--enable-row-hover el-table--medium">
                <table cellspacing="0" style="width: 100%;">
                  <tbody>
                    <tr>
                      <td class="el-table__cell is-leaf"><div class="cell">Java名称</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.jvm" class="cell">{{ server.jvm.name }}</div></td>
                      <td class="el-table__cell is-leaf"><div class="cell">Java版本</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.jvm" class="cell">{{ server.jvm.version }}</div></td>
                    </tr>
                    <tr>
                      <td class="el-table__cell is-leaf"><div class="cell">启动时间</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.jvm" class="cell">{{ server.jvm.startTime }}</div></td>
                      <td class="el-table__cell is-leaf"><div class="cell">运行时长</div></td>
                      <td class="el-table__cell is-leaf"><div v-if="server.jvm" class="cell">{{ server.jvm.runTime }}</div></td>
                    </tr>
                    <tr>
                      <td colspan="1" class="el-table__cell is-leaf"><div class="cell">安装路径</div></td>
                      <td colspan="3" class="el-table__cell is-leaf"><div v-if="server.jvm" class="cell">{{ server.jvm.home }}</div></td>
                    </tr>
                    <tr>
                      <td colspan="1" class="el-table__cell is-leaf"><div class="cell">项目路径</div></td>
                      <td colspan="3" class="el-table__cell is-leaf"><div v-if="server.sys" class="cell">{{ server.sys.userDir }}</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold;color: #666;font-size: 15px">磁盘状态信息</span>
              </div>
              <div class="el-table el-table--enable-row-hover el-table--medium">
                <table cellspacing="0" style="width: 100%;">
                  <thead>
                    <tr>
                      <th class="el-table__cell el-table__cell is-leaf"><div class="cell">盘符路径</div></th>
                      <th class="el-table__cell is-leaf"><div class="cell">文件系统</div></th>
                      <th class="el-table__cell is-leaf"><div class="cell">盘符类型</div></th>
                      <th class="el-table__cell is-leaf"><div class="cell">总大小</div></th>
                      <th class="el-table__cell is-leaf"><div class="cell">可用大小</div></th>
                      <th class="el-table__cell is-leaf"><div class="cell">已用大小</div></th>
                      <th class="el-table__cell is-leaf"><div class="cell">已用百分比</div></th>
                    </tr>
                  </thead>
                  <tbody v-if="server.sysFiles">
                    <tr v-for="(sysFile, index) in server.sysFiles" :key="index">
                      <td class="el-table__cell is-leaf"><div class="cell">{{ sysFile.dirName }}</div></td>
                      <td class="el-table__cell is-leaf"><div class="cell">{{ sysFile.sysTypeName }}</div></td>
                      <td class="el-table__cell is-leaf"><div class="cell">{{ sysFile.typeName }}</div></td>
                      <td class="el-table__cell is-leaf"><div class="cell">{{ sysFile.total }}</div></td>
                      <td class="el-table__cell is-leaf"><div class="cell">{{ sysFile.free }}</div></td>
                      <td class="el-table__cell is-leaf"><div class="cell">{{ sysFile.used }}</div></td>
                      <td class="el-table__cell is-leaf"><div class="cell" :class="{'text-danger': sysFile.usage > 85}">{{ sysFile.usage }}%</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { serverInfo } from '@/api/monitor/Server'
export default {
  name: 'Server',
  data() {
    return {
      loading: true,
      monitor: null,
      server: {
        cpu: null,
        mem: null,
        jvm: null,
        sysFiles: null
      }
    }
  },
  computed: {
    sysFilesTotal: function() {
      const sysFilesTotal = {
        total: 0,
        used: 0,
        free: 0,
        usage: 0
      }
      this.server.sysFiles.forEach(sysFile => {
        sysFilesTotal.total += sysFile.total
        sysFilesTotal.used += sysFile.used
        sysFilesTotal.free += sysFile.free
      })
      sysFilesTotal.usage = parseFloat((sysFilesTotal.used / sysFilesTotal.total * 100).toFixed(2))
      return sysFilesTotal
    }
  },
  async created() {
    this.initServer()
    this.monitor = window.setInterval(() => {
      setTimeout(() => {
        this.initServer()
      }, 2)
    }, 3500)
  },
  destroyed() {
    clearInterval(this.monitor)
  },
  methods: {
    initServer() {
      serverInfo().then(res => {
        this.server = res.data
        if (this.loading === true) {
          this.loading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .box-card {
  margin-bottom: 10px;
  span {
    margin-right: 28px;
  }
  .el-icon-refresh {
    margin-right: 10px;
    float: right;
    cursor:pointer;
  }
}
.title {
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: #999;
  margin-bottom: 16px;
}
.footer {
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: #999;
  margin-top: -5px;
  margin-bottom: 10px;
}
.content {
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
}
.text-danger {
  color: red;
}
</style>
