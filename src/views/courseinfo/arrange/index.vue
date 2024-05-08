<script setup lang="ts">

import {Plus, Search} from "@element-plus/icons-vue";
import {ElMessage, ElTable} from "element-plus";
import {ResponseResult} from "@/api/stu/types.ts";
import {reactive, ref} from "vue";
import {
  CourseEmp,
  CourseEmpList,
  CourseEmpListRequest,
  CourseEmpResponse
} from "@/api/arrange/types.ts";
import {addCourseEmp, deleteCourseEmp, reqCourseEmpList} from "@/api/arrange";
import {getCourseList} from "@/api/manage";
import {getEmpInfoList} from "@/api/emp";

//获得职员信息列表
const courseEmpTableRef = ref<InstanceType<typeof ElTable>>()




let CourseEmpListRequest:CourseEmpListRequest = reactive({})
let courseEmpListPage = reactive<CourseEmpList>({})
let courseEmpList = ref<CourseEmpResponse[]>([])
const total = ref(0)

const getCourseEmpList = async (page:number, pageSize:number) => {
  CourseEmpListRequest.page = page
  CourseEmpListRequest.pageSize = pageSize
  let res = await reqCourseEmpList(CourseEmpListRequest)
  if (res.code == 200) {
    courseEmpListPage = res.data as CourseEmpList
    total.value = courseEmpListPage.total as number
    courseEmpList.value = courseEmpListPage.rows as CourseEmpResponse[]
  } else {
    return Promise.reject(new Error(res.msg))
  }
}

getCourseEmpList(1,10)

const handleSizeChange = (val: number) => {
  getCourseEmpList(CourseEmpListRequest.page as number,val)
}
const handleCurrentChange = (val: number) => {
  getCourseEmpList(val,CourseEmpListRequest.pageSize as number)
}

//添加员工
interface Option {
  value?: string | number,
  label?: string,
}
const courseOptions = ref<Option[]>([])
const empOptions = ref<Option[]>([])

const getCourseOptions = async () => {
  let res: ResponseResult = await getCourseList()
  if (res.code == 200) {
    res.data.forEach(course => {
      let courseOption: Option = {}
      courseOption.value = course.id
      courseOption.label = course.name
      courseOptions.value.push(courseOption)
    })
  } else {
    return Promise.reject(new Error(res.msg))
  }

}

const getEmpOptions = async () => {
  let res: ResponseResult = await getEmpInfoList()
  if (res.code == 200) {
    res.data.forEach(emp => {
      let empOption: Option = {}
      empOption.value = emp.id
      empOption.label = emp.name
      empOptions.value.push(empOption)
    })
  } else {
    return Promise.reject(new Error(res.msg))
  }

}

const addDialog = ref(false)
let addCourseEmpRequest = reactive<CourseEmp>({})
const addCourseEmpForm = ref()
const doAddCourseEmp = async () => {
  await addCourseEmpForm.value.validate()
  addDialog.value = false
  let res: ResponseResult = await addCourseEmp(addCourseEmpRequest)
  if (res.code == 200) {
    await getCourseEmpList(1,10)
    ElMessage.success("添加成功😊")

    Object.keys(addCourseEmpRequest).map(key => {
      delete addCourseEmpRequest[key]
    })
  } else {
    ElMessage.error("添加失败☹️")
  }
}


// 删除员工
const deleteDialog = ref(false)
const courseEmp = ref<CourseEmp>({})
const doDeleteCourseEmp = async () => {
  deleteDialog.value = false
  let res: ResponseResult = await deleteCourseEmp(courseEmp.value)
  if (res.code == 200) {
    await getCourseEmpList(1,10)
    ElMessage.success("删除成功😊")
  } else {
    ElMessage.error("删除失败☹️")
  }
}

const rules = {
  courseId: [
    { required: true, message: '课程必须要选🥺', trigger: 'change' }
  ],
  empId: [
    { required: true, message: '任课老师必须要选🥺', trigger: 'change' }
  ]
}

</script>

<template>
  <div>
    <el-card>

      <div class="flex gap-4 mb-4">

        <span>课程号</span>
        <el-input
            v-model="CourseEmpListRequest.courseId"
            style="width: 200px;margin-left: 10px"
            placeholder="输入课程号"
            :prefix-icon="Search"
        />

        <span style="margin-left: 30px">课程名</span>
        <el-input
            v-model="CourseEmpListRequest.courseName"
            style="width: 200px;margin-left: 10px"
            placeholder="输入课程名"
            :prefix-icon="Search"
        />

        <span style="margin-left: 30px">任课老师</span>
        <el-input
            v-model="CourseEmpListRequest.empName"
            style="width: 200px;margin-left: 10px"
            placeholder="输入任课老师"
            :prefix-icon="Search"
        />



        <el-button type="primary" style="margin-left: 100px" @click="getCourseEmpList(CourseEmpListRequest.page,CourseEmpListRequest.pageSize)">查询</el-button>

      </div>

      <el-button type="primary" style="margin-bottom: 15px;margin-top: 15px" @click="addDialog = true;getEmpOptions();getCourseOptions()">添加课程分配</el-button>

      <el-table
          ref="courseEmpTableRef"
          :data="courseEmpList"
          style="width: 100%"
      >
        <el-table-column property="courseId" label="课程号" width="300"></el-table-column>
        <el-table-column property="courseName" label="课程名" width="300"></el-table-column>
        <el-table-column v-if="false" property="empId" label="任课老师号" width="150"></el-table-column>
        <el-table-column property="empName" label="任课老师" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button link type="danger" size="small" @click="deleteDialog = true;courseEmp.empId = scope.row.empId;courseEmp.courseId = scope.row.courseId">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          style="margin-top: 20px"
          v-model:current-page="CourseEmpListRequest.page"
          v-model:page-size="CourseEmpListRequest.pageSize"
          :page-sizes="[5,10,15,20,30]"
          :small="false"
          :disabled="false"
          :background="false"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </el-card>
  </div>

  <el-dialog
      v-model="addDialog"
      title="🎈 添加课程分配信息"
      width="500"
  >
    <el-form label-width="auto" style="max-width: 600px" :model="addCourseEmpRequest" :rules="rules" ref="addCourseEmpForm">
      <el-form-item label="课程名" prop="courseId">
        <el-select v-model="addCourseEmpRequest.courseId" placeholder="请选择课程">
          <el-option
              v-for="item in courseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="任课老师" prop="empId">
        <el-select v-model="addCourseEmpRequest.empId" placeholder="请选择任课老师">
          <el-option
              v-for="item in empOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addDialog = false">取消</el-button>
        <el-button type="primary" @click="doAddCourseEmp">确定</el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog
      v-model="deleteDialog"
      title="⚠️ 删除课程分配"
      width="500"
  >
    <span>确定要删除该分配？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="deleteDialog = false">取消</el-button>
        <el-button type="primary" @click="doDeleteCourseEmp">确定</el-button>
      </div>
    </template>
  </el-dialog>

</template>


<style scoped lang="scss">

</style>