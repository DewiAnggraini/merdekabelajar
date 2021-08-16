<template>
<q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Data Laporan Akhir"
        :data="data"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="NPM" :props="props">
              {{ props.row.mahasiswa.NPM}}
            </q-td>
            <q-td key="aksi" :props="props">
              <div class="row q-gutter-md">
                <q-btn label="LIHAT" color="warning" unelevated :to="{ name: 'lihatakhir', params: { npm: props.row.mahasiswa.NPM}}"/>
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
        { name: 'NPM', align: 'left', label: 'NPM', field: 'NPM', sortable: true },
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
      const dataDosen = this.$q.localStorage.getItem('dataUser')
      this.$axios.get('kegiatanmahasiswa/getdatakegiatanconfirmed/' + dataDosen.username)
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
        this.$axios.delete('akhir/delete/' + id)
          .then(res => {
            if (res.data.sukses) {
              this.$showNotif(res.data.massage, 'positive')
              this.getdata()
            } else {
              this.$showNotif(res.data.massage, 'negative')
            }
          })
      })
    }
  }
}
</script>
