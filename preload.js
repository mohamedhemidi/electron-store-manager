const { contextBridge } = require('electron');
const createClient = require('./services/clients/CreateClient');
const os = require('os');

const addClient = (data) => {
  createClient(data);
};

contextBridge.exposeInMainWorld('electron', {
  homeDir: () => os.homedir(),
  addClient: addClient,
});
