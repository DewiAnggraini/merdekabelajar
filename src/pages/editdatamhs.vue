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
          v-model="NPM"
          label="tulis NPM*"
          hint="NPM Mahasiswa"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
        <q-input
          filled
          v-model="Nama"
          label="tulis Nama*"
          hint="Nama Mahasiswa"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
        <q-input
          filled
          v-model="Pembimbing"
          label="tulis Nama Pembimbing*"
          hint=" Nama Pembimbing"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
        <q-input
          filled
          v-model="email"
          label="tulis email*"
          hint=" email Mahasiswa"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
        <q-input
          filled
          v-model="Jenis_kegiatan"
          label="tulis Jenis kegiatan*"
          hint=" Jenis kegiatan"
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
  created () {
    this.$axios.get('Lihatdata/getbyid/' + this.$route.params.id)
      .then(res => {
        this.NPM = res.data.data.NPM
        this.Nama = res.data.data.Nama
        this.Pembimbing = res.data.data.Pembimbing
        this.email = res.data.data.email
        this.Jenis_kegiatan = res.data.data.Jenis_kegiatan
      })
  },
  methods: {
    onSubmit () {
      this.$axios.put('Lihatdata/edit/' + this.$route.params.id, {
        NPM: this.NPM,
        Nama: this.Nama,
        Pembimbing: this.Pembimbing,
        email: this.email,
        Jenis_kegiatan: this.Jenis_kegiatan
      }).then(res => {
        if (res.data.sukses) {
          this.$q.notify({
            position: 'bottom',
            timeout: 2500,
            color: 'positive',
            message: res.data.massage
          })
          this.$router.push({ name: 'Lihatdata' })
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
