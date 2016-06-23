<?php

$par = $_GET['par'];
if ($par == 'getSvgTree') {
    $path = "svg";
    echo json_encode(getfiles($path, $fileArr = Array()));
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
            $arr['leaf'] = flase;
            $arr['children'] = getfiles($path . '/' . $afile, $tempArr);
            array_push($tempArr, $arr);
        } else {
            $arr = array();
            $arr['text'] = $afile;
            $arr['url'] = $path . '/' . $afile;
            $arr['leaf'] = true;
            array_push($tempArr, $arr);
        }
    }
    return array_values($tempArr);
} //列出所有文件