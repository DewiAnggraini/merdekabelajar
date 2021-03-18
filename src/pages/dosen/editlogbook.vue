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
          v-model="Deskripsi"
          label="tulis deskripsi*"
          hint=" deskripsi kegiatan"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
         <q-input filled v-model="waktu_mulai_pelaksanaan" mask="date" label="Waktu Kegiatan" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="waktu_mulai_pelaksanaan">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
         <q-input filled v-model="waktu_selesai_pelaksanaan" mask="date" label="Waktu Kegiatan" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="waktu_selesai_pelaksanaan" transition-show="scale" transition-hide="scale">
                <q-date v-model="waktu_selesai_pelaksanaan">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          filled
          v-model="target_kegiatan"
          label="Tulis Target Kegiatan*"
          hint=" Target Kegiatan"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
        <q-input
          filled
          v-model="Keterangan"
          label="Tulis Keterangan*"
          hint="Keterangan Kegiatan"
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
      NIDN_dosen: null,
      waktu_mulai_pelaksanaan: null,
      target_kegiatan: null,
      Deskripsi: null,
      Keterangan: null,
      waktu_selesai_pelaksanaan: null
    }
  },

  created () {
    this.$axios.get('logbook/getbyid/' + this.$route.params.id)
      .then(res => {
        const data = res.data.data
        this.nama_kegiatan = data.nama_kegiatan
        this.target_kegiatan = data.target_kegiatan
        this.Deskripsi = data.Deskripsi
        this.Keterangan = data.Keterangan
        this.waktu_mulai_pelaksanaan = this.$parseDate(data.waktu_mulai_pelaksanaan).dateLocal
        this.waktu_selesai_pelaksanaan = this.$parseDate(data.waktu_selesai_pelaksanaan).dateLocal
      })
  },

  methods: {
    onSubmit () {
      this.$axios.put('Logbook/edit/' + this.$route.params.id, {
        nama_kegiatan: this.nama_kegiatan,
        waktu_mulai_pelaksanaan: this.waktu_mulai_pelaksanaan,
        waktu_selesai_pelaksanaan: this.waktu_selesai_pelaksanaan,
        target_kegiatan: this.target_kegiatan,
        Deskripsi: this.Deskripsi,
        Keterangan: this.Keterangan
      }).then(res => {
        if (res.data.sukses) {
          this.$showNotif(res.data.massage, 'positive')
          this.$router.push({ name: 'datalogbookdosen' })
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
