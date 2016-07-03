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
            $arr['leaf'] = false;
            $arr['children'] = getfiles($path . '/' . $afile, $tempArr);
            $arr['allowDrop'] = false;
            $arr['allowDrag'] = false;
            $arr['expanded']=true;
            array_push($tempArr, $arr);
        } else {
            $arr = array();
            $spath = $path . '/' . $afile;
            $arr['text'] = substr($afile, 0, strlen($afile) - 4);
            //$arr['url'] = 'resources/'.$spath;
            $arr['leaf'] = true;
            $arr['iconCls']='fa-file-image-o';
            $arr['url'] = 'resources/SvgHvac/' . substr($spath, 4, strlen($spath) - 8) . '.gif';
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
