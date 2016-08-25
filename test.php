<?php





ini_set('default_socket_timeout', -1);

$redis = new Redis();
$redis->connect("127.0.0.1", "6379");
//$redis->publish('tv1', '22222222'); //发布
$channel = '*';  // channel

$redis->psubscribe(array($channel), 'callback');
function callback($redis, $channel, $message, $val)
{
    $ip = $_SERVER["SERVER_ADDR"];
    $arr = array();
    $arr['ip']=$ip;
    $arr['value']=$val;
    echo "var a="+$val;
    exit;
}






/*
//for($i=0;$i<1000;$i++){}
//echo gettype($redis);
//if($redis){
//    $arList= $redis->keys('111111');
//
//    echo json_encode($arList);
//}else{
//    echo false;
//}
$redis = getRedisConect();
$redis->subscribe(array('1100.8.*',"*"), function($instance, $channelName, $message){
    //echo $channelName, "==>", $message,PHP_EOL;
    //echo $instance;
    //echo $channelName;
    echo $message;
});
function callback($instance, $channelName, $message) {
}

function getRedisConect()
{
    $redis = new Redis();
    $ip = $_GET['ip'];
    $port = $_GET['port'];
    $redis->connect($ip, $port, 0) || $redis=false;
    return $redis;
}*/


/*

$par=$_GET['par'];
if($par=="upload"){
    echo move_uploaded_file($_FILES["file"]["tmp_name"], $dir . $_FILES["file"]["name"]);
}
if($par=="afterUpload"){
    $graphInstallPackageName="graphInstall";
    $names = $_GET['names'];

    exec("cat ".$names." > ".$graphInstallPackageName);

    exec("tar -xzvf ".$graphInstallPackageName);
    $arr  =  split(",", $names);
    foreach ($arr as $key => $value) {
        unlink("./".$value);
    }
    unlink($graphInstallPackageName);
}*/