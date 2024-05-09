<script setup lang="ts">
import {getEmpDeptAgg, getEmpGenderAgg, getEmpJobAgg} from "@/api/emp";


import { reactive } from 'vue';
import Echarts from '@/components/Echart/index.vue';


const empJobAgg = reactive<ChartData[]>([])
const empDeptAgg = reactive<ChartData[]>([])
const empGenderAgg = reactive<ChartData[]>([])


interface ChartData {
  value?: string,
  name?: string | number
}


const getJobChart = async () => {
  let res =  await getEmpJobAgg();
  if (res.code == 200) {
    res.data.forEach(eja => {
      let chartData: ChartData = {}
      chartData.value = eja.jobCount
      chartData.name = eja.job as number

      if (chartData.name === 1) {
        chartData.name = '班主任'
      } else if (chartData.name === 2) {
        chartData.name = '讲师'
      } else if (chartData.name === 3) {
        chartData.name = '学工主管'
      } else if (chartData.name === 4) {
        chartData.name = '教研主管'
      } else if (chartData.name === 5) {
        chartData.name = '咨询师'
      }

      empJobAgg.push(chartData)
    })
  } else {
    return Promise.reject(new Error(res.msg))
  }
}

const getDeptChart = async () => {
  let res =  await getEmpDeptAgg();
  if (res.code == 200) {
    res.data.forEach(eda => {
      let chartData: ChartData = {}
      chartData.value = eda.deptCount
      chartData.name = eda.deptName as string
      empDeptAgg.push(chartData)
    })
  } else {
    return Promise.reject(new Error(res.msg))
  }
}

const getGenderChart = async () => {
  let res =  await getEmpGenderAgg();
  if (res.code == 200) {
    res.data.forEach(ega => {
      let chartData: ChartData = {}
      chartData.value = ega.genderCount
      chartData.name = ega.gender as number

      if (chartData.name === 1) {
        chartData.name = '男'
      } else if (chartData.name === 2) {
        chartData.name = '女'
      }

      empGenderAgg.push(chartData)
      console.log(empGenderAgg)
    })
  } else {
    return Promise.reject(new Error(res.msg))
  }
}


const jobOption = reactive({
  color: ['#18F6F8', '#288CFC', '#FFD91A'],
  legend: {
    top: '10px',
    icon: 'circle',
    color: '#555',
    itemWidth: 10,
    itemHeight: 10
  },
  tooltip: {
    confine: true,
    trigger: 'item',
    formatter: '{b} : {c}'
  },
  series: [
    {
      avoidLabelOverlap: false,
      type: 'pie',
      roseType: 'area', // 玫瑰图
      center: ['50%', '50%'],
      radius: ['30%', '60%'],
      label: {
        formatter: '{b}\n-------------\n{d}%\t{c}',
        fontSize: 16
      },
      labelLine: {
        length: 10,
        length2: 30
      },
      data: empJobAgg
    }
  ]
});


const deptOption = reactive({
  color: ['#18F6F8', '#288CFC', '#FFD91A'],
  legend: {
    top: '10px',
    icon: 'circle',
    color: '#555',
    itemWidth: 10,
    itemHeight: 10
  },
  tooltip: {
    confine: true,
    trigger: 'item',
    formatter: '{b} : {c}'
  },
  series: [
    {
      avoidLabelOverlap: false,
      type: 'pie',
      roseType: 'area', // 玫瑰图
      center: ['50%', '50%'],
      radius: ['30%', '60%'],
      label: {
        formatter: '{b}\n-------------\n{d}%\t{c}',
        fontSize: 16
      },
      labelLine: {
        length: 10,
        length2: 30
      },
      data: empDeptAgg
    }
  ]
});

const genderOption = reactive({
  color: ['#18F6F8', '#288CFC', '#FFD91A'],
  legend: {
    top: '10px',
    icon: 'circle',
    color: '#555',
    itemWidth: 10,
    itemHeight: 10
  },
  tooltip: {
    confine: true,
    trigger: 'item',
    formatter: '{b} : {c}'
  },
  series: [
    {
      avoidLabelOverlap: false,
      type: 'pie',
      roseType: 'area', // 玫瑰图
      center: ['50%', '50%'],
      radius: ['30%', '60%'],
      label: {
        formatter: '{b}\n-------------\n{d}%\t{c}',
        fontSize: 16
      },
      labelLine: {
        length: 10,
        length2: 30
      },
      data: empGenderAgg
    }
  ]
});

getJobChart()
getDeptChart()
getGenderChart()

</script>

<template>
  <div :style="{ width: '568px', height: '360px' }">
    <h1>员工职位分布</h1>
    <Echarts :option="jobOption" />
  </div>
  <div :style="{ width: '568px', height: '360px' }">
    <h1>员工部门分布</h1>
    <Echarts :option="deptOption" />
  </div>
  <div :style="{ width: '568px', height: '360px' }">
    <h1>员工性别分布</h1>
    <Echarts :option="genderOption" />
  </div>
</template>

<style scoped lang="scss">

</style>