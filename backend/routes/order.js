const express=require('express')
const router=express.Router();
const{newOrder,getSingleOrder,myOrders,allOrders,updateOrder,deleteOrder}=require('../controller/orderController')
const { isAuthenticatedUser, AuthorizeRoles } = require('../middlewares/auth')
router.route('/order/new').post(isAuthenticatedUser,newOrder)
router.route('/order/me').get(isAuthenticatedUser,myOrders)//should come before the route which has been passed with params
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder)
router.route('/admin/orders').get(isAuthenticatedUser,AuthorizeRoles('admin'),allOrders)
router.route('/admin/orders/:id')
    .put(isAuthenticatedUser, AuthorizeRoles('admin'), updateOrder)
    .delete(isAuthenticatedUser, AuthorizeRoles('admin'), deleteOrder);

module.exports = router;