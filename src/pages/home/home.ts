import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredentialsDTO } from '../../models/credentials.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredentialsDTO = {
    email: "",
    password: ""
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService) {

  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
    .subscribe(response => {
        this.auth.sucessfullLogin(response.headers.get("Authorization"));
        this.navCtrl.setRoot("CategoriesPage");
    },
    _error => {});  
  }

  login(){
    this.auth.authenticate(this.creds)
    .subscribe(response => {
        this.auth.sucessfullLogin(response.headers.get("Authorization"));
        this.navCtrl.setRoot("CategoriesPage");
    },
    _error=>{})
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
