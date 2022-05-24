import redis from 'redis';
import { promisify } from 'util';


export const redisClient = redis.createClient({
    host: "127.0.0.1",
    port: 6379
});

// const password = process.env.REDIS_PASSWORD || null;
// if(password && password != "null"){
//     redisClient.auth(password, (err,res) => {
//         console.log("res",res);
//         console.log("err",err);
//     });
// }

try{
    redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
    redisClient.setAsync = promisify(redisClient.set).bind(redisClient);
    redisClient.lpushAsync = promisify(redisClient.lPush).bind(redisClient);
    redisClient.lrangeAsync = promisify(redisClient.lRange).bind(redisClient);
    redisClient.llenAsync = promisify(redisClient.lLen).bind(redisClient);
    redisClient.lremAsync = promisify(redisClient.lRem).bind(redisClient);
    redisClient.lsetAsync = promisify(redisClient.lSet).bind(redisClient);
    redisClient.hmsetAsync = promisify(redisClient.hSet).bind(redisClient);
    redisClient.hmgetAsync = promisify(redisClient.hmGet).bind(redisClient);
    redisClient.clear = promisify(redisClient.del).bind(redisClient);
}catch (e) {
    console.log("redis error", e);
}

// redisClient.connect();
redisClient.on("connect", function () {
    console.log("Redis is connected");
});
redisClient.on("error", function (err) {
    console.log("Redis error.", err);
});
setInterval(function() {
    console.log("Keeping alive - Node.js Performance Test with Redis");
    redisClient.set('ping', 'pong');
}, 1000 * 60 * 4);

global.cache = redisClient;


