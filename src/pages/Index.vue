<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Data kegiatan"
        :data="data"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="nama_kegiatan" :props="props">
              {{ props.row.nama_kegiatan }}
            </q-td>
            <q-td key="deskripsi" :props="props">
              {{ props.row.deskripsi }}
            </q-td>
            <q-td key="keterangan" :props="props">
              {{ props.row.keterangan }}
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
        { name: 'nama_kegiatan', align: 'left', label: 'Nama kegiatan', field: 'nama_kegiatan', sortable: true },
        { name: 'deskripsi', align: 'left', label: 'Deskripsi', field: 'deskripsi', sortable: true },
        { name: 'keterangan', align: 'left', label: 'Keterangan', field: 'keterangan' },
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
      this.$axios.get('kegiatan/getall')
        .then(res => {
          this.data = res.data.data
        })
    },
    confirm (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like to delet this data???????',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete('kegiatan/delete/' + id)
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
