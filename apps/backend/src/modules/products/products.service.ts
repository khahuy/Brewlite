import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { SAMPLE_PRODUCTS } from './products.data';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async onModuleInit() {
    const count = await this.productModel.countDocuments();
    if (count === 0) {
      await this.productModel.insertMany(SAMPLE_PRODUCTS);
      console.log(`Seeded ${SAMPLE_PRODUCTS.length} products`);
    }
  }

  async findAll() {
    const products = await this.productModel.find().lean().exec();
    return products.map((p) => ({
      id: String(p._id),
      name: p.name,
      price: p.price,
      image: p.image,
      description: p.description ?? '',
      category: p.category ?? '',
    }));
  }
}
