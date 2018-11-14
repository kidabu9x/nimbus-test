<template>
    <div class="md-layout">
        <div class="md-layout-item">
            <btn-with-text textBox="Tải file mẫu"></btn-with-text>
        </div>
        <div class="md-layout-item" style="text-align: right;">
            <md-button class="md-raised md-primary" style="box-shadow: none;">
                Xác nhận File
            </md-button>
        </div>
    </div>
</template>

<script>
import ButtonWithTextVue from '../../../BaseView/ButtonWithText.vue';
//
export default {
    name: 'NavButton',
    props: [],
    data() {

    },
    methods: {

    },
    components: {
        'btn-with-text': ButtonWithTextVue
    }
}
</script>