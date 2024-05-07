<script setup lang="ts">

import {Plus, Search} from "@element-plus/icons-vue";
import {ElMessage, ElTable} from "element-plus";
import {ResponseResult, Stu, StuInfoList, StuInfoListRequest} from "@/api/stu/types.ts";
import {reactive, ref} from "vue";
import {addStu, deleteBatchStu, getStuById, reqStuInfoList, updateStu} from "@/api/stu";
import {clazzInfoListResponse} from "@/api/clazz/types.ts";
import {getClazzInfoList} from "@/api/clazz";
import {Course, CourseInfoList, CourseInfoListRequest} from "@/api/manage/types.ts";
import {addCourse, deleteCourse, getCourseById, reqCourseInfoList, updateCourse} from "@/api/manage";

//获得职员信息列表
const courseTableRef = ref<InstanceType<typeof ElTable>>()

let courseInfoListRequest:CourseInfoListRequest = reactive({})
let courseListPage = reactive<CourseInfoList>({})
let courseList = ref<Course[]>([])
const total = ref(0)

const getCourseInfoList = async (page:number, pageSize:number) => {
  courseInfoListRequest.page = page
  courseInfoListRequest.pageSize = pageSize
  let res = await reqCourseInfoList(courseInfoListRequest)
  if (res.code == 200) {
    courseListPage = res.data as CourseInfoList
    total.value = courseListPage.total as number
    courseList.value = courseListPage.rows as Course[]
  } else {
    return Promise.reject(new Error(res.msg))
  }
}

getCourseInfoList(1,10)

const handleSizeChange = (val: number) => {
  getCourseInfoList(courseInfoListRequest.page as number,val)
}
const handleCurrentChange = (val: number) => {
  getCourseInfoList(val,courseInfoListRequest.pageSize as number)
}

//添加员工
const addDialog = ref(false)
let addCourseRequest = reactive<Course>({})
const addCourseForm = ref()
const doAddCourse = async () => {
  await addCourseForm.value.validate()
  addDialog.value = false
  let res: ResponseResult = await addCourse(addCourseRequest)
  if (res.code == 200) {
    await getCourseInfoList(1,10)
    ElMessage.success("添加成功😊")

    Object.keys(addCourseRequest).map(key => {
      delete addCourseRequest[key]
    })
  } else {
    ElMessage.error("添加失败☹️")
  }
}

//修改员工
const updateDialog = ref()
const courseId = ref()
let updateCourseRequest = ref<Course>({})
const updateCourseForm = ref()
const doGetCourseById = async () => {
  let res:ResponseResult = await getCourseById(courseId.value)
  if (res.code == 200) {
    updateCourseRequest.value = res.data
  }
}

const doUpdateCourse = async () => {
  await updateCourseForm.value.validate()
  updateDialog.value = false
  let res: ResponseResult = await updateCourse(updateCourseRequest.value)
  if (res.code == 200) {
    await getCourseInfoList(1,10)
    ElMessage.success("添加成功😊")

    Object.keys(updateCourseRequest.value).map(key => {
      delete updateCourseRequest.value[key]
    })
  } else {
    ElMessage.error("添加失败☹️")
  }
}


// 删除员工
const deleteDialog = ref(false)

const doDeleteCourse = async () => {
  deleteDialog.value = false
  let res: ResponseResult = await deleteCourse(courseId.value)
  if (res.code == 200) {
    await getCourseInfoList(1,10)
    ElMessage.success("删除成功😊")
  } else {
    ElMessage.error("删除失败☹️")
  }
}


const rules = {
  id: [
    { required: true, min: 8, max: 8, message: '课程号为8个字符🥺', trigger: 'change' }
  ],
  name: [
    { required: true, min: 2, max: 10, message: '课程名应在2-10个字符🥺', trigger: 'change' }
  ]
}

</script>

<template>
  <div>
    <el-card>

      <div class="flex gap-4 mb-4">

        <span>课程名</span>
        <el-input
            v-model="courseInfoListRequest.name"
            style="width: 200px;margin-left: 10px"
            placeholder="输入课程名"
            :prefix-icon="Search"
        />

        <span style="margin-left: 30px">课程号</span>
        <el-input
            v-model="courseInfoListRequest.id"
            style="width: 200px;margin-left: 10px"
            placeholder="输入课程号"
            :prefix-icon="Search"
        />

        <el-button type="primary" style="margin-left: 100px" @click="getCourseInfoList(courseInfoListRequest.page,courseInfoListRequest.pageSize)">查询</el-button>

      </div>

      <el-button type="primary" style="margin-bottom: 15px;margin-top: 15px" @click="addDialog = true">添加课程</el-button>

      <el-table
          ref="courseTableRef"
          :data="courseList"
          style="width: 100%"
      >
        <el-table-column property="id" label="课程号" width="200"></el-table-column>
        <el-table-column property="name" label="课程名" width="200"></el-table-column>
        <el-table-column property="description" label="描述" width="500"></el-table-column>
        <el-table-column property="updateTime" label="最后操作时间" show-overflow-tooltip />
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="updateDialog = true;courseId = scope.row.id;doGetCourseById()">编辑</el-button>
            <el-button link type="danger" size="small" @click="deleteDialog = true;courseId = scope.row.id">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          style="margin-top: 20px"
          v-model:current-page="courseInfoListRequest.page"
          v-model:page-size="courseInfoListRequest.pageSize"
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
      title="🎈 添加课程"
      width="500"
  >
    <el-form label-width="auto" style="max-width: 600px" :model="addCourseRequest" :rules="rules" ref="addCourseForm">
      <el-form-item label="课程号" prop="id">
        <el-input v-model="addCourseRequest.id" placeholder="请输入课程号，长度为8个字符，不可重复"/>
      </el-form-item>
      <el-form-item label="课程名" prop="name">
        <el-input v-model="addCourseRequest.name" placeholder="请输入课程名，长度为2-10个字符"/>
      </el-form-item>
      <el-form-item label="课程描述" prop="description">
        <el-input v-model="addCourseRequest.description" placeholder="请输入课程描述"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addDialog = false">取消</el-button>
        <el-button type="primary" @click="doAddCourse">确定</el-button>
      </div>
    </template>
  </el-dialog>


  <el-dialog
      v-model="updateDialog"
      title="🎈 修改课程信息"
      width="500"
  >
    <el-form label-width="auto" style="max-width: 600px" :model="updateCourseRequest" :rules="rules" ref="updateCourseForm">
      <el-form-item label="课程号" prop="id">
        <el-input v-model="updateCourseRequest.id" placeholder="请输入课程号，长度为8个字符，不可重复"/>
      </el-form-item>
      <el-form-item label="课程名" prop="name">
        <el-input v-model="updateCourseRequest.name" placeholder="请输入课程名，长度为2-10个字符"/>
      </el-form-item>
      <el-form-item label="课程描述" prop="description">
        <el-input v-model="updateCourseRequest.description" placeholder="请输入课程描述"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="updateDialog = false">取消</el-button>
        <el-button type="primary" @click="doUpdateCourse">确定</el-button>
      </div>
    </template>
  </el-dialog>


  <el-dialog
      v-model="deleteDialog"
      title="⚠️ 删除课程"
      width="500"
  >
    <span>确定要删除该课程？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="deleteDialog = false">取消</el-button>
        <el-button type="primary" @click="doDeleteCourse">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>


<style scoped lang="scss">

</style>