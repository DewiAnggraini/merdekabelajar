<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
        APLIKASI MERDEKA BELAJAR KAMPUS MERDEKA
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>
        <q-item
          clickable
          :to="{ name: 'homesiswa' }"
        >
          <q-item-section
            avatar
          >
            <q-icon name="dashboard" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{ name: 'lihatlogbookmahasiswa' }"
        >
          <q-item-section
            avatar
          >
            <q-icon name="input" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Data Logbook</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="logout()"
        >
          <q-item-section
            avatar
          >
            <q-icon name="Input" />
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
