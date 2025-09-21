<template>
    <div id="report">
        <div class="row d-flex justify-content-around py-4">
            <card-template onclick="openDialog(1)">
                <template v-slot:card-title>
                    <h2>List Produtcs</h2>
                </template>

                <template v-slot:card-content>
                    <img src="" alt="">
                </template>
            </card-template>

            <card-template>
                <template v-slot:card-title>
                    <h2>Coluna</h2>
                </template>

                <template v-slot:card-content>
                    <p>Este é o conteúdo do card, passado dinamicamente!</p>
                </template>
            </card-template>

            <card-template>
                <template v-slot:card-title>
                    <h2>Coluna</h2>
                </template>
                <template v-slot:card-content>
                    <p>Este é o conteúdo do card, passado dinamicamente!</p>
                </template>
            </card-template>

            <card-template>
                <template v-slot:card-title>
                    <h2>Coluna</h2>
                </template>

                <template v-slot:card-content>
                    <p>Este é o conteúdo do card, passado dinamicamente!</p>
                </template>
            </card-template>
        </div>
    </div>
</template>
<script>
import CardTemplate from "@/templates/CardTemplate.vue";

export default {
    name: "ReportContent",
    components: {
        CardTemplate,
    },
    methods: {
        
    },
};
</script>
<style></style>