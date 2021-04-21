import { Component, OnInit } from '@angular/core';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private bluetoothLE: BluetoothLE) {}

  async central(){
    console.log('inicia central')


    var a1 = await this.bluetoothLE.getAdapterInfo();
    console.log(a1); // verifica ble enabled e inicializado

    var param_scan = {
     "services": [
          "180D",
          "180F"
      ],
      "allowDuplicates": true,
      "scanMode": this.bluetoothLE.SCAN_MODE_LOW_LATENCY,
      "matchMode": this.bluetoothLE.MATCH_MODE_AGGRESSIVE,
      "matchNum": this.bluetoothLE.MATCH_NUM_MAX_ADVERTISEMENT,
      "callbackType": this.bluetoothLE.CALLBACK_TYPE_ALL_MATCHES,
    }

    this.bluetoothLE.startScan(param_scan).subscribe(scanStatus => {
      if(scanStatus.status == 'scanStarted'){
        console.log('em scanning');
      }
      if(scanStatus.status == 'scanResult'){
        console.log('encontrei algo');
        console.log(scanStatus.name);
      }
    }); // inicia scanning -> se encontrar algo, print it 

    // não consigo que encontre ainda outros devices, mas encontrando deve guardar-se o seu address e name 
    // posteriormente conectar e enviar um hello world 

    console.log(await this.bluetoothLE.isScanning());

    console.log('fim central');
  }


  async peripheral(){
    console.log('inicia peripheral');

    var param = {
      "request": true,
      "restoreKey": "bluetoothleplugin"
    }
    this.bluetoothLE.initializePeripheral(param).subscribe(); // inicia peripheral

    // ADICIONAR SERVICES ???


    var params = {
      "services":["1234"], //iOS
      "service":"1234", //Android
      "name":"Hello World",
    }
    var status = await this.bluetoothLE.startAdvertising(params);
    console.log(status)

    var isAdv = await this.bluetoothLE.isAdvertising();
    console.log(isAdv); // A ENVIAR ADV PACKETS CHECK


    console.log('fim peripheral');
  }









  async ngOnInit() {
    this.bluetoothLE.initialize().subscribe(); //inicia BLE
    this.bluetoothLE.enable(); // enable BLE 
  } 
}
