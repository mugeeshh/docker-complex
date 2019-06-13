const redis = require('redis');
const keys = require('./keys');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
}); 
const sub = redisClient.duplicate();

function fib(index) {
    //console.log('index==>>'+index);
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

console.log('test');
//console.log(sub);


sub.on('message', (channel, message) => {
    console.log(message);
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
