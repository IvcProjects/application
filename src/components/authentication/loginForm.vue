<template>
    <div class="col-lg-3 col-md-8 col-sm-12 col-xs-12 div-form-login">
        <el-card class="control-panel">
            <div class="text-center">
                <p class="form-title">
                    Войти в систему
                </p>
            </div>
            <el-form :model="formLogin" :rules="rules" ref="formLogin" size="medium" :show-message="false" class="col-sm-12 login">
                <el-form-item prop="login" class="form-group dark-theme">
                    <el-input placeholder="Логин" prefix-icon="el-icon-user" size="medium" v-model="formLogin.login" class="input-login" clearable></el-input>
                </el-form-item>
                <el-form-item prop="pass" class="form-group dark-theme">
                    <el-input placeholder="Пароль" prefix-icon="el-icon-lock" size="medium" v-model="formLogin.pass" show-password class="input-pass" clearable></el-input>
                </el-form-item>
                <el-button size="medium" @click="submitForm('formLogin')" class="input-submit btn-control-panel" type="success">Войти</el-button>   
                <!-- Кнопка регистрации пока скрыта - решение принято в целях безопасности приложения, 
                все пользователии будут создаваться "вручную" -->
                <!-- <p class="p-link-register">
                    <router-link to="/register" class="link-register">Регистрация</router-link>
                </p> -->
            </el-form>
        </el-card>        
    </div>
</template>

<script>
import store from '@/store';
import router from "@/router";
import { BASE_URL } from "@/config";

export default {
    data() {
        return {
            formLogin: {
                login: '',
                pass: ''
            },
            rules: {
                login: [
                    { required: true, message: 'none', trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: 'none', trigger: 'blur' }
                ]
            },
            lightMode: true
        }
    },
    computed: {
        systemPreloader() {
            return store.state.systemPreloader;
        }
    },
    mounted() {
        let token = localStorage.getItem("token");

        if (typeof token !== "undefined" && token !== "" && token !== null) {
            router.push("/");
        }
        else {
            store.commit("setSystemPreloader", false);
        }    
        
        let mode = window.localStorage.getItem("lightMode");
        if(mode !== null) {
            this.lightMode = mode == 'true';
        }
    },
    methods: {
        async submitForm(formName) {            
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    store.commit("setSystemPreloader", true);

                    var navigator_info = window.navigator;
                    var screen_info = window.screen;
                    var uid = navigator_info.mimeTypes.length;

                    uid += navigator_info.userAgent.replace(/\D+/g, '');
                    uid += navigator_info.plugins.length;
                    uid += screen_info.height || '';
                    uid += screen_info.width || '';
                    uid += screen_info.pixelDepth || '';
            
                    let data = {
                        Login: this.formLogin.login,
                        Password: this.formLogin.pass,
                        Fingerprint: uid
                    };

                    this.sendRequestForm(data);
                }
            });
        },
        async sendRequestForm(data) {
            await store.dispatch("accountLogin", data);
        },
        changeTheme() {
            window.localStorage.setItem("lightMode", this.lightMode);
            window.location.href = BASE_URL;
        }
    }    
}
</script>

<style>
.control-panel {
    background: #252836;
    border: 1px solid #252836;     
}

.div-form-login .control-panel .el-card__body,
.div-form-login .control-panel-box .el-card__body {
    padding: 10px;
}

.dark-theme .input-login input[type="text"],
.dark-theme .input-pass input[type="password"] {
    background: #2D303E;
}

.control-panel,
.dark-theme .input-login input[type="text"],
.dark-theme .input-pass input[type="password"] {
    color: #FDFDFD;
}

.form-title {
    font-size: 1.4em;
}

.form-group {
    margin-bottom: 10px;
}

.input-login,
.input-pass,
.input-submit{
    width: 100%;
}

.p-link-register {
    text-align: center;
    margin-top: 10px;
}

a.link-register {
    text-decoration: none;  
    color: #409EFF;  
}

.swith-theme {
    text-align: center;
    margin-top: 10px;
}
</style>
