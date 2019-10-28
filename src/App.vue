<template>
  <div id="app" class="small-container">
    <h1>Список компаний</h1>
    <company-form @add:company='addCompany'/>
 <button @click='openModal' class="add-button"> <plus-circle-icon size="1.5x" class="add-button__icon"></plus-circle-icon> <span class="add-button__text">Добавить новую компанию</span></button>
    <modal v-show='isModalOpen' @close='closeModal'>
      <template v-slot:body>
        <company-form @add:company='addCompany'/>
      </template>
    </modal>
    <companies-table :companies='companies' @delete:company="deleteCompany" @edit:company="editCompany"/>
   
  </div>
</template>

<script>
  import CompanyForm from '@/components/CompanyForm.vue'
  import CompaniesTable from '@/components/CompaniesTable.vue'
  import Modal from '@/components/Modal.vue'
  import { PlusCircleIcon } from 'vue-feather-icons'
  export default {
    name: 'app',
    components: {
      CompaniesTable,
      CompanyForm,
      Modal,
      PlusCircleIcon,
    },
    data(){
      return {
        companies: [
          {
            id:1,
            name:{
              value:'RivGauche'
              },
            address:{
              value:'Moscow, lenina 2'
              },
            ogrn:{
              value:'6586870088',
            },
            inn:{
              value:'44890654356',
            },
            regDate:{
              value:'24.01.2002',
            }
            
          },

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
      editCompany(id, updatedCompany) {
        this.companies = this.companies.map(company =>
          company.id === id ? updatedCompany : company
        )
      },
      deleteCompany(id) {
        this.companies = this.companies.filter(
          company => company.id !== id
        )
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

<style lang="scss">

  .add-button {
    display:flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    background: $button-background ;
    
  }
  .add-button__text {
    padding:0px 10px;
    

  }

  .small-container {
    max-width: 900px;
  }
</style>
