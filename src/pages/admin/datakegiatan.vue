<template>
<q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Pilih kegiatan"
        :data="data"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:top-right>
          <q-btn label="Tambah Kegiatan" color="primary" unelevated icon="add" :to="{ name: 'inputKegiatanAdmin' }"/>
        </template>

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
