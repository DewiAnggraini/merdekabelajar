<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 400px">

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="nama_kegiatan"
          label="tulis kegiatan*"
          hint="nama kegiatan anda"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
        <q-input
          filled
          v-model="deskripsi"
          label="tulis deskripsi*"
          hint=" deskripsi kegiatan"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
        <q-input
          filled
          v-model="keterangan"
          label="tulis keterangan*"
          hint="keterangan kegiatan"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>

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
      deskripsi: null,
      keterangan: null
    }
  },

  methods: {
    onSubmit () {
      this.$axios.post('kegiatan/insert', {
        nama_kegiatan: this.nama_kegiatan,
        deskripsi: this.deskripsi,
        keterangan: this.deskripsi
      }).then(res => {
        if (res.data.sukses) {
          this.$q.notify({
            position: 'bottom',
            timeout: 2500,
            color: 'positive',
            message: res.data.massage
          })
        } else {
          this.$q.notify({
            position: 'bottom',
            timeout: 2500,
            color: 'negative',
            message: res.data.massage
          })
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
