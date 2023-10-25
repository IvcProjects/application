<template>
    <div>
        <el-drawer
        v-if="systemOperation === 'createDirectory' || systemOperation === 'editDirectory'"
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
                        :model="directory"
                        :rules="rules"
                        :show-message="false"
                        ref="formDirectory">
                            <el-card class="control-panel">
                                <h3>{{getCaptionForm()}}</h3>                                
                                <el-form-item prop="name" label="Название" class="form-item-directory">
                                    <el-input
                                    placeholder="Введите название"
                                    size="small"
                                    clearable=""
                                    v-model="directory.name">
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="description" label="Описание" class="form-item-directory">
                                    <el-input
                                    placeholder="Введите описание"
                                    type="textarea"
                                    :rows="5"
                                    size="small"
                                    clearable=""
                                    v-model="directory.description">
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="userTypeId" label="Тип пользователя" class="form-item-directory" v-if="businessComponent === 'control'">
                                    <el-select v-model="directory.userTypeId" placeholder="Выберите тип пользователя" size="small" class="select-controls" v-if="userTypes !== null && userTypes.length > 0" clearable>
                                        <el-option
                                            v-for="item in userTypes"
                                            :key="item.id"
                                            :label="item.description"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item prop="controlId" label="Управление" class="form-item-directory" v-if="businessComponent === 'department'">
                                    <el-select v-model="directory.controlId" placeholder="Выберите управление" size="small" class="select-controls" v-if="controls !== null && controls.length > 0" clearable>
                                        <el-option
                                            v-for="item in controls"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item prop="departmentId" label="Отдел" class="form-item-directory" v-if="businessComponent === 'sector'">
                                    <el-select v-model="directory.departmentId" placeholder="Выберите отдел" size="small" class="select-controls" v-if="departments !== null && departments.length > 0" clearable>
                                        <el-option
                                            v-for="item in departments"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item prop="taskTypeId" label="Тип задачи (оновной)" class="form-item-directory" v-if="businessComponent === 'taskTypeRef'">
                                    <el-select v-model="directory.taskTypeId" placeholder="Выберите основной тип" size="small" class="select-controls" v-if="taskTypes !== null && taskTypes.length > 0" clearable>
                                        <el-option
                                            v-for="item in taskTypes"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <div class="row">
                                    <div class="col-6 form-control-left">
                                        <el-button type="info" size="small" @click="cancelForm" class="btn-control-panel">Отмена</el-button>                            
                                    </div>
                                    <div class="col-6 form-control-right">
                                        <el-button type="success" size="small" @click="sendForm('formDirectory')">Сохранить</el-button>
                                    </div>
                                </div>                                
                            </el-card>                            
                        </el-form>              
                    </div>                    
                </div>
            </div>            
        </el-drawer>
        <el-drawer
        v-if="systemOperation === 'createAddress' || systemOperation === 'editAddress'"
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
                        :model="address"
                        :rules="rules"
                        :show-message="false"
                        ref="formAddress">
                            <el-card class="control-panel">
                                <h3>{{getCaptionForm()}}</h3>  
                                <div class="row">
                                    <div class="col-sm-6">
                                        <el-form-item prop="postcode" label="Индекс" class="form-item-directory">
                                            <el-input
                                            placeholder="Индекс"
                                            size="small"
                                            clearable
                                            v-model="address.postcode"
                                            maxlength="6"
                                            show-word-limit>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item prop="district" label="Регион" class="form-item-directory">
                                            <el-input
                                            placeholder="Регион"
                                            size="small"
                                            clearable
                                            v-model="address.district">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item prop="city" label="Город" class="form-item-directory">
                                            <el-input
                                            placeholder="Город"
                                            size="small"
                                            clearable
                                            v-model="address.city">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item prop="street" label="Улица" class="form-item-directory">
                                            <el-input
                                            placeholder="Улица"
                                            size="small"
                                            clearable
                                            v-model="address.street">
                                            </el-input>
                                        </el-form-item> 
                                    </div>
                                    <div class="col-sm-6">
                                        <el-form-item prop="house" label="Дом" class="form-item-directory">
                                            <el-input
                                            placeholder="Дом"
                                            size="small"
                                            clearable
                                            v-model="address.house"
                                            maxlength="3"
                                            show-word-limit>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item prop="structure" label="Строение" class="form-item-directory">
                                            <el-input
                                            placeholder="Строение"
                                            size="small"
                                            clearable
                                            v-model="address.structure"
                                            maxlength="3"
                                            show-word-limit>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item prop="apartment" label="Кабинет" class="form-item-directory">
                                            <el-input
                                            placeholder="Кабинет"
                                            size="small"
                                            clearable
                                            v-model="address.apartment"
                                            maxlength="6"
                                            show-word-limit>
                                            </el-input>
                                        </el-form-item>
                                    </div>
                                </div> 
                                <div class="row">
                                    <div class="col-6 form-control-left">
                                        <el-button type="info" size="small" @click="cancelForm" class="btn-control-panel">Отмена</el-button>                            
                                    </div>
                                    <div class="col-6 form-control-right">
                                        <el-button type="success" size="small" @click="sendForm('formAddress')">Сохранить</el-button>
                                    </div>
                                </div>                                
                            </el-card>                            
                        </el-form>              
                    </div>                    
                </div>
            </div>            
        </el-drawer>
        <el-drawer
        v-if="systemOperation === 'historyEntity'"
        title="История операций над записью"
        :before-close="handleCloseHistory"
        :visible="isVisible"
        direction="rtl"
        size="50%">
            <el-table>
                <el-table-column property="date" label="Date" width="150"></el-table-column>
                <el-table-column property="name" label="Name" width="200"></el-table-column>
                <el-table-column property="address" label="Address"></el-table-column>
            </el-table>
        </el-drawer>
    </div> 
</template>

<script>
import store from '@/store';

export default{
    data() {
        return {
            directory: {
                id: 0,
                name: '',
                description: '',
                controlId: '',
                departmentId: '',
                taskTypeId: '',
                userTypeId: '',
            },
            address: {
                id: 0,
                postcode: '',
                district: '',
                city: '',
                street: '',
                structure: '',
                house: '',
                apartment: ''
            },
            rules: {
                name: [
                { required: true, message: 'none', trigger: 'blur' }
                ],
                description: [
                { required: false, message: 'none', trigger: 'blur' }
                ],
                userTypeId: [
                { required: true, message: 'none', trigger: 'blur' }
                ],
                controlId: [
                { required: true, message: 'none', trigger: 'blur' }
                ],
                departmentId: [
                { required: true, message: 'none', trigger: 'blur' }
                ],
                sectorId: [
                { required: false, message: 'none', trigger: 'blur' }
                ],
                taskTypeId: [
                { required: true, message: 'none', trigger: 'blur' }
                ],
                postcode: [
                { required: false, message: 'none', trigger: 'blur' }
                ],
                district: [
                { required: true, message: 'none', trigger: 'blur' }
                ],
                city: [
                { required: true, message: 'none', trigger: 'blur' }
                ],
                street: [
                { required: true, message: 'none', trigger: 'blur' }
                ],        
                structure: [
                { required: false, message: 'none', trigger: 'blur' }
                ],
                house: [
                { required: true, message: 'none', trigger: 'blur' }
                ],
                apartment: [
                { required: false, message: 'none', trigger: 'blur' }
                ],
            },
        }
    },
    computed: {
        systemOperation() {
            if(store.state.systemOperation === "createDirectory") {
                this.setDataFormDirectory(null)
            }
            else if(store.state.systemOperation === "editDirectory") {
                this.setDataFormDirectory(store.state.systemDirectory);
            }
            else if(store.state.systemOperation === "createAddress") {
                this.setDataFormAddress(null);
            }
            else if(store.state.systemOperation === "editAddress") {
                this.setDataFormAddress(store.state.systemDirectory);
            }

            return store.state.systemOperation;
        },
        isVisible() {
            return store.state.systemVisibleDialog;
        },
        businessComponent() {
            return store.state.systemBusinessComponent;
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
        }
    },
    methods: {       
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
        //Заполнение полей формы из модели записи справочника
        setDataFormDirectory(entity) {
            if(entity !== null) {
                this.directory.id = entity.id;
                this.directory.name = entity.name;
                this.directory.description = entity.description;

                if(this.businessComponent === 'control') {
                    this.directory.userTypeId = entity.userTypeId;
                }
                else if(this.businessComponent === 'department') {
                    this.directory.controlId = entity.controlId;
                }
                else if(this.businessComponent === 'sector') {
                    this.directory.departmentId = entity.departmentId;
                }
                else if(this.businessComponent === 'taskTypeRef') {
                    this.directory.taskTypeId = entity.taskTypeId;
                }
            }
            else {
                this.directory.id = 0;
                this.directory.name = '';
                this.directory.description = '';
                this.directory.controlId = '';
                this.directory.departmentId = '';
                this.directory.taskTypeId = '';
                this.directory.userTypeId = '';
            }
        },
        //Заполнение полей формы из модели записи адреса
        setDataFormAddress(entity) {
            if(entity !== null) {
                this.address.id = entity.id;
                this.address.postcode = entity.postcode;
                this.address.district = entity.district;
                this.address.city = entity.city;
                this.address.street = entity.street;
                this.address.house = entity.house;
                this.address.structure = entity.structure;
                this.address.apartment = entity.apartment;
            }
            else {
                this.address.id = 0;
                this.address.postcode = '';
                this.address.district = '';
                this.address.city = '';
                this.address.street = '';
                this.address.structure = '';
                this.address.house = '';
                this.address.apartment = '';
            }
        },
        /*Отправка формы создания/редактирования записи справочника 
        (Управление, Отдел, Сектор, Адрес, Тип заявки, Тип заявки (уточнение), Статус задачи)*/
        sendForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    store.commit("setSystemPreloader", true);

                    let actionOptions = {
                        componentType: this.businessComponent,
                        options: {
                            visibleMode: 1,
                            entityJson: {
                                id: this.directory.id,
                                name: this.directory.name,
                                description: this.directory.description
                            }
                        }
                    };

                    switch(this.businessComponent) {
                        case 'control':
                            actionOptions.options.entityJson.userTypeId = this.directory.userTypeId;
                        break;
                        case 'department':
                            actionOptions.options.entityJson.controlId = this.directory.controlId;
                        break;
                        case 'sector':
                            actionOptions.options.entityJson.departmentId = this.directory.departmentId;
                        break;
                        case 'taskTypeRef':
                            actionOptions.options.entityJson.taskTypeId = this.directory.taskTypeId;
                        break;
                        case 'address':
                            actionOptions.options.entityJson = {
                                postcode: this.address.postcode,
                                district: this.address.district,
                                city: this.address.city,
                                street: this.address.street,
                                house: this.address.house,
                                structure: this.address.structure,
                                apartment: this.address.apartment
                            };

                            if(this.systemOperation === "editAddress") {
                                actionOptions.options.entityJson.id = this.address.id;
                            }
                        break;
                    }
                    
                    let actionName = "";

                    if(this.systemOperation === "createDirectory" 
                    || this.systemOperation === "createAddress") {
                        actionName = "createEntity";
                    }
                    else if(this.systemOperation === "editDirectory" 
                    || this.systemOperation === "editAddress") {
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

            this.setDataFormDirectory(null);
            this.setDataFormAddress(null);

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
        //Закрытие формы истории операций над записью
        handleCloseHistory(done) {
            done();
            this.cancelForm();
        }
    }
}
</script>

<style>
.form-item-directory {
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

.select-controls {
    width: 100%;
}

.control-panel h3 {
    text-align: center;
}
</style>