const express=require('express');
const router=express.Router();
const {
    getProducts,
    newProduct,
    getSingleProduct,
    getAdminProducts,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview
}=require('../controller/productController');
const {isAuthenticatedUser,AuthorizeRoles}=require('../middlewares/auth');

//router.route('/products').get(isAuthenticatedUser,AuthorizeRoles("admin"),getProducts);
router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/new').post(isAuthenticatedUser,AuthorizeRoles('admin'),newProduct);
router.route('/admin/product/:id')
                .put(isAuthenticatedUser,updateProduct)
                .delete(isAuthenticatedUser,deleteProduct); //both url are same

router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)

module.exports =router;