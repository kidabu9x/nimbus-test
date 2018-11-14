<script>
export default {
    name:'btn-with-text',
    props: ['textBox'],
    data(){

    },
    template: '<md-button><md-icon>get_app</md-icon><span>{{ textBox }}</span></md-button>'
}
</script>
