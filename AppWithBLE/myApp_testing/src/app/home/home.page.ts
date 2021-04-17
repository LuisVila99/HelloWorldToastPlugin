import { Component, OnInit } from '@angular/core';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private bluetoothLE: BluetoothLE, private foundDevices: any[]) {}

  async ngOnInit() {
    console.log('on init');
    //------------------
    this.bluetoothLE.initialize().subscribe();
    this.bluetoothLE.enable();

    const a1 = await this.bluetoothLE.getAdapterInfo();
    console.log(a1);

    //var param = {
    //  "services": [
    //    "180D",
    //    "180F"
    //  ],
    //  "allowDuplicates": true,
    //  "scanMode": this.bluetoothLE.SCAN_MODE_LOW_LATENCY,
    //  "matchMode": this.bluetoothLE.MATCH_MODE_AGGRESSIVE,
    //  "matchNum": this.bluetoothLE.MATCH_NUM_MAX_ADVERTISEMENT,
    //  "callbackType": this.bluetoothLE.CALLBACK_TYPE_ALL_MATCHES,
    //}
    //this.bluetoothLE.startScan(param1).subscribe();
    this.bluetoothLE.startScan({'services':[]});
    const a2 = this.bluetoothLE.isScanning(); // yes 
    console.log(a2);


    //------------------
    console.log('finito init');
  } 





}
