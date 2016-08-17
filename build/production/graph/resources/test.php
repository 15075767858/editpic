<?php
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
}