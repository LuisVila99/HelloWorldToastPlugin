import { Component, OnInit } from '@angular/core';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  address: string = '';
  constructor(private bluetoothLE: BluetoothLE) {}

  async central(){
    console.log('inicia central')


    var a1 = await this.bluetoothLE.getAdapterInfo();
    console.log(a1); // verifica ble enabled e inicializado

    var param_scan = {
      "services": [
        //"180D",
        //"180F"
      ],
      "allowDuplicates": true,
      "scanMode": this.bluetoothLE.SCAN_MODE_LOW_LATENCY,
      "matchMode": this.bluetoothLE.MATCH_MODE_AGGRESSIVE,
      "matchNum": this.bluetoothLE.MATCH_NUM_MAX_ADVERTISEMENT,
      "callbackType": this.bluetoothLE.CALLBACK_TYPE_ALL_MATCHES,
    }
    console.log('location enabled: ');
    console.log(await this.bluetoothLE.isLocationEnabled());
    this.bluetoothLE.hasPermission().then(res => {
      if(res.hasPermission == false){
        this.bluetoothLE.requestPermission();
        console.log('pedir permissao');
      }
    })

    
    this.bluetoothLE.startScan(param_scan).subscribe(scanStatus => {
      if(scanStatus.status == 'scanStarted'){
        console.log('em scanning');
      }
      if(scanStatus.status == 'scanResult'){
        console.log('encontrei algo');
        console.log(scanStatus);
        if(scanStatus.address==""){
          this.stopScan();
          console.log('buenas');
          this.address = "";
          var params = {
            address: this.address
          }
          this.bluetoothLE.connect(params).subscribe(status => {
            console.log('aqui')
            console.log(status);
            //if(status) this.bluetoothLE.disconnect(params);
          });
        }
        //this.stopScan();
        
      }
    }); 



    


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
    var stat = await this.bluetoothLE.addService(params);
    console.log(stat);


    var paramz = {
      "services":["1234"], //iOS
      "service":"1234", //Android
      "name":"Hello World",
    }
    var status = await this.bluetoothLE.startAdvertising(paramz);
    console.log(status)

    var isAdv = await this.bluetoothLE.isAdvertising();
    console.log(isAdv); // A ENVIAR ADV PACKETS CHECK


    console.log('fim peripheral');
  }




  async stopScan(){
    this.bluetoothLE.stopScan();
    //console.log(this.address);
  }


  connect(){
    var params = {
      address: this.address
    }
    this.bluetoothLE.connect(params).subscribe();
  }

  async ngOnInit() {
    this.bluetoothLE.initialize().subscribe(); //inicia BLE
    this.bluetoothLE.enable(); // enable BLE 
  }


  async centralMode(){
    //this.address='';
    this.central();
    //this.central().then(() =>{
    //  if (this.address!=''){
    //    console.log('here');
    //    this.connect();
    //  }
    //});    
  }
}
