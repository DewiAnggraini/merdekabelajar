<template>
<q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Data Nilai"
        :data="data"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="NPM" :props="props">
              {{ props.row.NPM }}
            </q-td>
           <q-td key="nama_kegiatan" :props="props">
              {{ props.row.nama_kegiatan}}
            </q-td>
            <q-td key="Nilai_skill" :props="props">
              {{ props.row.Nilai_skill }}
            </q-td>
            <q-td key="Nilai_matakuliah" :props="props">
              {{ props.row.Nilai_matakuliah }}
            </q-td>
            <q-td key="File" :props="props">
              {{ props.row.File }}
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
        { name: 'Nilai_skill', align: 'left', label: 'Nilai Skill', field: 'Nilai_skill', sortable: true },
        { name: 'Nilai_matakuliah', align: 'left', label: 'Nilai Matakuliah', field: 'Nilai_matakuliah', sortable: true },
        { name: 'File', align: 'left', label: 'File SK', field: 'File' }
      ],

      data: []
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    getdata () {
      this.$axios.get('inputnilai/getbyid/' + this.$route.params.npm)
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
        this.$axios.delete('inputnilai/delete/' + id)
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
