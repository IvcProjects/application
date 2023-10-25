<template>
    <div class="row">
        <div class="col-sm-12 col-xs-12">
            <el-card class="control-panel-box"
            v-bind:class="{ 'control-panel-box':(darkTheme === false), 'control-panel-box-dark':(darkTheme === true) }">
                <div class="row">
                    <div class="col-sm-12"
                    v-bind:class="{ 'control-panel-table':(darkTheme === false), 'control-panel-table-dark':(darkTheme === true) }">
                        <el-table
                        header-cell-class-name="table-th"
                        cell-class-name="table-td"
                        :row-class-name="tableRowClassName"
                        ref="requests"
                        :data="requests"
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
                            prop="client"
                            :show-overflow-tooltip="true"
                            label="Постановщик"
                            v-if="requestVisibleMode === 1"
                            width="140"
                            sortable>
                            </el-table-column> 
                            <el-table-column
                            prop="cabinet"
                            :show-overflow-tooltip="true"
                            label="Кабинет"
                            width="90">
                            </el-table-column>
                            <el-table-column
                            prop="taskStateName"
                            :show-overflow-tooltip="true"
                            label="Статус"
                            width="100"
                            sortable>
                            </el-table-column>                        
                            <el-table-column
                            prop="taskTypeName"
                            :show-overflow-tooltip="true"
                            label="Тип"
                            width="70">
                            </el-table-column>
                            <el-table-column
                            prop="taskTypeRefName"
                            :show-overflow-tooltip="true"
                            label="Уточнение"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            prop="clientNote"
                            :show-overflow-tooltip="true"
                            label="Описание">
                            </el-table-column>
                            <el-table-column
                            prop="dateCreationStr"
                            :show-overflow-tooltip="true"
                            label="Создана"
                            width="120"
                            sortable>
                            </el-table-column>
                            <el-table-column
                            prop="dateStartStr"
                            :show-overflow-tooltip="true"
                            label="Старт"
                            width="120"
                            sortable>
                            </el-table-column>
                            <el-table-column
                            prop="dateFinishStr"
                            :show-overflow-tooltip="true"
                            label="Заврешена"
                            width="130"
                            sortable>
                            </el-table-column>
                            <el-table-column
                            prop="executor"
                            :show-overflow-tooltip="true"
                            label="Исполнитель"
                            width="140"
                            sortable>
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

export default{
    computed: {
        requests() {
            return store.state.requests;
        },
        requestVisibleMode() {
            return store.state.requestVisibleMode;
        }, 
        profile() {
            return store.state.accountProfile;
        },
        darkTheme() {
            if(store.state.accountProfile !== null) {
                return store.state.accountProfile.isDarkTheme;
            }

            return false;
        }
    },    
    methods: {
        //Событие нажатия на строке таблицы и передача id сущности в метод заполнения фоормы создания/редактирования справочника
        async handleCurrentChange(row) {
            if(row !== null && typeof(row) !== 'undefined') {
                let actionOptions = {
                    id: row.id,
                    componentType: 'request'
                };

                await store.dispatch("getEntity", actionOptions);
            }
        },
        //Установка выделенной строки таблицы заявок
        setCurrentRow(row) {
            if(typeof(row) !== 'undefined') {
                this.$refs.requests.setCurrentRow(row);
            }
            else {
                this.$refs.requests.setCurrentRow(null);
            }
        },
        //Установка цвета строкам таблицы в зависимости от статуса и этапа работы по задаче
        tableRowClassName({row}) {
            if(row !== null && typeof(row) !== 'undefined') {
                if(row.systemBusinessState === 2) {
                    return "deleted-row";
                }
                else if(row.systemBusinessState === 1) {
                    return "completed-row";
                }
                else if(row.systemBusinessState === 0 && row.systemTaskState === 1) {
                    return "not-start-row";
                }
                else if(row.systemBusinessState === 0 && (row.systemTaskState < 1 || row.systemTaskState > 1)) {
                    return "in-work-row";
                }
            }

            return '';
        },        
    }
}
</script>

<style>
.control-panel-table .table-th,
.control-panel-table-dark .table-th {
  padding: 5px !important;
  font-size: 0.9em;
}

.control-panel-table-dark .el-table,
.control-panel-table-dark .table-th {
    background: #252836!important;
    border: 1px solid #34373C;
}

.control-panel-table .table-td,
.control-panel-table-dark .table-td {
  padding: 5px !important;
  white-space: nowrap;
  cursor: pointer; 
}

.control-panel-table-dark .table-td {
    background: #252836!important;
    border: 1px solid #34373C!important;
}

.control-panel-table-dark .current-row .table-td {
    background: #393c50!important;
}

.control-panel-table-dark .completed-row td {
    color: #22B07D;
}

.el-table .completed-row td {
    text-decoration: line-through;
}

.el-table .not-start-row td {
    color: #7CADC6;
}

.el-table .in-work-row td {
    color: crimson;
}
</style>
