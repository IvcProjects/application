<template>
    <div class="row">
        <div class="col-sm-6 col-sx-12">
            <el-card
            v-bind:class="{ 'control-panel':(darkTheme === false), 'control-panel-dark':(darkTheme === true) }">
                <div class="row">
                    <div class="col-sm-4 panel-switch">
                        <el-switch
                            v-model="requestsPosition"
                            active-color="#7BC9B4"
                            active-value="my"
                            inactive-color="#F0B593"
                            inactive-value="all"
                            @change="handleChange">
                        </el-switch>
                        <span v-if="requestsPosition === 'all'" class="switch-text">Заявки кабинета</span>
                        <span v-if="requestsPosition === 'my'" class="switch-text">Мои заявки</span>                                
                    </div>
                    <div class="col-sm-8 control-panel-right">
                        <el-button type="primary" icon="el-icon-refresh" size="medium" @click="handleChange" title="Обновить" class="btn-control-panel"></el-button>
                        <el-button type="primary" icon="el-icon-edit" size="medium" v-if="checkVisibleEditAndDeleteButtons(request)" @click="callEditForm" title="Редактировать заявку" class="btn-control-panel"></el-button>
                        <el-button type="primary" icon="el-icon-info" size="medium" v-if="request !== null && request.id > 0" @click="callInfoForm" title="Информация о заявке" class="btn-control-panel"></el-button>
                        <el-button type="primary" icon="el-icon-time" size="medium" v-if="request !== null && request.id > 0 && request.clientId === profile.id" @click="callHistoryForm" title="История работы над заявкой" class="btn-control-panel"></el-button>
                        <el-popover
                        placement="bottom"
                        width="220"
                        v-model="isVisibleFormDelete"
                        v-if="request !== null && request.id > 0 && request.clientId === profile.id"
                        @after-leave="closeDeleteForm">
                            <div class="container">
                                <div class="row">
                                    <div class="col-sm-12" v-if="isCheckBeforeDelete">
                                        <p class="p-delete-message">Невозможно удалить заявку, так как ее уже взяли в работу.</p>
                                    </div>
                                    <div class="col-sm-12" v-if="isCheckBeforeDelete === false">
                                        <p>Вы действительно хотите удалить заявку?</p>
                                    </div>
                                    <div class="col-sm-6 form-control-left" v-if="isCheckBeforeDelete === false">
                                        <el-button type="info" size="mini"  @click="closeDeleteForm" >Отмена</el-button>
                                    </div>
                                    <div class="col-sm-6 form-control-right" v-if="isCheckBeforeDelete === false">
                                        <el-button type="danger" size="mini" @click="sendDeleteRequest">Удалить</el-button>
                                    </div>
                                </div>
                            </div>
                            <el-button class="btn-delete" slot="reference" type="danger" icon="el-icon-delete" size="medium" v-if="checkVisibleEditAndDeleteButtons(request)" @click="callDeleteForm" title="Удалить заявку"></el-button>
                        </el-popover>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="col-sm-6 col-xs-12">
            <el-card 
            v-bind:class="{ 'control-panel':(darkTheme === false), 'control-panel-dark':(darkTheme === true) }">
                <div class="row">
                    <div class="col-sm-12 control-panel-search">
                        <el-input
                        placeholder="Поиск заявки по описанию"
                        prefix-icon="el-icon-search"
                        v-bind:class="{ 'input-search':(darkTheme === false), 'input-search-dark':(darkTheme === true) }"
                        @input="filterTableData"
                        v-model="searchModel"
                        clearable
                        size="medium">
                        </el-input>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import store from '@/store';

export default {
    data() {
        return {
            requestsPosition: 'my',
            searchModel: '',
            isCheckBeforeDelete: false,
            isVisibleFormDelete: false,
        }
    },
    mounted() {
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

        setInterval(() => {
            if(this.profile !== null) {
                this.handleChange(); 
            }
            else {
                store.dispatch("getAccount").then(() => {
                    this.handleChange(); 
                })
            }   
        }, 60000)
    },
    computed: {
        request() {
            return store.state.request;
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
        //Событие переключения типа справочника в верхнем меню приложения    
        async handleChange() {
            store.commit("setEntity", { componentType: "request", payload: null });

            let actionOptions = {
                componentType: 'request',
                options: {
                    visibleMode: -1,
                    entityJson: {
                        clientId: this.profile.id,
                        cabinet: this.profile.cabinet,
                    }
                }
            };

            store.commit("setSystemPreloader", true);

            if(this.requestsPosition === "my") {
                store.commit("setEntity", { componentType: "requestVisibleMode", payload: 0 });
                actionOptions.options.visibleMode = 0;
            }
            else if(this.requestsPosition === "all") {
                store.commit("setEntity", { componentType: "requestVisibleMode", payload: 1 });
                actionOptions.options.visibleMode = 1;
            }

            store.dispatch("getEntities", actionOptions);
        },
        //Фильтрация записей справочника, поля для фильтрации задаются в методе (фильтрующее условие содержит - ИЛИ)
        filterTableData() {
            store.commit("setEntity", { componentType: "request", payload: null });

            let actionOptions = {
                componentType: 'request',
                options: {
                    visibleMode: -1,
                    entityJson: {
                        clientId: this.profile.id,
                        cabinet: this.profile.cabinet,
                    }
                },
                params: "ClientNote=" + this.searchModel.toLowerCase()
            };

            if(this.requestsPosition === "my") {
                actionOptions.options.visibleMode = 0;
            }
            else if(this.requestsPosition === "all") {
                actionOptions.options.visibleMode = 1;
            }

            store.dispatch("getEntities", actionOptions);
        },
        //Проверка отображения кнопок на панели управления - редактирование заявки и удаление
        checkVisibleEditAndDeleteButtons(entity) {
            if(entity !== null && typeof(entity) !== 'undefined' 
                && typeof(entity.executorId) === 'undefined'
                && entity.clientId === this.profile.id) {
                return true;
            }

            return false;
        },
        //Вызов формы редактирования заявки
        callEditForm() {
            store.commit("setSystemOperations", "editRequest");
            store.commit("setSystemVisibleDialog", true);
        },
        //Вызов диалогового окна - карточка информации о заявке
        callInfoForm() {
            store.commit("setSystemOperations", "infoRequest");
            store.commit("setSystemVisibleDialog", true);
        },
        //Вызов формы истории операций над заявкой
        callHistoryForm() {
            store.dispatch("getEntities", {
                componentType: 'taskHistory',
                options: {
                    visibleMode: 0
                },
                params: "TaskId=" + store.state.request.id
            });

            store.commit("setSystemOperations", "historyRequest");
            store.commit("setSystemVisibleDialog", true);
        },
        //Вызов формы удаления
        async callDeleteForm() {
            //1 запрос сущности задачи
            let actionOptions = {
                id: this.request.id,
                componentType: 'request'
            };

            //2 Проверяем, возможно ли удалить заявку                
            await store.dispatch("checkEntity", actionOptions).then((response) => {
                if(typeof(response.status) !== 'undefined' && response.status === 200) {
                    this.isCheckBeforeDelete = response.data.payload
                    this.isVisibleFormDelete = true;

                    store.commit("setSystemOperations", "deleteRequest");
                }
            }); 
        },
        //Отправка формы удаления зявки
        sendDeleteRequest() {
            let actionOptions = {
                componentType: 'request',
                options: {
                    visibleMode: -1,
                    entityJson: {
                        id: this.request.id,
                        clientId: this.request.clientId,
                        cabinet: this.request.cabinet
                    }
                }
            };

            if(this.requestsPosition === "my") {
                actionOptions.options.visibleMode = 0;
            }
            else if(this.requestsPosition === "all") {
                actionOptions.options.visibleMode = 1;
            }

            store.dispatch("deleteEntity", actionOptions).then((response) => {
                if(typeof(response.status) !== 'undefined' && response.status === 200) {
                    this.closeDeleteForm();
                }
            });
        },
        //Закрытие формы удаления
        closeDeleteForm() {
            this.isCheckBeforeDelete = false;
            this.isVisibleFormDelete = false;

            store.commit("setSystemOperations", null);
            store.commit("setEntity", { componentType: "request", payload: null });

            this.handleChange();
        }
    }
}
</script>

<style>
.control-panel,
.control-panel-dark {
    margin-top: 10px;
    margin-bottom: 10px;
}

.panel-switch {
    text-align: left;
}

.control-panel .el-card__body,
.control-panel-box .el-card__body,
.control-panel-dark .el-card__body,
.control-panel-box-dark .el-card__body {
    padding: 10px;
}

.control-panel-dark,
.control-panel-box-dark {
    background: #252836;
    border: 1px solid #252836;    
}

.control-panel-dark,
.input-search-dark input[type="text"] {
    color: #FDFDFD;
}

.switch-text {
    margin-left: 10px;
    font-size: 0.9em;
}

.control-panel-right {
    text-align: right;
}

.btn-delete {
    margin-left: 10px;
}

.p-delete-message {
    word-break: normal;    
}

.control-panel-search {
    width: 100%;
}

.input-search-dark input[type="text"] {
    background: #2D303E;
}
</style>
