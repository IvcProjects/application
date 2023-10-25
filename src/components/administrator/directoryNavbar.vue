<template>
    <div class="row">
        <nav class="navbar navbar-light navbar-app">
            <router-link class="navbar-brand" to="/">АИС «Диспетчерская служба»</router-link>
            <div class="ml-auto">
            <el-button type="success" icon="el-icon-plus" size="small" class="btn-new-entity" @click="callCreateForm">Новая запись</el-button>
            <el-dropdown @command="handleUserMenu" trigger="click" v-if="accountProfile !== null">            
                <el-button size="small" class="btn-dropdown" icon="el-icon-user">
                <span class="username">Администратор</span>
                <span class="icon-arrow">
                    <i class="el-icon-caret-bottom"></i>
                </span>
                </el-button>
                <el-dropdown-menu slot="dropdown" class="nav-dropdown">
                    <el-dropdown-item command="logout" class="drop-item">
                        <span class="icon-exit">
                        <i class="el-icon-switch-button"></i>
                        </span>
                        <span>Выход</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            </div>
        </nav>
    </div>
</template>

<script>
import store from '@/store';

export default  {
    async mounted() {
        await store.dispatch("getAccount");
    },
    computed: {
        accountProfile() {
            return store.state.accountProfile;
        },
        businessComponent() {
            return store.state.systemBusinessComponent;
        }
    },
    methods: {
        //Открыть меню на кнопке авторизованного пользователя
        handleUserMenu(obj) {
            if (obj == "logout") {
                store.dispatch("accountLogout");
            }
        },
        //Вызов формы создания новой записи
        async callCreateForm() {
            switch(this.businessComponent) {
                case "control":
                    store.dispatch("getEntities", {
                        componentType: 'userType',
                        options: {
                            visibleMode: 1
                        }
                    });

                    this.callFormCreateDirectory();
                break;
                case "department":
                    store.dispatch("getEntities", {
                        componentType: 'control',
                        options: {
                            visibleMode: 1
                        }
                    });

                    this.callFormCreateDirectory();
                break;
                case "sector":
                    store.dispatch("getEntities", {
                        componentType: 'department',
                        options: {
                            visibleMode: 1
                        }
                    });

                    this.callFormCreateDirectory();
                break;
                case "address":
                    this.callFormCreateAddress();
                break;
                case "taskType":
                    this.callFormCreateDirectory();
                break;
                case "taskTypeRef":
                    store.dispatch("getEntities", {
                        componentType: 'taskType',
                        options: {
                            visibleMode: 1
                        }
                    });

                    this.callFormCreateDirectory();
                break;
                case "taskStatus":
                    this.callFormCreateDirectory();
                break;
                case "user":
                    store.commit("setEntities", { componentType: 'department', payload: [] });
                    store.commit("setEntities", { componentType: 'sector', payload: [] });

                    store.dispatch("getEntities", {
                        componentType: 'control',
                        options: {
                            visibleMode: 1
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
                            visibleMode: 1
                        }
                    });

                    this.callFormCreateUser();
                break;
            }
        },
        //Вызов формы фильтров
        callFilters() {
            
        },
        //Вызов формы создания записи справочника
        callFormCreateDirectory() {
            store.commit("setSystemOperations", "createDirectory");
            store.commit("setSystemVisibleDialog", true);
        },
        //Вызов формы создания записи адреса
        callFormCreateAddress() {
            store.commit("setSystemOperations", "createAddress");
            store.commit("setSystemVisibleDialog", true);
        },
        //Вызов формы создания записи пользователя
        callFormCreateUser() {
            store.commit("setSystemOperations", "createUser");
            store.commit("setSystemVisibleDialog", true);
        }
    }
}
</script>

<style>
.navbar-app {
  background: #e3f2fd
}

.navbar-brand {
    font-size: 1.1em;
}

.btn-new-entity {
    margin-right: 10px;
}
</style>
