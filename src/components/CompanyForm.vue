<template>
  <div id="company-form" class="company-form">
    <form @submit.prevent="handleSubmit">
      <div class="company-form__data">
        <div class="company-form__item" v-for="field in company" :key="field.key">
          <label>{{field.label}}</label>
          <input v-model='field.value' type="text" :class="{ 'has-error': submitting && field.error }"  @focus="clearStatus"
    @keypress="clearStatus" />
        </div>
        
      </div>
      <div class="company-form__actions">
        <button>Добавить компанию</button>
      </div>
      <p v-if="error && submitting" class="error-message">
       <alert-triangle-icon size="1.5x" class="error-icon"></alert-triangle-icon> {{errorMessage}}
      </p>
      <p v-if="success" class="success-message">
         <check-square-icon size="1.5x" class="success-icon"></check-square-icon> Компания успешно добавлена
      </p>
      
    </form>
  </div>
</template>


<script>
  import { CheckSquareIcon } from 'vue-feather-icons'
  import { AlertTriangleIcon } from 'vue-feather-icons'

  export default {
    name: 'company-form',
    components: {
      CheckSquareIcon,
      AlertTriangleIcon
    },
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
        errorMessage:'',
        success: false
      }
    },
    computed:{
        isSomeEmpty(){
          Object.values(this.company).forEach((field)=>{
            field.error = field.value === '';
          })
          const emptyFields = Object.values(this.company).filter((field)=>{

            return field.value ==='';
          })
          
          return emptyFields.length !== 0
        
      },
      validate(){
        const messages = {
          empty:'Пожалуйста заполните все необходимые поля',
        }
        if(this.isSomeEmpty) {
          return{ error:true, message: messages.empty}
        }
        return {error:false,message: ''}     
      },
    },
    methods: {
        handleSubmit() {
          this.submitting = true
          this.clearStatus()
          if (this.validate.error) {
            this.error = true
            this.errorMessage = this.validate.message
            return
          }
          this.$emit('add:company', this.company)
          this.error = false
          this.success = true
          this.submitting = false
          if(this.success){
            setTimeout(()=> {this.clearInputs()},5000)
          }
          
  
        
        },
        clearInputs(){
          Object.assign(this.$data, this.$options.data.apply(this))
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
  .success-message{
    display:flex;
    flex-flow:row nowrap;
    align-items: center;
    .success-icon{
      color:$success;
      margin-right:10px;
    }
  }
    .error-message{
    display:flex;
    flex-flow:row nowrap;
    align-items: center;
    .error-icon{
      color:$error;
      margin-right:10px;
    }
  }
</style>
