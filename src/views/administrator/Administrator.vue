<template>
    <div class="window">
        <div class="container-fluid">
            <Navbar></Navbar>
            <ControlPanel></ControlPanel>
            <DataTable></DataTable>
        </div>
        <Forms></Forms>
    </div>
</template>

<script>
import Navbar from '@/components/administrator/directoryNavbar.vue';
import ControlPanel from '@/components/administrator/directoryControlPanel.vue';
import DataTable from '@/components/administrator/directoryDataTable.vue';
import Forms from '@/components/administrator/directoryForm.vue';

export default {
    components: {
        Navbar,
        ControlPanel,
        DataTable,
        Forms
    }
}
</script>

<style>
.window {
    height: 100vh;
    background: rgb(233, 233, 233);
}
</style>