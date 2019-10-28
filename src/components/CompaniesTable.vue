<template>
    <div id="companies-table">
        <table>
            <thead>
                <tr>
                    <th>Наименование</th>
                    <th>Адрес</th>
                    <th>ОГРН</th>
                    <th>ИНН</th>
                    <th>Дата регистрации</th>
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
                        <button :class="{ 'muted-button ': editing && error }" @click="editCompany(company)">Save</button>
                        <button class="muted-button" @click="cancelEditing(company)">Cancel</button>
                    </td>
                    <td v-else>
                        <button @click="editMode(company)">Edit</button>
                        <button @click="$emit('delete:company', company.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'companies-table',
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
</style>