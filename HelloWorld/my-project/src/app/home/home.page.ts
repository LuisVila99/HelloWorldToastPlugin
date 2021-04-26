import { Component } from '@angular/core';
import { MyFirstPlugin } from '@ionic-native/my-first-plugin/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private myFirstPlugin: MyFirstPlugin) {}

  test() {
    console.log('toast message')
    this.myFirstPlugin.nativeToast().then();
  }

}
