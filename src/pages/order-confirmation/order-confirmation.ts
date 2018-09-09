import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { OrderDTO } from '../../models/order.dto';
import { AddressDTO } from '../../models/address.dto';
import { ClientDTO } from '../../models/cliente.dto';
import { ClientService } from '../../services/domain/cliente.service';
import { OrderService } from '../../services/domain/order.service';
 @IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {
  order:OrderDTO;
  cartItems: CartItem[];
  client: ClientDTO;
  address: AddressDTO;
  codorder: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clientService: ClientService,
    public cartService: CartService,
    public orderService: OrderService) {

     this.order = this.navParams.get('order');

  }
   ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
     this.clientService.findById(this.order.client.id)
      .subscribe(response => {
        this.client = response as ClientDTO;
        this.address = this.findAddress(this.order.deliveryAddress.id, response['addresses']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }
   private findAddress(id: string, list: AddressDTO[]) : AddressDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }
   total() : number {
    return this.cartService.total();
  } 

  home() {
    this.navCtrl.setRoot('CategoriesPage');
  }


  back() {
    this.navCtrl.setRoot('CartPage');
  }
   checkout() {
    this.orderService.insert(this.order)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        this.codorder = this.extractId(response.headers.get('location'));
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  private extractId(location : string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }
}