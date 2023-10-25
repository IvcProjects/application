<template>
    <div class="window">
        <div class="container-fluid">
            <Navbar></Navbar>
            <ControlPanel></ControlPanel>
            <DataTable></DataTable>
        </div>
        <Forms v-if="isVisible"></Forms>
    </div>
</template>

<script>
import store from '@/store';

import Navbar from '@/components/executor/taskNavbar.vue';
import ControlPanel from '@/components/executor/taskControlPanel.vue';
import DataTable from '@/components/executor/taskDataTable.vue';
import Forms from '@/components/executor/taskForm.vue';

export default {
    components: {
        Navbar,
        ControlPanel,
        DataTable,
        Forms
    },
    computed: {
        isVisible() {
            return store.state.systemVisibleDialog;
        },
    }
}
</script>

<style>
.window {
    height: 100vh;
    background: rgb(233, 233, 233);
}
</style>