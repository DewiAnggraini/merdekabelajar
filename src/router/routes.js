
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
      { path: '/laporan/input/:id', name: 'inputlaporanmingguan', component: () => import('pages/mahasiswa/InputLaporanMingguan.vue') },
      { path: '/laporanakhir/input/:id', name: 'inputlaporanakhir', component: () => import('pages/mahasiswa/inputLaporanAkhir.vue') },
      { path: '/laporanmingguan/lihat', name: 'lihatlaporanmingguan', component: () => import('pages/mahasiswa/lihatlaporanmingguan.vue') }
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
      { path: 'logbook/input/:id', name: 'inputLogBookdosen', component: () => import('pages/dosen/inputlogbook.vue') },
      { path: 'mingguan/lihat/:npm', name: 'lihatmingguan', component: () => import('pages/dosen/laporanmingguan.vue') },
      { path: 'mingguan/lihat', name: 'lihatmingguan1', component: () => import('pages/dosen/laporanmingguan1.vue') },
      { path: 'nilai/input/:npm', name: 'inputnilai', component: () => import('pages/dosen/inputnilai.vue') },
      { path: 'akhir/lihat/:npm', name: 'lihatakhir', component: () => import('pages/dosen/laporanakhir.vue') },
      { path: 'akhir/lihat/npm', name: 'lihatakhir1', component: () => import('pages/dosen/laporanakhir1.vue') },
      { path: 'datalogbook/:npm', name: 'datalogbookdosen', component: () => import('pages/dosen/datalogbook.vue') },
      { path: 'datalogbook1', name: 'datalogbookdosen1', component: () => import('pages/dosen/datalogbook1.vue') },
      { path: 'nilai/lihat/:npm', name: 'datanilaimahasiswa', component: () => import('pages/dosen/datanilai.vue') },
      { path: 'nilai/lihat', name: 'datanilaimahasiswa1', component: () => import('pages/dosen/datanilai1.vue') },
      { path: 'logbook/edit/:id', name: 'editlogbook', component: () => import('pages/dosen/editlogbook.vue') },
      // untuk menampilkan id di evaluasi
      { path: 'mingguan/evaluasi/:id', name: 'evaluasimingguan', component: () => import('pages/dosen/evaluasimingguan.vue') }
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
