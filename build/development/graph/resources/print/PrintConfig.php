<?php

$par = $_REQUEST['par'];
$configFile = "PrintConfig.json";

createConfigFile($configFile);

if ($par == 'saveConfig') {
    echo file_put_contents($configFile, $_REQUEST['content']);
}
if ($par == "loadConfig") {
    echo file_get_contents($configFile);
}

function createConfigFile($configFile)
{
    if (!file_exists($configFile)) {
        file_put_contents($configFile, '{"number":"10","mode":"pdf"}');
    }
}