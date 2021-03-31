import { Injectable } from '@angular/core';
import { Plugin, Cordova, IonicNativePlugin } from '@ionic-native/core';

@Plugin({
    pluginName: 'MyFirstPlugin',
    plugin: 'com.joangape.myfirstplugin',
    pluginRef: 'cordova.plugins.MyFirstPlugin',
    platforms: ['Android']
})

@Injectable()
export class MyFirstPlugin extends IonicNativePlugin {

    @Cordova()
    nativeToast(): Promise<any> {
        return;
    }
}
