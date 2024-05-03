<script setup lang="ts">
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<template>
  <el-button style="margin-bottom: 20px">➕新增部门</el-button>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column align="center" prop="id" label="序号" width="60" />
    <el-table-column align="center" prop="name" label="部门名称" width="180" />
    <el-table-column align="center" prop="updatetime" label="最后操作时间" />
    <el-table-column align="center" fixed="right" label="操作" width="120">
      <template #default>
        <el-button link type="primary" size="small">
          编辑
        </el-button>
        <el-button link type="primary" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">

</style>