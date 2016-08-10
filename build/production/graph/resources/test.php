
<?php

//Connecting to Redis server on localhost

for($i=0;$i<10000;$i++){
    $redis = new Redis();
    echo $redis->connect('192.168.253.253', 6379);

}
//$redis->setOption(\Redis::OPT_READ_TIMEOUT, -1);
/*$redis->subscribe(array('1001.8.*'), function ($redis, $chan, $msg) {
    echo json_encode($redis);
    echo json_encode($chan);
    echo $msg;
});*/

//echo $redis;
//echo json_encode($redis->keys("*"));
//echo "Connection to server sucessfully";
//check whether server is running or not
//echo "Server is running: " . $redis->ping();

