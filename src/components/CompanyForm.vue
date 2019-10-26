<template>
  <div id="company-form">
    <form @submit.prevent="handleSubmit">
      <label>Название компании</label>
      <input v-model='company.name' type="text" />
      <label>Адрес</label>
      <input v-model='company.address' type="text" />
      <label>ОГРН</label>
      <input v-model='company.ogrn' type="text" />
      <label>ИНН</label>
      <input v-model='company.inn' type="text" />
      <label>Дата регистрации</label>
      <input v-model='company.regDate' type="text" />
      
      <button>Добавить компанию</button>
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
  form {
    margin-bottom: 2rem;
  }
</style>
