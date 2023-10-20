import Electron, { BrowserWindow } from 'electron';
import { Accessors, accessors } from './accessors';

export interface RequestData {
  access: Accessors;
  data: any;
}

export class Request {
  static key: 'request' = 'request';

  static async handler(
    _e: Electron.IpcMainInvokeEvent,
    data: RequestData,
    win: BrowserWindow | null,
  ) {
    const response = await accessors[data.access]({ _data: data.data, win });
    return response;
  }
}
