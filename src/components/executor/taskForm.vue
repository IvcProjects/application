<template>
    <div>
        <el-drawer
        v-if="systemOperation === 'editTask'"
        :before-close="handleClose"
        :visible="isVisible"
        direction="ltr"
        custom-class="demo-drawer"  
        size="90%"      
        >
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <el-form 
                        :model="formTask"
                        :rules="rules"
                        :show-message="false"
                        ref="formTask">
                            <el-card class="control-panel">
                                <h4>{{getCaptionForm()}}</h4>  
                                <div class="row">
                                    <div class="col-sm-6">
                                        <el-form-item label="Клиент" prop="client" class="form-item-task">
                                            <el-input
                                            size="small"
                                            clearable=""
                                            v-model="formTask.client"
                                            class="input-form-text"
                                            disabled>
                                            </el-input>
                                        </el-form-item>                                        
                                        <el-form-item label="Тип заявки" prop="cabinet" class="form-item-task">
                                            <el-input
                                            size="small"
                                            clearable=""
                                            v-model="formTask.taskType"
                                            class="input-form-text"
                                            disabled>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="Тип заявки (уточнение)" prop="cabinet" class="form-item-task">
                                            <el-input
                                            size="small"
                                            clearable=""
                                            v-model="formTask.taskTypeRef"
                                            class="input-form-text"
                                            disabled>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="Описание клиента" prop="clientNote" class="form-item-task">
                                            <el-input
                                            type="textarea"
                                            :rows="5"
                                            size="small"
                                            clearable
                                            v-model="formTask.clientNote"
                                            class="input-form-text"
                                            disabled>
                                            </el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6">
                                        <el-form-item label="Кабинет" prop="cabinet" class="form-item-task">
                                            <el-input
                                            size="small"
                                            clearable=""
                                            v-model="formTask.cabinet"
                                            class="input-form-text"
                                            disabled>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="Статус задачи" prop="taskStatusId" class="form-item-task">
                                            <el-select 
                                            v-model="formTask.taskStatusId" 
                                            placeholder="Укажите статус задачи" 
                                            size="small" 
                                            class="select-control input-form-select"
                                            clearable>
                                                <el-option
                                                    v-for="item in taskStatuses"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="Исполнитель" prop="executorId" class="form-item-task">
                                            <el-select 
                                            v-model="formTask.executorId" 
                                            placeholder="Назначьте исполнителя" 
                                            size="small" 
                                            class="select-control input-form-select"
                                            clearable>
                                                <el-option
                                                    v-for="item in users"
                                                    :key="item.id"
                                                    :label="item.fullName"
                                                    :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="Описание исполнителя" prop="executorNote" class="form-item-task">
                                            <el-input
                                            placeholder="Введите описание"
                                            type="textarea"
                                            :rows="5"
                                            size="small"
                                            clearable
                                            v-model="formTask.executorNote"
                                            class="input-form-text">
                                            </el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 form-control-left">
                                        <el-button type="info" size="small" @click="cancelForm" class="btn-control-panel">Отмена</el-button>                            
                                    </div>
                                    <div class="col-6 form-control-right">
                                        <el-button type="success" size="small" @click="sendFormRequest('formTask')">Сохранить</el-button>
                                    </div>
                                </div>                                
                            </el-card>                            
                        </el-form>              
                    </div>                    
                </div>
            </div>            
        </el-drawer>
        <el-dialog
        v-if="systemOperation === 'infoTask'"
        :before-close="handleCloseInfo"
        :visible="isVisible">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <el-form 
                        :model="formTask"
                        ref="formInfoTask">
                            <el-card class="control-panel">
                                <h4>Информация о задаче</h4>
                                <div class="row">
                                    <div class="col-sm-6">
                                            <el-form-item label="Клиент" class="form-item-task">
                                                <el-input
                                                size="small"
                                                v-model="formTask.client"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>                                        
                                            <el-form-item label="Тип задачи" class="form-item-task">
                                                <el-input
                                                size="small"
                                                v-model="formTask.taskType"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="Тип задачи (уточнение)" class="form-item-task">
                                                <el-input
                                                size="small"
                                                v-model="formTask.taskTypeRef"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="Описание клиента" class="form-item-task">
                                                <el-input
                                                type="textarea"
                                                :rows="5"
                                                size="small"
                                                clearable
                                                v-model="formTask.clientNote"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>
                                        </div>
                                        <div class="col-sm-6">
                                            <el-form-item label="Кабинет" prop="cabinet" class="form-item-task">
                                                <el-input
                                                size="small"
                                                clearable=""
                                                v-model="formTask.cabinet"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="Статус задачи" class="form-item-task">
                                                <el-input
                                                size="small"
                                                v-model="formTask.taskStatus"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="Исполнитель" class="form-item-task">
                                                <el-input
                                                size="small"
                                                v-model="formTask.executor"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="Описание исполнителя" class="form-item-task">
                                                <el-input
                                                type="textarea"
                                                :rows="5"
                                                size="small"
                                                clearable
                                                v-model="formTask.executorNote"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>
                                        </div>
                                    <div class="col-sm-12">
                                        <el-form-item label="Бизнес-статус записи задачи" class="form-item-task">
                                                <el-input
                                                size="small"
                                                v-model="formTask.systemBusinessState"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>                                        
                                    </div>
                                    <div class="col-sm-12 text-center form-button">
                                        <el-button size="small" type="primary" plain @click="cancelForm">Закрыть</el-button>
                                    </div>
                                </div>
                            </el-card>
                        </el-form>                        
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-drawer
        v-if="systemOperation === 'historyTask'"
        :before-close="handleCloseInfo"
        :visible="isVisible"
        direction="rtl"
        size="70%">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <el-card class="control-panel">
                            <h4>История операций над задачей</h4>
                            <div class="row">
                                <div class="col-sm-12 control-panel-table">
                                    <el-table 
                                    header-cell-class-name="table-th"
                                    cell-class-name="table-td"
                                    ref="taskHistories"
                                    :data="taskHistories"
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
                                        prop="date"
                                        :show-overflow-tooltip="true"
                                        label="Дата операции"
                                        width="150"
                                        sortable>
                                        </el-table-column>
                                        <el-table-column
                                        prop="actionType"
                                        :show-overflow-tooltip="true"
                                        label="Тип операции">
                                        </el-table-column>
                                        <el-table-column
                                        prop="user.name"
                                        :show-overflow-tooltip="true"
                                        label="Пользователь, инциатор операции">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>        
        </el-drawer>
        <el-drawer
        v-if="systemOperation === 'filterTask'"
        title="Пользовательские фильтры"
        :before-close="handleCloseInfo"
        :visible="isVisible"
        direction="btt"
        size="25%"
        class="drawer-filter">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <el-card class="control-panel">
                            <div class="row">
                                <div class="col-sm-6">
                                    <el-select v-if="taskType !== null" v-model="tasksPosition" placeholder="Выбор типа заявок" size="small" @change="handleChange" class="select-control input-form-select">
                                        <el-option
                                        v-for="item in tasksPositionArray"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>                                    
                                </div>
                                <div class="col-sm-6">
                                    <el-select v-model="tasksFilter" placeholder="Выбор статуса заявок" size="small" @change="handleChange" class="select-control input-form-select">
                                        <el-option
                                        v-for="item in tasksFilterArray"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>  
                                </div>
                            </div>                     
                        </el-card>
                    </div>
                </div>
            </div> 
        </el-drawer>
    </div> 
</template>

<script>
import store from '@/store';
import router from '@/router';

export default{
    data() {
        return {
            tasksPosition: "my",
            tasksPositionArray: [
                { id: 'my', name: "Мои заявки в работе" },
                { id: 'all', name: "Все заявки в работе" },
                { id: 'free', name: "Все свободные заявки" }
            ],
            tasksFilter: "inWork",
            tasksFilterArray: [
                { id: 'all', name: "Все статусы работ" },
                { id: 'inWork', name: "Не начато и В работе" },
                { id: 'completed', name: "Завершено" }
            ],
            formTask: {
                id: 0,
                client: '',
                clientNote: '',
                cabinet: '',
                taskType: '',
                taskTypeRef: '',
                taskStatusId: '',
                executorId: '',
                executorNote: '',
                taskStatus: '',
                executor: '',
                systemBusinessState: ''
            },
            isDisabledEditForm: true,
            rules: {
                taskStatusId: [
                    { required: true, message: 'none', trigger: 'blur' }
                ],
                executorId: [
                    { required: true, message: 'none', trigger: 'blur' }
                ],
            }
        }
    },
    mounted() {
        this.tasksPosition = this.taskType;
        this.tasksFilter = this.taskFilter;
    },
    computed: {
        systemOperation() {
            if(store.state.systemOperation === "editTask" || store.state.systemOperation === "infoTask") {
                this.filledFormUpdate(this.task);
            }

            return store.state.systemOperation;
        },
        task() {
            return store.state.task;
        },
        isVisible() {
            return store.state.systemVisibleDialog;
        },
        taskStatuses() {
            return store.state.taskStatuses;
        },
        users() {
            return store.state.users;
        },
        profile() {
            return store.state.accountProfile;
        },
        taskVisibleMode() {
            return store.state.taskVisibleMode;
        }, 
        taskHistories() {
            return store.state.taskHistories;
        },
        taskType() {
            if(typeof(this.$route.params.taskType) === 'undefined') {
                return null;
            }
            else {
                return this.$route.params.taskType;
            }            
        },
        taskFilter() {
            if(typeof(this.$route.params.taskFilter) === 'undefined') {
                return null;
            }
            else {
                return this.$route.params.taskFilter;
            }            
        },
    },
    methods: {       
        //Формирование заголовка формы редактирования
        getCaptionForm() {
            return "Редактирование задачи";
        },
        //Заполнение модели данными о заявке
        filledFormUpdate(entity) {
            if(entity !== null) {
                this.formTask.id = entity.id;
                this.formTask.client = entity.client;
                this.formTask.cabinet = entity.cabinet;
                this.formTask.clientNote = entity.clientNote;
                this.formTask.taskType = entity.taskType;
                this.formTask.taskTypeRef = entity.taskTypeRef;
                this.formTask.taskStatusId = entity.taskStatusId;
                this.formTask.taskStatus = entity.taskStatus;

                switch(entity.systemBusinessState) {
                    case 0:
                        this.formTask.systemBusinessState = 'Открытая задача';
                    break;
                    case 1:
                        this.formTask.systemBusinessState = 'Закрытая задача';
                    break;
                    case 2:
                        this.formTask.systemBusinessState = 'Задача удалена постановщиком';
                    break;
                }

                if(typeof(entity.executorId) !== 'undefined') {
                    this.formTask.executorId = entity.executorId
                    this.formTask.executor = entity.executor.name;
                }
                else {
                    this.formTask.executorId = this.profile.id;
                }

                if(typeof(entity.executorNote) !== 'undefined') {
                    this.formTask.executorNote = entity.executorNote;
                }
            }
            else {
                this.formTask.id = 0;
                this.formTask.client = '';
                this.formTask.cabinet = '';
                this.formTask.clientNote = '';
                this.formTask.taskType = '';
                this.formTask.taskTypeRef = '';
                this.formTask.taskStatusId = '';
                this.formTask.executorId = '';
                this.formTask.executorNote = '';
                this.formTask.taskStatus = '';
                this.formTask.executor = '';
                this.formTask.systemBusinessState = '';
            }
        },
        //Отправка формы создания/редактирования заявки
        sendFormRequest(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let actionOptions = {
                        componentType: 'task',
                        options: {
                            visibleMode: -1,
                            entityJson: {
                                id: this.formTask.id,
                                executorId: this.formTask.executorId,
                                executorNote: this.formTask.executorNote,
                                taskStatusId: this.formTask.taskStatusId
                            }
                        }
                    };

                    if(this.taskType === "my") {
                        store.commit("setEntity", { componentType: "taskVisibleMode", payload: 0 });
                        actionOptions.options.visibleMode = 0;
                    }
                    else if(this.taskType === "all") {
                        store.commit("setEntity", { componentType: "taskVisibleMode", payload: 1 });
                        actionOptions.options.visibleMode = 1;
                    }
                    else if(this.taskType === "free") {
                        store.commit("setEntity", { componentType: "taskVisibleMode", payload: 2 });
                        actionOptions.options.visibleMode = 2;
                    }            

                    if(this.taskFilter !== null && this.taskFilter == 'inWork') {
                        actionOptions.params = "TaskStatus=InWork";
                    }
                    if(this.taskFilter !== null && this.taskFilter == 'all') {
                        actionOptions.params = "TaskStatus=All";
                    }
                    if(this.taskFilter !== null && this.taskFilter == 'completed') {
                        actionOptions.params = "TaskStatus=Completed";
                    }

                    store.commit("setSystemPreloader", true);

                    store.dispatch("updateEntity", actionOptions).then((response) => {
                        if(typeof(response.status) !== 'undefined' && response.status === 200) {
                            store.commit("setEntity", { componentType: "task", payload: null });
                            this.cancelForm();
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        //Изменение типа заявки для получения списка уточнения по типу заявки
        changeRequestTaskType(id) {
            if(id !== '' && id !== null && typeof(id) !== 'undefined') {
                this.formRequest.taskTypeRefId = '';
                
                store.dispatch("getEntities", {
                    componentType: 'taskTypeRef',
                    options: {
                        visibleMode: 0,
                        entityJson: {
                            taskTypeId: id
                        }
                    }
                });
            }
        },
        //Закрытие формы создания/редактирования заявки в верху формы
        handleClose(done) {
            this.$confirm('Вы действительно хотите выйти?')
                .then(() => {
                    done();
                    this.cancelForm();
                })
                .catch(() => {});
        },
        //Закрытие форм редактирования, очистка форм, сброс выделенных строк таблицы
        cancelForm() {
            store.commit("setSystemOperations", null);
            store.commit("setSystemVisibleDialog", false);

            this.filledFormUpdate(null);
        },
        //Закрытие формы "инфо о заявке" в верху формы
        handleCloseInfo(done) {
            done();
            this.cancelForm();
        },
        setHandle() {
            this.tasksPosition = this.taskType;         
        },
        //Событие переключения типа справочника в верхнем меню приложения    
        async handleChange() {
            store.commit("setEntity", { componentType: "task", payload: null });

            let actionOptions = {
                componentType: 'task',
                options: {
                    visibleMode: -1,
                    entityJson: {
                        executorId: this.profile.id
                    }
                }
            };

            store.commit("setSystemPreloader", true);            

            if(this.tasksPosition === "my") {
                store.commit("setEntity", { componentType: "taskVisibleMode", payload: 0 });
                actionOptions.options.visibleMode = 0;
            }
            else if(this.tasksPosition === "all") {
                store.commit("setEntity", { componentType: "taskVisibleMode", payload: 1 });
                actionOptions.options.visibleMode = 1;
            }
            else if(this.tasksPosition === "free") {
                store.commit("setEntity", { componentType: "taskVisibleMode", payload: 2 });
                actionOptions.options.visibleMode = 2;
            }

            if(this.tasksFilter !== null && this.tasksFilter == 'inWork') {
                actionOptions.params = "TaskStatus=InWork";
            }
            if(this.tasksFilter !== null && this.tasksFilter == 'all') {
                actionOptions.params = "TaskStatus=All";
            }
            if(this.tasksFilter !== null && this.tasksFilter == 'completed') {
                actionOptions.params = "TaskStatus=Completed";
            }

            store.dispatch("getEntities", actionOptions);

            let route = "/tasks/" + this.tasksPosition + "/filter/" + this.tasksFilter;
            if(this.$route.path !== route) {
                router.push(route);
            }
        },
    }
}
</script>

<style>
.form-item-task {
    margin-bottom: 0;
    margin-top: 0;
}

.form-control-left,
.form-control-right {
    margin-top: 20px;
}

.form-control-right {
    text-align: right;
}

.select-control {
    width: 100%;
}

.control-panel h3,
.control-panel h4 {
    text-align: center;
    color: rgb(110, 110, 110);
}

.form-button {
    margin-top: 10px;
}

.control-panel-table {
    margin-top: 10px;
}

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