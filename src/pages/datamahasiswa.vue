<template>
<q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Data Mahasiswa Merdeka Belajar Kampus Merdeka"
        :data="data"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="NPM" :props="props">
              {{ props.row.NPM }}
            </q-td>
            <q-td key="Nama" :props="props">
              {{ props.row.Nama }}
            </q-td>
            <q-td key="Pembimbing" :props="props">
              {{ props.row.Pembimbing }}
            </q-td>
            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>
            <q-td key="Jenis_kegiatan" :props="props">
              {{ props.row.Jenis_kegiatan }}
            </q-td>
            <q-td key="aksi" :props="props">
              <div class="row q-gutter-md">
                <q-btn label="edit" :to="{ name: 'edit', params: { id: props.row._id }}" color="warning"/>
                <q-btn @click="confirm(props.row._id)" label="Hapus" color="negative"/>
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
        { name: 'NPM', align: 'left', label: 'Npm', field: 'NPM', sortable: true },
        { name: 'Nama', align: 'left', label: 'Nama', field: 'Nama', sortable: true },
        { name: 'Pembimbing', align: 'left', label: 'Pembimbing', field: 'Pembimbing' },
        { name: 'email', align: 'left', label: 'email', field: 'Pembimbing' },
        { name: 'Jenis_kegiatan', align: 'left', label: 'Jenis kegiatan', field: 'Jenis_kegiatan' },
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
      this.$axios.get('Lihatdata/getall')
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
        this.$axios.delete('Lihatdata/delete/' + id)
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
