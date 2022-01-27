const express = require('express');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const authRoute = require('./00auth.route');
const userRoute = require('./10user.route');
const tinhRoute = require('./20tinh.route');
const huyenRoute = require('./30huyen.route');
const diemTichLuyRoute = require('./40diemTichLuy.route');
const nhomRoute = require('./50nhom.route');
const thoiQuenRoute = require('./60thoiQuen.route');
const danhMucDeXuatRoute = require('./70danhMucDeXuat.route');
const thoiQuenDanhMucRoute = require('./80thoiquendanhmuc.route');
const chiTietCongViecRoute = require('./90chitietcongviec.route');
const nhiemVuHoanThanhRoute = require('./100nhiemvuhoanthanh.route');
const nhacChuongRoute = require('./110nhacchuong.route');
const dnhSachHinhAnhRoute = require('./120danhsachhinhanh.route');
const trichDanRoute = require('./130trichdan.route');
const thongBaoRoute = require('./140thongbao.route');
const thoiQuenMacDinhRoute = require('./150thoiQuenMacDinh.route');
const uploadRoute = require('./999999-upload.route');
const homePageRoute = require('./homePage.route');
const checkStatusRoute = require('./checkStatus.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/thoiquendanhmucs',
    route: thoiQuenDanhMucRoute,
  },
  {
    path: '/chitietcongviecs',
    route: chiTietCongViecRoute,
  },
  {
    path: '/nhiemvuhoanthanhs',
    route: nhiemVuHoanThanhRoute,
  },
  {
    path: '/nhacchuongs',
    route: nhacChuongRoute,
  },
  {
    path: '/danhsachhinhanhs',
    route: dnhSachHinhAnhRoute,
  },
  {
    path: '/trichdans',
    route: trichDanRoute,
  },
  {
    path: '/thongbaos',
    route: thongBaoRoute,
  },
  {
    path: '/thoiquenmacdinhs',
    route: thoiQuenMacDinhRoute,
  },
  {
    path: '/tinhs',
    route: tinhRoute,
  },
  {
    path: '/huyens',
    route: huyenRoute,
  },
  {
    path: '/diemtichluys',
    route: diemTichLuyRoute,
  },
  {
    path: '/nhoms',
    route: nhomRoute,
  },
  {
    path: '/thoiquens',
    route: thoiQuenRoute,
  },
  {
    path: '/danhmucdexuats',
    route: danhMucDeXuatRoute,
  },
  {
    path: '/homepages',
    route: homePageRoute,
  },
  {
    path: '/checkstatus',
    route: checkStatusRoute,
  },

  { path: '/uploads', route: uploadRoute },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
