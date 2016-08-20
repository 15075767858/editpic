<?php




//for($i=0;$i<1000;$i++){}
//$redis = getRedisConect();
//echo gettype($redis);
/*
if($redis){
    echo "aaa";

}else{
    echo "bb";
}
function getRedisConect()
{
    $redis = new Redis();
    $ip = $_GET['ip'];
    $port = $_GET['port'];
    $redis->popen($ip, $port, 0.3) || $redis=false;
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