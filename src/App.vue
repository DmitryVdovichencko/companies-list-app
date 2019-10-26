<template>
  <div id="app" class="small-container">
    <h1>Список компаний</h1>
    <company-form @add:company='addCompany'/>
    <button @click='openModal'>Open Modal</button>
    <modal v-show='isModalOpen' @close='closeModal'>
      <template v-slot:body>
        <company-form @add:company='addCompany'/>
      </template>
    </modal>
    <companies-table :companies='companies'/>
  </div>
</template>

<script>
  import CompanyForm from '@/components/CompanyForm.vue'
  import CompaniesTable from '@/components/CompaniesTable.vue'
  import Modal from '@/components/Modal.vue'

  export default {
    name: 'app',
    components: {
      CompaniesTable,
      CompanyForm,
      Modal,
    },
    data(){
      return {
        companies: [
          {
            id:1,
            name:'RivGauche',
            address:'Moscow, lenina 2',
            ogrn:'6586870088',
            inn:'44890654356',
            regDate:'24.01.2002'
            
          },
          {
            id:2,
            name:'OZON',
            address:'Moscow, lenina 5',
            ogrn:'65832434328',
            inn:'4482342353254356',
            regDate:'20.06.2005'
            
          }
        ],
        isModalOpen:false,
      }
    },
    methods: {
      addCompany(company) {
        const lastId = this.companies.length > 0 ? 
          this.companies[this.companies.length - 1].id : 
          0;
        const id = lastId + 1;
        const newCompany = { ...company, id };
        this.companies = [...this.companies, newCompany]
      },
      openModal() {
            this.isModalOpen = true;
      },
      closeModal() {
            this.isModalOpen = false;
      }
    }
  }
</script>

<style>
  button {
    background: #009435;
    border: 1px solid #009435;
  }

  .small-container {
    max-width: 680px;
  }
</style>
