<template>
<div v-bind:class="{ 'div-login-view-dark':(darkTheme === false), 'div-login-view':(darkTheme === true) }" v-loading="systemPreloader">
    <div class="container">
        <div class="row justify-content-center">
            <LoginForm></LoginForm>
        </div>
    </div>
</div>
</template>

<script>
import store from '@/store';
import LoginForm from "@/components/authentication/loginForm.vue";

export default {
    components: {
        LoginForm
    },
    computed: {
        systemPreloader() {
            return store.state.systemPreloader;
        },
        darkTheme() {
            if(store.state.accountProfile !== null) {
                return store.state.accountProfile.isDarkTheme;
            }

            return false;
        }
    }   
}
</script>

<style>
.div-login-view,
.div-login-view-dark {
    display: table-cell;
    vertical-align: middle;
    height: 100vh;
    width: 100vw;
    background: rgb(233, 233, 233);
}

.div-login-view-dark {
    background: #2B3648;
}


</style>