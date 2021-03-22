
const routes = [
  // {
  //   path: '/basing',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', name: 'Dashboard', component: () => import('pages/Index.vue') },
  //     { path: 'logbook/input', name: 'inputLogBook', component: () => import('pages/inputlogbook.vue') },
  //     { path: 'edit/:id', name: 'edit', component: () => import('pages/edit.vue') },
  //     { path: 'inputnilai', name: 'inputnilai', component: () => import('pages/inputnilai.vue') },
  //     { path: 'Lihatdata', name: 'Lihatdata', component: () => import('pages/datamahasiswa.vue') }
  //   ]
  // },

  {
    path: '/admin',
    meta: {
      authAdmin: true
    },
    component: () => import('layouts/LayoutAdmin.vue'),
    children: [
      { path: '', name: 'homeadmin', component: () => import('pages/admin/homeadmin.vue') },
      { path: 'datauser', name: 'datauseradmin', component: () => import('pages/admin/datauser.vue') },
      { path: '/tambahdosen', name: 'tambahdosenadmin', component: () => import('pages/admin/tambahdosen.vue') },
      { path: '/kegiatan', name: 'kegiatanadmin', component: () => import('pages/admin/datakegiatan.vue') },
      { path: '/kegiatan/input', name: 'inputKegiatanAdmin', component: () => import('pages/admin/inputkegiatan.vue') }
    ]
  },

  {
    path: '/mahasiswa',
    meta: {
      authMaha: true
    },
    component: () => import('layouts/LayoutMahasiswa.vue'),
    children: [
      { path: '', name: 'homesiswa', component: () => import('pages/mahasiswa/homemahasiswa.vue') },
      { path: '/kegiatan/input', name: 'inputkegiatanmahasiswa', component: () => import('pages/mahasiswa/pilihkegiatan.vue') },
      { path: '/logbook/lihat', name: 'lihatlogbookmahasiswa', component: () => import('pages/mahasiswa/datalogbook.vue') },
      { path: '/laporan/input', name: 'inputlaporanmingguan', component: () => import('pages/mahasiswa/InputLaporanMingguan.vue') }
    ]
  },

  {
    path: '/dosen',
    meta: {
      authDosen: true
    },
    component: () => import('layouts/LayoutDosen.vue'),
    children: [
      { path: '', name: 'homedosen', component: () => import('pages/dosen/homedosen.vue') },
      { path: 'logbook/input', name: 'inputLogBookdosen', component: () => import('pages/dosen/inputlogbook.vue') },
      { path: 'mingguan', name: 'mingguan', component: () => import('pages/dosen/laporanmingguan.vue') },
      { path: 'datalogbook', name: 'datalogbookdosen', component: () => import('pages/dosen/datalogbook.vue') },
      { path: 'logbook/edit/:id', name: 'editlogbook', component: () => import('pages/dosen/editlogbook.vue') },
      { path: 'evaluasiminggu', name: 'evaluasiminggu', component: () => import('pages/dosen/evaluasiminggu.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/LayoutLogin.vue'),
    children: [
      { path: '', name: 'loginPage', component: () => import('pages/login.vue') },
      { path: 'register', name: 'registrasiPage', component: () => import('pages/registrasi.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
