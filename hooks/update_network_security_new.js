#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const et = require('elementtree');


    // Get the path to the network_security_config.xml file
    var networkSecurityFile = path.join('platforms', 'android', 'app', 'src', 'main', 'res', 'xml', 'network_security_config.xml');
//    var projectRoot = context.opts.projectRoot;
//    networkSecurityFile = path.join(projectRoot, 'res', 'android', 'xml', 'network_security_config.xml');

    try {
        console.log('Starting Network Security Config update with before_compile hook...');

        // Read the existing XML file
        const xml = fs.readFileSync(networkSecurityFile, 'utf-8');
        const etree = et.parse(xml);

        // Find the <base-config> element
        const baseConfig = etree.find('./base-config');
        if (baseConfig) {
            // Create and append the new <certificates> element
            const certificatesElem = et.SubElement(baseConfig, 'certificates');
            certificatesElem.set('src', 'user');
        } else {
            console.warn('Could not find <base-config> element. Skipping update.');
        }

        // Write the modified XML back to the file
        const updatedXml = etree.write({'indent': 4});
        fs.writeFileSync(networkSecurityFile, updatedXml);
        console.log('Updated networkSecurityFile: '+ networkSecurityFile); 
        console.log('Successfully updated network_security_config.xml with <certificates src="user" />');

    } 
    catch (e) {
        console.error(`Error updating network_security_config.xml: ${e.message}`);
        // It's a good practice to exit with an error code if the update fails
        process.exit(1); 
    }

