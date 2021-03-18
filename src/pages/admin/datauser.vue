<template>
<q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Data User"
        :data="data"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:top-right>
          <q-btn label="tambah dosen" color="primary" unelevated icon="add" :to="{ name: 'tambahdosenadmin' }"/>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
           <q-td key="nama" :props="props">
              {{ props.row.nama }}
            </q-td>
            <q-td key="username" :props="props">
              {{ props.row.username }}
            </q-td>
            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>
            <q-td key="level" :props="props">
              <div v-if="props.row.level === 1">
                Mahasiswa
              </div>
              <div v-else-if="props.row.level === 2">
                admin
              </div>
              <div v-else>
                Dosen
              </div>
            </q-td>
            <q-td key="aksi" :props="props">
              <div class="row q-gutter-md">
                <q-btn label="reset password" color="warning"/>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>

    </div>
  </q-page>
  </template>
<script>
export default {
  data () {
    return {
      columns: [
        { name: 'nama', align: 'left', label: 'nama', field: 'nama', sortable: true },
        { name: 'username', align: 'left', label: 'username', field: 'username', sortable: true },
        { name: 'email', align: 'left', label: 'email', field: 'email' },
        { name: 'level', align: 'left', label: 'level', field: 'level' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],

      data: []
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    getdata () {
      this.$axios.get('user/getdata')
        .then(res => {
          this.data = res.data.data
        })
    },
    confirm (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like to delete this data???????',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete('user/delete/' + id)
          .then(res => {
            if (res.data.sukses) {
              this.$q.notify({
                position: 'bottom',
                timeout: 2500,
                color: 'positive',
                message: res.data.massage
              })
              this.getdata()
            } else {
              this.$q.notify({
                position: 'bottom',
                timeout: 2500,
                color: 'negative',
                message: res.data.massage
              })
            }
          })
      })
    }
  }
}
</script>
