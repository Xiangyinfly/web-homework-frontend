<script setup lang="ts">
import {reactive, ref} from 'vue'
import {ElMessage, ElTable} from 'element-plus'
import {Search} from "@element-plus/icons-vue";
import {addEmp, getEmpById, reqEmpInfoList, reqUpload, updateEmp} from "@/api/emp";
import {AddEmpRequest, empInfo, empInfoList, empInfoListRequest, UpdateEmpRequest} from "@/api/emp/types.ts";
import {AddDeptRequest, DeptInfoListResponse, ResponseResult} from "@/api/dept/types.ts";
import {addDept, getDeptList} from "@/api/dept";
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import {useUserStore} from "@/store/modules/user.ts";
import { Picture as IconPicture } from '@element-plus/icons-vue'




//获得职员信息列表
const empTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

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

const jobOptions = [
  {
    value: '1',
    label: '班主任',
  },
  {
    value: '2',
    label: '讲师',
  },
  {
    value: '3',
    label: '学工主管',
  },
  {
    value: '4',
    label: '教研主管',
  },
  {
    value: '5',
    label: '咨询师',
  },
]



let empInfoListRequest:empInfoListRequest = reactive({})
let empListPage = reactive<empInfoList>({})
let empList = ref<empInfo[]>([])
const total = ref(0)
const during = ref([])

const getEmpInfoList = async (page:number,pageSize:number) => {
  empInfoListRequest.page = page
  empInfoListRequest.pageSize = pageSize
  empInfoListRequest.startTime = during.value[0]
  empInfoListRequest.endTime = during.value[1]
  let res = await reqEmpInfoList(empInfoListRequest)
  if (res.code == 200) {
    empListPage = res.data as empInfoList
    total.value = empListPage.total as number
    empList.value = empListPage.rows as empInfo[]

    empList.value.forEach(emp => {
      if (emp.gender === 1) {
        emp.gender = '男'
      } else {
        emp.gender = '女'
      }

      if (emp.job === 1) {
        emp.job = '班主任'
      } else if (emp.job === 2) {
        emp.job = '讲师'
      } else if (emp.job === 3) {
        emp.job = '学工主管'
      } else if (emp.job === 4) {
        emp.job = '教研主管'
      } else if (emp.job === 5) {
        emp.job = '咨询师'
      }
    })
  } else {
    return Promise.reject(new Error(res.msg))
  }
}

getEmpInfoList(1,10)

const handleSizeChange = (val: number) => {
  getEmpInfoList(empInfoListRequest.page as number,val)
}
const handleCurrentChange = (val: number) => {
  getEmpInfoList(val,empInfoListRequest.pageSize as number)
}

//添加员工
let deptOptions = ref<deptOption[]>([])
interface deptOption {
  value?: string | number,
  label?: string,
}
const getDeptOptions = async () => {

  let res: DeptInfoListResponse = await getDeptList()
  if (res.code == 200) {
    res.data.forEach(dept => {
      let deptOption: deptOption = {}
      deptOption.value = dept.id
      deptOption.label = dept.name
      deptOptions.value.push(deptOption)
    })
  } else {
    return Promise.reject(new Error(res.msg))
  }

}

const addDialog = ref(false)
let addEmpRequest = reactive<AddEmpRequest>({})
const addEmpForm = ref()
const doAddEmp = async () => {
  await addEmpForm.value.validate()
  addDialog.value = false
  let res: ResponseResult = await addEmp(addEmpRequest)
  if (res.code == 200) {
    await getEmpInfoList(1,10)
    ElMessage.success("添加成功😊")

    Object.keys(addEmpRequest).map(key => {
      delete addEmpRequest[key]
    })
  } else {
    ElMessage.error("添加失败☹️")
  }
}

const userStore = useUserStore()
const uploadHeader = {
  token: userStore.token,
}
const uploadUrl = import.meta.env.VITE_APP_BASE_API + "/upload"
const imageUrl = ref('')
// const imageUpload = async (img) => {
//   let fd = new FormData()
//   fd.append('file', img.file)
//   let res = await reqUpload(fd)
//   if (res.code == 200) {
//     imageUrl.value = res.data
//     ElMessage.success("上传成功😊")
//     uploadBanner.value.handleRemove(img)
//   } else {
//     imageUrl.value = ""
//     ElMessage.success("上传失败😭")
//     uploadBanner.value.handleRemove(img)
//
//   }
//   addEmpRequest.image = imageUrl.value
// }
const uploadSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = response.data
  addEmpRequest.image = imageUrl.value
}

const handleChange = (rawFile) => {
  if (rawFile.type !== "image/png") {
    ElMessage.error("只能上传png图片");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 1) {
    ElMessage.error("上传图片最大不超过1MB!");
    return false;
  }
  return true;
};

//修改员工
const updateDialog = ref()
const empId = ref()
let updateEmpRequest = ref<UpdateEmpRequest>({})
const updateEmpForm = ref()
const doGetEmpById = async () => {
  let res = await getEmpById(empId.value)
  if (res.code == 200) {
    updateEmpRequest.value = res.data as UpdateEmpRequest
  }
}

const doUpdateEmp = async () => {
  await updateEmpForm.value.validate()
  updateDialog.value = false
  let res: ResponseResult = await updateEmp(updateEmpRequest.value)
  if (res.code == 200) {
    await getEmpInfoList(1,10)
    ElMessage.success("添加成功😊")

    Object.keys(updateEmpRequest.value).map(key => {
      delete updateEmpRequest.value[key]
    })
  } else {
    ElMessage.error("添加失败☹️")
  }
}


const rules = {
  username: [
    { required: true, min: 2, max: 10, message: '用户名应在2-10个字符🥺', trigger: 'change' }
  ],
  name: [
    { required: true, min: 2, max: 10, message: '姓名应在2-10个字符🥺', trigger: 'change' }
  ],
  gender: [
    { required: true, message: '性别必须要填🥺', trigger: 'change' }
  ],
  id: [
    { required: true, message: '序号必须要填🥺', trigger: 'change' }
  ]
}

</script>

<template>
  <div>
    <div class="flex gap-4 mb-4">

      <span>姓名</span>
      <el-input
          v-model="empInfoListRequest.name"
          style="width: 240px;margin-left: 10px"
          placeholder="输入您的姓名"
          :prefix-icon="Search"
      />

      <span style="margin-left: 40px">性别</span>
      <el-select v-model="empInfoListRequest.gender" placeholder="选择性别" style="width: 240px;margin-left: 10px">
        <el-option
            v-for="item in genderOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>

      <span style="margin-left: 40px">入职时间</span>
      <el-date-picker
          style="margin-left: 10px"
          v-model="during"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="To"
          start-placeholder="最早时间"
          end-placeholder="最晚时间"
      />

      <el-button type="primary" style="margin-left: 100px" @click="getEmpInfoList(empInfoListRequest.page,empInfoListRequest.pageSize)">查询</el-button>

    </div>

    <el-button type="primary" style="margin-bottom: 15px;margin-top: 15px" @click="addDialog = true;getDeptOptions()">新增员工</el-button>
    <el-button type="danger" style="margin-bottom: 15px;margin-top: 15px">批量删除</el-button>

    <el-card>

      <el-table
          ref="empTableRef"
          :data="empList"
          style="width: 100%"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="name" label="姓名" width="120"></el-table-column>
        <el-table-column property="image" label="图像" width="200" >
          <template #default="scope">
            <el-image style="width: 100px; height: 100px" :src="scope.row.image" fit="fill" >
              <template #error>
                <div class="image-slot">
                  <el-icon><icon-picture /></el-icon>
                </div>
              </template>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column property="gender" label="性别" width="200" />
        <el-table-column property="job" label="职位" width="200" />
        <el-table-column property="entryDate" label="入职日期" width="200" />
        <el-table-column property="updateTime" label="最后操作时间" show-overflow-tooltip />
        <el-table-column align="center" fixed="right" label="操作" width="200">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="updateDialog = true;empId = scope.row.id;getDeptOptions();doGetEmpById()">编辑</el-button>
            <el-button link type="primary" size="small" @click="deleteDialog = true;deptId = scope.row.id">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          style="margin-top: 20px"
          v-model:current-page="empInfoListRequest.page"
          v-model:page-size="empInfoListRequest.pageSize"
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
      v-model="updateDialog"
      title="🎈 修改员工信息"
      width="500"
  >
    <el-form label-width="auto" style="max-width: 600px" :model="updateEmpRequest" :rules="rules" ref="updateEmpForm">
      <el-form-item label="序号" prop="id">
        <el-input v-model="updateEmpRequest.username" placeholder="请输入用户名，长度为2-10个字符，不可重复"/>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="updateEmpRequest.username" placeholder="请输入用户名，长度为2-10个字符，不可重复"/>
      </el-form-item>
      <el-form-item label="员工姓名" prop="name">
        <el-input v-model="updateEmpRequest.name" placeholder="请输入员工姓名，长度为2-10个字符"/>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="updateEmpRequest.gender" placeholder="选择性别">
          <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="图像" prop="image">
        <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :limit="1"
            :show-file-list="false"
            accept=".png"
            :before-upload="handleChange"
            :on-success="uploadSuccess"
            ref="uploadBanner"
            :headers="uploadHeader"
            name="img"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="职位" prop="job">
        <el-select v-model="updateEmpRequest.job" placeholder="选择职位">
          <el-option
              v-for="item in jobOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="入职日期" prop="entryDate">
        <el-date-picker
            v-model="updateEmpRequest.entryDate"
            type="date"
            placeholder="选择入职日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="归属部门" prop="deptId">
        <el-select v-model="updateEmpRequest.deptId" placeholder="选择部门">
          <el-option
              v-for="item in deptOptions"
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
        <el-button type="primary" @click="doUpdateEmp">确定</el-button>
      </div>
    </template>
  </el-dialog>


  <el-dialog
      v-model="addDialog"
      title="🎈 添加员工"
      width="500"
  >
    <el-form label-width="auto" style="max-width: 600px" :model="addEmpRequest" :rules="rules" ref="addEmpForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addEmpRequest.username" placeholder="请输入用户名，长度为2-10个字符，不可重复"/>
      </el-form-item>
      <el-form-item label="员工姓名" prop="name">
        <el-input v-model="addEmpRequest.name" placeholder="请输入员工姓名，长度为2-10个字符"/>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="addEmpRequest.gender" placeholder="选择性别">
          <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="图像" prop="image">
        <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :limit="1"
            :show-file-list="false"
            accept=".png"
            :before-upload="handleChange"
            :on-success="uploadSuccess"
            ref="uploadBanner"
            :headers="uploadHeader"
            name="img"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="职位" prop="job">
        <el-select v-model="addEmpRequest.job" placeholder="选择职位">
          <el-option
              v-for="item in jobOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="入职日期" prop="entryDate">
        <el-date-picker
            v-model="addEmpRequest.entryDate"
            type="date"
            placeholder="选择入职日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="归属部门" prop="deptId">
        <el-select v-model="addEmpRequest.deptId" placeholder="选择部门">
          <el-option
              v-for="item in deptOptions"
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
        <el-button type="primary" @click="doAddEmp">确定</el-button>
      </div>
    </template>
  </el-dialog>


</template>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>