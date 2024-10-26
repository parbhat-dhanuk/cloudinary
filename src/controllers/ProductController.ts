import Product from '../models/Product';
import { Request, Response } from 'express';
import { cloudinary } from '../middleware/cloudinary';




class ProductController {
  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, price, description } = req.body;
      const file = req.file;

      if (!file) throw new Error('Image is required');

      // Upload image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(file.path,{
        folder:'parbhat'
      });

      const newProduct = new Product({
        name,
        price,
        description,
        imageUrl: uploadResult.secure_url,
        imagePublicId: uploadResult.public_id // Save public_id here
      });

      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) throw new Error('Product not found');
      res.status(200).json(product);
    } catch (error:any) {
      res.status(404).json({ message: error.message });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, price, description } = req.body;
      const file = req.file;
  
      // Find the existing product
      const product = await Product.findById(req.params.id);
      if (!product) throw new Error('Product not found');
  
      let imageUrl = product.imageUrl;
      let imagePublicId = product.imagePublicId;
  
      if (file) {
        // Delete old image from Cloudinary if it exists
        if (product.imagePublicId) {
          await cloudinary.uploader.destroy(product.imagePublicId);
        }
  
        // Upload new image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: 'parbhat'
        });
  
        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;
      }
  
      // Update product details
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { name, price, description, imageUrl, imagePublicId },
        { new: true }
      );
  
      res.status(200).json(updatedProduct);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  


  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) throw new Error('Product not found');
  
      // Delete image from Cloudinary
      const publicId = product.imagePublicId; // Assuming your product model has `imagePublicId`
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
  
      // Delete product from database
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) throw new Error('Product not found');
      res.status(200).json({ message: 'Product and image deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  
}

export default new ProductController();
