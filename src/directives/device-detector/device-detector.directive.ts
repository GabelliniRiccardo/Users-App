
import * as _ from 'lodash';

import { Directive, HostListener, OnInit } from '@angular/core';
import {DeviceService} from '../../services/device.service';

export enum Device {
  X_SMALL,
  SMALL = 576,
  MEDIUM = 768,
  LARGE = 992,
  X_LARGE = 1200
}

@Directive({
  selector: '[appDeviceDetector]'
})

export class DeviceDetectorDirective implements OnInit {

  /**
   * The last emitted device.
   */
  private _lastDevice: Device;

  constructor(
    private _appStreamService: DeviceService
  ) {}

  /**
   * Emit a new event when a change to window width lead to a device change.
   * @param {number} width
   * @private
   */
  private _triggerDeviceChange(width: number) {
    let device = Device.X_LARGE;

    // Find the device corresponding to the current width
    for (const key in Device) {
      if (!_.isNaN(+key)) {
        continue;
      }

      if (width > +Device[key]) {
        device = +Device[key];
        continue;
      }

      break;
    }

    if (device !== this._lastDevice) {
      this._lastDevice = device;
      this._appStreamService.triggerDeviceChanged(device);
    }
  }

  /**
   * Emit a new event whenever a resize lead to a device change.
   */
  @HostListener('window:resize', ['$event'])
  private _onResize(event) {
    this._triggerDeviceChange(event.target.innerWidth);
  }

  /**
   * Check the initial width of the window and emit an event to notify of current device type.
   */
  ngOnInit() {
    this._triggerDeviceChange(window.innerWidth);
  }
}
