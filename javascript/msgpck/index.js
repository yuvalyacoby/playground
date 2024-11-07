import { unpack, pack } from 'msgpackr';

let serializedAsBuffer = pack(JSON.stringify({ foo: 'bar' }));
console.log(serializedAsBuffer);
let data = unpack(serializedAsBuffer);
console.log(data);