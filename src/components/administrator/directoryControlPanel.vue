<template>
    <div class="row">
      <div class="col-sm-12 col-xs-12">
        <el-card class="control-panel">
            <div class="row">
                <div class="col-sm-9">
                    <el-radio-group v-model="businessComponent" size="small" @change="handleChange">
                        <el-radio-button label="control">Управления</el-radio-button>
                        <el-radio-button label="department">Отделы</el-radio-button>
                        <el-radio-button label="sector">Секторы</el-radio-button>
                        <el-radio-button label="address">Адреса</el-radio-button>
                        <el-radio-button label="taskType">Типы заявок (Основные)</el-radio-button>
                        <el-radio-button label="taskTypeRef">Типы заявок (Уточнение)</el-radio-button>
                        <el-radio-button label="taskStatus">Статусы заявок</el-radio-button>
                        <el-radio-button label="user">Пользователи</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="col-sm-3 control-panel-right">
                    <el-button type="primary" icon="el-icon-refresh" size="mini" @click="handleChange" title="Обновить" class="btn-control-panel"></el-button>
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="callEditForm()" title="Редактировать запись" class="btn-control-panel" v-if="systemDirectory !== null && systemDirectory.id > 0"></el-button>
                    <el-popover
                    placement="bottom"
                    width="220"
                    v-model="isVisibleFormDelete"
                    v-if="systemDirectory !== null && systemDirectory.id > 0"
                    @after-leave="closeDeleteForm">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12" v-if="isCheckBeforeDelete">
                                <p class="p-delete-message">Невозможно удалить запись, так как она имеет связанные записи в БД.</p>
                            </div>
                            <div class="col-sm-12" v-if="isCheckBeforeDelete === false">
                                <p>Вы действительно хотите удалить запись?</p>
                            </div>
                            <div class="col-sm-6 form-control-left" v-if="isCheckBeforeDelete === false">
                                <el-button type="info" size="mini"  @click="closeDeleteForm" >Отмена</el-button>
                            </div>
                            <div class="col-sm-6 form-control-right" v-if="isCheckBeforeDelete === false">
                                <el-button type="danger" size="mini" @click="sendDeleteRequest">Удалить</el-button>
                            </div>
                        </div>
                    </div>
                    <el-button class="btn-delete" slot="reference" type="danger" icon="el-icon-delete" size="mini" @click="callDeleteForm" title="Удалить запись"></el-button>
                    </el-popover>
                </div>
                <div class="col-sm-12 control-panel-search">
                    <el-input
                    placeholder="Поиск записи по названию"
                    prefix-icon="el-icon-search"
                    @input="filterTableData"
                    v-model="searchModel"
                    clearable
                    size="small">
                    </el-input>
                </div>
            </div>
        </el-card>
      </div>
      <el-drawer
        v-if="systemOperation === 'createUser' || systemOperation === 'editUser'"
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
                        :model="user"
                        :rules="rules"
                        :show-message="false"
                        ref="formUser">
                            <el-card class="control-panel">
                                <h3>{{getCaptionForm()}}</h3> 
                                <div class="row">
                                    <div class="col-sm-6">
                                        <el-form-item prop="surname" label="Фамилия" class="form-item-directory">
                                            <el-input
                                            placeholder="Фамилия"
                                            size="small"
                                            clearable
                                            v-model="user.surname">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item prop="name" label="Имя" class="form-item-directory">
                                            <el-input
                                            placeholder="Имя"
                                            size="small"
                                            clearable
                                            v-model="user.name">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item prop="patronymic" label="Отчество" class="form-item-directory">
                                            <el-input
                                            placeholder="Отчество"
                                            size="small"
                                            clearable
                                            v-model="user.patronymic">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item prop="position" label="Должность" class="form-item-directory">
                                            <el-input
                                            placeholder="Должность"
                                            size="small"
                                            clearable
                                            v-model="user.position">
                                            </el-input>
                                        </el-form-item>                
                                        <el-form-item prop="cabinet" label="Кабинет" class="form-item-directory">
                                            <el-input
                                            placeholder="Кабинет"
                                            size="small"
                                            clearable
                                            v-model="user.cabinet">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item prop="addressId" label="Адрес" class="form-item-directory" v-if="addresses !== null && addresses.length > 0">
                                            <el-select 
                                            v-model="user.addressId" 
                                            placeholder="Выберите адрес" 
                                            size="small" 
                                            class="select-controls"                    
                                            clearable>
                                                <el-option
                                                    v-for="item in addresses"
                                                    :key="item.id"
                                                    :label="item.fullAddress"
                                                    :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item prop="userTypeId" label="Тип пользователя" class="form-item-directory" v-if="userTypes !== null && userTypes.length > 0" >
                                            <el-select 
                                            v-model="user.userTypeId" 
                                            placeholder="Тип пользователя" 
                                            size="small" 
                                            class="select-controls"                   
                                            disabled>
                                                <el-option
                                                    v-for="item in userTypes"
                                                    :key="item.id"
                                                    :label="item.description"
                                                    :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6">
                                        <el-form-item prop="userRoleId" label="Роль пользователя" class="form-item-directory" v-if="userRoles !== null && userRoles.length > 0" >
                                            <el-select 
                                            v-model="user.userRoleId" 
                                            placeholder="Выберите роль" 
                                            size="small" 
                                            class="select-controls">
                                                <el-option
                                                    v-for="item in userRoles"
                                                    :key="item.id"
                                                    :label="item.description"
                                                    :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item prop="login" label="Логин" class="form-item-directory">
                                            <el-input
                                            placeholder="Логин"
                                            size="small"
                                            clearable
                                            prefix-icon="el-icon-user"
                                            v-model="user.login">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item prop="password" label="Пароль" class="form-item-directory">
                                            <el-input
                                            placeholder="Пароль"
                                            size="small"
                                            clearable
                                            prefix-icon="el-icon-lock"
                                            show-password
                                            v-model="user.password">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item prop="passwordRepeat" label="Повторите пароль" class="form-item-directory">
                                            <el-input
                                            placeholder="Повторите пароль"
                                            size="small"
                                            clearable
                                            prefix-icon="el-icon-lock"
                                            show-password
                                            v-model="user.passwordRepeat">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item prop="controlId" label="Управление" class="form-item-directory">
                                            <el-select 
                                            v-model="user.controlId" 
                                            placeholder="Выберите управление" 
                                            size="small" 
                                            class="select-controls" 
                                            v-if="controls !== null && controls.length > 0" 
                                            @change="changeUserControls(user.controlId)">
                                                <el-option
                                                    v-for="item in controls"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item prop="departmentId" label="Отдел" class="form-item-directory" v-if="departments !== null && departments.length > 0" >
                                            <el-select 
                                            v-model="user.departmentId" 
                                            placeholder="Выберите отдел" 
                                            size="small" 
                                            class="select-controls"
                                            clearable
                                            @change="changeUserDepartments(user.departmentId)">
                                                <el-option
                                                    v-for="item in departments"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item prop="sectorId" label="Сектор" class="form-item-directory" v-if="sectors !== null && sectors.length > 0">
                                            <el-select 
                                            v-model="user.sectorId" 
                                            placeholder="Выберите сектор" 
                                            size="small" 
                                            class="select-controls"
                                            clearable>
                                                <el-option
                                                    v-for="item in sectors"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div> 
                                <div class="row">
                                    <div class="col-6 form-control-left">
                                        <el-button type="info" size="small" @click="cancelForm" class="btn-control-panel">Отмена</el-button>                            
                                    </div>
                                    <div class="col-6 form-control-right">
                                        <el-button type="success" size="small" @click="sendForm('formUser')">Сохранить</el-button>
                                    </div>
                                </div>                                
                            </el-card>                            
                        </el-form>              
                    </div>                    
                </div>
            </div>            
        </el-drawer>
    </div>
</template>

<script>
import store from '@/store';
import { Message } from "element-ui";

export default {
    data() {
        return {
            searchModel: '',
            isCheckBeforeDelete: false,
            isVisibleFormDelete: false,
            user: {
                id: 0,
                surname: '',
                name: '',
                patronymic: '',
                position: '',
                cabinet: '',
                controlId: '',
                departmentId: '',
                sectorId: '',
                addressId: '',        
                userTypeId: '',
                userRoleId: '',
                login: '',
                password: '',
                passwordRepeat: ''
            },
            rules: {
                name: [
                { required: true, message: 'none', trigger: 'blur' }
                ],
                surname: [
                { required: true, message: 'none', trigger: 'blur' }
                ],
                patronymic: [
                { required: false, message: 'none', trigger: 'blur' }
                ],
                position: [
                { required: true, message: 'none', trigger: 'blur' }
                ],
                cabinet: [
                { required: true, message: 'none', trigger: 'blur' }
                ],
                userTypeId: [
                { required: true, message: 'none', trigger: 'blur' }
                ],
                userRoleId: [
                { required: true, message: 'none', trigger: 'blur' }
                ],
                controlId: [
                { required: true, message: 'none', trigger: 'blur' }
                ],
                departmentId: [
                { required: false, message: 'none', trigger: 'blur' }
                ],
                sectorId: [
                { required: false, message: 'none', trigger: 'blur' }
                ],
                addressId: [
                { required: false, message: 'none', trigger: 'blur' }
                ],
                login: [
                { required: true, message: 'none', trigger: 'blur' }
                ],
                password: [
                { required: false, message: 'none', trigger: 'blur' }
                ],
                passwordRepeat: [
                { required: false, message: 'none', trigger: 'blur' }
                ]
            },
        }
    },
    mounted() {
        store.commit("setBuinessComponent", 'control');

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
        profile() {
            return store.state.accountProfile;
        },
        businessComponent: {
            get() {
                return store.state.systemBusinessComponent;
            },
            set(value) {
                store.commit("setBuinessComponent", value);
            }
        },
        systemDirectory() {
            return store.state.systemDirectory;
        },
        systemOperation() {
            return store.state.systemOperation;
        },
        isVisible() {
            return store.state.systemVisibleDialog;
        },
        controls() {
            return store.state.controls;
        },
        departments() {
            return store.state.departments;
        },
        sectors() {
            return store.state.sectors;
        },
        addresses() {
            return store.state.addresses
        },
        taskTypes() {
            return store.state.taskTypes;
        },
        userTypes() {
            return store.state.userTypes;
        },
        userRoles() {
            return store.state.userRoles;
        },
    },
    methods: {
        //Получение коллекции записей справочника в зависимости от выбрнного типа справочника
        async loadDirectoryEntities() {
            if(this.businessComponent === 'control') {
                store.dispatch("getEntities", {
                    componentType: 'userType',
                    options: {
                        visibleMode: 1
                    }
                });
                store.dispatch("getEntities", {
                    componentType: 'control',
                    options: {
                        visibleMode: 1
                    }
                });
            }
            else if(this.businessComponent === 'department') {
                store.dispatch("getEntities", {
                    componentType: 'control',
                    options: {
                        visibleMode: 1
                    }
                });
                store.dispatch("getEntities", {
                    componentType: 'department',
                    options: {
                        visibleMode: 1
                    }
                });
            }
            else if(this.businessComponent === 'sector') {
                store.dispatch("getEntities", {
                    componentType: 'department',
                    options: {
                        visibleMode: 1
                    }
                });
                store.dispatch("getEntities", {
                    componentType: 'sector',
                    options: {
                        visibleMode: 1
                    }
                });
            }
            else if(this.businessComponent === 'taskTypeRef') {
                store.dispatch("getEntities", {
                    componentType: 'taskType',
                    options: {
                        visibleMode: 1
                    }
                });
                store.dispatch("getEntities", {
                    componentType: 'taskTypeRef',
                    options: {
                        visibleMode: 1
                    }
                });
            }
            else if(this.businessComponent === 'user') {
                store.commit("setEntities", { componentType: 'department', payload: [] });
                store.commit("setEntities", { componentType: 'sector', payload: [] });

                store.dispatch("getEntities", {
                    componentType: 'address',
                    options: {
                        visibleMode: 0
                    }
                });
                store.dispatch("getEntities", {
                    componentType: 'userRole',
                    options: {
                        visibleMode: 0
                    }
                });
                store.dispatch("getEntities", {
                    componentType: 'userType',
                    options: {
                        visibleMode: 1
                    }
                });
                store.dispatch("getEntities", {
                    componentType: 'user',
                    options: {
                        visibleMode: 0
                    }
                });
            }
            else {
                let actionOptions = {
                    componentType: this.businessComponent,
                    options: {
                        visibleMode: 1
                    }
                };

                store.dispatch("getEntities", actionOptions);
            }
        },
        //Событие переключения типа справочника в верхнем меню приложения    
        async handleChange() {
            store.commit("setSystemDirectory", null);

            this.loadDirectoryEntities();
        },
        //Фильтрация записей справочника, поля для фильтрации задаются в методе (фильтрующее условие содержит - ИЛИ)
        filterTableData() {
            switch(this.businessComponent) {
                case 'control':
                store.commit("setSystemPreloader", true);
                store.dispatch("getEntities", {
                    componentType: 'control',
                    options: {
                    visibleMode: 1
                    },
                    params: "Name=" + this.searchModel.toLowerCase()
                });
                break;
                case 'department':
                store.commit("setSystemPreloader", true);
                store.dispatch("getEntities", {
                    componentType: 'department',
                    options: {
                    visibleMode: 1
                    },
                    params: "Name=" + this.searchModel.toLowerCase()
                });
                break;
                case 'sector':
                store.commit("setSystemPreloader", true);
                store.dispatch("getEntities", {
                    componentType: 'sector',
                    options: {
                    visibleMode: 1
                    },
                    params: "Name=" + this.searchModel.toLowerCase()
                });
                break;
                case 'address':
                store.commit("setSystemPreloader", true);
                store.dispatch("getEntities", {
                    componentType: 'address',
                    options: {
                    visibleMode: 1
                    },
                    params: "City=" + this.searchModel.toLowerCase() + "&Street=" + this.searchModel.toLowerCase()
                });
                break;
                case 'taskType':
                store.commit("setSystemPreloader", true);
                store.dispatch("getEntities", {
                    componentType: 'taskType',
                    options: {
                    visibleMode: 1
                    },
                    params: "Name=" + this.searchModel.toLowerCase()
                });
                break;
                case 'taskTypeRef':
                store.commit("setSystemPreloader", true);
                store.dispatch("getEntities", {
                    componentType: 'taskTypeRef',
                    options: {
                    visibleMode: 1
                    },
                    params: "Name=" + this.searchModel.toLowerCase()
                });
                break;
                case 'taskStatus':
                store.commit("setSystemPreloader", true);
                store.dispatch("getEntities", {
                    componentType: 'taskStatus',
                    options: {
                    visibleMode: 1
                    },
                    params: "Name=" + this.searchModel.toLowerCase()
                });
                break;
                case 'user':
                store.commit("setSystemPreloader", true);
                store.dispatch("getEntities", {
                    componentType: 'user',
                    options: {
                    visibleMode: 3
                    },
                    params: "Surname=" + this.searchModel.toLowerCase() + "&Name=" + this.searchModel.toLowerCase()  + "&Patronymic=" + this.searchModel.toLowerCase()
                });
                break;
            }
        },
        //Вызов формы редактирования заявки
        callEditForm() {
            switch(this.businessComponent) {
                case "control":
                    store.dispatch("getEntities", {
                        componentType: 'userType',
                        options: {
                            visibleMode: 1
                        }
                    });

                    this.callFormEditDirectory();
                break;
                case "department":
                    store.dispatch("getEntities", {
                        componentType: 'control',
                        options: {
                            visibleMode: 1
                        }
                    });

                    this.callFormEditDirectory();
                break;
                case "sector":
                    store.dispatch("getEntities", {
                        componentType: 'department',
                        options: {
                            visibleMode: 1
                        }
                    });

                    this.callFormEditDirectory();
                break;
                case "address":
                    this.callFormEditAddress();
                break;
                case "taskType":
                    this.callFormEditDirectory();
                break;
                case "taskTypeRef":
                    store.dispatch("getEntities", {
                        componentType: 'taskType',
                        options: {
                            visibleMode: 1
                        }
                    });

                    this.callFormEditDirectory();
                break;
                case "taskStatus":
                    this.callFormEditDirectory();
                break;
                case "user":
                    store.dispatch("getEntities", {
                        componentType: 'control',
                        options: {
                            visibleMode: 1
                        }
                    });

                    this.callFormEditUser();
                break;
            }
        },
        //Вызов формы истории операций над заявкой
        callHistoryForm() {
            store.commit("setSystemOperations", "historyEntity");
            store.commit("setSystemVisibleDialog", true);
        },
        //Вызов формы удаления
        async callDeleteForm() {
            //1 запрос сущности задачи
            let actionOptions = {
                id: this.systemDirectory.id,
                componentType: this.businessComponent
            };

            //2 Проверяем, возможно ли удалить заявку                
            await store.dispatch("checkEntity", actionOptions).then((response) => {
                if(typeof(response.status) !== 'undefined' && response.status === 200) {
                    this.isCheckBeforeDelete = response.data.payload
                    this.isVisibleFormDelete = true;

                    store.commit("setSystemOperations", "deleteDirectory");
                }
            });
        },
        //Отправка формы удаления зявки
        sendDeleteRequest() {
            let actionOptions = {
                componentType: this.businessComponent,
                options: {
                    visibleMode: 1,
                    entityJson: {
                        id: this.systemDirectory.id
                    }
                }
            };

            if(this.businessComponent === "user") {
                actionOptions.options.visibleMode = 0;
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
        },
        //Вызов формы создания записи справочника
        callFormEditDirectory() {
            store.commit("setSystemOperations", "editDirectory");
            store.commit("setSystemVisibleDialog", true);
        },
        //Вызов формы создания записи адреса
        callFormEditAddress() {
            store.commit("setSystemOperations", "editAddress");
            store.commit("setSystemVisibleDialog", true);
        },
        //Вызов формы создания записи пользователя
        callFormEditUser() {
            this.setDataFormUser(store.state.systemDirectory);

            store.commit("setSystemOperations", "editUser");
            store.commit("setSystemVisibleDialog", true);
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
            store.commit("setSystemDirectory", null);
            store.commit("setSystemVisibleDialog", false);

            this.setDataFormUser(null);
        }, 
        //Заполнение полей формы из модели записи пользователя
        setDataFormUser(entity) {
            if(entity !== null) {
                this.user.id = entity.id;
                this.user.surname = entity.surname;
                this.user.name = entity.name;
                this.user.patronymic = entity.patronymic;
                this.user.position = entity.position;
                this.user.cabinet = entity.cabinet;
                this.user.controlId = entity.controlId;
                this.changeUserControls(entity.controlId);

                if(typeof(entity.department) !== 'undefined') {
                    this.user.departmentId = entity.department.id;
                    this.changeUserDepartments(this.user.departmentId);
                }

                this.user.userTypeId = entity.userType.id;
                this.user.userRoleId = entity.userRole.id;
                this.user.login = entity.userLogin.login;
                
                if(typeof(entity.address) !== 'undefined') {
                    this.user.addressId = entity.address.id;
                }
                if(typeof(entity.sector) !== 'undefined') {
                    this.user.sectorId = entity.sector.id;
                }
            }
            else {
                this.user.id = 0;
                this.user.surname = '';
                this.user.name = '';
                this.user.patronymic = '';
                this.user.position = '';
                this.user.cabinet = '';   
                this.user.controlId = '';
                this.user.departmentId = '';
                this.user.sectorId = '';
                this.user.addressId = '';
                this.user.userTypeId = '';
                this.user.userRoleId = '';
                this.user.login = '';
                this.user.password = '';
                this.user.passwordRepeat = '';
            }
        },
        //Выбор управления при создании/редактировании пользователя
        changeUserControls(id) {
            store.commit("setEntities", { componentType: 'department', payload: [] });
            store.commit("setEntities", { componentType: 'sector', payload: [] });

            this.user.userTypeId = '';
            this.user.userRoleId = '';
            this.user.departmentId = '';
            this.user.sectorId = '';

            if(id !== '' && id !== null && typeof(id) !== 'undefined') {
                store.dispatch("getEntities", {
                    componentType: 'department',
                    options: {
                        visibleMode: 0,
                        entityJson: {
                        controlId: id
                        }
                    }
                }); 

                let control = store.state.controls.find(c => c.id === id);
                let userType = store.state.userTypes.find(t => t.id === control.userTypeId);

                if(userType !== null && typeof(userType) !== 'undefined') {
                    this.user.userTypeId = userType.id;

                    let visibleModeUserRole = 0;

                    if(userType.systemUserType === 400) {
                        visibleModeUserRole = 1;
                    }       
                    
                    store.dispatch("getEntities", {
                        componentType: 'userRole',
                        options: {
                        visibleMode: visibleModeUserRole,
                        }
                    }).then(() => {
                        if(this.userRoles.length > 0 && userType.systemUserType === 300) {
                        this.user.userRoleId = this.userRoles[0].id;
                        }
                    });
                }
            }
        },
        //Выбор отдела при создании/редактировании пользователя
        async changeUserDepartments(id) {
            store.commit("setEntities", { componentType: 'sector', payload: [] });

            if(id !== '' && id !== null && typeof(id) !== 'undefined') {
                store.dispatch("getEntities", {
                componentType: 'sector',
                options: {
                    visibleMode: 0,
                    entityJson: {
                    departmentId: id
                    }
                }
                });
            }
        },
        //Формирование заголовка формы создания/редактирования записи справочника
        getCaptionForm() {
            if(this.systemOperation === "createDirectory" 
                    || this.systemOperation === "createAddress" 
                    || this.systemOperation === "createUser") {
                return "Создание новой записи";
            }
            else if(this.systemOperation === "editDirectory" 
                    || this.systemOperation === "editAddress" 
                    || this.systemOperation === "editUser") {
                return "Редактирование записи";
            }
        },
        /*Отправка формы создания/редактирования записи справочника (Пользователи)*/
        sendForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    store.commit("setSystemPreloader", true);

                    let actionOptions = {
                        componentType: this.businessComponent,
                        options: {
                            visibleMode: 0,
                        }
                    };

                    if(this.systemOperation === "createUser") {
                        if(this.user.password === '') {
                            Message({
                                showClose: true,
                                message: "Нельзя создать пользователя без пароля",
                                type: "error"
                            });

                            store.commit("setSystemPreloader", false);

                            return false;
                        }
                    }

                    if(this.user.password !== this.user.passwordRepeat) {
                        Message({
                            showClose: true,
                            message: "Указанные пароли не совпадают",
                            type: "error"
                        });

                        store.commit("setSystemPreloader", false);

                        return false;
                    }
                    else {
                        actionOptions.options.entityJson = {
                            surname: this.user.surname,
                            name: this.user.name,
                            patronymic: this.user.patronymic,
                            position: this.user.position,
                            cabinet: this.user.cabinet,
                            controlId: this.user.controlId,
                            departmentId: this.user.departmentId,
                            sectorId: this.user.sectorId,
                            addressId: this.user.addressId,
                            userTypeId: this.user.userTypeId,
                            userRoleId: this.user.userRoleId,
                            userLogin: {
                                login: this.user.login,
                                password: this.user.password
                            }
                        };

                        if(this.systemOperation === "editUser") {
                            actionOptions.options.entityJson.id = this.user.id;
                        }
                    } 
                    
                    let actionName = "";

                    if(this.systemOperation === "createUser") {
                        actionName = "createEntity";
                    }
                    else if( this.systemOperation === "editUser") {
                        actionName = "updateEntity";
                    }

                    store.dispatch(actionName, actionOptions).then((response) => {
                        store.commit("setSystemPreloader", false);

                        if(typeof(response.status) !== 'undefined' && (response.status > 0)) {
                            this.cancelForm();
                        }
                    });
                } else {
                    return false;
                }
            });
        },
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

.btn-delete {
    margin-left: 10px;
}

.p-delete-message {
    word-break: normal;    
}

.control-panel-search {
    width: 100%;
    margin-top: 10px;
}
</style>