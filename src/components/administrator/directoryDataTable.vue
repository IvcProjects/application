<template>
    <div class="row">
      <div class="col-sm-12">
        <el-card class="control-panel-box">
          <div class="row">
            <div class="col-sm-12 control-panel-table">
              <el-table
              v-if="businessComponent !== 'user' && businessComponent !== 'address'"
              header-cell-class-name="table-th"
              cell-class-name="table-td"
              row-class-name="table-row"
              ref="directoryTable"
              :data="tableDataDirectory"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 100%"
              max-height="600"
              border>
                <el-table-column
                type="index"
                width="50"
                label="#">
                </el-table-column>
                <el-table-column
                prop="name"
                :show-overflow-tooltip="true"
                label="Название"
                width="300">
                </el-table-column>
                <el-table-column
                prop="description"
                :show-overflow-tooltip="true"
                label="Описание">
                </el-table-column>
                <el-table-column
                fixed="right"
                prop="userTypeName"
                :show-overflow-tooltip="true"
                label="Тип пользователя"
                width="170"
                v-if="businessComponent === 'control'">
                </el-table-column>
                <el-table-column
                fixed="right"
                prop="departmentName"
                :show-overflow-tooltip="true"
                label="Отдел"
                width="200"
                v-if="businessComponent === 'sector'">
                </el-table-column>
                <el-table-column
                fixed="right"
                prop="controlName"
                :show-overflow-tooltip="true"
                label="Управление"
                width="200"
                v-if="(businessComponent === 'department' || businessComponent === 'sector')">
                </el-table-column>    
                <el-table-column
                fixed="right"
                prop="taskTypeName"
                :show-overflow-tooltip="true"
                label="Тип заявки"
                width="150"
                v-if="businessComponent === 'taskTypeRef'">
                </el-table-column>              
              </el-table>
              <el-table 
              v-if="businessComponent === 'address'"
              header-cell-class-name="table-th"
              cell-class-name="table-td"
              row-class-name="table-row"
              ref="directoryTable"
              :data="tableDataDirectory"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 100%"
              max-height="600"
              border>
                <el-table-column
                fixed="left"
                type="index"
                width="50"
                label="#">
                </el-table-column>
                <el-table-column
                fixed="left"
                prop="postcode"
                :show-overflow-tooltip="true"
                label="Индекс">
                </el-table-column>
                <el-table-column
                fixed="left"
                prop="district"
                :show-overflow-tooltip="true"
                label="Регион">
                </el-table-column>
                <el-table-column
                prop="city"
                :show-overflow-tooltip="true"
                label="Город">
                </el-table-column>
                <el-table-column
                prop="street"
                :show-overflow-tooltip="true"
                label="Улица">
                </el-table-column>
                <el-table-column
                fixed="right"
                prop="house"
                :show-overflow-tooltip="true"
                label="Дом">
                </el-table-column>
                <el-table-column
                fixed="right"
                prop="structure"
                :show-overflow-tooltip="true"
                label="Строение">
                </el-table-column>
                <el-table-column
                fixed="right"
                prop="apartment"
                :show-overflow-tooltip="true"
                label="Кабинет">
                </el-table-column>
              </el-table>
              <el-table 
              v-if="businessComponent === 'user'"
              header-cell-class-name="table-th"
              cell-class-name="table-td"
              row-class-name="table-row"
              ref="directoryTable"
              :data="tableDataDirectory"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 100%"
              max-height="600"
              border>
                <el-table-column
                type="index"
                width="50"
                label="#">
                </el-table-column>
                <el-table-column
                prop="fullName"
                :show-overflow-tooltip="true"
                label="ФИО">
                </el-table-column>
                <el-table-column
                prop="userTypeName"
                :show-overflow-tooltip="true"
                label="Тип">
                </el-table-column>
                <el-table-column
                prop="userRoleName"
                :show-overflow-tooltip="true"
                label="Роль">
                </el-table-column>
                <el-table-column
                prop="departmentName"
                :show-overflow-tooltip="true"
                label="Отдел">
                </el-table-column>
                <el-table-column
                prop="position"
                :show-overflow-tooltip="true"
                label="Должность">
                </el-table-column>
                <el-table-column
                prop="cabinet"
                :show-overflow-tooltip="true"
                label="Кабинет">
                </el-table-column>
              </el-table>
            </div>
          </div>          
        </el-card>
      </div>
    </div>
</template>

<script>
import store from '@/store';

export default {
  computed: {
    accountProfile() {
      return store.state.accountProfile;
    },
    systemPreloader() {
      return store.state.systemPreloader;
    },
    businessComponent() {
      return store.state.systemBusinessComponent;
    },
    tableDataDirectory() {
      if(store.state.systemBusinessComponent === 'control') {
        return store.state.controls;  
      }
      else if(store.state.systemBusinessComponent === 'department') {
        return store.state.departments;
      }
      else if(store.state.systemBusinessComponent === 'sector') {
        return store.state.sectors;
      }
      else if(store.state.systemBusinessComponent === 'address') {
        return store.state.addresses;
      }
      else if(store.state.systemBusinessComponent === 'taskType') {
        return store.state.taskTypes;
      }
      else if(store.state.systemBusinessComponent === 'taskTypeRef') {
        return store.state.taskTypeRefs;
      }
      else if(store.state.systemBusinessComponent === 'taskStatus') {
        return store.state.taskStatuses;
      }
      else if(store.state.systemBusinessComponent === 'taskBusinessStatus') {
        return store.state.taskBusinessStatuses;
      }
      else if(store.state.systemBusinessComponent === 'user') {
        return store.state.users;
      }

      return [];          
    },
  },
  methods: {
    //Событие нажатия на строке таблицы и передача id сущности в метод заполнения формы создания/редактирования справочника
    async handleCurrentChange(row) {
      if(row !== null && typeof(row) !== 'undefined') {
        let actionOptions = {
          id: row.id,
          componentType: this.businessComponent
        };

        await store.dispatch("getDirectory", actionOptions);
      }
    },
    //Установка выделенной строки таблицы заявок
    setCurrentRow(row) {
        if(typeof(row) !== 'undefined') {
            this.$refs.directoryTable.setCurrentRow(row);
        }
        else {
            this.$refs.directoryTable.setCurrentRow(null);
        }
    },
  }
}
</script>

<style>
.control-panel-table .table-th {
  padding: 5px !important;
  font-size: 0.9em;
}

.control-panel-table .table-td {
  padding: 5px !important;
  white-space: nowrap;
  cursor: pointer;
}
</style>
