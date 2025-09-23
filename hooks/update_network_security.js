#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const et = require('elementtree');

const androidPlatformsDir = path.join('platforms', 'android');
const networkSecurityFile = path.join(androidPlatformsDir, 'app', 'src', 'main', 'res', 'xml', 'network_security_config.xml');

try {
    console.log('Starting Network Security Config update...');

    // Read the existing network_security_config.xml file
    const xml = fs.readFileSync(networkSecurityFile, 'utf-8');
    const etree = et.parse(xml);

    // Find the <base-config> element
    const baseConfig = etree.find('./base-config');
    if (baseConfig) {
        // Create the new <certificates> element
        const certificatesElem = et.SubElement(baseConfig, 'certificates');
        certificatesElem.set('src', 'user');
    } else {
        console.warn('Could not find <base-config> in network_security_config.xml. Skipping update.');
    }

    // Write the updated XML back to the file
    const updatedXml = etree.write({'indent': 4});
    fs.writeFileSync(networkSecurityFile, updatedXml);

    console.log('Successfully updated network_security_config.xml with <certificates src="user" />');

} catch (e) {
    console.error(`Error updating network_security_config.xml: ${e.message}`);
}
