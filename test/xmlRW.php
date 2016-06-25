<?php
$fn = $_POST['fileName'];
$rw = $_POST['rw'];

if ($rw == 'r') {
    $isFile = file_exists($fn);
    if ($isFile == false) {
        echo "null";
        return;
    }

    $fp = fopen($fn, 'r');
    while (!feof($fp)) {
        echo fgets($fp);
    }
} else {
    $content = $_POST["content"];
    file_put_contents($fn, $content);

    echo $content;
    exit();
}
?>