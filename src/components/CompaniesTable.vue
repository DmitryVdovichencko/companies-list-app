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
                    <td>{{ company.name }}</td>
                    <td>{{ company.address }}</td>
                    <td>{{ company.ogrn }}</td>
                    <td>{{ company.inn }}</td>
                    <td>{{ company.regDate }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'companies-table',
    props: {
        companies: Array,
    },
  }
</script>

<style scoped></style>