<template>
  <div id="company-form" class="company-form">
    <form @submit.prevent="handleSubmit">
      <div class="company-form__data">
        <div class="company-form__item" v-for="field in company" :key="field.key">
          <label>{{field.label}}</label>
          <input v-model='field.value' type="text" :class="{ 'has-error': submitting && (()=> isEmpty('name')) }"  @focus="clearStatus"
    @keypress="clearStatus" />
        </div>
        
      </div>
      <div class="company-form__actions">
        <button>Добавить компанию</button>
      </div>
      <p v-if="error && submitting" class="error-message">
        ❗Please fill out all required fields
      </p>
      <p v-if="success" class="success-message">
        ✅ Company successfully added
      </p>
      
    </form>
  </div>
</template>

<script>
  
  export default {
    name: 'company-form',
    data() {
      return {
        company: {
            name:{
              key:'name',
              label:'Название компании',
              value:'',
              error:false,
            },
            address:{
              key:'address',
              label:'Адрес',
              value:'',
              error:false,
            },
            ogrn:{
              key:'ogrn',
              label:'ОГРН',
              value:'',
              error:false,
            },
            inn:{
              key:'inn',
              label:'ИНН',
              value:'',
              error:false,
            },
            regDate:{
              key:'regDate',
              label:'Дата регистрации',
              value:'',
              error:false,
            },

        },
        submitting: false,
        error: false,
        success: false,
      }
    },
    computed: {
      isEmpty(prop) {
        return this.company[prop] === ''
      },
      isSomeEmpty(){
        const emptyFields = Object.entries(this.company).filter((field)=> field[1]==='')
        return emptyFields.length > 0
      },
      invalidName() {
        return this.company.name === ''
      },
      invalidAddress() {
        return this.company.address === ''
      },
    },
    methods: {
        handleSubmit() {
          this.submitting = true
          this.clearStatus()
          if (this.isSomeEmpty) {
            this.error = true
            return
          }
          this.$emit('add:company', this.company)
          this.error = false
          this.success = true
          this.submitting = false
        },
        clearStatus() {
          this.success = false
          this.error = false
        },
    },
  }
</script>

<style scoped lang="scss">
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
