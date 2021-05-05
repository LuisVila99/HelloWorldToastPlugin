/**
 * This is a template for new plugin wrappers
 *
 * TODO:
 * - Add/Change information below
 * - Document usage (importing, executing main functionality)
 * - Remove any imports that you are not using
 * - Remove all the comments included in this template, EXCEPT the @Plugin wrapper docs and any other docs you added
 * - Remove this note
 *
 */
 import { Injectable } from '@angular/core';
 import { Plugin, Cordova, IonicNativePlugin } from '@ionic-native/core';
import { Observable } from 'rxjs';

/**
 * @name Bluetooth Le Plugin
 * @description
 * This plugin does something
 *
 * @usage
 * ```typescript
 * import { BluetoothLePlugin } from '@ionic-native/bluetooth-le-plugin';
 *
 *
 * constructor(private bluetoothLePlugin: BluetoothLePlugin) { }
 *
 * ...
 *
 *
 * this.bluetoothLePlugin.functionName('Hello', 123)
 *   .then((res: any) => console.log(res))
 *   .catch((error: any) => console.error(error));
 *
 * ```
 */
@Plugin({
  pluginName: 'BluetoothLePlugin',
  plugin: 'com.randdusing.bluetoothle', // npm package name, example: cordova-plugin-camera
  pluginRef: '', // the variable reference to call the plugin, example: navigator.geolocation
  repo: '', // the github repository URL for the plugin
  install: '', // OPTIONAL install command, in case the plugin requires variables
  installVariables: [], // OPTIONAL the plugin requires variables
  platforms: ['Android'] // Array of platforms supported, example: ['Android', 'iOS']
})
@Injectable()
export class BluetoothLePlugin extends IonicNativePlugin {

  @Cordova()
  initialize(): Observable<any> {
    return; // We add return; here to avoid any IDE / Compiler errors
  }

  enable(): void{
    return; 
  }

}
