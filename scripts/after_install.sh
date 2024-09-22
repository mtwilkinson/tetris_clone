#!/bin/bash

cd /home/ec2-user/tetris_clone_deploy
cp -arp dist /home/ec2-user/tetris_clone/
cp -arp dist-backend /home/ec2-user/tetris_clone/

ls -la

sudo systemctl restart myapp.service

sudo systemctl restart myapp-backend.service