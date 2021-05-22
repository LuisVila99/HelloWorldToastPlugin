import { Component } from '@angular/core';
import {BluetoothLePlugin} from '@ionic-native/bluetooth-le-plugin/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private bluetoothLE: BluetoothLePlugin) {}

  initAndEnable(){
    this.bluetoothLE.initialize().subscribe();
    this.bluetoothLE.enable();
  }

}
