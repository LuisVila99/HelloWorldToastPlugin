import { Injectable } from '@angular/core';
import { Plugin, Cordova, IonicNativePlugin } from '@ionic-native/core';

@Plugin({
    pluginName: 'cordova-plugin-bluetoothle',
    plugin: 'com.joangape.myfirstplugin',
    pluginRef: 'cordova.plugins.BluetoothLePlugin',
    platforms: ['Android']
})

@Injectable()
export class BluetoothLePlugin extends IonicNativePlugin {

    @Cordova()
    nativeToast(): Promise<any> {
        return;
    }
}