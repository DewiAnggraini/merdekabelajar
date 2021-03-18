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
          hint="NPM anda"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
        <q-input
          filled
          v-model="Evaluasi"
          label="tulis Evaluasi*"
          hint=" Evaluasi Lporan Mingguan"
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
      NPM: null,
      Evaluasi: null
    }
  },

  methods: {
    onSubmit () {
      this.$axios.post('evaluasimingguan/insert', {
        NPM: this.NPM,
        Evaluasi: this.Evaluasi
      }).then(res => {
        if (res.data.sukses) {
          this.$q.notify({
            position: 'bottom',
            timeout: 2500,
            color: 'positive',
            message: res.data.massage
          })
          this.$router.push({ name: '' })
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
