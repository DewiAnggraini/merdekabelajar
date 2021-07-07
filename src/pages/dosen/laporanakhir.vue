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
              {{ props.row.NPM}}
            </q-td>
           <q-td key="nama_kegiatan" :props="props">
              {{ props.row.nama_kegiatan}}
            </q-td>
            <q-td key="laporan" :props="props">
              {{ props.row.laporan }}
            </q-td>
            <q-td key="aksi" :props="props">
              <div class="row q-gutter-md">
                <q-btn label="INPUT NILAI" color="warning" unelevated :to="{ name: 'inputnilai', params: { id: props.row._id}}"/>
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
        { name: 'nama_kegiatan', align: 'left', label: 'Nama Kegiatan', field: 'nama_kegiatan', sortable: true },
        { name: 'laporan', align: 'left', label: 'Laporan', field: 'laporan', sortable: true },
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
      this.$axios.get('akhir/getbyid/' + dataDosen.username)
        .then(res => {
          this.data = res.data.data
          console.log(res.data)
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
