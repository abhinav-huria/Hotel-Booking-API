import redis from "redis";
import { promisify } from "util";
import dotenv from "dotenv";
dotenv.config();
const url1="redis://default:aFzD6xo5zD5AfAwmtNbAYCJD2oyxGQbJ@redis-15653.c301.ap-south-1-1.ec2.cloud.redislabs.com:15653";

// function decomposeRedisUrl(url) {
//     const [[, , password, host, port]] = [...(url.matchAll(/redis:\/\/(([^@]*)@)?(.*?):(\d*)/g))];
//     return { password, host, port };
//   }

//     const { password, host, port } = decomposeRedisUrl(url1);
export const redisClient = redis.createClient({
url: url1
});

// const password = process.env.REDIS_PASSWORD || null;
// if(password && password != "null"){
redisClient.connect();
console.log(process.env.REDIS_PASSWORD);
// redisClient.AUTH("aFzD6xo5zD5AfAwmtNbAYCJD2oyxGQbJ").then(() => {
//   console.log("Connected to Redis auth");
// }).catch(err => {
//   console.log("Error connecting to Redis auth", err);
// });

redisClient.on("connect", () => {
  console.log("Connected to Redis");
  redisClient.set("foo", "bar");
  redisClient.get("foo", (err, result) => {
    console.log(result);
  }).catch(err => {
    console.log("Error connecting to Redis", err);
  });
  // redisClient.AUTH(process.env.REDIS_PASSWORD).then(() => {
  //   console.log("redis connected");
  // }).catch(err => {
  //   console.log("redis error", err);
  // });
  console.log("Redis client connected");
});
// try{
//     redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
//     redisClient.setAsync = promisify(redisClient.set).bind(redisClient);
//     redisClient.lpushAsync = promisify(redisClient.lPush).bind(redisClient);
//     redisClient.lrangeAsync = promisify(redisClient.lRange).bind(redisClient);
//     redisClient.llenAsync = promisify(redisClient.lLen).bind(redisClient);
//     redisClient.lremAsync = promisify(redisClient.lRem).bind(redisClient);
//     redisClient.lsetAsync = promisify(redisClient.lSet).bind(redisClient);
//     redisClient.hmsetAsync = promisify(redisClient.hSet).bind(redisClient);
//     redisClient.hmgetAsync = promisify(redisClient.hmGet).bind(redisClient);
//     redisClient.clear = promisify(redisClient.del).bind(redisClient);
// }catch (e) {
//     console.log("redis error", e);
// }

redisClient.on("connect", function () {
  console.log("Redis is connected");
});

redisClient.on("error", function (err) {
  console.log("Redis error.", err);
});
// setInterval(function() {
//     console.log("Keeping alive - Node.js Performance Test with Redis");
//     redisClient.set('ping', 'pong');
// }, 10000);

global.cache = redisClient;
