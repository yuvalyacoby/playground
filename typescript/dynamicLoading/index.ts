import * as versions from './versionsList';
import { loader } from './versionsListDynamic';

console.log('hello');
console.log(JSON.stringify(versions));
console.log('----');
console.log(JSON.stringify(loader()))