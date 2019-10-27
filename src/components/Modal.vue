<template>
  <div class="modal-backdrop">
    <div class="modal">
      <slot name="header">
        <header class="modal__header">
            <h2>Добавить новую компанию</h2>

      
            <x-square-icon size="1.5x" class="modal__close" @click="close"></x-square-icon>
        </header>
            
      </slot>

      <slot name="body">
      </slot>

      <slot name="footer">
      </slot>
    </div>
  </div>
</template>

<script>
  import { XSquareIcon } from 'vue-feather-icons'
  export default {
    name: 'modal',
    components: {
      XSquareIcon
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style lang="scss">
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    border-radius:5px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    padding:20px 10px;
  }
  .modal__close:hover {
   
    color:$success ;
    

  }

  .modal__header  {
    padding: 15px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

 

  .modal__footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }


</style>