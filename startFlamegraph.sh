#!/bin/sh
sudo perf record -a -F 99 -g -p $1