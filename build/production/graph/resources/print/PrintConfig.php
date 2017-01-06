<?php

$par == $_REQUEST['par'];
if ($par == 'saveConfig') {
    echo file_put_contents('PrintConfig.json', $_REQUEST['content']);
}
if ($par == "loadConfig") {
    echo file_get_contents('PrintConfig.json');
}