<?php


ini_set('default_socket_timeout', -1);


$redis = new Redis();
$redis->connect("127.0.0.1", "6379");

$channel =$_REQUEST['subnode'];  // channel
//echo json_encode($_REQUEST);
//echo $channel;

$redis->psubscribe(array($channel), 'callback');
function callback($redis, $channel, $message, $val)
{
    $ip = $_SERVER["SERVER_ADDR"];
    $arr = array();
    $arr['ip']=$ip;
    $arr['value']=$val;
    echo "(";
    echo json_encode($arr);
    echo ")";

    exit;
}