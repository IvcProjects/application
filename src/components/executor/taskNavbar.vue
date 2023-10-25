<template>
    <div class="row">
        <nav class="navbar navbar-light navbar-app">
            <router-link class="navbar-brand" to="/">АИС «Диспетчерская служба»</router-link>
            <div class="ml-auto">   
            <el-badge :is-dot="isNotifyYes" class="item" v-bind:class="{ 'item-notify':(isNotifyYes === false), 'item-notify-active':(isNotifyYes === true) }">
                <i class="el-icon-bell" @click="clickToFreeTask"></i>
            </el-badge>            
            <!-- <el-button type="info" icon="el-icon-s-operation" size="small" class="btn-filters" @click="callFilters" v-if="systemIsMobile">Фильтры</el-button> -->
            <el-dropdown @command="handleUserMenu" trigger="click" v-if="accountProfile !== null">            
                <el-button size="small" class="btn-dropdown" icon="el-icon-user">
                <span class="username" v-if="accountProfile.userRole.systemRole !== 700">{{ accountProfile.username }}</span>
                <span class="username" v-if="accountProfile.userRole.systemRole === 700">Администратор</span>
                <span class="icon-arrow">
                    <i class="el-icon-caret-bottom"></i>
                </span>
                </el-button>
                <el-dropdown-menu slot="dropdown" class="nav-dropdown">
                    <el-dropdown-item command="profile" class="drop-item" v-if="accountProfile.id > 0">
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
    },
    computed: {
        isNotifyYes() {
            return store.state.systemNotify;
        },
        accountProfile() {
            return store.state.accountProfile;
        },
    },
    methods: {
        //Открыть меню на кнопке авторизованного пользователя
        handleUserMenu(obj) {
            if (obj == "profile" && this.$route.name !== "profile") {
                store.commit("setEntities", { componentType: "task", payload: [] });
                store.commit("setEntity", { componentType: "task", payload: null });
                
                router.push("/profile");
            } else if (obj == "logout") {
                store.dispatch("accountLogout");
            }
        },
        //Вызов формы фильтров
        callFilters() {
            store.commit("setSystemOperations", "filterRequest");
            store.commit("setSystemVisibleDialog", true);
        },
        //Нажатие на колокольчик
        clickToFreeTask() {
            let route = '/tasks/free/filter/inWork';

            if(this.$route.path !== route) {
                store.commit("setSystemNotify", false);
                store.commit("setEntity", { componentType: "taskVisibleMode", payload: 2 });
                store.dispatch("getEntities", {
                    componentType: 'task',
                    options: {
                        visibleMode: 2,
                        entityJson: {
                            executorId: this.accountProfile.id
                        }
                    },
                    params: "TaskStatus=InWork"
                });

                router.push(route);
            }
            else {
                store.commit("setSystemNotify", false);
                store.commit("setEntity", { componentType: "taskVisibleMode", payload: 2 });
                store.dispatch("getEntities", {
                    componentType: 'task',
                    options: {
                        visibleMode: 2,
                        entityJson: {
                            executorId: this.accountProfile.id
                        }
                    },
                    params: "TaskStatus=InWork"
                });
            }            
        }
    }
}
</script>

<style scoped>
.navbar-app {
  background: #e3f2fd;
}

.navbar-brand {
    font-size: 1.1em;
}

.item-notify-active {
  margin-right: 15px;
  color: red;
  cursor: pointer;
}

.item-notify {
  margin-right: 15px;
  cursor: pointer;
}

.btn-filters {
    margin-right: 10px;
}
</style>
