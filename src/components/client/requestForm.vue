<template>
    <div>
        <el-drawer
        v-if="systemOperation === 'createRequest' || systemOperation === 'editRequest'"
        :before-close="handleClose"
        :visible="isVisible"
        direction="ltr"
        custom-class="demo-drawer"  
        size="90%"      
        v-bind:class="{ 'el-dialog-light':(darkTheme === false), 'el-dialog-dark':(darkTheme === true) }">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <el-form 
                        :model="formRequest"
                        :rules="rules"
                        :show-message="false"
                        ref="formRequest">
                            <el-card v-bind:class="{ 'control-panel':(darkTheme === false), 'control-panel-dark':(darkTheme === true) }">
                                <h4>{{getCaptionForm()}}</h4>                                
                                <el-form-item label="Тип работ" prop="taskTypeId" class="form-item-request">
                                    <el-select 
                                    v-model="formRequest.taskTypeId" 
                                    placeholder="Выберите тип заявки" 
                                    size="medium" 
                                    class="select-control input-form-select" 
                                    v-if="taskTypes !== null && taskTypes.length > 0" 
                                    clearable 
                                    @change="changeRequestTaskType(formRequest.taskTypeId)">
                                        <el-option
                                            v-for="item in taskTypes"
                                            :key="item.id"
                                            :label="item.description"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="Уточнение" class="form-item-request">
                                    <el-select 
                                    v-model="formRequest.taskTypeRefId" 
                                    placeholder="Выберите уточнение для заявки" 
                                    size="medium" 
                                    class="select-control input-form-select"
                                    clearable>
                                        <el-option
                                            v-for="item in taskTypeRefs"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="Кабинет" prop="cabinet" class="form-item-request">
                                    <el-input
                                    placeholder="Введите номер кабинета"
                                    size="medium"
                                    clearable=""
                                    v-model="formRequest.cabinet"
                                    class="input-form-text">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="Описание" prop="clientNote" class="form-item-request">
                                    <el-input
                                    placeholder="Введите описание"
                                    type="textarea"
                                    :rows="5"
                                    size="medium"
                                    clearable
                                    v-model="formRequest.clientNote"
                                    class="input-form-text">
                                    </el-input>
                                </el-form-item>
                                <div class="row">
                                    <div class="col-6 form-control-left">
                                        <el-button type="info" size="medium" @click="cancelForm" class="btn-control-panel">Отмена</el-button>                            
                                    </div>
                                    <div class="col-6 form-control-right">
                                        <el-button type="success" size="medium" @click="sendFormRequest('formRequest')">Сохранить</el-button>
                                    </div>
                                </div>                                
                            </el-card>                            
                        </el-form>              
                    </div>                    
                </div>
            </div>            
        </el-drawer>
        <el-dialog
        v-if="systemOperation === 'infoRequest'"
        :before-close="handleCloseInfo"
        :visible="isVisible"
        v-bind:class="{ 'el-dialog-light':(darkTheme === false), 'el-dialog-dark':(darkTheme === true) }">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <el-form 
                        :model="formRequest"
                        ref="formInfoTask">
                            <el-card 
                            v-bind:class="{ 'control-panel':(darkTheme === false), 'control-panel-dark':(darkTheme === true) }">
                                <h4>Информация о задаче</h4>
                                <div class="row">
                                    <div class="col-sm-6">
                                            <el-form-item label="Клиент" class="form-item-task">
                                                <el-input
                                                size="medium"
                                                v-model="formRequest.client"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>                                        
                                            <el-form-item label="Тип задачи" class="form-item-task">
                                                <el-input
                                                size="medium"
                                                v-model="formRequest.taskType"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="Тип задачи (уточнение)" class="form-item-task">
                                                <el-input
                                                size="medium"
                                                v-model="formRequest.taskTypeRef"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="Описание клиента" class="form-item-task">
                                                <el-input
                                                type="textarea"
                                                :rows="5"
                                                size="medium"
                                                clearable
                                                v-model="formRequest.clientNote"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>
                                        </div>
                                        <div class="col-sm-6">
                                            <el-form-item label="Кабинет" prop="cabinet" class="form-item-task">
                                                <el-input
                                                size="medium"
                                                clearable=""
                                                v-model="formRequest.cabinet"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="Статус задачи" class="form-item-task">
                                                <el-input
                                                size="medium"
                                                v-model="formRequest.taskStatus"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="Исполнитель" class="form-item-task">
                                                <el-input
                                                size="medium"
                                                v-model="formRequest.executor"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="Описание исполнителя" class="form-item-task">
                                                <el-input
                                                type="textarea"
                                                :rows="5"
                                                size="medium"
                                                clearable
                                                v-model="formRequest.executorNote"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>
                                        </div>
                                    <div class="col-sm-12">
                                        <el-form-item label="Бизнес-статус записи задачи" class="form-item-task">
                                                <el-input
                                                size="medium"
                                                v-model="formRequest.systemBusinessState"
                                                class="input-form-text"
                                                disabled>
                                                </el-input>
                                            </el-form-item>                                        
                                    </div>
                                    <div class="col-sm-12 text-center form-button">
                                        <el-button size="medium" type="primary" @click="cancelForm">Закрыть</el-button>
                                    </div>
                                </div>
                            </el-card>
                        </el-form>                        
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-drawer
        v-if="systemOperation === 'historyRequest'"
        :before-close="handleClose"
        :visible="isVisible"
        direction="rtl"
        size="70%"
        v-bind:class="{ 'el-dialog-light':(darkTheme === false), 'el-dialog-dark':(darkTheme === true) }">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <el-card v-bind:class="{ 'control-panel':(darkTheme === false), 'control-panel-dark':(darkTheme === true) }">
                            <h4>История операций над задачей</h4>
                            <div class="row">
                                <div class="col-sm-12"
                                v-bind:class="{ 'control-panel-table':(darkTheme === false), 'control-panel-table-dark':(darkTheme === true) }">
                                    <el-table 
                                    header-cell-class-name="table-th"
                                    cell-class-name="table-td"
                                    ref="requestHistories"
                                    :data="requestHistories"
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
    </div> 
</template>

<script>
import store from '@/store';

export default{
    data() {
        return {
            formRequest: {
                id: 0,
                clientId: 0,
                taskTypeId: '',
                taskTypeRefId: '',
                cabinet: '',
                clientNote: '',
                client: '',
                taskType: '',
                taskTypeRef: '',
                executorNote: '',
                taskStatus: '',
                executor: '',
                systemBusinessState: ''
            },
            rowId: '',
            rules: {
                taskTypeId: [
                    { required: true, message: 'none', trigger: 'blur' }
                ],
                cabinet: [
                    { required: true, message: 'none', trigger: 'blur' }
                ],
                clientNote: [
                    { required: true, message: 'none', trigger: 'blur' }
                ],
            }
        }
    },
    computed: {
        systemOperation() {
            if(store.state.systemOperation === "createRequest") {
                this.filledFormUpdate(null)
            }
            else if(store.state.systemOperation === "editRequest" || store.state.systemOperation === "infoRequest") {
                this.filledFormUpdate(store.state.request);
            }

            return store.state.systemOperation;
        },
        isVisible() {
            return store.state.systemVisibleDialog;
        }, 
        taskTypes() {
            return store.state.taskTypes;
        },
        taskTypeRefs() {
            return store.state.taskTypeRefs;
        },
        profile() {
            return store.state.accountProfile;
        },
        requestVisibleMode() {
            return store.state.requestVisibleMode;
        }, 
        requestHistories() {
            return store.state.taskHistories;
        },
        darkTheme() {
            if(store.state.accountProfile !== null) {
                return store.state.accountProfile.isDarkTheme;
            }

            return false;
        }
    },
    methods: {       
        //Формирование заголовка формы редактирования
        getCaptionForm() {
            switch(this.systemOperation) {
                case "createRequest":
                    return "Создание новой заявки";
                case "editRequest":                    
                    return "Редактирование заявки";
                default:
                    return "";
            }
        },
        //Заполнение модели данными о заявке
        filledFormUpdate(entity) {
            if(entity !== null) {
                this.formRequest.id = entity.id;
                this.formRequest.taskTypeId = entity.taskTypeId;
                
                this.changeRequestTaskType(this.formRequest.taskTypeId);

                if(typeof(entity.taskTypeRefId) !== 'undefined') {
                    this.formRequest.taskTypeRefId = entity.taskTypeRefId;
                }

                this.formRequest.cabinet = entity.cabinet;
                this.formRequest.clientNote = entity.clientNote;
                this.formRequest.clientId = entity.clientId;

                this.formRequest.client = entity.client;
                this.formRequest.taskType = entity.taskType;

                if(typeof(entity.taskTypeRef) !== 'undefined') {
                    this.formRequest.taskTypeRef = entity.taskTypeRef;
                }
                
                this.formRequest.taskStatus = entity.taskStatus;

                switch(entity.systemBusinessState) {
                    case 0:
                        this.formRequest.systemBusinessState = 'Открытая заявка';
                    break;
                    case 1:
                        this.formRequest.systemBusinessState = 'Закрытая заявка';
                    break;
                    case 2:
                        this.formRequest.systemBusinessState = 'Заявка удалена постановщиком';
                    break;
                }

                if(typeof(entity.executorId) !== 'undefined') {
                    this.formRequest.executor = entity.executor.name;
                }

                if(typeof(entity.executorNote) !== 'undefined') {
                    this.formRequest.executorNote = entity.executorNote;
                }
            }
            else {
                this.formRequest.taskTypeId = '';
                this.formRequest.taskTypeId = '';
                this.formRequest.taskTypeRefId = '';
                this.formRequest.clientNote = '';
                this.formRequest.clientId = 0;
                this.formRequest.id = 0;
                this.formRequest.client = '';
                this.formRequest.taskType = '';
                this.formRequest.taskTypeRef = '';
                this.formRequest.taskStatus = '';
                this.formRequest.systemBusinessState = '';
                this.formRequest.executor = '';
                this.formRequest.executorNote = '';

                let taskTypeMaintanance = this.taskTypes.find(t => t.systemTaskType === 1);

                if(taskTypeMaintanance !== null && typeof(taskTypeMaintanance) !== 'undefined') {
                    this.formRequest.taskTypeId = taskTypeMaintanance.id;

                    this.changeRequestTaskType(taskTypeMaintanance.id);

                    this.formRequest.cabinet = this.profile.cabinet;
                }
            }
        },
        //Отправка формы создания/редактирования заявки
        sendFormRequest(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let actionOptions = {
                        componentType: 'request',
                        options: {
                            visibleMode: -1,
                            entityJson: {
                                clientId: this.profile.id,
                                clientNote: this.formRequest.clientNote,
                                cabinet: this.formRequest.cabinet,
                                taskTypeId: this.formRequest.taskTypeId,
                                taskTypeRefId: this.formRequest.taskTypeRefId
                            }
                        }
                    };

                    actionOptions.options.visibleMode = this.requestVisibleMode;

                    switch(this.systemOperation) {
                        case "createRequest":
                            store.commit("setSystemPreloader", true);

                            store.dispatch("createEntity", actionOptions).then((response) => {
                                if(typeof(response.status) !== 'undefined' && response.status === 201) {                                    
                                    store.commit("setEntity", { componentType: "request", payload: null });
                                    this.cancelForm();
                                }
                            });
                        break;
                        case "editRequest":
                            store.commit("setSystemPreloader", true);

                            actionOptions.options.entityJson.id = this.formRequest.id;
                            actionOptions.options.entityJson.clientId = this.formRequest.clientId;

                            store.dispatch("updateEntity", actionOptions).then((response) => {
                                if(typeof(response.status) !== 'undefined' && response.status === 200) {                                     
                                    store.commit("setEntity", { componentType: "request", payload: null });
                                    this.cancelForm();
                                }
                            });
                        break;
                    }                    
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
        }
    }
}
</script>

<style>
.form-item-request {
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

.control-panel h4 {
    text-align: center;
    color: rgb(110, 110, 110);
}

.control-panel-dark {    
    text-align: center;
}

.el-dialog-dark .el-dialog,
.el-dialog-dark .el-drawer {
    background: #1F1D2B;
}

.el-dialog-dark .el-drawer .input-form-text input[type="text"],
.el-dialog-dark .el-drawer .input-form-text textarea,
.el-dialog-dark .el-drawer .select-control input[type="text"],
.el-dialog-dark .el-dialog .input-form-text input[type="text"],
.el-dialog-dark .el-dialog .input-form-text textarea,
.el-dialog-dark .el-dialog .select-control input[type="text"]{
    background: #2D303E!important;
}

.control-panel-dark,
.el-dialog-dark .input-form-text input[type="text"],
.el-dialog-dark .input-form-text textarea,
.el-dialog-dark .select-control input[type="text"] {
    color: #FDFDFD;
}

.el-dialog-dark .el-drawer td {
    color: #7CADC6;
}
</style>