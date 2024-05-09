<script setup lang="ts">

import { reactive } from 'vue';
import Echarts from '@/components/Echart/index.vue';
import {getStuClazzAgg, getStuGenderAgg} from "@/api/stu";


const stuClazzAgg = reactive<ChartData[]>([])
const stuGenderAgg = reactive<ChartData[]>([])


interface ChartData {
  value?: string,
  name?: string | number
}


const getClazzChart = async () => {
  let res =  await getStuClazzAgg();
  if (res.code == 200) {
    res.data.forEach(sca => {
      let chartData: ChartData = {}
      chartData.value = sca.clazzCount
      chartData.name = sca.clazzName as string

      stuClazzAgg.push(chartData)
    })
  } else {
    return Promise.reject(new Error(res.msg))
  }
}

const getGenderChart = async () => {
  let res =  await getStuGenderAgg();
  if (res.code == 200) {
    res.data.forEach(sga => {
      let chartData: ChartData = {}
      chartData.value = sga.genderCount
      chartData.name = sga.gender as number

      if (chartData.name === 1) {
        chartData.name = '男'
      } else if (chartData.name === 2) {
        chartData.name = '女'
      }

      stuGenderAgg.push(chartData)
      console.log(stuGenderAgg)
    })
  } else {
    return Promise.reject(new Error(res.msg))
  }
}


const clazzOption = reactive({
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
      data: stuClazzAgg
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
      data: stuGenderAgg
    }
  ]
});

getClazzChart()
getGenderChart()

</script>

<template>
  <div :style="{ width: '568px', height: '360px' }">
    <h1>学生班级分布</h1>
    <Echarts :option="clazzOption" />
  </div>
  <div :style="{ width: '568px', height: '360px' }">
    <h1>学生性别分布</h1>
    <Echarts :option="genderOption" />
  </div>
</template>

<style scoped lang="scss">

</style>