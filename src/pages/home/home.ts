import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  login(){
    this.navCtrl.setRoot("CategoriesPage");
  }

}
