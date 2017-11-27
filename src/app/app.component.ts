import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ModelProvider } from '../providers/model/model';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  data;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private model: ModelProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      branchInit();
    });

    platform.resume.subscribe(() => {
      branchInit();
    });

    const branchInit = () => {
      // only on devices
      if (!platform.is('cordova')) { return }
      const Branch = window['Branch'];
      Branch.initSession(data => {
        console.log('branch initialised')
        if (data) {
          // read deep link data on click
          this.data = data;
          this.model.recievedLink.next(data.$deeplink_path);
          console.log(data)
        }
      })
    }

    setInterval(()=>{
      this.model.recievedLink.next(this.data.$deeplink_path);
    }, 2000)
  }
}

