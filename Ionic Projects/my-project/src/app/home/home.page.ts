import { Component } from '@angular/core';
import {BluetoothLE} from '@ionic-native/bluetooth-le/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private bluetoothLE: BluetoothLE) {}

}
