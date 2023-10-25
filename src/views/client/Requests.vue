<template>
    <div
    v-bind:class="{ 'window':(darkTheme === false), 'window-dark':(darkTheme === true) }">
        <div class="container-fluid">    
            <Navbar></Navbar>
            <ControlPanel></ControlPanel>
            <DataTable></DataTable>
        </div>
        <Forms></Forms>    
    </div>    
</template>

<script>
import store from '@/store';
import Navbar from '@/components/client/requestNavbar.vue';
import ControlPanel from '@/components/client/requestControlPanel.vue'; 
import DataTable from '@/components/client/requestDataTable.vue';
import Forms from '@/components/client/requestForm.vue';

export default {
    components: {
        Navbar,
        ControlPanel,
        DataTable,
        Forms
    },
    computed:{
        darkTheme() {
            if(store.state.accountProfile !== null) {
                return store.state.accountProfile.isDarkTheme;
            }

            return false;
        }
    }
}
</script>

<style scoped>
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