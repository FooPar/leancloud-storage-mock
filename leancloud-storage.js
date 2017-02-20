import config from 'config'; // an aliased module. check webpack conf
import AV from 'leancloud-storage';
AV.init({
  appId:config.APP_ID, 
  appKey:config.APP_KEY
});
AV.Object.prototype.save = jest.fn(() => {
  return AV.Promise.resolve(this);
  console.log(`AV.Object.save called with ${this} ${arguments}`)
});
AV.Query.prototype.find = jest.fn(function() {
  console.log(`AV.Query.find called with ${JSON.stringify(this)} ${JSON.stringify(arguments)}`);
  return AV.Promise.resolve("yooooo");
});
export default AV;

// compare two av objects a and b, and log any discrepancies recursively to
// provided logger.
export function deepCompare(a, b, logger) {
  if (!logger) logger = console.error;
  if (!(typeof a === typeof b)) {
    logger(`type different: ${a}, ${b}`);
    return false;
  }
  if (typeof a === 'object') {
    for (let key of Object.keys(a)) {
      if (!(key in b)) {
        logger(`key ${key} not in ${JSON.stringify(b)}`);
        return false;
      }
      //NOTE: ignoring cid for av objects
      if (key === 'cid') {
        //ignore
        return true;
      }
      if (!deepCompare(a[key], b[key])) {
        logger(`objects ${JSON.stringify(a)}, ${JSON.stringify(b)} don't agree on ${key}`);
        return false;
      }
    }
    return true;
  }
  if (a === b) {
    return true;
  } else {
    logger(`values ${a}, ${b} don't match`);
    return false;
  };
}
