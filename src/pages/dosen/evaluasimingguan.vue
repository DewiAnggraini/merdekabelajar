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
          v-model="evaluasi"
          label="Tulis Evaluasi Anda"
          hint=" Evaluasi Laporan Kegiatan Mingguan "
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
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
      evaluasi: null
    }
  },

  methods: {
    onSubmit () {
      this.$axios.put('mingguan/evaluasi/' + this.$route.params.id, {
        evaluasi: this.evaluasi
      }).then(res => {
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
