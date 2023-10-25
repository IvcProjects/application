<template>
<div class="div-register-view">
    <div class="container">
        <div class="row justify-content-center">
            <RegisterForm></RegisterForm>
        </div>
    </div>
</div>
</template>

<script>
import RegisterForm from "@/components/authentication/registerForm.vue";

export default {
    components: {
        RegisterForm
    }
}
</script>

<style>
.div-register-view{
    display: table-cell;
    vertical-align: middle;
    height: 100vh;
    width: 100vw;
}
</style>