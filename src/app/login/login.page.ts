import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ResidentApiUrl = '';
  UserData = {
    user :'',
  }

 correctPassword : String | undefined;
  password: String | undefined;

  constructor(private router: Router , private alertController: AlertController, private http: HttpClient) {
    this.ResidentApiUrl = 'http://196.234.125.66:3084/hotel/countRack';
  }
  ngOnInit() {
    this.readAPI(this.ResidentApiUrl)
      .subscribe((data) => {
        this.correctPassword = data.user;

        console.log(this.correctPassword);

      });
  }
  readAPI(URL: string) {
    return this.http.get<any>(URL);
  }
  login() {
    if (this.password == this.correctPassword) {
      this.router.navigate(['auth']);
      // Add your login logic here
    } else {
      this.showAlert('Error', 'mot de passe incorrect');
      // Add error handling or display a message to the user
    }

  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
