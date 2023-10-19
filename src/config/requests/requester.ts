import { RequestData } from '@config/requests';

export class Requester {
  static async request(data: RequestData) {
    return window.electron.ipcRenderer.invoke('request', data);
  }
}
