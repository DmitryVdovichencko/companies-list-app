<template>
  <div id="company-form" class="company-form">
    <form @submit.prevent="handleSubmit">
      <div class="company-form__data">
        <div class="company-form__item" v-bind:class="field.key" v-for="field in company" :key="field.key">
           
              <div class="flex-column">            
                    <label>{{field.label}}</label>
                    <input v-model='field.value' type="text" :class="{ 'has-error': submitting && field.error }"  @focus="clearStatus"
                    @keypress="clearStatus" />
                  </div>  
  

   
        </div>

        
      </div>
     <p v-if="error && loading" class="error-message">
       <alert-triangle-icon size="1.5x" class="error-icon"></alert-triangle-icon> {{errorMessage}}
      </p>
      <p v-if="error && submitting" class="error-message">
       <alert-triangle-icon size="1.5x" class="error-icon"></alert-triangle-icon> {{errorMessage}}
      </p>
      <p v-if="success" class="success-message">
         <check-square-icon size="1.5x" class="success-icon"></check-square-icon> Компания успешно добавлена
      </p>
      
    </form>
    <div class="flex-row company-form__actions">   
       <button @click="getData(company.inn.value)">
         <div class="flex-row load-button">
                <download-cloud-icon size="1.5x" class="load-button__icon" ></download-cloud-icon> 
          <span class="load-button__text">Загрузить данные компании по ИНН</span> 
           
        </div> 
     
      </button>   
   
        <button class="add-button" @click="handleSubmit">Добавить компанию</button>
      </div>

  </div>
</template>


<script>
  import { CheckSquareIcon, DownloadCloudIcon, AlertTriangleIcon } from 'vue-feather-icons'
  

  export default {
    name: 'company-form',
    components: {
      CheckSquareIcon,
      AlertTriangleIcon, 
      DownloadCloudIcon
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
        loading: false,
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
        async getData(query){
          this.loading = true;
          const token = "6034ce553132e1c3f7a02bb7a15337d46f941b1a";
          const serviceUrl = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
          const request = {
          "query": query
          };
          const params = {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            "Authorization": "Token " + token
          },
         body: JSON.stringify(request),
         
          }
         
          const response = await fetch(serviceUrl,params)
          
          if (!response.ok){
            this.clearInputs()
            this.loading=true
            this.error=true
            this.errorMessage='Ошибка соединения с сервером dadata.ru. Попробуйте ввести данные вручную'
            
            return
          }
          const responseObject = await response.json()
          const dataCompany = await responseObject.suggestions[0]
          if (dataCompany === undefined){
            this.clearInputs()
            this.loading=true
            this.error=true
            this.errorMessage='Компания с введенным ИНН не найдена'
            
            return
          }
          else{
            this.error=false,
            this.errorMessage=''
          }
          const options = {year: 'numeric', month: 'numeric', day: 'numeric' };
          const regDateLocal = await new Date(dataCompany.data.ogrn_date).toLocaleString('ru-RU',options)
          const dataObject = await {
                    company: {
            name:{
              key:'name',
              label:'Название компании',
              value:dataCompany.data.name.short_with_opf,
              error:false,
            },
            address:{
              key:'address',
              label:'Адрес',
              value:dataCompany.data.address.value,
              error:false,
            },
            ogrn:{
              key:'ogrn',
              label:'ОГРН',
              value:dataCompany.data.ogrn,
              error:false,
            },
            inn:{
              key:'inn',
              label:'ИНН',
              value:dataCompany.data.inn,
              error:false,
            },
            regDate:{
              key:'regDate',
              label:'Дата регистрации',
              value:regDateLocal,
              error:false,
            },

        }
    

        }
          
          console.log(dataObject)
          Object.assign(this.$data, dataObject)
          this.loading = false
          
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
    padding:0px;
    margin:0px;
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
  .action-button{
    padding: 10px;
    margin: auto;
    margin-bottom:0px;
  }
  .add-button{
    background:$secondary-color;
       border:$secondary-color;
    &:hover{
        background:darken($secondary-color, 10%);
        border:$secondary-color;
    }
  }

    .load-button {
   
    justify-content: flex-start;
    align-items: center;
    
      .load-button__text {
    padding:0px 10px;
    

  }
        .load-button__icon {
    margin-left:5px;
    

  }
    
  }



</style>
