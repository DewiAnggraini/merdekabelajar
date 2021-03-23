<template>
  <q-page padding class="row items-center justify-center">
    <div class="row full-width">
      <div class="col-md-8 offset-md-2 col-xs-12 q-pa-md">
        <q-card flat class="text-blue-grey-14">
          <div class="row items-center">
            <div class="col-md-6 col-sm-12-col-xs-12">
              <div class="row q-pt-md q-pb-md">
                <div class="col-md-8 offset-2">
                  <q-img src="~assets/login.png"></q-img>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12-col-xs-12">
              <q-card-section>
                <div class="text-h4">kampus merdeka App</div>
                <div>Registrasi Akun Anda</div>
              </q-card-section>
              <q-form
                @submit="onSubmit"
              >
                <q-card-section>
                  <q-input v-model="nama" label="nama"/>
                  <q-input v-model="username" label="Username"/>
                  <q-input type="password" v-model="password" label="Password"/>
                  <q-input v-model="email" label="email"/>
                </q-card-section>
                <q-card-section>
                  <q-btn class="full-width" type="submit" unelevated color="primary" label="registrasi"/>
                  <q-btn class="full-width q-mt-md" flat unelevated color="primary" label="login" :to="{ name: 'loginPage' }"/>
                </q-card-section>
              </q-form>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      nama: null,
      username: null,
      password: null,
      email: null
    }
  },

  methods: {
    onSubmit () {
      this.$axios.post('user/register', {
        username: this.username,
        password: this.password,
        email: this.email,
        nama: this.nama
      }).then(res => {
        if (res.data.sukses) {
          this.$showNotif(res.data.massage, 'positive')
          this.$router.push({ name: 'loginPage' })
        } else {
          this.$showNotif(res.data.massage, 'negative')
        }
      })
    }
  }
}
</script>
