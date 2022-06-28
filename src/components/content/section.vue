
<template>
     <section>
       <container>
            <slot></slot>
       </container> 
     </section>
</template>

<script>
import Container from './container.vue'

export default {
    name: 'Layout', 
    components: {
        Container,
    },
    methods: {

    },
    computed: {

    }
};

</script>

<style scoped>
section {
   
    height: auto;
   
}

</style>

