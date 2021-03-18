<template>
<q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Kegiatan Yang Bisa Anda Pilih"
        :data="data"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
           <q-td key="nama_Kegiatan" :props="props">
              {{ props.row.nama_kegiatan }}
            </q-td>
            <q-td key="deskripsi" :props="props">
              {{ props.row.Deskripsi }}
            </q-td>
            <q-td key="namadosen" :props="props">
              {{ props.row.dataDosen.nama }}
            </q-td>
            <q-td key="aksi" :props="props">
              <div class="row q-gutter-md">
                <q-btn label="PILIH KEGIATAN" color="warning" @click="pilihKegiatan(props.row._id)"/>
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
      this.$axios.get('kegiatanadmin/getall')
        .then(res => {
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
            this.$router.push({ name: 'homesiswa' })
          } else {
            this.$showNotif(res.data.massage, 'negative')
          }
        })
      })
    }
  }
}
</script>
