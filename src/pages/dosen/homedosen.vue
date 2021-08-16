<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Data kegiatan mahasiswa Merdeka Belajar"
        :data="data"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="namaKegiatan" :props="props">
              {{ props.row.nama_kegiatan }}
            </q-td>
            <q-td key="namaMahasiswa" :props="props">
              {{ props.row.detailMahasiswa.nama }}
            </q-td>
            <q-td key="NPM" :props="props">
              {{ props.row.detailMahasiswa.username }}
            </q-td>
            <q-td key="status" :props="props">
              <div v-if="props.row.mahasiswa.status === 0">
                Belum Di Konfirmasi
              </div>
              <div v-else>
                Sudah Di Konfirmasi
              </div>
            </q-td>
            <q-td key="aksi" :props="props">
              <div class="row q-gutter-md">
                <q-btn :disable="props.row.mahasiswa.status === 1" label="KONFIRMASI" color="warning" @click="confirm(props.row.mahasiswa._id)"/>
                 <q-btn label="INPUT KEGIATAN" color="warning" unelevated :to="{ name: 'inputLogBookdosen', params: { id: props.row.mahasiswa.NPM}}"/>
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
        { name: 'namaKegiatan', align: 'left', label: 'Nama kegiatan', field: 'namaKegiatan', sortable: true },
        { name: 'namaMahasiswa', align: 'left', label: 'Nama Mahasiswa', field: 'namaMahasiswa', sortable: true },
        { name: 'NPM', align: 'left', label: 'Npm', field: 'NPM', sortable: true },
        { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi', sortable: true }
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
      this.$axios.get('kegiatanmahasiswa/getdatakegiatan/' + dataDosen.username)
        .then(res => {
          this.data = res.data.data
        })
    },
    confirm (id) {
      this.$q.dialog({
        title: 'konfirmasi',
        message: 'Apakah anda yakin akan mengkonfirmasi kegiatan ini?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.put('kegiatanmahasiswa/konfirmasi/' + id)
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
