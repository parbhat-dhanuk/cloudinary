import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import{  uploadImage} from '../middleware/cloudinary';
  

const router = Router();

router.post('/',  uploadImage,ProductController.createProduct);
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);
router.patch('/:id', uploadImage,ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);



export default router;
