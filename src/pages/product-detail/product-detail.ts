import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from '../../models/Product.dto';
import { ProductService } from '../../services/domain/product.service';
import { CartService } from '../../services/domain/cart.service';


@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  item: ProductDTO;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService,
    public cartService: CartService ) {
  }

  ionViewDidLoad() {
    let product_id = this.navParams.get('product_id');
    this.productService.findById(product_id)
      .subscribe(response => {
        this.item = response;
      },
      error => {});
  }

  addToCart(product: ProductDTO){
    this.cartService.addProduct(product);
    this.navCtrl.setRoot("CartPage");
  }

}
