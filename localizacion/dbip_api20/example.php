#!/usr/local/bin/php
<?php

$api_key = "3b3b0a06945fd95bd65cac791b5256f6a331b912";

require "dbip-client.class.php";

$ip_addr = $_SERVER['REMOTE_ADDR']; //$argv[1];
//or die("usage: {$argv[0]} <ip_address>\n");

try {
	$dbip = new DBIP_Client($api_key);
	echo "keyinfo:\n";
	foreach ($dbip->Get_Key_Info() as $k => $v) {
		echo "{$k}: {$v}\n";
	}
	echo "\naddrinfo:\n";
	foreach ($dbip->Get_Address_Info($ip_addr) as $k => $v) {
		echo "{$k}: " . (is_array($v) ? implode(", ", $v) : $v) . "\n";
	}
} catch (Exception $e) {
	die("error: {$e->getMessage()}\n");
}
