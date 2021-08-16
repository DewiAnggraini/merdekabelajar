<template>
<q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Data logbook"
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
            <q-td key="Deskripsi" :props="props">
              {{ props.row.Deskripsi }}
            </q-td>
            <q-td key="waktu_mulai_pelaksanaan" :props="props">
              {{ $parseDate(props.row.waktu_mulai_pelaksanaan).fullDate }}
            </q-td>
            <q-td key="waktu_selesai_pelaksanaan" :props="props">
             {{ $parseDate(props.row.waktu_selesai_pelaksanaan).fullDate }}
            </q-td>
            <q-td key="target_kegiatan" :props="props">
              {{ props.row.target_kegiatan }}
            </q-td>
            <q-td key="Keterangan" :props="props">
              {{ (props.row.Keterangan) }}
            </q-td>
            <q-td key="aksi" :props="props">
              <div class="row q-gutter-md">
                <q-btn label="EDIT" color="warning" unelevated :to="{ name: 'editlogbook', params: { id: props.row._id}}"/>
                <q-btn @click="confirm(props.row._id)" label="DELETE" color="negative" unelevated/>
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
        { name: 'Deskripsi', align: 'left', label: 'Deskripsi', field: 'Deskripsi' },
        { name: 'waktu_mulai_pelaksanaan', align: 'left', label: 'Waktu mulai Pelaksanaan', field: 'waktu_mulai_pelaksanaan' },
        { name: 'waktu_selesai_pelaksanaan', align: 'left', label: 'Waktu selesai Pelaksanaan', field: 'waktu_selesai_pelaksanaan' },
        { name: 'target_kegiatan', align: 'left', label: 'Target kegiatan', field: 'target_kegiatan' },
        { name: 'Keterangan', align: 'left', label: 'Keterangan', field: 'Keterangan' },
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
      this.$axios.get('logbook/getbymhs/' + this.$route.params.npm)
        .then(res => {
          console.log(res.data.data)
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
        this.$axios.delete('logbook/delete/' + id)
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
