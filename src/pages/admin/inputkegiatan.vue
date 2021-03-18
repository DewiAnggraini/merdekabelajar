<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 400px">

      <q-form
        @submit="onSubmit"
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
        v-model="Deskripsi"
        label="Tulis Deskripsi*"
        hint=" Deskripsi Kegiatan"
        lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />

        <q-select
          v-model="username"
          :options="options"
          label="Pilih Dosen Pembimbing"
          filled
          :option-label="(item) => `${item.nama} - ${item.username}`"
          option-value="username"
        />

        <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
      </q-form>

    </div>
  </q-page>
</template >

<script>
export default {
  data () {
    return {
      options: [],
      accept: false,
      nama_kegiatan: null,
      Deskripsi: null,
      username: null
    }
  },
  created () {
    this.getListDosen()
  },
  methods: {
    onSubmit () {
      this.$axios.post('kegiatanadmin/insert', {
        nama_kegiatan: this.nama_kegiatan,
        Deskripsi: this.Deskripsi,
        username: this.username.username
      }).then(res => {
        if (res.data.sukses) {
          this.$showNotif(res.data.massage, 'positive')
          this.$router.push({ name: 'kegiatanadmin' })
        } else {
          this.$showNotif(res.data.massage, 'negative')
        }
      })
    },
    getListDosen () {
      this.$axios.get('user/getalldosen')
        .then(res => {
          this.options = res.data.data
        })
    }
  }
}
</script>
