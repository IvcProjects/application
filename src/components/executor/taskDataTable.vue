<template>
    <div class="row">
        <div class="col-sm-12 col-xs-12">
            <el-card class="control-panel-box">
                <div class="row">
                    <div class="col-sm-12 control-panel-table">
                        <el-table
                        header-cell-class-name="table-th"
                        cell-class-name="table-td"
                        :row-class-name="tableRowClassName"
                        ref="tasks"
                        :data="tasks"
                        highlight-current-row
                        @current-change="handleCurrentChange"
                        style="width: 100%"
                        max-height="600"
                        border>
                            <el-table-column
                            type="index"
                            width="50"
                            label="#"
                            fixed="left">
                            </el-table-column>
                            <el-table-column
                            prop="client"
                            :show-overflow-tooltip="true"
                            label="Клиент"
                            width="130"
                            sortable>
                            </el-table-column>
                            <el-table-column
                            prop="cabinet"
                            :show-overflow-tooltip="true"                            
                            width="90"
                            sortable>
                            <template slot="header">
                                <el-tooltip class="item" effect="dark" content="Кабинет" placement="top-start">
                                    <span>Каб.</span>
                                </el-tooltip>
                            </template>
                            </el-table-column>
                            <el-table-column
                            prop="clientNote"
                            :show-overflow-tooltip="true"
                            label="Описание клиента">
                            </el-table-column>                            
                            <el-table-column
                            prop="taskTypeName"
                            :show-overflow-tooltip="true"
                            width="60">
                            <template slot="header">
                                <el-tooltip class="item" effect="dark" content="Тип заявки" placement="top-start">
                                    <span>Тип</span>
                                </el-tooltip>
                            </template>
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.taskTypeName" placement="top-start">
                                    <span>{{scope.row.taskTypeName}}</span>
                                </el-tooltip>
                            </template>
                            </el-table-column>                            
                            <el-table-column
                            prop="taskTypeRefName"
                            :show-overflow-tooltip="true"
                            width="100">
                            <template slot="header">
                                <el-tooltip class="item" effect="dark" content="Тип заявки (уточнение)" placement="top-start">
                                    <span>Тип (уточ.)</span>
                                </el-tooltip>
                            </template>
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.taskTypeRefName" placement="top-start">
                                    <span>{{scope.row.taskTypeRefName}}</span>
                                </el-tooltip>
                            </template>
                            </el-table-column>
                            <el-table-column
                            prop="taskStateName"
                            :show-overflow-tooltip="true"
                            label="Статус"
                            width="100">
                            </el-table-column>
                            <el-table-column
                            v-if="taskVisibleMode === 1"
                            prop="executor"
                            :show-overflow-tooltip="true"
                            label="Исполнитель"
                            width="130">
                            </el-table-column>
                            <el-table-column
                            prop="executorNote"
                            :show-overflow-tooltip="true"
                            label="Описание исполнителя"
                            v-if="taskVisibleMode !== 2">
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
                            v-if="taskVisibleMode !== 2"
                            sortable>
                            </el-table-column>
                            <el-table-column
                            prop="dateFinishStr"
                            :show-overflow-tooltip="true"
                            label="Заврешена"
                            width="130"
                            v-if="taskVisibleMode !== 2"
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
    data() {
        return {
            filterArray: [{text: 'В работе', value: 'В работе'}],
        }
    },
    async mounted() {
        await store.dispatch("getAccount");

        let actionOptions = {
            componentType: "taskStatus",
            options: {
                visibleMode: 1
            }
        };

        store.dispatch("getEntities", actionOptions);
    },
    computed: {
        tasks() {
            return store.state.tasks;
        },
        taskVisibleMode() {
            return store.state.taskVisibleMode;
        }, 
        profile() {
            return store.state.accountProfile;
        },    
        filterStatus() {
            let filterList = [];

            for(let i = 0; i < this.tasks.length; i++) {
                let status = store.state.taskStatuses.find(s => s.name === this.tasks[i].taskStateName);
                let index = filterList.findIndex(n => n.value === status.name);

                if(typeof(status) !== 'undefined' && status !== null && index < 0) {
                    filterList.push({ text: status.name, value: status.name });
                }
            }

            return filterList;
        },     
    },
    methods: {
        //Событие нажатия на строке таблицы и передача id сущности в метод заполнения фоормы создания/редактирования справочника
        async handleCurrentChange(row) {
            if(row !== null && typeof(row) !== 'undefined') {
                let actionOptions = {
                    id: row.id,
                    componentType: 'task'
                };

                await store.dispatch("getEntity", actionOptions);
            }
        },
        //Установка выделенной строки таблицы заявок
        setCurrentRow(row) {
            if(typeof(row) !== 'undefined') {
                this.$refs.tasks.setCurrentRow(row);
            }
            else {
                this.$refs.tasks.setCurrentRow(null);
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
.control-panel-table .table-th {
  padding: 5px !important;
  font-size: 0.9em;
}

.control-panel-table .table-td {
  padding: 5px !important;
  white-space: nowrap;
  cursor: pointer;
}

.el-table .deleted-row {
    color: rgb(161, 161, 161);
    text-decoration: line-through;
    text-decoration-color: rgb(161, 161, 161);
}

.el-table .completed-row {
    color: green;
    text-decoration: line-through;
    text-decoration-color: green;
}

.el-table .not-start-row {
    color: black;
}

.el-table .in-work-row {
    color: blueviolet;
}
</style>
