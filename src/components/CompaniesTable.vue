<template>
    <div id="companies-table">
        <table>
            <thead>
                <tr>
                    <th class="name">Наименование</th>
                    <th class="address">Адрес</th>
                    <th class="ogrn">ОГРН</th>
                    <th class="inn">ИНН</th>
                    <th class="regDate">Дата регистрации</th>
                    <th class="actions">Действия</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="company in companies" :key="company.id">
                    <td v-if="editing === company.id">
                        <input type="text" v-model="company.name.value" :class="{ 'has-error': editing && company.name.value === '' }"/>
                    </td>
                    <td v-else>{{ company.name.value }}</td>
                    <td v-if="editing === company.id">
                        <input type="text" v-model="company.address.value" :class="{ 'has-error': editing && company.address.value === '' }" />
                    </td>
                    <td v-else>{{ company.address.value }}</td>
                    <td v-if="editing === company.id">
                        <input type="text" v-model="company.ogrn.value" :class="{ 'has-error': editing && company.ogrn.value === '' }"/>
                    </td>
                    <td v-else>{{ company.ogrn.value }}</td>
                    <td v-if="editing === company.id">
                        <input type="text" v-model="company.inn.value" :class="{ 'has-error': editing && company.inn.value === '' }"/>
                    </td>
                    <td v-else>{{ company.inn.value }}</td>
                    <td v-if="editing === company.id">
                        <input type="text" v-model="company.regDate.value" :class="{ 'has-error': editing && company.regDate.value === '' }"/>
                    </td>
                    <td v-else>{{ company.regDate.value }}</td>
                    <td v-if="editing === company.id">
                        <div  class="flex-row action"> 
                        <!-- <button :class="{ 'muted-button ': editing && error }" @click="editCompany(company)">Save</button> -->
                        <button title='Сохранить' @click="editCompany(company)" class="action-button" >
                        <save-icon size="1.5x"  class="icon"></save-icon>
                        </button>
                        <!-- <button class="muted-button" @click="cancelEditing(company)">Cancel</button> -->
                        <button title='Отменить' class="action-button" @click="cancelEditing(company)" >
                        <rotate-ccw-icon size="1.5x" class="icon" ></rotate-ccw-icon>
                        </button>
                        </div>

                    </td>
                    <td v-else>
                        <div  class="flex-row action">                        
                            <button title='Изменить' @click="editMode(company)" class="action-button" >
                                <edit-icon size="1.5x" class="action-button__icon"></edit-icon>
                            </button>
                                <!-- <button @click="$emit('delete:company', company.id)">Delete</button> -->
                            <button title='Удалить'  @click="$emit('delete:company', company.id)" class="action-button" >
                                <trash-2-icon size="1.5x" class="icon"></trash-2-icon>
                            </button>
                        </div>
                        <!-- <button @click="editMode(company)">Edit</button> -->

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { EditIcon, Trash2Icon, SaveIcon, RotateCcwIcon } from 'vue-feather-icons'

  export default {
    name: 'companies-table',
    components: {
        EditIcon,
        Trash2Icon,
        SaveIcon, 
        RotateCcwIcon
    },
    data() {
        return {
            editing: null,
            error:false,
            savedCompany:null,
        }
    },

    methods: {
        editMode(company) {
            this.editing = company.id;
            this.savedCompany = JSON.parse(JSON.stringify(company))
        },
        isEmpty(company){
            return Object.values(company).some((field)=>field.value === '')
        },
        cancelEditing(company){
            this.$emit('edit:company', company.id, this.savedCompany)
            this.editing = null
        },
        editCompany(company) {
            if (this.isEmpty(company)) return             
            this.$emit('edit:company', company.id, company)
            this.editing = null
        }
    },
    props: {
        companies: Array,
    },
  }
</script>

<style scoped lang="scss">
  button {
    margin: 0 0.5rem 0 0;
  }
  .action-button{
      padding: 10px;
  }
  .inn{
     width: 12%; 
     min-width: 140px; 
  }
.ogrn{
     width: 15%;
     min-width: 170px; 
  }
  .actions{
      width:12%;
      text-align: right;
  }
  .regDate{
      width: 12%;
      min-width: 140px; 
  }
  .name{
      width: 14%;
  }
    .action{
        justify-content: flex-end;
    }
</style>