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
          filled
          v-model="nama_kegiatan"
          label="Tulis Nama Kegiatan"
          hint=" Nama kegiatan"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
          <q-input
            filled
            v-model="Deskripsi"
            label="Deskripsikan Laporan Anda*"
            hint=" deskripsi kegiatan"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
          />
          <q-input filled v-model="waktu_mulai_pelaksanaan" mask="date" label="Tulis waktu Anda Memulai Kegiatan" :rules="['date']">
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
          <q-input filled v-model="waktu_selesai_pelaksanaan" mask="date" label="Tulis waktu Anda Menyelesaikan Kegiatan" :rules="['date']">
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
          <q-file v-model="file" multiple accept=".jpg, image/*" class="q-pr-md" filled icon label="SDf">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          <q-input
            filled
            v-model="target_kegiatan"
            label="Tulis Pencapaian Target Kegiatan Anda*"
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
      <div class="col-md-6 col-sm-6 col-xs-12">
        <q-card v-if="loaded">
          <q-card-section>
            <q-list>
              <q-item-label header>Data Logbook</q-item-label>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption>Nama Kegiatan</q-item-label>
                  <q-item-label>{{ dataLogbook.nama_kegiatan }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption>Deskripsi Kegiatan</q-item-label>
                  <q-item-label>{{ dataLogbook.Deskripsi }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption>waktu Memulai Kegiatan</q-item-label>
                  <q-item-label>{{ dataLogbook.waktu_mulai_pelaksanaan }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption>waktu selesai Kegiatan</q-item-label>
                  <q-item-label>{{ dataLogbook.waktu_selesai_pelaksanaan }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption>Target Kegiatan</q-item-label>
                  <q-item-label>{{ dataLogbook.target_kegiatan }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption>Keterangan Kegiatan</q-item-label>
                  <q-item-label>{{ dataLogbook.Keterangan }}</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-card-section>
        </q-card>
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
      NIDN_dosen: null,
      NPM: null,
      waktu_mulai_pelaksanaan: null,
      target_kegiatan: null,
      Deskripsi: null,
      Keterangan: null,
      waktu_selesai_pelaksanaan: null,
      id_logbook: this.$route.params.id,
      loaded: false,
      dataLogbook: null,
      file: null
    }
  },
  created () {
    this.$axios.get('logbook/getbyid/' + this.id_logbook)
      .then(res => {
        this.dataLogbook = res.data.data
        this.loaded = true
      })
  },
  methods: {
    onSubmit () {
      const dataUser = this.$q.localStorage.getItem('dataUser')
      const payload = {
        id_logbook: this.id_logbook,
        NPM: dataUser.username,
        nama_kegiatan: this.nama_kegiatan,
        NIDN_dosen: dataUser.username,
        waktu_mulai_pelaksanaan: this.waktu_mulai_pelaksanaan,
        waktu_selesai_pelaksanaan: this.waktu_selesai_pelaksanaan,
        target_kegiatan: this.target_kegiatan,
        Deskripsi: this.Deskripsi,
        Keterangan: this.Keterangan
      }
      const formData = new FormData()
      formData.append('data', JSON.stringify(payload))
      for (const i in this.file) {
        formData.append('image',
          new Blob([
            this.file[i]
          ],
          {
            type: 'image/jpg',
            name: this.file[i].name
          }), `${Math.floor(Math.random() * 100 + i)}.jpg`)
      }
      this.$axios.post('mingguan/insert', formData).then(res => {
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
