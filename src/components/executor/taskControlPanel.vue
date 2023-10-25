<template>
    <div class="row">
        <div class="col-sx-12" v-bind:class="{ 'col-sm-4':(taskType !== 'free'), 'col-sm-12':(taskType === 'free') }">
            <el-card class="control-panel">
                <div class="row">
                    <div class="col-sm-2">
                        <el-button type="success" icon="el-icon-s-operation" size="mini" @click="callFilters" title="Вызвать фильтры" class="btn-control-panel" plain></el-button>                           
                    </div>
                    <div class="col-sm-10 control-panel-right">
                        <el-button type="primary" icon="el-icon-refresh" plain size="mini" @click="handleChange" title="Обновить" class="btn-control-panel"></el-button>
                        <el-button type="primary" icon="el-icon-edit" plain size="mini" v-if="task !== null && task.id > 0 && task.systemBusinessState !== 2 && checkTaskFreeOrMy()" @click="callEditForm" title="Редактировать задачу" class="btn-control-panel"></el-button>
                        <el-button type="primary" icon="el-icon-info" plain size="mini" v-if="task !== null && task.id > 0" @click="callInfoForm" title="Информация о задаче" class="btn-control-panel"></el-button>
                        <el-button type="primary" icon="el-icon-time" plain size="mini" v-if="task !== null && task.id > 0" @click="callHistoryForm" title="История работы над задачей" class="btn-control-panel"></el-button>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="col-sm-4 col-xs-12" v-if="taskType !== 'free'">
            <el-card class="control-panel">
                <div class="row">
                    <div class="col-sm-12 control-panel-search">
                        <el-input
                        placeholder="Поиск задачи по описанию клиента"
                        prefix-icon="el-icon-search"
                        class="input-search"
                        @input="filterTableDataClientNote"
                        v-model="searchClientNoteModel"
                        clearable
                        size="mini">
                        </el-input>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="col-sm-4 col-xs-12" v-if="taskType !== 'free'">
            <el-card class="control-panel">
                <div class="row">
                    <div class="col-sm-12 control-panel-search">
                        <el-input
                        placeholder="Поиск задачи по описанию исполнителя"
                        prefix-icon="el-icon-search"
                        class="input-search"
                        @input="filterTableDataExecutorNote"
                        v-model="searchExecutorNoteModel"
                        clearable
                        size="mini">
                        </el-input>
                    </div>
                </div>
            </el-card>
        </div>        
    </div>
</template>

<script>
import store from '@/store';
import router from '@/router';

export default {
    data() {
        return {
            searchClientNoteModel: '',
            searchExecutorNoteModel: ''
        }
    },
    mounted() {
        store.dispatch("getEntities", {
            componentType: 'taskStatus',
            options: {
                visibleMode: 1
            }
        });

        setTimeout(() => {
            if(this.profile !== null) {
                this.handleChange(); 
            }
            else {
                store.dispatch("getAccount").then(() => {
                    this.handleChange(); 
                })
            }            
        }, 300);      
    },
    computed: {
        task() {
            return store.state.task;
        },
        profile() {
            return store.state.accountProfile;
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

            store.dispatch("getEntities", actionOptions);

            let route = "/tasks/" + this.taskType + "/filter/" + this.taskFilter;
            if(this.$route.path !== route) {
                router.push(route);
            }
        },
        //Фильтрация записей справочника задач по описанию клиента, поля для фильтрации задаются в методе (фильтрующее условие содержит - ИЛИ)
        filterTableDataClientNote() {
            store.commit("setEntity", { componentType: "task", payload: null });

            this.searchExecutorNoteModel = '';

            let actionOptions = {
                componentType: 'task',
                options: {
                    visibleMode: -1,
                    entityJson: {
                        executorId: this.profile.id
                    }
                },
                params: "ClientNote=" + this.searchClientNoteModel.toLowerCase()
            };

            if(this.taskType === "my") {
                actionOptions.options.visibleMode = 0;
            }
            else if(this.taskType === "all") {
                actionOptions.options.visibleMode = 1;
            }

            if(this.taskFilter !== null && this.taskFilter == 'inWork') {
                actionOptions.params += "&TaskStatus=InWork";
            }
            if(this.taskFilter !== null && this.taskFilter == 'all') {
                actionOptions.params += "&TaskStatus=All";
            }
            if(this.taskFilter !== null && this.taskFilter == 'completed') {
                actionOptions.params += "&TaskStatus=Completed";
            }

            store.dispatch("getEntities", actionOptions);
        },
        //Фильтрация записей справочника задач по описанию клиента, поля для фильтрации задаются в методе (фильтрующее условие содержит - ИЛИ)
        filterTableDataExecutorNote() {
            store.commit("setEntity", { componentType: "task", payload: null });

            this.searchClientNoteModel = '';

            let actionOptions = {
                componentType: 'task',
                options: {
                    visibleMode: -1,
                    entityJson: {
                        executorId: this.profile.id
                    }
                },
                params: "ExecutorNote=" + this.searchExecutorNoteModel.toLowerCase()
            };

            if(this.taskType === "my") {
                actionOptions.options.visibleMode = 0;
            }
            else if(this.taskType === "all") {
                actionOptions.options.visibleMode = 1;
            }

            if(this.taskFilter !== null && this.taskFilter == 'inWork') {
                actionOptions.params += "&TaskStatus=InWork";
            }
            if(this.taskFilter !== null && this.taskFilter == 'all') {
                actionOptions.params += "&TaskStatus=All";
            }
            if(this.taskFilter !== null && this.taskFilter == 'completed') {
                actionOptions.params += "&TaskStatus=Completed";
            }

            store.dispatch("getEntities", actionOptions);
        },
        //Вызов формы редактирования заявки
        callEditForm() {
            store.dispatch("getEntities", {
                componentType: 'taskStatus',
                options: {
                    visibleMode: 1
                }
            });

            let actionOptions = {
                componentType: 'user',
                options: {
                    visibleMode: 0
                }
            };            

            let profileRole = this.profile.userRole.systemRole;
            let profileType = this.profile.userType.systemUserType;

            if(profileRole === 300 && profileType === 400) {
                actionOptions.params = "Id=" + this.profile.id;
            }
            else if(profileType === 400 && (profileRole === 400 || profileRole === 500)) {
                actionOptions.params = "UserTypeId=" + this.profile.userType.id;
            }

            store.dispatch("getEntities", actionOptions);

            store.commit("setSystemOperations", "editTask");
            store.commit("setSystemVisibleDialog", true);
        },
        //Вызов диалогового окна - карточка информации о задаче
        callInfoForm() {
            store.commit("setSystemOperations", "infoTask");
            store.commit("setSystemVisibleDialog", true);
        },
        //Вызов формы истории операций над заявкой
        callHistoryForm() {
            store.dispatch("getEntities", {
                componentType: 'taskHistory',
                options: {
                    visibleMode: 0
                },
                params: "TaskId=" + store.state.task.id
            });

            store.commit("setSystemOperations", "historyTask");
            store.commit("setSystemVisibleDialog", true);
        },
        //Вызов пользовательских фильтров внизу экрана
        callFilters() {
            this.handleChange();

            store.commit("setSystemOperations", "filterTask");
            store.commit("setSystemVisibleDialog", true);
        },
        //Проверка того, что задача свободна либо исполнитель - авторизованный пользователь
        checkTaskFreeOrMy() {
            if(this.task !== null && (typeof(this.task.executorId) == 'undefined' 
            || this.task.executorId === this.profile.id)
            || this.profile.userType.systemUserType === 400) {
                return true;
            }

            return false;
        }
    }
}
</script>

<style>
.control-panel {
    margin-top: 10px;
    margin-bottom: 10px;
}

.control-panel .el-card__body,
.control-panel-box .el-card__body {
    padding: 10px;
}

.switch-text {
    margin-left: 10px;
    font-size: 0.9em;
}

.control-panel-right {
    text-align: right;
}

.control-panel-search {
    width: 100%;
}
</style>
