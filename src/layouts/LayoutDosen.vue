<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          color="dark"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-dark">
        APLIKASI MERDEKA BELAJAR KAMPUS MERDEKA
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-dark text-white"
    >
      <q-list>
        <q-item class="justify-center text-center q-mb-md q-mt-md">
          <div>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png" alt="">
            </q-avatar>
            <div class="q-mt-md">SELAMAT DATANG</div>
            <div class="text-bold">{{ $q.localStorage.getItem('dataUser').nama }}</div>
          </div>
        </q-item>
        <q-item-label
          header
          class="text-white"
        >
          Menu
        </q-item-label>
        <q-item
          clickable
          v-ripple
          exact
          active-class="active"
          :to="{ name: 'homedosen' }"
        >
          <q-item-section
            avatar
          >
            <q-icon name="person" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          exact
          active-class="active"
          :to="{ name: 'datalogbookdosen1' }"
        >
          <q-item-section
            avatar
          >
            <q-icon name="input" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Logbook</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          exact
          active-class="active"
          :to="{ name: 'lihatmingguan1' }"
        >
          <q-item-section
            avatar
          >
            <q-icon name="description" />
          </q-item-section>

          <q-item-section>
            <q-item-label>laporan mingguan</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          exact
          active-class="active"
          :to="{ name: 'lihatakhir1' }"
        >
          <q-item-section
            avatar
          >
            <q-icon name="description" />
          </q-item-section>

          <q-item-section>
            <q-item-label>laporan Akhir</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          exact
          active-class="active"
          :to="{ name: 'datanilaimahasiswa1' }"
        >
          <q-item-section
            avatar
          >
            <q-icon name="description" />
          </q-item-section>

          <q-item-section>
            <q-item-label> Nilai</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          exact
          active-class="active"
          @click="logout()"
        >
          <q-item-section
            avatar
          >
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label>logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    logout () {
      this.$q.localStorage.remove()
      this.$router.push({ name: 'loginPage' })
    }
  }
}
</script>
<style scoped>
  .active {
    background: white;
    color: black;
  }
</style>
