<template>
  <div class="app-container">
    <el-form
      v-show="showSearch"
      ref="queryForm"
      :model="queryParams"
      :inline="true"
    >
      <el-form-item
        label="角色名称"
        prop="roleName"
      >
        <el-input
          v-model="queryParams.roleName"
          placeholder="请输入角色名称"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="权限字符"
        prop="roleKey"
      >
        <el-input
          v-model="queryParams.roleKey"
          placeholder="请输入权限字符"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="状态"
        prop="status"
      >
        <el-select
          v-model="queryParams.status"
          placeholder="角色状态"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          style="width: 240px"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          @change="changeDate"
        >
          />
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleQuery"
        >
          搜索
        </el-button>
        <el-button
          icon="el-icon-refresh"
          @click="resetQuery"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-row
      :gutter="10"
      class="mb8"
    >
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          @click="handleAdd"
        >
          新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          :disabled="single"
          @click="handleUpdate"
        >
          修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          :disabled="multiple"
          @click="handleDelete"
        >
          删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          @click="handleExport"
        >
          导出
        </el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="roleList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <!-- <el-table-column
        label="状态"
        align="center"
        width="100"
      >
        <template #default="{row}">
          <el-switch
            :value="row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(row)"
          />
        </template>
      </el-table-column> -->
      <el-table-column
        label="角色编号"
        prop="roleId"
        width="120"
      />
      <el-table-column
        label="角色名称"
        prop="roleName"
        :show-overflow-tooltip="true"
        width="150"
      />
      <el-table-column
        label="权限字符"
        prop="roleKey"
        :show-overflow-tooltip="true"
        width="150"
      />
      <el-table-column
        label="显示顺序"
        prop="roleSort"
        width="100"
      />

      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template #default="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="{row}">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(row)"
          >
            修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-circle-check"
            @click="handleDataScope(row)"
          >
            数据权限
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
    />
    <!-- <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    /> -->

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog
      :title="title"
      v-model="open"
      width="500px"
      append-to-body
    >
      <el-form
        ref="formRef"
        :model="formVal"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
        >
          <el-input
            v-model="formVal.roleName"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item
          label="权限字符"
          prop="roleKey"
        >
          <el-input
            v-model="formVal.roleKey"
            placeholder="请输入权限字符"
          />
        </el-form-item>
        <el-form-item
          label="角色顺序"
          prop="roleSort"
        >
          <el-input-number
            v-model="roleSort"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formVal.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >
              {{ dict.dictLabel }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-checkbox
            v-model="menuExpand"
            @change="handleCheckedTreeExpand($event, 'menu')"
          >
            展开/折叠
          </el-checkbox>
          <el-checkbox
            v-model="menuNodeAll"
            @change="handleCheckedTreeNodeAll($event, 'menu')"
          >
            全选/全不选
          </el-checkbox>
          <el-checkbox
            v-model="formVal.menuCheckStrictly"
            @change="handleCheckedTreeConnect($event, 'menu')"
          >
            父子联动
          </el-checkbox>
          <el-tree
            ref="menuTreeData"
            class="tree-border"
            :data="menuOptions"
            show-checkbox
            node-key="id"
            :check-strictly="!formVal.menuCheckStrictly"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="formVal.remark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="submitForm"
          >
            确 定
          </el-button>
          <el-button @click="cancel">
            取 消
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 分配角色数据权限对话框 -->
    <el-dialog
      :title="title"
      v-model="openDataScope"
      width="500px"
      append-to-body
    >
      <el-form
        :model="form"
        label-width="80px"
      >
        <el-form-item label="角色名称">
          <el-input
            v-model="formVal.roleName"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="权限字符">
          <el-input
            v-model="formVal.roleKey"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="权限范围">
          <el-select v-model="formVal.dataScope">
            <el-option
              v-for="item in dataScopeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-show="formVal.dataScope === 2"
          label="数据权限"
        >
          <el-checkbox
            v-model="deptExpand"
            @change="handleCheckedTreeExpand($event, 'dept')"
          >
            展开/折叠
          </el-checkbox>
          <el-checkbox
            v-model="deptNodeAll"
            @change="handleCheckedTreeNodeAll($event, 'dept')"
          >
            全选/全不选
          </el-checkbox>
          <el-checkbox
            v-model="formVal.deptCheckStrictly"
            @change="handleCheckedTreeConnect($event, 'dept')"
          >
            父子联动
          </el-checkbox>
          <el-tree
            ref="deptRef"
            class="tree-border"
            :data="deptOptions"
            show-checkbox
            default-expand-all
            node-key="id"
            :check-strictly="!formVal.deptCheckStrictly"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="submitDataScope"
          >
            确 定
          </el-button>
          <el-button @click="cancelDataScope">
            取 消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs, ref, unref, nextTick } from 'vue'
import { listRole, getRole, exportRole, delRole, dataScope, changeRoleStatus, updateRole, addRole } from '@/apis/system/role'
import { download } from '@/utils/base'
import { ElForm, ElMessage, ElMessageBox } from 'element-plus'
import pagination from '@/components/pagination/Index.vue'
export default defineComponent({
  components: {
    pagination
  },
  setup () {
    const roleSort = ref('1')
    const formRef = ref(ElForm)
    const deptRef = ref<HTMLInputElement | null>(null)
    const menuTreeData = ref<HTMLInputElement | null>(null)
    const dataMap = reactive({
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 角色表格数据
      roleList: [
        {
          "searchValue": null,
          "createBy": null,
          "createTime": "2021-09-09 17:25:37",
          "updateBy": null,
          "updateTime": null,
          "remark": "超级管理员",
          "params": {},
          "roleId": 1,
          "roleName": "超级管理员",
          "roleKey": "admin",
          "roleSort": "1",
          "dataScope": "1",
          "menuCheckStrictly": true,
          "deptCheckStrictly": true,
          "status": "0",
          "delFlag": "0",
          "flag": false,
          "menuIds": null,
          "deptIds": null,
          "admin": true
        },
        {
          "searchValue": null,
          "createBy": null,
          "createTime": "2021-09-09 17:25:37",
          "updateBy": null,
          "updateTime": null,
          "remark": "普通角色",
          "params": {},
          "roleId": 2,
          "roleName": "普通角色",
          "roleKey": "common",
          "roleSort": "2",
          "dataScope": "2",
          "menuCheckStrictly": true,
          "deptCheckStrictly": true,
          "status": "0",
          "delFlag": "0",
          "flag": false,
          "menuIds": null,
          "deptIds": null,
          "admin": false
        }
      ],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      menuExpand: false,
      menuNodeAll: false,
      deptExpand: true,
      deptNodeAll: false,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [
        {
          "searchValue": null,
          "createBy": "admin",
          "createTime": "2021-09-09 17:26:59",
          "updateBy": null,
          "updateTime": null,
          "remark": "正常状态",
          "params": {},
          "dictCode": 6,
          "dictSort": 1,
          "dictLabel": "正常",
          "dictValue": "0",
          "dictType": "sys_normal_disable",
          "cssClass": "",
          "listClass": "primary",
          "isDefault": "Y",
          "status": "0",
          "default": true
        },
        {
          "searchValue": null,
          "createBy": "admin",
          "createTime": "2021-09-09 17:27:00",
          "updateBy": null,
          "updateTime": null,
          "remark": "停用状态",
          "params": {},
          "dictCode": 7,
          "dictSort": 2,
          "dictLabel": "停用",
          "dictValue": "1",
          "dictType": "sys_normal_disable",
          "cssClass": "",
          "listClass": "danger",
          "isDefault": "N",
          "status": "0",
          "default": false
        }
      ],
      // 数据范围选项
      dataScopeOptions: [
        {
          value: '1',
          label: '全部数据权限'
        },
        {
          value: '2',
          label: '自定数据权限'
        },
        {
          value: '3',
          label: '本部门数据权限'
        },
        {
          value: '4',
          label: '本部门及以下数据权限'
        },
        {
          value: '5',
          label: '仅本人数据权限'
        }
      ],
      // 菜单列表
      menuOptions: [],
      // 部门列表
      deptOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleName: undefined,
        roleKey: undefined,
        status: undefined
      },
      // 表单参数
      formVal: {
        roleId: '',
        roleName: '',
        roleKey: '',
        roleSort: '0',
        status: '0',
        menuIds: [],
        deptIds: [],
        menuCheckStrictly: true,
        deptCheckStrictly: true,
        remark: ''
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 表单校验
      rules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        roleKey: [
          { required: true, message: '权限字符不能为空', trigger: 'blur' }
        ],
        roleSort: [
          { required: true, message: '角色顺序不能为空', trigger: 'blur' }
        ]
      }
    })
    /** 查询角色列表 */
    // const getList = () => {
    //   dataMap.loading = true
    //   // addDateRange(dataMap.queryParams, dataMap.dateRange)
    //   listRole(dataMap.queryParams).then(
    //   // listRole(addDateRange(dataMap.queryParams, dataMap.dateRange)).then(
    //     (response: any) => {
    //       dataMap.roleList = response.rows
    //       dataMap.total = response.total
    //       dataMap.loading = false
    //     }
    //   )
    // }

    const formReset = () => {
      if (menuTreeData.value) {
        (menuTreeData.value as any).setCheckedKeys([])
      }
      dataMap.menuExpand = false
      dataMap.menuNodeAll = false
      dataMap.deptExpand = true
      dataMap.deptNodeAll = false
      dataMap.formVal = {
        roleId: '',
        roleName: '',
        roleKey: '',
        roleSort: '',
        status: '0',
        menuIds: [],
        deptIds: [],
        menuCheckStrictly: true,
        deptCheckStrictly: true,
        remark: ''
      }
      // dataMap.resetForm('form')
    }

    /** 新增按钮操作 */
    const handleAdd = () => {
      dataMap.open = true
      dataMap.title = '添加角色'
    }

    /** 修改按钮操作 */
    const handleUpdate = async (row: any) => {
      dataMap.open = true
      dataMap.title = '修改角色'
      // formReset()
      // const roleId = row.roleId || dataMap.ids
      // const roleMenu = getRoleMenuTreeselect(roleId)
      // const result = await getRole(roleId)
      // if (result?.code === 200) {
      //   dataMap.formVal = result?.data
      //   roleSort.value = result.data.roleSort

      //   nextTick(() => {
      //     dataMap.open = true
      //     roleMenu.then((res: any) => {
      //       const checkedKeys = res.checkedKeys
      //       checkedKeys.forEach((v: any) => {
      //         nextTick(() => {
      //           (menuTreeData.value as any).setChecked(v, true, false)
      //         })
      //       })
      //     })
      //   })
      //   dataMap.title = '修改角色'
      // }
    }

    // 多选框选中数据
    const handleSelectionChange = (selection: any) => {
      dataMap.ids = selection.map((item: any) => item.roleId)
      dataMap.single = selection.length !== 1
      dataMap.multiple = !selection.length
    }

    // 树权限（展开/折叠）
    const handleCheckedTreeExpand = (value: any, type: any) => {
      if (type === 'menu') {
        const treeList = dataMap.menuOptions
        for (let i = 0; i < treeList.length; i++) {
          (menuTreeData.value as any).store.nodesMap[(treeList[i] as any).id].expanded = value
        }
      } else if (type === 'dept') {
        const treeList = dataMap.deptOptions
        for (let i = 0; i < treeList.length; i++) {
          (deptRef.value as any).store.nodesMap[(treeList[i] as any).id].expanded = value
        }
      }
    }
    // 树权限（全选/全不选）
    const handleCheckedTreeNodeAll = (value: any, type: any) => {
      if (type === 'menu') {
        (menuTreeData.value as any).setCheckedNodes(value ? dataMap.menuOptions : [])
      } else if (type === 'dept') {
        (deptRef.value as any).setCheckedNodes(value ? dataMap.deptOptions : [])
      }
    }
    // 树权限（父子联动）
    const handleCheckedTreeConnect = (value: any, type: any) => {
      if (type === 'menu') {
        dataMap.formVal.menuCheckStrictly = !!value
      } else if (type === 'dept') {
        dataMap.formVal.deptCheckStrictly = !!value
      }
    }
    /** 导出按钮操作 */
    const handleExport = () => {
      const queryParams = dataMap.queryParams
      ElMessageBox.confirm('是否确认导出所有角色数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return exportRole(queryParams)
      }).then(response => {
        download(response?.msg)
      })
    }

    //     /** 删除按钮操作 */
    const handleDelete = (row: any) => {
      const roleIds = row.roleId || dataMap.ids
      ElMessageBox.confirm('是否确认删除角色编号为"' + roleIds + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delRole(roleIds)
      }).then(() => {
        // getList()
        ElMessage.success('删除成功')
      })
    }

    // 取消按钮
    const cancel = () => {
      dataMap.open = false
      formReset()
    }
    // 取消按钮（数据权限）
    const cancelDataScope = () => {
      dataMap.openDataScope = false
      formReset()
    }
    // 所有部门节点数据
    const getDeptAllCheckedKeys = () => {
      // 目前被选中的部门节点
      const checkedKeys = (deptRef.value as any).getCheckedKeys()
      // 半选中的部门节点
      const halfCheckedKeys = (deptRef.value as any).getHalfCheckedKeys()
      checkedKeys.unshift.bind(checkedKeys, halfCheckedKeys)
      return checkedKeys
    }
    /** 提交按钮（数据权限） */
    const submitDataScope = () => {
      if (dataMap.formVal.roleId !== undefined) {
        dataMap.formVal.deptIds = getDeptAllCheckedKeys()
        dataScope(dataMap.formVal).then(() => {
          ElMessage.success('修改成功')
          dataMap.openDataScope = false
          // getList()
        })
      }
    }
    // 角色状态修改
    const handleStatusChange = (row: any) => {
      const text = row.status === '0' ? '启用' : '停用'
      ElMessageBox.confirm('确认要"' + text + '""' + row.roleName + '"角色吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return changeRoleStatus(row.roleId, row.status)
      }).then(() => {
        ElMessage.success(text + '成功')
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0'
      })
    }

    // 所有菜单节点数据
    const getMenuAllCheckedKeys = () => {
      // 目前被选中的菜单节点
      const checkedKeys = (menuTreeData.value as any).getCheckedKeys()
      // 半选中的菜单节点
      const halfCheckedKeys = (menuTreeData.value as any).getHalfCheckedKeys()
      checkedKeys.unshift.bind(checkedKeys, halfCheckedKeys)
      return checkedKeys
    }
    /** 搜索按钮操作 */
    const handleQuery = () => {
      dataMap.queryParams.pageNum = 1
      // getList()
    }

    /** 重置按钮操作 */
    const resetQuery = () => {
      dataMap.dateRange = []
      // this.resetForm('queryForm')
      handleQuery()
    }
    /** 提交按钮 */
    const submitForm = () => {
      const form = unref(formRef)
      form.validate((valid: any) => {
        if (valid) {
          if (dataMap.formVal.roleId !== undefined) {
            dataMap.formVal.menuIds = getMenuAllCheckedKeys()
            updateRole(dataMap.formVal).then(() => {
              ElMessage.success('修改成功')
              dataMap.open = false
              // getList()
            })
          } else {
            dataMap.formVal.menuIds = getMenuAllCheckedKeys()
            addRole(dataMap.formVal).then(() => {
              ElMessage.success('修改成功')
              dataMap.open = false
              // getList()
            })
          }
        }
      })
    }

    const changeDate = (e: {[key: string]: any}) => {
      console.log(e.target.value)
    }
    onMounted(() => {
      // getList()
    })
    return { ...toRefs(dataMap), roleSort, changeDate, resetQuery, handleQuery, submitForm, getMenuAllCheckedKeys, handleStatusChange, submitDataScope, cancelDataScope, cancel, handleDelete, handleExport, deptRef, handleCheckedTreeConnect, handleCheckedTreeNodeAll, handleCheckedTreeExpand, menuTreeData, formRef, formReset, handleAdd, handleUpdate, handleSelectionChange }
  }

})
</script>
