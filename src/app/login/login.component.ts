import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare const FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '632411069136293',
        cookie: true,
        xfbml: true,
        version: 'v12.0'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js: any, fjs: any = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  loginWithFacebook(): void {
    // const loginOptions = { scope: 'email,user_posts,user_messages,user_comments' };
    const loginOptions = { scope: 'email' };

    FB.login((response: any) => {
      if (response.authResponse) {
        console.log("FB Login response", response);
        const accessToken = response.authResponse.accessToken;
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', { fields: 'name,email,picture' }, (response: any) => {
          console.log(response, 'Good to see you, ' + response.name + '.');
          // Gọi API để lưu thông tin người dùng
          this.http.post('https://your-backend-api.com/auth/facebook', { accessToken, user: response })
            .subscribe((res: any) => {
              // Lưu trữ thông tin người dùng vào local storage
              localStorage.setItem('user', JSON.stringify(res.user));
              // Chuyển hướng người dùng đến trang chính
              this.router.navigate(['/dashboard']);
            });
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, loginOptions);
  }
}