import { Component } from '@angular/core';
import { BluetoothLePlugin } from '@ionic-native/bluetooth-le-plugin/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private ble: BluetoothLePlugin) {}


  initAndEnable(){
    this.ble.initialize().subscribe();
    this.ble.enable();
  }

}
