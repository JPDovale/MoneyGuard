/* eslint global-require: off, no-console: off, promise/always-return: off */
import 'reflect-metadata';
import '@shared/container';
import path from 'path';
import fs from 'fs';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { getDatabasePath } from '@config/files/getDatabasePath';
import { Request } from '../config/requests';
import { resolveHtmlPath } from './util';
import { container } from 'tsyringe';
import { InjectableKeys } from '@shared/container/keys';
import { Database } from '@database/index';

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const createWindow = async () => {
  const databaseDir = getDatabasePath();

  if (!fs.existsSync(databaseDir)) {
    fs.mkdirSync(databaseDir, { recursive: true });
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  const database: Database = container.resolve(InjectableKeys.Database);
  await database.knex.migrate.latest();

  // printDirect({
  //   printer: printer.name,
  //   data: 'Olá',
  //   type: 'TEXT',
  //   error: (err) => {
  //     console.log(err);
  //   },
  //   success: (data) => {
  //     console.log(data);
  //   },
  // });

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    fullscreen: false,
    icon: getAssetPath('icon.png'),
    autoHideMenuBar: !!app.isPackaged,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      webSecurity: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }

    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

ipcMain.handle(Request.key, async (e, data) =>
  Request.handler(e, data, mainWindow),
);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
