#!/bin/bash

cd /var/www/html

ls -la

cp -arp build/. . && rm -rf build

service httpd restart