<?php

$mysqlConfigXmlPath = "/mnt/nandflash/mysqlconfig.xml";
$xml = simplexml_load_string(file_get_contents($mysqlConfigXmlPath));
$host = $xml->host;
$username = $xml->username;
$password = $xml->password;
$databasename = $xml->databasename;
$mysql = mysqli_connect($host, $username, $password);
mysqli_select_db($mysql, $databasename);
$par = $_REQUEST['par'];

if ($par == "getDataRecord") {
    $ip = $_REQUEST['ip'];
    $keysArr = explode(",", $_REQUEST['keys']);
    $page = $_REQUEST['page'];
    $start = $_REQUEST["start"];
    $limit = $_REQUEST['limit'];

    $arr = [];
    $sqlWhere = "";
    for ($i = 0; $i < sizeof($keysArr); $i++) {
        $sqlWhere .= " device=(select id from smartio_device where ip =\"$ip\" and device =substring($keysArr[$i],1,4)) and  CONCAT(device_instance,device_type,device_number) =$keysArr[$i] ";
        if ($i < sizeof($keysArr) - 1)
            $sqlWhere = $sqlWhere . " or ";
    }
    $sql = "select * from smartio_data_record where $sqlWhere LIMIT $start,$limit";
//echo $sql;
//echo json_encode($keysArr);
    $resArr = getArray($mysql, $sql);
    $arr['topics'] = $resArr;
    $countSql = "select count(*) from smartio_data_record where $sqlWhere";
    $arr['totalCount'] = getOne($mysql, $countSql)[0];
    echo json_encode($arr);
}
if ($par == "getEventData") {
    $ip = $_REQUEST['ip'];
    $keysArr = explode(",", $_REQUEST['keys']);
    $page = $_REQUEST['page'];
    $start = $_REQUEST["start"];
    $limit = $_REQUEST['limit'];
    $arr = [];
    $sqlWhere = "";
    for ($i = 0; $i < sizeof($keysArr); $i++) {
        $sqlWhere .= " device=(select id from smartio_device where ip =\"$ip\" and device =substring($keysArr[$i],1,4)) and  CONCAT(device_instance,device_type,device_number) =$keysArr[$i] ";
        if ($i < sizeof($keysArr) - 1)
            $sqlWhere = $sqlWhere . " or ";
    }
    $sql = "select * from smartio_event where $sqlWhere LIMIT $start,$limit";
    $resArr = getArray($mysql, $sql);
    $arr['topics'] = $resArr;
    $countSql = "select count(*) from smartio_event where $sqlWhere";
    $arr['totalCount'] = getOne($mysql, $countSql)[0];
    echo json_encode($arr);
}

if($par=="isTableExist"){
    
    
}
if($par=="deleteHistoryTable"){
    $tablename = $_REQUEST['tablename'];
    $sql = "select * from smartio_history_index where tablename='$tablename' ;";
    if($id = getOne($mysql,$sql)["id"]){
        if(getOne($mysql,"delete from smartio_history where tablename=$id")){
            getOne($mysql,"delete from smartio_history_index where id=$id");
        }else{
            echo "delete history fail.";
        }
        //getOne($mysql,"delete from smartio_history_index where id=$id");
        echo "delete ok";
    }else{
        echo "table does not exist .";
    }
//echo json_encode()
}

function getOne($mysql, $sql)
{
    $res = mysqli_query($mysql, $sql);
    if(gettype($res)=="boolean"){
       return $res; 
    }else{
        $row = mysqli_fetch_array($res);
        return $row;
    }
}

function getArray($mysql, $sql)
{
    $arr = array();
    $res = mysqli_query($mysql, $sql) or $res = false;
    if (!$res) {
        return $res;
    }
    while ($row = mysqli_fetch_array($res)) {
        array_push($arr, $row);
    }
    return $arr;
}

