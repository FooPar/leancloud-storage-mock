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
