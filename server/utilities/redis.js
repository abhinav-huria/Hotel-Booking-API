//DEPENDENCIES:
import redis from "redis";
import dotenv from "dotenv";
dotenv.config();

//CONNECTION URL
// const url="redis://default:redispw@localhost:49153";
const url=`redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`

//REDIS CLIENT
export const redisClient = redis.createClient({
url: url,
});

//CONNECT TO REDIS
redisClient.connect();


//CHECK IF REDIS CONNECTION IS SUCCESSFUL
redisClient.on("connect", async () => {
  console.log("Connected to Redis");
});

redisClient.on("error", function (err) {
  console.log("Redis error.", err);
});

//REDIS PING
// setInterval(function() {
//     console.log("Keeping alive - Node.js Performance Test with Redis");
//     redisClient.set('ping', 'pong');
// }, 10000);

//GLOBAL EXPORT
global.cache = redisClient;
