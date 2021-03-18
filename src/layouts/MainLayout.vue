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
          APLIKASI MERDEKA BELAJAR KAMPUS MERDEKA BELAJAR
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
          :to="{ name: 'Dashboard' }"
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
          :to="{ name: 'inputLogBook' }"
        >
          <q-item-section
            avatar
          >
            <q-icon name="input" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Input Logbook</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{ name: 'Lihatdata' }"
        >
          <q-item-section
            avatar
          >
            <q-icon name="Lihatdata" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Lihat Data Mahasiswa</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{ name: 'mingguan' }"
        >
          <q-item-section
            avatar
          >
            <q-icon name="laporanmingguan" />
          </q-item-section>

          <q-item-section>
            <q-item-label>laporan mingguan</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
        >
          <q-item-section
            avatar
          >
            <q-icon name="input" />
          </q-item-section>

          <q-item-section>
            <q-item-label>laporan Akhir</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
        >
          <q-item-section
            avatar
          >
            <q-icon name="Input" />
          </q-item-section>

          <q-item-section>
            <q-item-label>input nilai</q-item-label>
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
  }
}
</script>
