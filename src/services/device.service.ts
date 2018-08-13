import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Device} from '../directives/device-detector/device-detector.directive';

@Injectable()

export class DeviceService {

  /**
   * @var {Subject<void>} A subject emitting whenever the type of device changes.
   */
  private _deviceChanged: BehaviorSubject<Device> = new BehaviorSubject(undefined);

  /**
   * Trigger the _deviceChanged stream. This method should be called every time the device type changes.
   */
  triggerDeviceChanged(device: Device) {
    this._deviceChanged.next(device);
  }

  /**
   * @return {Observable<Device>}
   */
  get deviceChanged$(): Observable<Device> {
    return this._deviceChanged.asObservable();
  }
}
