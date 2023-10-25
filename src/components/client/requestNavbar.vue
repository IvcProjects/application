<template>
    <div class="row">
        <nav class="navbar"
        v-bind:class="{ 'navbar-light navbar-app':(darkTheme === false), 'navbar-dark navbar-app-dark':(darkTheme === true) }">
            <router-link class="navbar-brand" to="/">АИС «Диспетчерская служба»</router-link>
            <div class="ml-auto">
            <el-button type="success" icon="el-icon-plus" size="medium" class="btn-new-request" @click="callCreateForm" v-if="$route.name !== 'profile'">Новая заявка</el-button>
            <el-dropdown @command="handleUserMenu" trigger="click" v-if="accountProfile !== null">            
                <el-button size="medium" class="btn-dropdown" icon="el-icon-user">
                <span class="username" v-if="accountProfile.userRole.systemRole !== 700">{{ accountProfile.username }}</span>
                <span class="username" v-if="accountProfile.userRole.systemRole === 700">Администратор</span>
                <span class="icon-arrow">
                    <i class="el-icon-caret-bottom"></i>
                </span>
                </el-button>
                <el-dropdown-menu slot="dropdown" class="nav-dropdown">
                    <el-dropdown-item command="profile" class="drop-item" v-if="accountProfile.id > 0 && accountProfile.userRole.systemRole !== 700">
                        <span class="icon-user">
                        <i class="el-icon-user"></i>
                        </span>
                        <span>Профиль</span>
                    </el-dropdown-item>
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
import router from '@/router';

export default  {
    async mounted() {
        await store.dispatch("getAccount");
        await store.dispatch("getEntities", {
          componentType: 'taskType',
          options: {
            visibleMode: 1
          }
        });
    },
    computed: {
        isNotifyYes() {
            if(store.state.tasks.length > 0) {
                return true;
            }

            return false;
        },
        accountProfile() {
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
        //Открыть меню на кнопке авторизованного пользователя
        handleUserMenu(obj) {
            if (obj == "profile" && this.$route.name !== "profile") {
                store.commit("setEntities", { componentType: "request", payload: [] });
                store.commit("setEntity", { componentType: "request", payload: null });

                router.push("/profile");
            } else if (obj == "logout") {
                store.commit("setEntities", { componentType: "request", payload: [] });
                store.commit("setEntity", { componentType: "request", payload: null });
                
                store.dispatch("accountLogout");
            }
        },
        //Вызов формы создания заявки
        async callCreateForm() {
            if(store.state.taskTypes.length === 0) {
                await store.dispatch("getEntities", {
                    componentType: 'taskType',
                    options: {
                        visibleMode: 1
                    }
                });
            }

            store.commit("setSystemOperations", "createRequest");
            store.commit("setSystemVisibleDialog", true);
        },
        //Вызов формы фильтров
        callFilters() {
            store.commit("setSystemOperations", "filterRequest");
            store.commit("setSystemVisibleDialog", true);
        },
    }
}
</script>

<style>
.navbar-app {
  background: #e3f2fd
}

.navbar-app-dark {
  background: #353340;
}

.navbar-brand {
    font-size: 1.1em;
}

.item-notify {
  margin-right: 15px;
}

.btn-new-request {
    margin-right: 10px;
}
</style>
