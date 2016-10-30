<?php


//ini_set('default_socket_timeout', -1);

ini_set('default_socket_timeout', -1);

$redis = new Redis();
if(!$redis){
    echo  json_encode(array('success'=>false,'info'=>'Redis error'));
    exit();
}
$redis->connect("127.0.0.1", "6379",15) or $redis = false;
if(!$redis){
    echo  json_encode(array('success'=>false,'info'=>'Connction error'));
    exit();
}

//$channel =$_REQUEST['subnode'];  // channel

$channels = json_decode($_REQUEST['subnodes']);
$redis->psubscribe($channels, 'callback');

function callback($redis, $channel, $message, $val)
{
    $ip = $_SERVER["SERVER_ADDR"];
    $arr = array();
    $arr['ip']=$ip;
    $arr['value']=$val;

    if (!empty($_REQUEST['callback'])) {
        header('Content-Type: application/javascript');
        //echo $_REQUEST['callback'] . '(';
        echo $_REQUEST['callback'] . '(';
    }

    echo json_encode(array("success"=>true,'info'=>$arr));

    //echo json_encode($arr);
    if (!empty($_REQUEST['callback'])) {
        echo ');';
    }
    exit;
}
