<template>
    <div></div>
</template>

<script>
import store from '@/store';
//import router from '@/router';
import { BASE_URL } from "@/config"

export default {
    async mounted() {
        await store.dispatch("getAccount")
        await this.redirectFor();
    },
    methods: {
        async redirectFor() {
            if(store.state.accountProfile !== null) {
                let userType = store.state.accountProfile.userType.systemUserType;

                switch(userType) {
                    case 500:
                        window.location.href = `${BASE_URL}/administrator`;
                        //router.push("/administrator");
                        break;
                    case 300:
                        window.location.href = `${BASE_URL}/requests`;
                        //router.push("/requests");
                        break;
                    case 400:
                        window.location.href = `${BASE_URL}/tasks/my/filter/inWork`;
                        //router.push("/tasks/my/filter/inWork");
                        break;
                }
            }            
        }
    }
}
</script>