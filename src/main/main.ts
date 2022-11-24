/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import {app, BrowserWindow, shell, ipcMain, dialog} from 'electron';
import {autoUpdater} from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import {resolveHtmlPath} from './util';
import {XmlParserClass} from "./xmlParserClass";
import util, {inspect} from "util";
import ejs from 'ejs';


const fs = require('fs/promises');


class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('show-error-dialog', (event, arg) => {
  dialog.showErrorBox("Error", arg[0])
});

ipcMain.on('show-success-dialog', (event, arg) => {
  if (mainWindow === null) {
    throw new Error('"mainWindow" is not defined');
  }

  dialog.showMessageBoxSync(mainWindow, {
      type: "info",
      title: "Success",
      message: arg[0],
      buttons: ["OK"]
    }
  )
});


ipcMain.on('xml-uploaded', async (event, arg) => {
  const msgTemplate = (file: string) => `xml file uploaded: ${file}`;
  let data;
  try {
    data = await fs.readFile(arg[0], {encoding: 'utf8'});
  } catch (err) {
    dialog.showErrorBox("Error", "Error reading file");
  }
  let parser: XmlParserClass = XmlParserClass.getInstance();

  // Uncode the code below to perform singleton test.
  // It will output "Singleton works, both variables contain the same instance".

  /*let parser2:XmlParserClass = XmlParserClass.getInstance();
  if (parser === parser2) {
    console.log('Singleton works, both variables contain the same instance.');
  } else {
    console.log('Singleton failed, variables contain different instances.');
  }*/
  let jsonObj = {};
  try {
    jsonObj = parser.parse(data);
  } catch (err) {
    dialog.showErrorBox("Error", "Error parsing file");
  }
  event.sender.send("json-ready", jsonObj);
});

async function writeToFile(path: string, data: any) {
  try {
    await fs.writeFile(path, data);

    if (mainWindow === null) {
      throw new Error('"mainWindow" is not defined');
    }
    dialog.showMessageBoxSync(mainWindow, {
        type: "info",
        title: "Success",
        message: "File written successfully",
        buttons: ["OK"]
      }
    )
  } catch (err) {
    dialog.showErrorBox("Error", "Error writing file");
  }
}

let ejsStr = `<!DOCTYPE html>
                        <html>
                          <head>
                            <meta charset="utf-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <title>Exported HTML</title>
                            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/css/fontawesome.min.css">
                            <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
                            <!-- Leave those next 4 lines if you care about users using IE8 -->
                            <!--[if lt IE 9]>
                              <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
                              <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
                            <![endif]-->
                          </head>
                          <body>
                          <div class="container">
                            <table class="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">Name</th>
                                      <th scope="col">Department</th>
                                      <th scope="col">Branch</th>
                                      <th scope="col">Chair</th>
                                      <th scope="col">Day</th>
                                      <th scope="col">Time</th>
                                      <th scope="col">Headman</th>
                                      <th scope="col">Course</th>
                                      <th scope="col">subject</th>
                                      <th scope="col">leader</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <% groups.forEach(group => {%>
                                      <tr>
                                        <td><%= group.name %></td>
                                        <td><%= group.department %></td>
                                        <td><%= group.branch %></td>
                                        <td><%= group.chair %></td>
                                        <td><%= group.day %></td>
                                        <td><%= group.time %></td>
                                        <td><%= group.headman %></td>
                                        <td><%= group.course %></td>
                                        <td><%= group.subject %></td>
                                        <td><%= group.leader %></td>
                                      </tr>
                                    <% }); %>
                                  </tbody>
                                </table>
                                </div>
                            <!-- Including Bootstrap JS (with its jQuery dependency) so that dynamic components work -->
                            <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
                            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
                          </body>
                        </html>`
ipcMain.on('export-to-html', async (event, arg) => {
  if (mainWindow === null) {
    throw new Error('"mainWindow" is not defined');
  }
  dialog.showOpenDialog(mainWindow, {
    properties: ['openFile']
  }).then(result => {
    if (result.canceled) {
      return;
    }
    let filePath = result.filePaths[0];
    let rendered = ejs.render(ejsStr, {groups: arg[0]}, {});
    writeToFile(filePath, rendered);
  }).catch(err => {
    dialog.showErrorBox("Error", "Error opening file");
  })
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
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

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return {action: 'deny'};
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
