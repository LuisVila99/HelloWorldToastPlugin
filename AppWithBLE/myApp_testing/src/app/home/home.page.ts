import { Component, OnInit } from '@angular/core';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private bluetoothLE: BluetoothLE) {}

  ngOnInit() {
    console.log('on init');
    //------------------

    var params = {
      service: "1234",
      characteristics: [
        {
          uuid: "ABCD",
          permissions: {
            read: true,
            write: true,
            //readEncryptionRequired: true,
            //writeEncryptionRequired: true,
          },
          properties : {
            read: true,
            writeWithoutResponse: true,
            write: true,
            notify: true,
            indicate: true,
            //authenticatedSignedWrites: true,
            //notifyEncryptionRequired: true,
            //indicateEncryptionRequired: true,
          }
        }
      ]
    };

    //var params1 = {
    //  "services":["1234"], //iOS
    //  "service":"1234", //Android
    //  "name":"Hello World",
    //};

    this.bluetoothLE.initialize();
    this.bluetoothLE.initializePeripheral(); // inicia peripheral
    this.bluetoothLE.addService(params).then();
    //this.bluetoothLE.startAdvertising(params1).then();

    //console.log(this.bluetoothLE.isAdvertising().then());
    //------------------
    console.log('finito init');
  } 

}
