const BloomFilters = require('./bloom_filters');

const allowedIP = ['192.168.1.1', '202.23.100.1', '206.0.123.100', '100.252.12.1', '1.1.1.1', '172.244.23.010', '202.12.1.101'];
const testIP = ['100.252.12.1', '202.12.1.101', '127.0.0.1', '0.0.0.0', '4.4.4.4', '192.168.1.1',]; // true, true, false, false, false, true
const bf = new BloomFilters(Math.pow(2, 22), ['md5', 'sha256', 'sha1', 'sha512']);
allowedIP.forEach(data => bf.insertData(data));
const test = testIP.map(ip => bf.isExist(ip));
console.log(test);
console.log(bf.getStorage());
