<script setup lang="ts">
import {reactive, ref} from "vue";
import {addDept, deleteDept, getDeptById, getDeptList, updateDept} from "@/api/dept";
import {
  AddDeptRequest,
  DeptInfo,
  DeptInfoListResponse,
  DeptInfoResponse,
  ResponseResult,
  UpdateDeptRequest
} from "@/api/dept/types.ts";
import {ElMessage} from "element-plus";

// 部门列表
let deptList = ref<DeptInfo[]>([]);
const getDeptListData = async () => {
  let res: DeptInfoListResponse = await getDeptList()
  if (res.code == 200) {
    deptList.value = res.data
  } else {
    return Promise.reject(new Error(res.msg))
  }
}
getDeptListData()


// 删除部门
const deleteDialog = ref(false)
const deptId = ref()
const doDeleteDept = async () => {
  deleteDialog.value = false
  let res: ResponseResult = await deleteDept(deptId.value)
  if (res.code == 200) {
    await getDeptListData()
    ElMessage.success("删除成功😊")
  } else {
    ElMessage.error("删除失败☹️")
  }
}

// 添加部门
const addDialog = ref(false)
let addDeptRequest = reactive<AddDeptRequest>({})
const addDeptForm = ref()
const doAddDept = async () => {
  await addDeptForm.value.validate()
  addDialog.value = false
  let res: ResponseResult = await addDept(addDeptRequest)
  if (res.code == 200) {
    await getDeptListData()
    ElMessage.success("添加成功😊")
    addDeptRequest.name = ""
  } else {
    ElMessage.error("添加失败☹️")
  }
}

// 修改部门
const updateDialog = ref(false)
let updateDeptRequest = reactive<UpdateDeptRequest>({})
const updateDeptForm = ref()
const beforeUpdate = async () => {
  updateDialog.value = true
  let res: DeptInfoResponse = await getDeptById(deptId.value)
  updateDeptRequest.name = res.data.name as string
}
const doUpdateDept = async () => {
  await updateDeptForm.value.validate()
  updateDialog.value = false
  updateDeptRequest.id = deptId.value
  let res: ResponseResult = await updateDept(updateDeptRequest)
  if (res.code == 200) {
    await getDeptListData()
    ElMessage.success("修改成功😊")
  } else {
    ElMessage.error("修改失败☹️")
  }
}

/**
 * 太逆天了！
 * 关于表单校验：
 * 1. 标签参数写的位置
 *    el-form上：
 *        :model 不能是v-model，值写表单对象
 *        :rules 写规则
 *        ref script里面对应的写一个相同名字的ref对象，用于标识该表单
 *    el-form-item上：
 *        prop 绑定规则中的条目的名字，注意要与里面 el-input 所双向绑定的表单对象中的属性名字相同！！
 *    el-input：
 *        v-model 双向绑定的表单对象中的属性名
 *        placeholder 默认提示
 */
const rules = {
  name: [
    { required: true, min: 2, max: 10, message: '部门名称应在2-10个字符🥺', trigger: 'change' }
  ]
}
</script>

<template>
  <div>

    <el-card>
      <el-button type="primary" style="margin-bottom: 20px" @click="addDialog = true">新增部门</el-button>

      <el-table :data="deptList" style="width: 100%">
        <el-table-column align="center" prop="id" label="序号" width="60" />
        <el-table-column align="center" prop="name" label="部门名称" width="500" />
        <el-table-column align="center" prop="updateTime" label="最后操作时间" />
        <el-table-column align="center" fixed="right" label="操作" width="200">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="deptId = scope.row.id;beforeUpdate()">编辑</el-button>
            <el-button link type="primary" size="small" @click="deleteDialog = true;deptId = scope.row.id">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>


  <el-dialog
      v-model="deleteDialog"
      title="⚠️ 删除部门"
      width="500"
  >
    <span>确定要删除该部门？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="deleteDialog = false">取消</el-button>
        <el-button type="primary" @click="doDeleteDept">确定</el-button>
      </div>
    </template>
  </el-dialog>


  <el-dialog
      v-model="addDialog"
      title="🎈 添加部门"
      width="500"
  >
    <el-form label-width="auto" style="max-width: 600px" :model="addDeptRequest" :rules="rules" ref="addDeptForm">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="addDeptRequest.name" placeholder="请输入部门名称，长度为2-10个字符"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addDialog = false">取消</el-button>
        <el-button type="primary" @click="doAddDept">确定</el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog
      v-model="updateDialog"
      title="🎈 修改部门"
      width="500"
  >
    <el-form label-width="auto" style="max-width: 600px" :model="updateDeptRequest" :rules="rules" ref="updateDeptForm">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="updateDeptRequest.name" placeholder="请输入部门名称，长度为2-10个字符"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="updateDialog = false">取消</el-button>
        <el-button type="primary" @click="doUpdateDept">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>