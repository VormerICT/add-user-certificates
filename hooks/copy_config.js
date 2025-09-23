#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var androidPlatformDir = path.join('platforms', 'android');
var androidResDir = path.join(androidPlatformDir, 'app', 'src', 'main', 'res');
var targetConfigDir = path.join(androidResDir, 'xml');

if (!fs.existsSync(targetConfigDir)) {
    fs.mkdirSync(targetConfigDir, { recursive: true });
}

var sourceConfig = path.join('plugins', 'com.outsystemscloud.vormerict.testcertificate', 'res', 'xml', 'network_security_config.xml');
var targetConfig = path.join(targetConfigDir, 'network_security_config.xml');

fs.copyFileSync(sourceConfig, targetConfig);

console.log('Successfully copied network_security_config.xml to ' + targetConfig);
