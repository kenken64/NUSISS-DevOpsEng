const EventEmitter = require('events');
const dgram = require('dgram');
const os = require('os');
const crypto = require('crypto');
const assert = require('assert');

// RM Devices (without RF support)
const rmDeviceTypes = {};
rmDeviceTypes[parseInt(0x2737, 16)] = 'Broadlink RM Mini';
rmDeviceTypes[parseInt(0x273d, 16)] = 'Broadlink RM Pro Phicomm';
rmDeviceTypes[parseInt(0x2712, 16)] = 'Broadlink RM2';
rmDeviceTypes[parseInt(0x2783, 16)] = 'Broadlink RM2 Home Plus';
rmDeviceTypes[parseInt(0x277c, 16)] = 'Broadlink RM2 Home Plus GDT';
rmDeviceTypes[parseInt(0x278f, 16)] = 'Broadlink RM Mini Shate';

// RM Devices (with RF support)
const rmPlusDeviceTypes = {};
rmPlusDeviceTypes[parseInt(0x272a, 16)] = 'Broadlink RM2 Pro Plus';
rmPlusDeviceTypes[parseInt(0x2787, 16)] = 'Broadlink RM2 Pro Plus v2';
rmPlusDeviceTypes[parseInt(0x278b, 16)] = 'Broadlink RM2 Pro Plus BL';
rmPlusDeviceTypes[parseInt(0x279d, 16)] = 'Broadlink RM3 Pro Plus';
rmPlusDeviceTypes[parseInt(0x27a9, 16)] = 'Broadlink RM3 Pro Plus v2'; // (model RM 3422)

// Known Unsupported Devices
const unsupportedDeviceTypes = {};
unsupportedDeviceTypes[parseInt(0, 16)] = 'Broadlink SP1';
unsupportedDeviceTypes[parseInt(0x2711, 16)] = 'Broadlink SP2';
unsupportedDeviceTypes[parseInt(0x2719, 16)] = 'Honeywell SP2';
unsupportedDeviceTypes[parseInt(0x7919, 16)] = 'Honeywell SP2';
unsupportedDeviceTypes[parseInt(0x271a, 16)] = 'Honeywell SP2';
unsupportedDeviceTypes[parseInt(0x791a, 16)] = 'Honeywell SP2';
unsupportedDeviceTypes[parseInt(0x2733, 16)] = 'OEM Branded SP Mini';
unsupportedDeviceTypes[parseInt(0x273e, 16)] = 'OEM Branded SP Mini';
unsupportedDeviceTypes[parseInt(0x2720, 16)] = 'Broadlink SP Mini';
unsupportedDeviceTypes[parseInt(0x753e, 16)] = 'Broadlink SP 3';
unsupportedDeviceTypes[parseInt(0x2728, 16)] = 'Broadlink SPMini 2';
unsupportedDeviceTypes[parseInt(0x2736, 16)] = 'Broadlink SPMini Plus';
unsupportedDeviceTypes[parseInt(0x2714, 16)] = 'Broadlink A1';
unsupportedDeviceTypes[parseInt(0x4EB5, 16)] = 'Broadlink MP1';
unsupportedDeviceTypes[parseInt(0x2722, 16)] = 'Broadlink S1 (SmartOne Alarm Kit)';
unsupportedDeviceTypes[parseInt(0x4E4D, 16)] = 'Dooya DT360E (DOOYA_CURTAIN_V2) or Hysen Heating Controller';


class Broadlink extends EventEmitter {

  constructor () {
    super();

    this.devices = {};
    this.sockets = [];
  }

  discover () {
    // Close existing sockets
    this.sockets.forEach((socket) => {
      socket.close();
    })

    this.sockets = [];

    // Open a UDP socket on each network interface/IP address
    const ipAddresses = this.getIPAddresses();

    ipAddresses.forEach((ipAddress) => {
      const socket = dgram.createSocket({ type:'udp4', reuseAddr:true });
      this.sockets.push(socket)
      
      socket.on('listening', this.onListening.bind(this, socket, ipAddress));
      socket.on('message', this.onMessage.bind(this));

      socket.bind(0, ipAddress);
    })
  }

  getIPAddresses () {
    const interfaces = os.networkInterfaces();
    const ipAddresses = [];

    Object.keys(interfaces).forEach((interfaceID) => {
      const currentInterface = interfaces[interfaceID];

      currentInterface.forEach((address) => {
        if (address.family === 'IPv4' && !address.internal) {
          ipAddresses.push(address.address);
        }
      })
    })

    return ipAddresses;
  }

  onListening (socket, ipAddress) {
    const { debug, log } = this;

    // Broadcase a multicast UDP message to let Broadlink devices know we're listening
    socket.setBroadcast(true);

    const splitIPAddress = ipAddress.split('.');
    const port = socket.address().port;
    if (debug && log) log(`\x1b[35m[INFO]\x1b[0m Listening for Broadlink devices on ${ipAddress}:${port} (UDP)`);

    const now = new Date();
    const starttime = now.getTime();

    const timezone = now.getTimezoneOffset() / -3600;
    const packet = Buffer.alloc(0x30, 0);

    const year = now.getYear();

    if (timezone < 0) {
      packet[0x08] = 0xff + timezone - 1;
      packet[0x09] = 0xff;
      packet[0x0a] = 0xff;
      packet[0x0b] = 0xff;
    } else {
      packet[0x08] = timezone;
      packet[0x09] = 0;
      packet[0x0a] = 0;
      packet[0x0b] = 0;
    }

    packet[0x0c] = year & 0xff;
    packet[0x0d] = year >> 8;
    packet[0x0e] = now.getMinutes();
    packet[0x0f] = now.getHours();
    
    const subyear = year % 100;
    packet[0x10] = subyear;
    packet[0x11] = now.getDay();
    packet[0x12] = now.getDate();
    packet[0x13] = now.getMonth();
    packet[0x18] = parseInt(splitIPAddress[0]);
    packet[0x19] = parseInt(splitIPAddress[1]);
    packet[0x1a] = parseInt(splitIPAddress[2]);
    packet[0x1b] = parseInt(splitIPAddress[3]);
    packet[0x1c] = port & 0xff;
    packet[0x1d] = port >> 8;
    packet[0x26] = 6;

    let checksum = 0xbeaf;

    for (let i = 0; i < packet.length; i++) {
      checksum += packet[i];
    }

    checksum = checksum & 0xffff;
    packet[0x20] = checksum & 0xff;
    packet[0x21] = checksum >> 8;

    socket.sendto(packet, 0, packet.length, 80, '255.255.255.255');
  }

  onMessage (message, host) {
    // Broadlink device has responded
    const macAddress = Buffer.alloc(6, 0);

    message.copy(macAddress, 0x00, 0x3D);
    message.copy(macAddress, 0x01, 0x3E);
    message.copy(macAddress, 0x02, 0x3F);
    message.copy(macAddress, 0x03, 0x3C);
    message.copy(macAddress, 0x04, 0x3B);
    message.copy(macAddress, 0x05, 0x3A);

    // Ignore if we already know about this device
    const key = macAddress.toString('hex');
    if (this.devices[key]) return;

    const deviceType = message[0x34] | message[0x35] << 8;

    // Create a Device instance
    this.addDevice(host, macAddress, deviceType);
  }

  addDevice (host, macAddress, deviceType) {
    const { log, debug } = this;

    if (this.devices[macAddress]) return;
  
    assert(typeof host === 'object' && (host.port || host.port === 0) && host.address, `createDevice: host should be an object e.g. { address: '192.168.1.32', port: 80 }`);
    assert(macAddress, `createDevice: A unique macAddress should be provided`);
    assert(deviceType, `createDevice: A deviceType from the rmDeviceTypes or rmPlusDeviceTypes list should be provided`);

    // Mark is at not supported by default so we don't try to
    // create this device again.
    this.devices[macAddress] = 'Not Supported';

    // Ignore devices that don't support infrared or RF.
    if (unsupportedDeviceTypes[parseInt(deviceType, 16)]) return null;
    if (deviceType >= 0x7530 && deviceType <= 0x7918) return null; // OEM branded SPMini2

    // If we don't know anything about the device we ask the user to provide details so that
    // we can handle it correctly.
    if (!rmDeviceTypes[parseInt(deviceType, 16)] && !rmPlusDeviceTypes[parseInt(deviceType, 16)]) {
      log(`\n\x1b[35m[Info]\x1b[0m We've discovered an unknown Broadlink device. This likely won't cause any issues.\n\nPlease raise an issue in the GitHub repository (https://github.com/lprhodes/homebridge-broadlink-rm/issues) with details of the type of device and its device type code: "${deviceType.toString(16)}". The device is connected to your network with the IP address "${host.address}".\n`);
      
      return null;
    }
    
    // The Broadlink device is something we can use.
    const device = new Device(host, macAddress, deviceType)
    device.log = log;
    device.debug = debug;

    this.devices[macAddress] = device;

    // Authenticate the device and let others know when it's ready.
    device.on('deviceReady', () => {
      this.emit('deviceReady', device);
    });

    device.authenticate();
  }
}

class Device {

  constructor (host, macAddress, deviceType, port) {
    this.host = host;
    this.mac = macAddress;
    this.emitter = new EventEmitter();
    this.log = console.log;
    this.type = deviceType;
    this.model = rmDeviceTypes[parseInt(deviceType, 16)] || rmPlusDeviceTypes[parseInt(deviceType, 16)];

    this.on = this.emitter.on;
    this.emit = this.emitter.emit;
    this.removeListener = this.emitter.removeListener;

    this.count = Math.random() & 0xffff;
    this.key = new Buffer([0x09, 0x76, 0x28, 0x34, 0x3f, 0xe9, 0x9e, 0x23, 0x76, 0x5c, 0x15, 0x13, 0xac, 0xcf, 0x8b, 0x02]);
    this.iv = new Buffer([0x56, 0x2e, 0x17, 0x99, 0x6d, 0x09, 0x3d, 0x28, 0xdd, 0xb3, 0xba, 0x69, 0x5a, 0x2e, 0x6f, 0x58]);
    this.id = new Buffer([0, 0, 0, 0]);

    this.setupSocket();

    // Dynamically add relevant RF methods if the device supports it
    const isRFSupported = rmPlusDeviceTypes[parseInt(deviceType, 16)];
    if (isRFSupported) this.addRFSupport();
  }

  // Create a UDP socket to receive messages from the broadlink device.
  setupSocket () {
    const socket = dgram.createSocket({ type: 'udp4', reuseAddr: true });
    this.socket = socket;

    socket.on('message', (response) => {
      const encryptedPayload = Buffer.alloc(response.length - 0x38, 0);
      response.copy(encryptedPayload, 0, 0x38);
      
      const err = response[0x22] | (response[0x23] << 8);
      if (err != 0) return;

      const decipher = crypto.createDecipheriv('aes-128-cbc', this.key, this.iv);
      decipher.setAutoPadding(false);

      let payload = decipher.update(encryptedPayload);

      const p2 = decipher.final();
      if (p2) payload = Buffer.concat([payload, p2]);

      if (!payload) return false;

      const command = response[0x26];

      if (command == 0xe9) {
        this.key = Buffer.alloc(0x10, 0);
        payload.copy(this.key, 0, 0x04, 0x14);

        this.id = Buffer.alloc(0x04, 0);
        payload.copy(this.id, 0, 0x00, 0x04);

        this.emit('deviceReady');
      } else if (command == 0xee || command == 0xef) {
        this.onPayloadReceived(err, payload);
      } else {
        console.log('Unhandled Command: ', command)
      }
    });

    socket.bind();
  }

  authenticate () {
    const payload = Buffer.alloc(0x50, 0);

    payload[0x04] = 0x31;
    payload[0x05] = 0x31;
    payload[0x06] = 0x31;
    payload[0x07] = 0x31;
    payload[0x08] = 0x31;
    payload[0x09] = 0x31;
    payload[0x0a] = 0x31;
    payload[0x0b] = 0x31;
    payload[0x0c] = 0x31;
    payload[0x0d] = 0x31;
    payload[0x0e] = 0x31;
    payload[0x0f] = 0x31;
    payload[0x10] = 0x31;
    payload[0x11] = 0x31;
    payload[0x12] = 0x31;
    payload[0x1e] = 0x01;
    payload[0x2d] = 0x01;
    payload[0x30] = 'T'.charCodeAt(0);
    payload[0x31] = 'e'.charCodeAt(0);
    payload[0x32] = 's'.charCodeAt(0);
    payload[0x33] = 't'.charCodeAt(0);
    payload[0x34] = ' '.charCodeAt(0);
    payload[0x35] = ' '.charCodeAt(0);
    payload[0x36] = '1'.charCodeAt(0);

    this.sendPacket(0x65, payload);
  }

  sendPacket (command, payload, debug = false) {
    const { log, socket } = this;
    this.count = (this.count + 1) & 0xffff;

    let packet = Buffer.alloc(0x38, 0);

    packet[0x00] = 0x5a;
    packet[0x01] = 0xa5;
    packet[0x02] = 0xaa;
    packet[0x03] = 0x55;
    packet[0x04] = 0x5a;
    packet[0x05] = 0xa5;
    packet[0x06] = 0xaa;
    packet[0x07] = 0x55;
    packet[0x24] = 0x2a;
    packet[0x25] = 0x27;
    packet[0x26] = command;
    packet[0x28] = this.count & 0xff;
    packet[0x29] = this.count >> 8;
    packet[0x2a] = this.mac[5];
    packet[0x2b] = this.mac[4];
    packet[0x2c] = this.mac[3];
    packet[0x2d] = this.mac[2];
    packet[0x2e] = this.mac[1];
    packet[0x2f] = this.mac[0];
    packet[0x30] = this.id[0];
    packet[0x31] = this.id[1];
    packet[0x32] = this.id[2];
    packet[0x33] = this.id[3];

    let checksum = 0xbeaf;
    for (let i = 0 ; i < payload.length; i++) {
      checksum += payload[i];
      checksum = checksum & 0xffff;
    }

    const cipher = crypto.createCipheriv('aes-128-cbc', this.key, this.iv);
    payload = cipher.update(payload);
    
    packet[0x34] = checksum & 0xff;
    packet[0x35] = checksum >> 8;

    packet = Buffer.concat([packet, payload]);

    checksum = 0xbeaf;
    for (let i = 0 ; i < packet.length; i++) {
      checksum += packet[i];
      checksum = checksum & 0xffff;
    }
    packet[0x20] = checksum & 0xff;
    packet[0x21] = checksum >> 8;

    if (debug) log('\x1b[33m[DEBUG]\x1b[0m packet', packet.toString('hex'))

    socket.send(packet, 0, packet.length, this.host.port, this.host.address, (err, bytes) => {
      if (debug && err) log('\x1b[33m[DEBUG]\x1b[0m send packet error', err)
      if (debug) log('\x1b[33m[DEBUG]\x1b[0m successfuly sent packet - bytes: ', bytes)
    });
  }

  onPayloadReceived (err, payload) {
    const param = payload[0];

    const data = Buffer.alloc(payload.length - 4, 0);
    payload.copy(data, 0, 4);

    switch (param) {
      case 1: {
        const temp = (payload[0x4] * 10 + payload[0x5]) / 10.0;
        this.emit('temperature', temp);
        break;
      }
      case 4: { //get from check_data
        const data = Buffer.alloc(payload.length - 4, 0);
        payload.copy(data, 0, 4);
        this.emit('rawData', data);
        break;
      }
      case 26: { //get from check_data
        const data = Buffer.alloc(1, 0);
        payload.copy(data, 0, 0x4);
        if (data[0] !== 0x1) break;
        this.emit('rawRFData', data);
        break;
      }
      case 27: { //get from check_data
        const data = Buffer.alloc(1, 0);
        payload.copy(data, 0, 0x4);
        if (data[0] !== 0x1) break;
        this.emit('rawRFData2', data);
        break;
      }
    }
  }

  // Externally Accessed Methods

  checkData () {
    const packet = Buffer.alloc(16, 0);
    packet[0] = 4;
    this.sendPacket(0x6a, packet);
  }

  sendData (data, debug = false) {
    let packet = new Buffer([0x02, 0x00, 0x00, 0x00]);
    packet = Buffer.concat([packet, data]);
    this.sendPacket(0x6a, packet, debug);
  }

  enterLearning () {
    let packet = Buffer.alloc(16, 0);
    packet[0] = 3;
    this.sendPacket(0x6a, packet);
  }

  checkTemperature () {
    let packet = Buffer.alloc(16, 0);
    packet[0] = 1;
    this.sendPacket(0x6a, packet);
  }

  cancelLearn() {
    const packet = Buffer.alloc(16, 0);
    packet[0] = 0x1e;
    this.sendPacket(0x6a, packet);
  }

  addRFSupport () {
    this.enterRFSweep = () => {
      const packet = Buffer.alloc(16, 0);
      packet[0] = 0x19;
      this.sendPacket(0x6a, packet);
    }

    this.checkRFData = () => {
      const packet = Buffer.alloc(16, 0);
      packet[0] = 0x1a;
      this.sendPacket(0x6a, packet);
    }

    this.checkRFData2 = () => {
      const packet = Buffer.alloc(16, 0);
      packet[0] = 0x1b;
      this.sendPacket(0x6a, packet);
    }
  }
}

module.exports = Broadlink;