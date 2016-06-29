<?php
$source = "./SvgHvac";


$filename = $_GET['filename'];


echo toBase64($filename);
if (isset($_GET["getfiles"])) {
    $filename = $_GET['getfiles'];


    getfiles($source);
    exit();
}

function getfiles($path)
{

    foreach (scandir($path) as $afile) {
        if ($afile == '.' || $afile == '..') continue;
        if (is_dir($path . '/' . $afile)) {
            getfiles($path . '/' . $afile);
        } else {
            echo $path . '/' . $afile . "&";
//echo $result;
        }
    }
} //简单的demo,列出当前目录下所有的文件


if (isset($_GET["filename"])) {
    $filename = $_GET['filename'];
    //echo toBase64($filename);

    $binary = file_get_contents($filename);
    $base64 = base64_encode($binary);
    echo $base64;
    exit();
}

function diedai($dir)
{
    $scanned_directory = array_diff(scandir($dir), array('..', '.'));
    foreach ($scanned_directory as $key => $value) {
    }
    if (is_dir($dir)) {
        diedai($dir);
        echo json_encode($scanned_directory);
    }
#is_dir() //是否是目录
    #mkdir()//创建目录
}

function tree($directory)
{
    $mydir = dir($directory);
    //echo "<ul>\n";
    while ($file = $mydir->read()) {
        if ((is_dir("$directory/$file")) AND ($file != ".") AND ($file != "..")) {

            //  echo "<li><font color=\"#ff00cc\"><b>$file</b></font></li>\n";
            tree("$directory/$file");
        } else {
            //echo "<li>$file</li>\n";
            echo toBase64($file);
        }
    }
    //echo "</ul>\n";
    $mydir->close();
}

function toBase64($imgPath)
{
    $file = $imgPath; // 文件路径
    if ($fp = fopen($file, "rb", 0)) {
        $binary = fread($fp, filesize($file)); // 文件读取
        fclose($fp);
        $base64 = base64_encode($binary); // 转码
        return $base64; // 显示base64码
    }
}


?>









