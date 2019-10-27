<template>
  <div id="company-form" class="company-form">
    <form @submit.prevent="handleSubmit">
      <div class="company-form__data">
        <div class="company-form__item">
          <label>Название компании</label>
          <input v-model='company.name' type="text" />
        </div>
        <div class="company-form__item">
          <label>Адрес</label>
          <input v-model='company.address' type="text" />
        </div>
        <div class="company-form__item">
          <label>ОГРН</label>
          <input v-model='company.ogrn' type="text" />
        </div>
        <div class="company-form__item">
          <label>ИНН</label>
          <input v-model='company.inn' type="text" />
        </div>
        <div class="company-form__item">
          <label>Дата регистрации</label>
          <input v-model='company.regDate' type="text" />
        </div>
      </div>
      <div class="company-form__actions">
        <button>Добавить компанию</button>
      </div>
      
      
    </form>
  </div>
</template>

<script>
  
  export default {
    name: 'company-form',
    data() {
      return {
        company: {
            name:'',
            address:'',
            ogrn:'',
            inn:'',
            regDate:'',
        },
      }
    },
    methods: {
        handleSubmit() {
            this.$emit('add:company', this.company)
        },
    },
  }
</script>

<style scoped>
  .company-form {
    display:flex;
    flex-flow:column nowrap;
  }
  .company-form__data{
    display:flex;
    flex-flow:row nowrap;
  }
  .company-form__item{
    margin:0px 5px;
  }
  .company-form__actions{
    display:flex;
    flex-flow:row nowrap;
    justify-content: flex-end;
  }
  .company-form__actions button{
    margin:0px 5px;
  }
  form {
    margin-bottom: 2rem;
  }
</style>
