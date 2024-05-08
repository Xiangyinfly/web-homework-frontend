<script setup lang="ts">

import { Search} from "@element-plus/icons-vue";
import {ElMessage, ElTable} from "element-plus";
import {ResponseResult, Stu, StuInfoList, StuInfoListRequest} from "@/api/stu/types.ts";
import {reactive, ref} from "vue";
import {addStu, deleteBatchStu, getStuById, reqStuInfoList, updateStu} from "@/api/stu";
import {getClazzInfoList} from "@/api/clazz";

//获得职员信息列表
const stuTableRef = ref<InstanceType<typeof ElTable>>()


const genderOptions = [
  {
    value: '1',
    label: '男',
  },
  {
    value: '2',
    label: '女',
  },
]

const eduOptions = [
  {
    value: '1',
    label: '大专',
  },
  {
    value: '2',
    label: '本科',
  },
  {
    value: '3',
    label: '硕士',
  },
  {
    value: '4',
    label: '博士',
  },
]
let clazzOptions = ref<Option[]>([])
interface Option {
  value?: string | number,
  label?: string,
}

const getClazzOptions = async () => {

  let res: ResponseResult = await getClazzInfoList()
  if (res.code == 200) {
    res.data.forEach(clazz => {
      let clazzOption: Option = {}
      clazzOption.value = clazz.id
      clazzOption.label = clazz.name
      clazzOptions.value.push(clazzOption)
    })
  } else {
    return Promise.reject(new Error(res.msg))
  }

}
getClazzOptions()

let stuInfoListRequest:StuInfoListRequest = reactive({})
let stuListPage = reactive<StuInfoList>({})
let stuList = ref<Stu[]>([])
const total = ref(0)

const getStuInfoList = async (page:number, pageSize:number) => {
  stuInfoListRequest.page = page
  stuInfoListRequest.pageSize = pageSize
  let res = await reqStuInfoList(stuInfoListRequest)
  if (res.code == 200) {
    stuListPage = res.data as StuInfoList
    total.value = stuListPage.total as number
    stuList.value = stuListPage.rows as Stu[]

    stuList.value.forEach(stu => {
      if (stu.gender === 1) {
        stu.gender = '男'
      } else {
        stu.gender = '女'
      }

      if (stu.education === 1) {
        stu.education = '大专'
      } else if (stu.education === 2) {
        stu.education = '本科'
      } else if (stu.education === 3) {
        stu.education = '硕士'
      } else if (stu.education === 4) {
        stu.education = '博士'
      }
    })
  } else {
    return Promise.reject(new Error(res.msg))
  }
}

getStuInfoList(1,10)

const getClazzName = (id) => {
  let className = ""
  clazzOptions.value.forEach(clazz => {
    if (clazz.value === id) {
      className = clazz.label
    }
  })
  return className
}

const handleSizeChange = (val: number) => {
  getStuInfoList(stuInfoListRequest.page as number,val)
}
const handleCurrentChange = (val: number) => {
  getStuInfoList(val,stuInfoListRequest.pageSize as number)
}

//添加员工


const addDialog = ref(false)
let addStuRequest = reactive<Stu>({})
const addStuForm = ref()
const doAddStu = async () => {
  await addStuForm.value.validate()
  addDialog.value = false
  let res: ResponseResult = await addStu(addStuRequest)
  if (res.code == 200) {
    await getStuInfoList(1,10)
    ElMessage.success("添加成功😊")

    Object.keys(addStuRequest).map(key => {
      delete addStuRequest[key]
    })
  } else {
    ElMessage.error("添加失败☹️")
  }
}

//修改员工
const updateDialog = ref()
const stuId = ref()
let updateStuRequest = ref<Stu>({})
const updateStuForm = ref()
const doGetStuById = async () => {
  let res:ResponseResult = await getStuById(stuId.value)
  if (res.code == 200) {
    updateStuRequest.value = res.data
  }
}

const doUpdateStu = async () => {
  await updateStuForm.value.validate()
  updateDialog.value = false
  let res: ResponseResult = await updateStu(updateStuRequest.value)
  if (res.code == 200) {
    await getStuInfoList(1,10)
    ElMessage.success("添加成功😊")

    Object.keys(updateStuRequest.value).map(key => {
      delete updateStuRequest.value[key]
    })
  } else {
    ElMessage.error("添加失败☹️")
  }
}


// 删除员工
const deleteDialog = ref(false)

const doDeleteStu = async () => {
  deleteDialog.value = false
  let stuIds: number[] = []
  stuIds.push(stuId.value)
  let res: ResponseResult = await deleteBatchStu(stuIds)
  if (res.code == 200) {
    await getStuInfoList(1,10)
    ElMessage.success("删除成功😊")
  } else {
    ElMessage.error("删除失败☹️")
  }
}

// 批量删除
const deleteBatchDialog = ref(false)
const multipleSelection = ref<Stu[]>([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const doDeleteBatchStu = async () => {
  let stuIds: number[] = []
  multipleSelection.value.forEach(stu => stuIds.push(stu.id as number))
  let res: ResponseResult = await deleteBatchStu(stuIds)
  if (res.code == 200) {
    await getStuInfoList(1,10)
    ElMessage.success("批量删除成功😊")
  } else {
    ElMessage.error("批量删除失败☹️")
  }
}

//违纪处理
const illegalDialog = ref(false)
const num = ref(0)
const doUpdateIllegal = async () => {
  await doGetStuById()
  updateStuRequest.value.illegalGrade += num.value
  updateStuRequest.value.illegalTime ++
  let res:ResponseResult = await updateStu(updateStuRequest.value)
  if (res.code == 200) {
    await getStuInfoList(1,10)
    ElMessage.success("违纪处理成功😊")
  } else {
    ElMessage.error("违纪处理失败☹️")
  }
}

const rules = {
  id: [
    { required: true, min: 10, max: 10, message: '学号为10个字符🥺', trigger: 'change' }
  ],
  name: [
    { required: true, min: 2, max: 10, message: '姓名应在2-10个字符🥺', trigger: 'change' }
  ],
  gender: [
    { required: true, message: '性别必须要填🥺', trigger: 'change' }
  ],
  phone: [
    { required: true,min: 11, max: 11, message: '手机号必须要填🥺', trigger: 'change' }
  ],
  clazz: [
    { required: true, message: '班级必须要填🥺', trigger: 'change' }
  ]
}

</script>

<template>
  <div>
    <el-card>

      <div class="flex gap-4 mb-4">

        <span>学员姓名</span>
        <el-input
            v-model="stuInfoListRequest.name"
            style="width: 200px;margin-left: 10px"
            placeholder="输入您的姓名"
            :prefix-icon="Search"
        />

        <span style="margin-left: 30px">学号</span>
        <el-input
            v-model="stuInfoListRequest.id"
            style="width: 200px;margin-left: 10px"
            placeholder="输入您的学号"
            :prefix-icon="Search"
        />

        <span style="margin-left: 30px">最高学历</span>
        <el-select v-model="stuInfoListRequest.education" placeholder="选择学历" style="width: 200px;margin-left: 10px">
          <el-option
              v-for="item in eduOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>

        <span style="margin-left: 30px">所属班级</span>
        <el-select v-model="stuInfoListRequest.clazz" placeholder="选择班级" style="width: 200px;margin-left: 10px">
          <el-option
              v-for="item in clazzOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>

        <el-button type="primary" style="margin-left: 100px" @click="getStuInfoList(stuInfoListRequest.page,stuInfoListRequest.pageSize)">查询</el-button>

      </div>

      <el-button type="primary" style="margin-bottom: 15px;margin-top: 15px" @click="addDialog = true;getClazzOptions()">添加学员</el-button>
      <el-button type="danger" style="margin-bottom: 15px;margin-top: 15px" @click="deleteBatchDialog = true">批量删除</el-button>

      <el-table
          ref="stuTableRef"
          :data="stuList"
          style="width: 100%"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="name" label="姓名" width="100"></el-table-column>
        <el-table-column property="id" label="学号" width="150"></el-table-column>
        <el-table-column property="clazz" label="班级" width="150">
          <template #default="scope">
            <span>{{ getClazzName(scope.row.clazz) }}</span>
          </template>
        </el-table-column>
        <el-table-column property="gender" label="性别" width="100"></el-table-column>
        <el-table-column property="phone" label="手机号" width="150"></el-table-column>
        <el-table-column property="education" label="最高学历" width="100"></el-table-column>
        <el-table-column property="illegalTime" label="违纪次数" width="100"></el-table-column>
        <el-table-column property="illegalGrade" label="违纪扣分" width="100"></el-table-column>
        <el-table-column property="updateTime" label="最后操作时间" show-overflow-tooltip />
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="updateDialog = true;stuId = scope.row.id;getClazzOptions();doGetStuById()">编辑</el-button>
            <el-button link type="danger" size="small" @click="deleteDialog = true;stuId = scope.row.id">删除</el-button>
            <el-button link type="danger" size="small" @click="illegalDialog = true;stuId = scope.row.id">违纪</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          style="margin-top: 20px"
          v-model:current-page="stuInfoListRequest.page"
          v-model:page-size="stuInfoListRequest.pageSize"
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
      title="🎈 添加学员信息"
      width="500"
  >
    <el-form label-width="auto" style="max-width: 600px" :model="addStuRequest" :rules="rules" ref="addStuForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="addStuRequest.name" placeholder="请输入姓名，长度为2-10个字符"/>
      </el-form-item>
      <el-form-item label="学号" prop="id">
        <el-input v-model="addStuRequest.id" placeholder="请输入学号，长度为10个字符，不可重复"/>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="addStuRequest.gender" placeholder="选择性别">
          <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="addStuRequest.phone" placeholder="请输入手机号，不可重复"/>
      </el-form-item>

      <el-form-item label="最高学历" prop="education">
        <el-select v-model="addStuRequest.education" placeholder="选择学历">
          <el-option
              v-for="item in eduOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="所属班级" prop="clazz">
        <el-select v-model="addStuRequest.clazz" placeholder="选择班级">
          <el-option
              v-for="item in clazzOptions"
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
        <el-button type="primary" @click="doAddStu">确定</el-button>
      </div>
    </template>
  </el-dialog>


  <el-dialog
      v-model="updateDialog"
      title="🎈 修改学员信息"
      width="500"
  >
    <el-form label-width="auto" style="max-width: 600px" :model="updateStuRequest" :rules="rules" ref="updateStuForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="updateStuRequest.name" placeholder="请输入姓名，长度为2-10个字符"/>
      </el-form-item>
      <el-form-item label="学号" prop="id">
        <el-input v-model="updateStuRequest.id" placeholder="请输入id，长度为10个字符，不可重复"/>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="updateStuRequest.gender" placeholder="选择性别">
          <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="updateStuRequest.phone" placeholder="请输入手机号，不可重复"/>
      </el-form-item>

      <el-form-item label="最高学历" prop="education">
        <el-select v-model="updateStuRequest.education" placeholder="选择学历">
          <el-option
              v-for="item in eduOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="所属班级" prop="clazz">
        <el-select v-model="updateStuRequest.clazz" placeholder="选择班级">
          <el-option
              v-for="item in clazzOptions"
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
        <el-button type="primary" @click="doUpdateStu">确定</el-button>
      </div>
    </template>
  </el-dialog>


  <el-dialog
      v-model="deleteDialog"
      title="⚠️ 删除学生"
      width="500"
  >
    <span>确定要删除该学生？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="deleteDialog = false">取消</el-button>
        <el-button type="primary" @click="doDeleteStu">确定</el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog
      v-model="deleteBatchDialog"
      title="⚠️ 批量删除学生"
      width="500"
  >
    <span>确定要删除这些学生？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="deleteBatchDialog = false">取消</el-button>
        <el-button type="primary" @click="doDeleteBatchStu">确定</el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog
      v-model="illegalDialog"
      title="⚠️ 学员违纪处理"
      width="500"
  >
    <span style="margin-right: 20px">违纪扣分</span>
    <el-input-number v-model="num" :min="1" :max="10" />

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="illegalDialog = false">取消</el-button>
        <el-button type="primary" @click="doUpdateIllegal">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>


<style scoped lang="scss">

</style>