const router = require('express').Router()
const {
    CreateProduct,
    GetProducts,
    DeleteProduct,
    getAllProducts,
    getProduct,
    SearchProducts,
    UpdateInventory
} = require('../Controller/product.controller.js')
const VerifySeller = require('../Middleware/VerifySeller.js')
const uploads = require('../utils/multerStorage.js')

router.route('/create-product').post(uploads.array('images',3),CreateProduct)
router.route('/get-all-products').get(getAllProducts)
router.route('/search').get(SearchProducts)
router.route('/update-inventory').patch(UpdateInventory)
router.route('/get-all-products/:id').get(GetProducts)
router.route('/delete/:id').delete(DeleteProduct)
router.route('/:id').get(getProduct)


module.exports = router



