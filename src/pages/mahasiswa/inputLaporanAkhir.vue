<template>
  <q-page padding>
    <div class="row q-col-gutter-lg">
      <div class="col-md-6 col-sm-6 col-xs-12">
          <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
        <q-input
          v-model="nama_kegiatan"
          label="Tulis Nama Kegiatan"
          hint=" Nama kegiatan"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
          <q-file v-model="file" class="q-pr-md" hint=" Laporan Akhir " filled icon label="Input Laporan Anda">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      name: null,
      age: null,
      accept: false,
      nama_kegiatan: null,
      laporan: null,
      id_logbook: this.$route.params.id,
      loaded: false,
      dataLogbook: null,
      file: null
    }
  },
  created () {
    this.$axios.get('akhir/getbyid/' + this.id_logbook)
      .then(res => {
        this.dataLogbook = res.data.data
        this.loaded = true
      })
  },
  methods: {
    onSubmit () {
      const dataUser = this.$q.localStorage.getItem('dataUser')
      const payload = {
        NPM: dataUser.username,
        id_logbook: this.id_logbook,
        nama_kegiatan: this.nama_kegiatan,
        laporan: this.laporan
      }
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('data', JSON.stringify(payload))
      this.$axios.post('akhir/insert', formData).then(res => {
        if (res.data.sukses) {
          this.$showNotif(res.data.massage, 'positive')
        } else {
          this.$showNotif(res.data.massage, 'negative')
        }
      })
    },
    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
</script>
