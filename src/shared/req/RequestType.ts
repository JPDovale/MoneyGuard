import { BrowserWindow } from 'electron';

export type RequestType<InputType> = {
  _data: InputType;
  win: BrowserWindow | null;
};
