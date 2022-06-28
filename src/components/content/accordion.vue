
<template>
     <section>
       <container>
          <div style="margin-bottom:20px;">
            <button 
            @click="toggleAccordion()" 
            :class="{ noBorderDown : isOpen }" 
            :aria-expanded="isOpen"
            :aria-controls="`collapse${_uid}`"
            >
                <slot name="title" />
                <img class="arrow" src="../../assets/img/icons/down-arrow.svg" alt="">
           </button>
          
            <div v-show="isOpen" :id="`collapse${_uid}`" class="content"  :class="{ noBorderUp : isOpen }" >
                <slot name="content" />
            </div>
          </div>
       </container> 
     </section>
</template>

<script>
import Container from './container.vue'

export default {
    name: 'Accordion', 
    components: {
        Container,
    },
   methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;
    },
   },
    computed: {

    },
    data() {
        return {
            isOpen : false,
        }
    }
};
</script>

<style scoped>
section {
    height: auto;
    width: 100%;
}
span {
    margin-bottom: 20px;
}
button {
    border: 1px solid #0D2451 ;
    background: white;
    font-size: 22px;
    font-weight: 700;
    color: #0D214D;
    text-align: left;
    padding: 8px 12px;
    width: 100%;
    max-width: 980px;
}
.arrow {
    width: 24px;
    height: 24px;
    float: right;
}
.content {
    text-align: left;
    padding: 20px 50px;
    border: 1px solid #0D2451 ;
    font-size: 22px;
    font-weight: 400;
}
.noBorderDown {
    border-bottom: none;
}
.noBorderUp {
    border-top: none;
}
@media screen and (max-width: 600px) { 
     .content {
              overflow: hidden;
               padding: 20px 10px!important;
              
          }
  }
</style>

