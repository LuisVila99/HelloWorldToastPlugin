import { Component, OnInit } from '@angular/core';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private bluetoothLE: BluetoothLE) {}

  //--------------\\
  // CENTRAL MODE \\
  //--------------\\
  async central(){
    console.log('inicia central')

    // INICIALIZA E ENABLE AO BLE 
    this.bluetoothLE.initialize().subscribe();
    this.bluetoothLE.enable();
    var a1 = await this.bluetoothLE.getAdapterInfo(); // verifica ble enabled e inicializado
    console.log(a1); 

    // VERIFICA SE LOCALIZAÇÃO ESTÁ ATIVA
    // CASO NÃO ESTEJA PEDE AO USER QUE A ATIVE COM UM POP-UP
    console.log('location enabled: ');
    console.log(await this.bluetoothLE.isLocationEnabled());
    this.bluetoothLE.hasPermission().then(res => {
      if(res.hasPermission == false){
        this.bluetoothLE.requestPermission();
        console.log('pedir permissao');
      }
    })

    // PARAMETROS A UTILIZAR NO SCAN
    var param_scan = {
      "services": [], // não filtra nenhuns serviços, apanha tudo
      "allowDuplicates": true,
      "scanMode": this.bluetoothLE.SCAN_MODE_LOW_LATENCY,
      "matchMode": this.bluetoothLE.MATCH_MODE_AGGRESSIVE,
      "matchNum": this.bluetoothLE.MATCH_NUM_MAX_ADVERTISEMENT,
      "callbackType": this.bluetoothLE.CALLBACK_TYPE_ALL_MATCHES,
    }
    // INICIA SCANNING
    this.bluetoothLE.startScan(param_scan).subscribe(scanStatus => {
      if(scanStatus.status == 'scanStarted'){ // printa tudo o que encontrar
        console.log('em scanning...');
      }
      if(scanStatus.status == 'scanResult') console.log(scanStatus);
      if(scanStatus.status == 'scanResult' && scanStatus.name == 'Hello World'){ //hardcoded para encontrar o peripheral 'Hello World'
        console.log(scanStatus); // printa se encontrar
        //this.stopScan(); //para o scan -> se o conect falhar, recomeçar a mao (dropped porque influencia o scanning)
        
        //CONECTAR À ADRESS ENCONTRADA (correspondente ao scanStatus.name == 'Hello World')
        var param = {
          address: scanStatus.address
        }
        this.bluetoothLE.connect(param).subscribe(status =>
          console.log(status)
        );
       }
    }); 
  }


  //-----------------\\
  // PERIPHERAL MODE \\
  //-----------------\\
  async peripheral(){
    console.log('inicia peripheral');

    // INICIALIZA E ENABLE AO BLE + INICIALIZA PERIPHERAL MODE
    this.bluetoothLE.initialize().subscribe(); 
    this.bluetoothLE.enable();
    var param = {
      "request": true,
      "restoreKey": "bluetoothleplugin"
    }
    this.bluetoothLE.initializePeripheral(param).subscribe();

    // ADICIONAR SERVICES ??? -> como estava no readme do plugin
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

    // INICIA ADVERTISING COM SERVICE 1234 e define-se o nome Hello World
    var paramz = {
      "services":["1234"], //iOS
      "service":"1234", //Android
      "name":"Hello World",
    }
    var status = await this.bluetoothLE.startAdvertising(paramz);
    console.log(status)
    var isAdv = await this.bluetoothLE.isAdvertising();
    console.log(isAdv); // CONFIRMA QUE ESTÁ ADVERTISING 

    console.log('fim peripheral');
  }

  
  // FUNÇÃO PARA PARAR O SCAN DO CENTRAL
  async stopScan(){
    this.bluetoothLE.stopScan();
    console.log('parei scan');
  }
}
