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
          label="Tulis Npm*"
          hint="NPM Anda"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
        <q-input
          filled
          v-model="nama_kegiatan"
          label="tulis Nama Kegiatan*"
          hint=" Nama Kegiatan"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
        <q-input
          filled
          v-model="Nilai_skill"
          label=" Tulis Nilai Skill*"
          hint=" Nilai Skill"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
        <q-input
          filled
          v-model="Nilai_matakuliah"
          label=" Nilai Matakuliah*"
          hint="Nilai Matakuliah"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Tidak boleh dikosongkan']"
        />
<q-file v-model="file" multiple accept=".jpg, image/*" class="q-pr-md" filled icon label="input SK MBKM">
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
      nama_kegiatan: null,
      Nilai_skill: null,
      Nilai_matakuliah: null,
      loaded: false,
      file: null
    }
  },
  methods: {
    onSubmit () {
      const dataUser = this.$q.localStorage.getItem('dataUser')
      const payload = {
        NPM: dataUser.username,
        nama_kegiatan: this.nama_kegiatan,
        Nilai_skill: this.Nilai_skill,
        Nilai_matakuliah: this.Nilai_skill
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
      this.$axios.post('inputnilai/insert', formData).then(res => {
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
