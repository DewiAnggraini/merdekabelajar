<template>
<q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Data kegiatan Anda"
        :data="data"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
           <q-td key="nama_Kegiatan" :props="props">
              {{ props.row.detailKegiatan.nama_kegiatan }}
            </q-td>
            <q-td key="deskripsi" :props="props">
              {{ props.row.detailKegiatan.Deskripsi }}
            </q-td>
            <q-td key="namadosen" :props="props">
              {{ props.row.detailDosen.nama }}
            </q-td>
            <q-td key="status" :props="props">
              <div v-if="props.row.status === 0">
                Belum Di Konfirmasi
              </div>
              <div v-else>
                Sudah Di Konfirmasi
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
        { name: 'nama_Kegiatan', align: 'left', label: 'Nama Kegiatan', field: 'nama_Kegiatan', sortable: true },
        { name: 'deskripsi', align: 'left', label: 'Deskripsi', field: 'deskripsi', sortable: true },
        { name: 'namadosen', align: 'left', label: 'Nama Dosen', field: 'namadosen', sortable: true },
        { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true }
      ],

      data: []
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    getdata () {
      const dataMhs = this.$q.localStorage.getItem('dataUser')
      this.$axios.get('kegiatanmahasiswa/getdatakegiatanbymhs/' + dataMhs.username)
        .then(res => {
          console.log(res)
          this.data = res.data.data
        })
    },
    pilihKegiatan (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin Memilih Kegiatan Ini?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        const datamhs = this.$q.localStorage.getItem('dataUser')
        this.$axios.post('kegiatanmahasiswa/insert', {
          id_kegiatan: id,
          NPM: datamhs.username
        }).then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.massage, 'positive')
          } else {
            this.$showNotif(res.data.massage, 'negative')
          }
        })
      })
    }
  }
}
</script>
