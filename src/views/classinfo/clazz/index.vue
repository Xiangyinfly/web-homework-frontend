<script setup lang="ts">

import {Search} from "@element-plus/icons-vue";
import {ElMessage, ElTable} from "element-plus";
import {ResponseResult, Stu, StuInfoList, StuInfoListRequest} from "@/api/stu/types.ts";
import {reactive, ref} from "vue";
import {addStu, deleteBatchStu, getStuById, reqStuInfoList, updateStu} from "@/api/stu";
import {clazz, clazzInfoList, clazzInfoListRequest} from "@/api/clazz/types.ts";
import {empInfoListResponse} from "@/api/emp/types.ts";
import {getHeaderTeacherInfoList, reqEmpInfoList} from "@/api/emp";
import {addClazz, deleteClazz, getClazzById, reqClazzInfoList, updateClazz} from "@/api/clazz";




const getHeadTeacherOptions = async () => {

  let res: empInfoListResponse = await getHeaderTeacherInfoList()
  if (res.code == 200) {
    res.data.forEach(ht => {
      let htOption: Option = {}
      htOption.value = ht.id
      htOption.label = ht.name
      headTeacherOptions.value.push(htOption)
    })
  } else {
    return Promise.reject(new Error(res.msg))
  }

}
getHeadTeacherOptions()

const clazzTableRef = ref<InstanceType<typeof ElTable>>()
let clazzInfoListRequest:clazzInfoListRequest = reactive({})
let clazzListPage = reactive<clazzInfoList>({})
let clazzList = ref<clazz[]>([])
const total = ref(0)

const getHeadTeacherName = (id:number) => {
  let headTeacherName = ref()
  headTeacherOptions.value.forEach((ht) => {
    if (ht.value === id) {
      headTeacherName.value = ht.label as string
    }
  })

  return headTeacherName
}


const getClazzInfoList = async (page:number, pageSize:number) => {
  clazzInfoListRequest.page = page
  clazzInfoListRequest.pageSize = pageSize
  let res = await reqClazzInfoList(clazzInfoListRequest)
  if (res.code == 200) {
    clazzListPage = res.data as clazzInfoList
    total.value = clazzListPage.total as number
    clazzList.value = clazzListPage.rows as clazz[]
  } else {
    return Promise.reject(new Error(res.msg))
  }
}

getClazzInfoList(1,10)

const handleSizeChange = (val: number) => {
  getClazzInfoList(clazzInfoListRequest.page as number,val)
}
const handleCurrentChange = (val: number) => {
  getClazzInfoList(val,clazzInfoListRequest.pageSize as number)
}


//添加员工
let headTeacherOptions = ref<Option[]>([])
interface Option {
  value?: string | number,
  label?: string,
}




const addDialog = ref(false)
let addClazzRequest = reactive<clazz>({})
const addClazzForm = ref()
const doAddClazz = async () => {
  await addClazzForm.value.validate()
  addDialog.value = false
  let res: ResponseResult = await addClazz(addClazzRequest)
  if (res.code == 200) {
    await getClazzInfoList(1,10)
    ElMessage.success("添加成功😊")

    Object.keys(addClazzRequest).map(key => {
      delete addClazzRequest[key]
    })
  } else {
    ElMessage.error("添加失败☹️")
  }
}

//修改员工
const updateDialog = ref()
const clazzId = ref()
let updateClazzRequest = ref<clazz>({})
const updateClazzForm = ref()
const doGetClazzById = async () => {
  let res:ResponseResult = await getClazzById(clazzId.value)
  if (res.code == 200) {
    updateClazzRequest.value = res.data
  }
}

const doUpdateClazz = async () => {
  await updateClazzForm.value.validate()
  updateDialog.value = false
  let res: ResponseResult = await updateClazz(updateClazzRequest.value)
  if (res.code == 200) {
    await getClazzInfoList(1,10)
    ElMessage.success("添加成功😊")

    Object.keys(updateClazzRequest.value).map(key => {
      delete updateClazzRequest.value[key]
    })
  } else {
    ElMessage.error("添加失败☹️")
  }
}


// 删除员工
const deleteDialog = ref(false)

const doDeleteClazz = async () => {
  deleteDialog.value = false
  let res: ResponseResult = await deleteClazz(clazzId.value)
  if (res.code == 200) {
    await getClazzInfoList(1,10)
    ElMessage.success("删除成功😊")
  } else {
    ElMessage.error("删除失败☹️")
  }
}


const rules = {
  classroom: [
    { required: false, min: 1, max: 20, message: '教室名称应在2-10个字符🥺', trigger: 'change' }
  ],
  name: [
    { required: true, min: 4, max: 30, message: '班级名称应在2-10个字符🥺', trigger: 'change' }
  ],
  gender: [
    { required: true, message: '性别必须要填🥺', trigger: 'change' }
  ],
  headTeacher: [
    { required: true,message: '班主任必须要填🥺', trigger: 'change' }
  ]
}

</script>

<template>
  <div>
    <el-card>

      <div class="flex gap-4 mb-4">

        <span>班级名称</span>
        <el-input
            v-model="clazzInfoListRequest.name"
            style="width: 200px;margin-left: 10px"
            placeholder="输入班级名称"
            :prefix-icon="Search"
        />

        <el-button type="primary" style="margin-left: 100px" @click="getClazzInfoList(clazzInfoListRequest.page,clazzInfoListRequest.pageSize)">查询</el-button>

      </div>

      <el-button type="primary" style="margin-bottom: 15px;margin-top: 15px" @click="addDialog = true">添加班级</el-button>

      <el-table
          ref="clazzTableRef"
          :data="clazzList"
          style="width: 100%"
      >
        <el-table-column property="id" label="序号" width="150"></el-table-column>
        <el-table-column property="name" label="班级名称" width="200"></el-table-column>
        <el-table-column property="classroom" label="班级教室" width="200"></el-table-column>
        <el-table-column property="headTeacher" label="班主任" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ getHeadTeacherName(scope.row.headTeacher).value }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="updateDialog = true;clazzId = scope.row.id;doGetClazzById()">编辑</el-button>
            <el-button link type="danger" size="small" @click="deleteDialog = true;clazzId = scope.row.id">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          style="margin-top: 20px"
          v-model:current-page="clazzInfoListRequest.page"
          v-model:page-size="clazzInfoListRequest.pageSize"
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
      title="🎈 添加班级"
      width="500"
  >
    <el-form label-width="auto" style="max-width: 600px" :model="addClazzRequest" :rules="rules" ref="addClazzForm">
      <el-form-item label="班级名称" prop="name">
        <el-input v-model="addClazzRequest.name" placeholder="请输入班级名称，例如2024第01期10班"/>
      </el-form-item>
      <el-form-item label="班级教室" prop="classroom">
        <el-input v-model="addClazzRequest.classroom" placeholder="请输入班级教室"/>
      </el-form-item>
      <el-form-item label="班主任" prop="headTeacher">
        <el-select v-model="addClazzRequest.headTeacher" placeholder="选择班主任">
          <el-option
              v-for="item in headTeacherOptions"
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
        <el-button type="primary" @click="doAddClazz">确定</el-button>
      </div>
    </template>
  </el-dialog>


  <el-dialog
      v-model="updateDialog"
      title="🎈 修改班级信息"
      width="500"
  >
    <el-form label-width="auto" style="max-width: 600px" :model="updateClazzRequest" :rules="rules" ref="updateClazzForm">
      <el-form-item label="班级名称" prop="name">
        <el-input v-model="updateClazzRequest.name" placeholder="请输入班级名称，例如2024第01期10班"/>
      </el-form-item>
      <el-form-item label="班级教室" prop="classroom">
        <el-input v-model="updateClazzRequest.classroom" placeholder="请输入班级教室"/>
      </el-form-item>
      <el-form-item label="班主任" prop="headTeacher">
        <el-select v-model="updateClazzRequest.headTeacher" placeholder="选择班主任">
          <el-option
              v-for="item in headTeacherOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="updateDialog = false">取消</el-button>
        <el-button type="primary" @click="doUpdateClazz">确定</el-button>
      </div>
    </template>
  </el-dialog>


  <el-dialog
      v-model="deleteDialog"
      title="⚠️ 删除班级"
      width="500"
  >
    <span>确定要删除该班级？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="deleteDialog = false">取消</el-button>
        <el-button type="primary" @click="doDeleteClazz">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>


<style scoped lang="scss">

</style>