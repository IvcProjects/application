<template>
    <div
    v-bind:class="{ 'window':(darkTheme === false), 'window-dark':(darkTheme === true) }"
    v-if="profile !== null && (profile.userType.systemUserType === 300 || profile.userType.systemUserType === 400) && isView">
        <div class="container-fluid">
            <NavbarClient v-if="profile !== null && profile.userType.systemUserType === 300"></NavbarClient>
            <NavbarExecutor v-if="profile !== null && profile.userType.systemUserType === 400 && profile.userType.systemUserType !== 300"></NavbarExecutor>
            <div class="row">
                <div class="col-12 window-profile">
                    <el-form 
                    :model="user"
                    :rules="rules"
                    :show-message="false"
                    ref="formUser">
                        <el-card 
                        v-bind:class="{ 'control-panel':(darkTheme === false), 'control-panel-dark':(darkTheme === true) }">
                            <h4>Редактирование профиля</h4> 
                            <div class="row">
                                <div class="col-sm-6">
                                    <el-form-item prop="surname" label="Фамилия" class="form-item-directory">
                                        <el-input
                                        placeholder="Фамилия"
                                        size="medium"
                                        clearable
                                        v-model="user.surname"
                                        v-bind:class="{ 'input-form':(darkTheme === false), 'input-form-dark':(darkTheme === true) }">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="name" label="Имя" class="form-item-directory">
                                        <el-input
                                        placeholder="Имя"
                                        size="medium"
                                        clearable
                                        v-model="user.name"
                                        v-bind:class="{ 'input-form':(darkTheme === false), 'input-form-dark':(darkTheme === true) }">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="patronymic" label="Отчество" class="form-item-directory">
                                        <el-input
                                        placeholder="Отчество"
                                        size="medium"
                                        clearable
                                        v-model="user.patronymic"
                                        v-bind:class="{ 'input-form':(darkTheme === false), 'input-form-dark':(darkTheme === true) }">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="position" label="Должность" class="form-item-directory">
                                        <el-input
                                        size="medium"
                                        clearable
                                        v-model="user.position"
                                        disabled
                                        v-bind:class="{ 'input-form':(darkTheme === false), 'input-form-dark':(darkTheme === true) }">
                                        </el-input>
                                    </el-form-item>                
                                    <el-form-item prop="cabinet" label="Кабинет" class="form-item-directory">
                                        <el-input
                                        size="medium"
                                        clearable
                                        v-model="user.cabinet"
                                        disabled
                                        v-bind:class="{ 'input-form':(darkTheme === false), 'input-form-dark':(darkTheme === true) }">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="address" label="Адрес" class="form-item-directory">
                                        <el-input
                                        size="medium"
                                        clearable
                                        v-model="user.address"
                                        disabled
                                        v-bind:class="{ 'input-form':(darkTheme === false), 'input-form-dark':(darkTheme === true) }">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="userType" label="Тип пользователя" class="form-item-directory">
                                        <el-input
                                        size="medium"
                                        clearable
                                        v-model="user.userType"
                                        disabled
                                        v-bind:class="{ 'input-form':(darkTheme === false), 'input-form-dark':(darkTheme === true) }">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="isDarkTheme" label="Темная тема" class="form-item-directory">
                                        <el-switch
                                        v-model="user.isDarkTheme"
                                        active-text="Темная тема включена"
                                        inactive-text="Темная тема выключена"
                                        active-color="#67C23A"
                                        inactive-color="#909399"
                                        v-bind:class="{ 'switch-controls':(darkTheme === false), 'switch-controls-dark':(darkTheme === true) }">
                                        </el-switch>
                                    </el-form-item>
                                </div>
                                <div class="col-sm-6">
                                    <el-form-item prop="userRole" label="Роль пользователя" class="form-item-directory">
                                        <el-input
                                        size="medium"
                                        clearable
                                        v-model="user.userRole"
                                        disabled
                                        v-bind:class="{ 'input-form':(darkTheme === false), 'input-form-dark':(darkTheme === true) }">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="login" label="Логин" class="form-item-directory">
                                        <el-input
                                        placeholder="Логин"
                                        size="medium"
                                        clearable
                                        prefix-icon="el-icon-user"
                                        v-model="user.login"
                                        v-bind:class="{ 'input-form':(darkTheme === false), 'input-form-dark':(darkTheme === true) }">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="password" label="Пароль" class="form-item-directory">
                                        <el-input
                                        placeholder="Пароль"
                                        size="medium"
                                        clearable
                                        prefix-icon="el-icon-lock"
                                        show-password
                                        v-model="user.password"
                                        v-bind:class="{ 'input-form':(darkTheme === false), 'input-form-dark':(darkTheme === true) }">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="passwordRepeat" label="Повторите пароль" class="form-item-directory">
                                        <el-input
                                        placeholder="Повторите пароль"
                                        size="medium"
                                        clearable
                                        prefix-icon="el-icon-lock"
                                        show-password
                                        v-model="user.passwordRepeat"
                                        v-bind:class="{ 'input-form':(darkTheme === false), 'input-form-dark':(darkTheme === true) }">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="control" label="Управление" class="form-item-directory">
                                        <el-input
                                        size="medium"
                                        clearable
                                        v-model="user.control"
                                        disabled
                                        v-bind:class="{ 'input-form':(darkTheme === false), 'input-form-dark':(darkTheme === true) }">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="department" label="Отдел" class="form-item-directory">
                                        <el-input
                                        size="medium"
                                        clearable
                                        v-model="user.department"
                                        disabled
                                        v-bind:class="{ 'input-form':(darkTheme === false), 'input-form-dark':(darkTheme === true) }">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="sector" label="Сектор" class="form-item-directory">
                                        <el-input
                                        size="medium"
                                        clearable
                                        v-model="user.sector"
                                        disabled
                                        v-bind:class="{ 'input-form':(darkTheme === false), 'input-form-dark':(darkTheme === true) }">
                                        </el-input>
                                    </el-form-item>
                                </div>
                            </div> 
                            <div class="row">
                                <div class="col-12 form-control-right">
                                    <el-button type="success" size="medium" @click="sendForm('formUser')">Сохранить</el-button>
                                </div>
                            </div>                                
                        </el-card>                            
                    </el-form>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import store from '@/store';
import { Message } from "element-ui";

import NavbarClient from '@/components/client/requestNavbar.vue';
import NavbarExecutor from '@/components/executor/taskNavbar.vue';

export default {
    data() {
        return {
            //Флаг для рержима разработки (отображать компонент или нет)
            isView: true,
            user: {
                id: 0,
                surname: '',
                name: '',
                patronymic: '',
                position: '',
                cabinet: '',
                control: '',
                department: '',
                sector: '',
                address: '',        
                userType: '',
                userRole: '',
                login: '',
                password: '',
                passwordRepeat: '',
                isDarkTheme: false
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
                control: [
                { required: false, message: 'none', trigger: 'blur' }
                ],
                department: [
                { required: false, message: 'none', trigger: 'blur' }
                ],
                sector: [
                { required: false, message: 'none', trigger: 'blur' }
                ],                
                position: [
                { required: false, message: 'none', trigger: 'blur' }
                ],
                cabinet: [
                { required: false, message: 'none', trigger: 'blur' }
                ],
                address: [
                { required: false, message: 'none', trigger: 'blur' }
                ],                
                userType: [
                { required: false, message: 'none', trigger: 'blur' }
                ],
                userRole: [
                { required: false, message: 'none', trigger: 'blur' }
                ],
                login: [
                { required: false, message: 'none', trigger: 'blur' }
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
    async mounted() {
        await store.dispatch("getAccount").then(() => {
            if(this.profile !== null) {
                store.dispatch("getDirectory", {
                    id: this.profile.id,
                    componentType: 'userProfile'
                });
                 
            }
        });        
    },
    components: {
        NavbarClient,
        NavbarExecutor,
    },
    computed: {
        profile() {
            if(store.state.systemDirectory !== null) {
                this.setDataFormUser(store.state.systemDirectory);
            }

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
        //Заполнение полей формы из модели записи пользователя
        setDataFormUser(entity) {
            if(entity !== null) {
                this.user.id = entity.id;
                this.user.surname = entity.surname;
                this.user.name = entity.name;
                this.user.patronymic = entity.patronymic;
                this.user.position = entity.position;
                this.user.cabinet = entity.cabinet;   
                this.user.control = entity.controlName;
                this.user.department = entity.departmentName;
                this.user.sector = entity.sectorName;
                this.user.userType = entity.userTypeName;
                this.user.userRole = entity.userRoleName;
                this.user.login = entity.userLogin.login;
                this.user.isDarkTheme = entity.isDarkTheme;

                if(typeof(entity.address) !== 'undefined' && entity.address !== null) {
                    this.user.address = entity.address.value;
                }
            }
            else {
                this.user.id = 0;
                this.user.surname = '';
                this.user.name = '';
                this.user.patronymic = '';
                this.user.position = '';
                this.user.cabinet = '';   
                this.user.control = '';
                this.user.department = '';
                this.user.sector = '';
                this.user.address = '';
                this.user.userType = '';
                this.user.userRole = '';
                this.user.login = '';
                this.user.password = '';
                this.user.passwordRepeat = '';
                this.user.isDarkTheme = false;
            }
        },
        /*Отправка формы создания/редактирования записи справочника 
        (Управление, Отдел, Сектор, Адрес, Тип заявки, Тип заявки (уточнение), Статус задачи, Пользователи)*/
        sendForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    store.commit("setSystemPreloader", true);

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
                        let actionOptions = {
                            componentType: 'userProfile',
                            options: {
                                entityJson: {
                                    id: this.user.id,
                                    surname: this.user.surname,
                                    name: this.user.name,
                                    patronymic: this.user.patronymic,
                                    isDarkTheme: this.user.isDarkTheme,
                                    userLogin: {
                                        login: this.user.login,
                                        password: this.user.password
                                    }
                                }
                            }
                        };

                        store.dispatch("updateEntity", actionOptions).then(() => {
                            store.dispatch("getAccount");
                            store.dispatch("getDirectory", {
                                id: this.profile.id,
                                componentType: 'userProfile'
                            });
                        });
                    }                    
                } else {
                    return false;
                }
            });
        },
    }
}
</script>

<style>
.control-panel,
.control-panel-dark {
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
}

.control-panel-dark,
.input-form-dark input[type="text"],
.input-form-dark input[type="password"],
.switch-controls-dark {
    color: #FDFDFD;
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

.control-panel-right {
    text-align: right;
}

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

.switch-controls,
.switch-controls-dark {    
    border-radius: 5px;    
    padding: 20px 0 20px 15px;
    width: 100%;
}

.switch-controls {
    border: 1px solid #E4E7ED;
}

.switch-controls-dark {
    border: 1px solid #E4E7ED;
    background: #2D303E;
}

.input-form-dark input[type="text"],
.input-form-dark input[type="password"] {
    background: #2D303E!important;
}

.control-panel h4 {
    text-align: center;
    color: rgb(110, 110, 110);
}

.window,
.window-dark {
    height: 100vh;
}

.window {
    background: rgb(250, 250, 250);
}

.window-dark {    
    background: #1F1D2B;
}
</style>