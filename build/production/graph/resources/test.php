
<?php

//Connecting to Redis server on localhost
$redis = new Redis();
$redis->setTimeout("connect",100);
$redis->connect('192.168.253.25', 6379);

echo $redis;
//echo json_encode($redis->keys("*"));
//echo "Connection to server sucessfully";
//check whether server is running or not
//echo "Server is running: " . $redis->ping();