var express = require('express');
const adminController = require('../controllers/adminController');
const hospitalController = require('../controllers/hospitalController');
const userController = require('../controllers/userController');


const authAdmin = require('../middlewares/authAdmin');
const authUser = require('../middlewares/authUser');
const authHospital = require('../middlewares/authHospital');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// admin
router.get('/admin/logout', adminController.adminLogout);
router.get('/admin/login', adminController.adminLogin);
router.get('/admin/index',authAdmin, adminController.home);
router.get('/admin/addCategory',authAdmin, adminController.addCategory);
router.get('/admin/empDetails',authAdmin, adminController.empDetails);
router.get('/admin/removeCategory/:id',authAdmin, adminController.removeCategory);
router.get('/admin/removeEmp/:id',authAdmin, adminController.removeEmp);

router.post('/admin/login', adminController.adminLoginProcess);
router.post('/admin/addCategory', adminController.categoryAdd);

// hospital
router.get('/hospital/login', hospitalController.hospitalLogin);
router.get('/hospital/logout', hospitalController.hospitalLogout);
router.get('/hospital/register', hospitalController.hospitalReg);
router.get('/hospital/index', authHospital, hospitalController.home);
router.get('/hospital/addDepartment', authHospital, hospitalController.addDepartment);
router.get('/hospital/removeDept/:id', authHospital, hospitalController.removeDepartment);

router.post('/hospital/register', hospitalController.hospitalRegData);
router.post('/hospital/login', hospitalController.hospitalLoginProcess);
router.post('/hospital/addDepartment', hospitalController.insertDepartment);

// patient
router.get('/user/login', userController.login);
router.get('/user/logout', userController.userLogout);
router.get('/user/register', userController.register);
router.get('/user/dashboard', authUser, userController.dashboard);

router.post('/user/register', userController.registerUserData);
router.post('/user/login', userController.userLoginProcess);



module.exports = router;
