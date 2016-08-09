<?php

$ip = $_SERVER["SERVER_ADDR"];
$par = $_GET["par"];
/*$redis = new Redis();
if ($ip == "127.0.0.1") {
    $redis->connect("192.168.253.253", 6379);
} else {
    $redis->connect($ip, 6379);
}*/




//echo move_uploaded_file($_FILES["file"]["tmp_name"], "devsinfo/" . $_FILES["file"]["name"]);


if ($par == 'getSvgTree') {
    //$path = "svg";
    $path = "SvgHvac";
    echo json_encode(getfiles($path, $fileArr = Array()));
}

if ($par == "getdevs") {
    $redis = getRedisConect();
    $arList = $redis->keys("???????");
    sort($arList);
    $arr = array();
    foreach ($arList as $key => $value) {
        if (is_numeric($value)) {
            array_push($arr, array("value" => $value, "name" => $redis->hGet($value, "Object_Name")));
        }
    }
    sort($arList);
    echo json_encode($arr);
}

if ($par == "gettypes") {
    $redis = getRedisConect();
    $nodeName = $_GET['nodename'];
    $arList = $redis->hKeys($nodeName);
    echo json_encode($arList);
}

if ($par == "gettypevalue") {
    $nodeName = $_GET['nodename'];
    $type = $_GET['type'];
    $redis = getRedisConect();
    echo $redis->hGet($nodeName, $type);
}

if ($par == "changevalue") {
    $redis = getRedisConect();
    $nodeName = $_GET["nodename"];
    $type = $_GET["type"];
    if (isset($_GET["value"])) {
        $value = $_GET["value"];
    }
    if (isset($_POST["value"])) {
        $value = $_POST["value"];
    }
    //echo "{type:'".$type."',value:'"."12313"."'}";
    echo $redis->hSet($nodeName, $type, $value);
    $redis->publish(substr($nodeName, 0, 4) . ".8.*", $nodeName . "\r\n" . $type . "\r\n" . $value);
}


function getRedisConect()
{
    $redis = new Redis();
    $ip = $_GET['ip'];
    $port = $_GET['port'];
    $redis->connect($ip, $port);

    return $redis;
}


if ($par == "getImageData") {
    $fn = "../../home/data.json";
    if (file_exists($fn)) {
        echo file_get_contents($fn);
    } else {
        mkdir("../../home");
        file_put_contents($fn, "");
    }
}
if ($par == "putImageData") {
    $fn = "../../home/data.json";
    $content = $_POST['content'];

    if (file_exists($fn)) {
        echo $content;
        echo file_put_contents($fn, $content);
    } else {
        mkdir("../../home");
        file_put_contents($fn, "");
    }
}
if ($par == "saveImageAsHtml") {
    $graph = $_GET["graph"];
    //$htmlStr = "<script>window.location.href='/graph/index.html?graph=" . $graph . "'</script>";
    $str = '<!DOCTYPE html>' .
        '<html lang="en">' .
        '<head>' .
        '<meta charset="UTF-8">' .
        '<title>Title</title>' .
        '</head>' .
        '<style>' .
        '*{' .
        'margin: 0;' .
        'padding: 0;' .
        '}' .
        'html,body,iframe{' .
        'width:100%;' .
        'height:100%;' .
        'overflow: hidden;' .
        '}' .
        'iframe{' .
        'border:none;' .
        '}' .
        '</style>' .
        '<body>' .
        '</body>' .
        '<script>' .
        'var iframe = document.createElement("iframe");' .
        'var body = document.getElementsByTagName("body")[0];' .
        'body.appendChild(iframe);' .
        'if(!location.hostname){' .
        'var ip = window.prompt("please input IP ","' . $ip . '");' .
        'iframe.src="http://'.$ip.'/graph/index.html?graph=' . $graph . '";' .
        '}else{' .
        'iframe.src="../graph/index.html?graph=' . $graph . '"}' .
        '</script>' .
        '</html>';
    file_put_contents("../../home/" . $graph . ".html", $str);
//    '<iframe id="iframe" src="../graph/index.html?graph=' . $graph . '"></iframe>' .

}
if ($par == "getLinkValues") {
    $datas = json_decode($_POST['datas']);
    $datas = object_array($datas);

    foreach ($datas as $key => $value) {

        $value['value'] = getNodeTypeValue($value);
        $datas[$key] = $value;
    }
    echo json_encode($datas);
}





function object_array($array)
{
    if (is_object($array)) {
        $array = (array)$array;
    }
    if (is_array($array)) {
        foreach ($array as $key => $value) {
            $array[$key] = object_array($value);
        }
    }

    return $array;
}

function getNodeTypeValue($arr)
{
    $ip = $arr['ip'];
    $port = $arr['port'];
    $nodeName = $arr['nodename'];
    $type = $arr['type'];
    $redis = new Redis();
    $redis->connect($ip, $port);
    return $redis->hGet($nodeName, $type);
}



function getfiles($path, $fileArr)
{
    $tempArr = array();
    //echo '<div style="color:red">'.$path.'</div>';
    foreach (scandir($path) as $afile) {
        if ($afile == '.' || $afile == '..')
            continue;

        if (is_dir($path . '/' . $afile)) {  //目录
            //echo '<div style="color:red">' . $path . '/' . $afile . "</div>";
            $arr = array();
            $arr['text'] = $afile;
            $arr['url'] = $path . '/' . $afile;
            $arr['leaf'] = false;
            $arr['children'] = getfiles($path . '/' . $afile, $tempArr);
            $arr['allowDrop'] = false;
            $arr['allowDrag'] = false;
            $arr['expanded'] = true;
            array_push($tempArr, $arr);
        } else {
            $arr = array();
            $spath = $path . '/' . $afile;
            $arr['text'] = substr($afile, 0, strlen($afile) - 4);
            //$arr['url'] = 'resources/'.$spath;
            $arr['leaf'] = true;
            $arr["icon"] = "resources/" . $spath;
            //$arr['iconCls'] = 'fa-file-image-o';
            $arr['iconCls'] = 'aaaaaa';
            $arr['qtitle'] = substr($afile, 0, strlen($afile) - 4);
            $arr['qtip'] = "<img src=" . "resources/" . $spath . ">";
            //$arr['url'] = 'resources/SvgHvac/' . substr($spath, 4, strlen($spath) - 8) . '.gif';
            $arr['url'] = "resources/" . $spath;
            $arr['src'] = "resources/" . $spath;

            //$binary = file_get_contents($spath);
            //$base64 = base64_encode($binary);
            //$arr['svgurl'] = $binary;//'data:image/gif;base64,'.$base64;

            //$arr['svgurl']='data:image/gif;base64,R0lGODlhHQAUALMOAP///8zMzLKyzMyymcyZsv/M5f/lzOXl/8zM5eXMsuWyzLKZf5mZsrJ/mf///wAAACH5BAEAAA4ALAAAAAAdABQAAATO0MlApZ314qADSAB3eUjYAYo5ASwoOh5bvjGqBiA40GUp0KkUQeTRqWAA39EjXAIGx5UgiiQsAwvAIgMLMAAMLqUBaFQ8hicgzfEcANN3G1AAWOuUtH7dfvsBB211g3QUa2psSG9xJh51dyE4h2kJbSV/CG0phAqGaVCJbnCAjXR2phQge5Uwl6SZMJumnUUftnM9SaVBNnNQUDSjU8FWVkRQWTsWAVNfP8tWZEMrv05Tw8unxhPITzTNcDTRdkRqwNnXTsU3FO007mLwHBEAOw==';
            $arr['allowDrag'] = true;
            $arr['allowDropl'] = false;
            array_push($tempArr, $arr);
        }
    }
    return array_values($tempArr);
} //列出所有文件

