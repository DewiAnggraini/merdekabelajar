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
          v-model="nama"
          label="Nama Lengkap Dosen"
          hint="Nama Lengkap Dosen"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
        <q-input
          filled
          v-model="username"
          label="Username (NIDN)"
          hint=" Username (NIDN)"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
        <q-input
          filled
          v-model="email"
          label="Tulis Email Dosen*"
          hint="Tulis Email Dosen"
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
      nama: null,
      username: null,
      email: null
    }
  },
  methods: {
    onSubmit () {
      this.$axios.post('user/register', {
        username: this.username,
        password: '12345678',
        email: this.email,
        nama: this.nama,
        level: 3
      }).then(res => {
        console.log(res)
        if (res.data.sukses) {
          this.$showNotif(res.data.massage, 'positive')
          this.$router.push({ name: 'datauseradmin' })
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
