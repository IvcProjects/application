<template>
    <div class="col-lg-6 col-md-8 col-sm-12 col-xs-12 div-form-register">
        <el-card class="control-panel">
            <div class="text-center">
                <p class="form-title">
                    Регистрация
                </p>                    
            </div>
            <el-form :model="formRegistration" :rules="rules" ref="formRegistration" size="medium" :show-message="false" class="col-sm-12 registration">
                <div class="row">
                    <div class="col-6">
                        <el-form-item prop="surname" class="input-text">
                            <el-input
                            placeholder="Фамилия"
                            size="small"
                            clearable
                            v-model="formRegistration.surname">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="name" class="input-text">
                            <el-input
                            placeholder="Имя"
                            size="small"
                            clearable
                            v-model="formRegistration.name">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="patronymic" class="input-text">
                            <el-input
                            placeholder="Отчество"
                            size="small"
                            clearable
                            v-model="formRegistration.patronymic">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="position" class="input-text">
                            <el-input
                            placeholder="Должность"
                            size="small"
                            clearable
                            v-model="formRegistration.position">
                            </el-input>
                        </el-form-item>                
                        <el-form-item prop="cabinet" class="input-text">
                            <el-input
                            placeholder="Кабинет"
                            size="small"
                            clearable
                            v-model="formRegistration.cabinet">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="addressId" class="input-select" v-if="addresses !== null && addresses.length > 0">
                            <el-select 
                            v-model="formRegistration.addressId" 
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
                        <el-form-item prop="userTypeId" class="input-select" v-if="userTypes !== null && userTypes.length > 0" >
                            <el-select 
                            v-model="formRegistration.userTypeId" 
                            placeholder="Тип пользователя" 
                            size="small" 
                            class="select-controls">
                                <el-option
                                    v-for="item in userTypes"
                                    :key="item.id"
                                    :label="item.description"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>                            
                    </div>
                    <div class="col-6">
                        <el-form-item prop="userRoleId" class="input-select" v-if="userRoles !== null && userRoles.length > 0" >
                            <el-select 
                            v-model="formRegistration.userRoleId" 
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
                        <el-form-item prop="login" class="input-text">
                            <el-input
                            placeholder="Логин"
                            size="small"
                            clearable
                            prefix-icon="el-icon-user"
                            v-model="formRegistration.login">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password" class="input-text">
                            <el-input
                            placeholder="Пароль"
                            size="small"
                            clearable
                            prefix-icon="el-icon-lock"
                            show-password
                            v-model="formRegistration.password">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="passwordRepeat" class="input-text">
                            <el-input
                            placeholder="Повторите пароль"
                            size="small"
                            clearable
                            prefix-icon="el-icon-lock"
                            show-password
                            v-model="formRegistration.passwordRepeat">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="controlId" class="input-select">
                            <el-select 
                            v-model="formRegistration.controlId" 
                            placeholder="Выберите управление" 
                            size="small" 
                            class="select-controls" 
                            v-if="controls !== null && controls.length > 0" 
                            clearable 
                            @change="changeUserControls(formRegistration.controlId)">
                                <el-option
                                    v-for="item in controls"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="departmentId" class="input-select" v-if="departments !== null && departments.length > 0" >
                            <el-select 
                            v-model="formRegistration.departmentId" 
                            placeholder="Выберите отдел" 
                            size="small" 
                            class="select-controls" 
                            clearable
                            @change="changeUserDepartments(formRegistration.departmentId)">
                                <el-option
                                    v-for="item in departments"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="sectorId" class="input-select" v-if="sectors !== null && sectors.length > 0">
                            <el-select 
                            v-model="formRegistration.sectorId" 
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
                    <div class="col-12 text-center">
                        <el-button size="medium" @click="submitForm('formRegistration')" class="input-submit" type="primary" plain>Регистрация</el-button>                                          
                        <p class="p-link-login">
                            <router-link to="/login" class="link-login">Войти</router-link> 
                        </p> 
                    </div>
                </div>                    
            </el-form>
        </el-card>        
    </div>
</template>

<script>
import store from '@/store';
import { Message } from "element-ui";
import router from '@/router';

export default {
    data() {
        return {
            formRegistration: {
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
                addressId: [
                    { required: false, message: 'none', trigger: 'blur' }
                ],
                userRoleId: [
                    { required: true, message: 'none', trigger: 'blur' }
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
            }
        }
    },
    mounted() {
        let token = localStorage.getItem("token");

        if (typeof token !== "undefined" && token !== "" && token !== null) {
            router.push("/");
        }
        else {
            store.commit("setEntities", { componentType: 'department', payload: [] });
            store.commit("setEntities", { componentType: 'sector', payload: [] });

            store.dispatch("getEntities", {
                componentType: 'control',
                options: {
                    visibleMode: 0
                }
            });
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
                    visibleMode: 0
                }
            });
        }    
    },
    computed: {   
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
            if(store.state.addresses.length > 0) {
                this.setUserAddressId(store.state.addresses[0]);
            }

            return store.state.addresses
        },
        userTypes() {
            if(store.state.userTypes.length > 0) {
                this.setUserTypeId(store.state.userTypes[0]);
            }

            return store.state.userTypes;
        },
        userRoles() {
            if(store.state.userRoles.length > 0) {
                this.setUserRoleId(store.state.userRoles[0]);
            }

            return store.state.userRoles;
        }
    },
    methods: {
        setUserTypeId(entity) {
            this.formRegistration.userTypeId = entity.id;
        },
        setUserRoleId(entity) {
            this.formRegistration.userRoleId = entity.id;
        },
        setUserAddressId(entity) {
            this.formRegistration.addressId = entity.id;
        },
        //Выбор управления при создании/редактировании пользователя
        changeUserControls(id) {
            store.commit("setEntities", { componentType: 'department', payload: [] });
            store.commit("setEntities", { componentType: 'sector', payload: [] });

            this.formRegistration.userTypeId = '';
            this.formRegistration.userRoleId = '';
            this.formRegistration.departmentId = '';
            this.formRegistration.sectorId = '';

            if(id !== '' && id !== null && typeof(id) !== 'undefined') {
                store.dispatch("getEntities", 
                {
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
                    this.formRegistration.userTypeId = userType.id;

                    let visibleModeUserRole = 0;

                    if(userType.systemUserType === 1) {
                        visibleModeUserRole = 1;
                    }          
                    
                    store.dispatch("getEntities", 
                    {
                        componentType: 'userRole',
                        options: {
                            visibleMode: visibleModeUserRole,
                        }
                    }).then(() => {
                        if(this.userRoles.length > 0 && userType.systemUserType === 0) {
                            this.user.userRoleId = this.userRoles[0].id;
                        }
                    });
                }
            }
        },
        //Выбор отдела при создании/редактировании пользователя
        changeUserDepartments(id) {
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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    store.commit("setSystemPreloader", true);

                    if(this.formRegistration.password !== this.formRegistration.passwordRepeat) {
                        Message({
                            showClose: true,
                            message: "Указанные пароли не совпадают",
                            type: "error"
                        });

                        store.commit("setSystemPreloader", false);

                        return false;
                    }
                    else{
                        var navigator_info = window.navigator;
                        var screen_info = window.screen;
                        var uid = navigator_info.mimeTypes.length;

                        uid += navigator_info.userAgent.replace(/\D+/g, '');
                        uid += navigator_info.plugins.length;
                        uid += screen_info.height || '';
                        uid += screen_info.width || '';
                        uid += screen_info.pixelDepth || '';

                        var data = {
                            surname: this.formRegistration.surname,
                            name: this.formRegistration.name,
                            patronymic: this.formRegistration.patronymic,
                            position: this.formRegistration.position,
                            cabinet: this.formRegistration.cabinet,
                            controlId: this.formRegistration.controlId,
                            departmentId: this.formRegistration.departmentId,
                            sectorId: this.formRegistration.sectorId,
                            addressId: this.formRegistration.addressId,
                            userTypeId: this.formRegistration.userTypeId,
                            userRoleId: this.formRegistration.userRoleId,
                            userLogin: {
                                login: this.formRegistration.login,
                                password: this.formRegistration.password
                            },
                            fingerprint: uid
                        };

                        this.sendRequestForm(data);
                    }
                }
            });    
        },
        async sendRequestForm(data) {
            await store.dispatch("accountRegistration", data);
        }
    }
}
</script>

<style>
.form-title {
    font-size: 1.4em;
}

.input-text,
.input-select,
.input-submit {
    width: 100%;
    margin-bottom: 10px;
}

.select-controls {
  display: inherit;
}

.p-link-login {
    text-align: center;
}

a.link-login {
    text-decoration: none;
    color: #409EFF;
}
</style>