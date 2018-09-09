import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductDTO } from '../../models/Product.dto';
import { ProductService } from '../../services/domain/product.service';


@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  items : ProductDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }
  
  loadData(){
    let category_id = this.navParams.get("category_id");
    let loader = this.presentLoading();
    this.productService.findByCategory(category_id)
    .subscribe(response =>{
      this.items = response['content'];
      loader.dismiss();
    }, error => {
      loader.dismiss();
    });
  }

  showDetail(product_id: string){
    this.navCtrl.push('ProductDetailPage', {product_id: product_id});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Wait..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
