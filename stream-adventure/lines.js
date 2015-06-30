#!/usr/bin/env node

var fs=require('fs');
var through = require('through2');
var count = 0;

var split = require('split');
process.stdin
    .pipe(split())
    .pipe(through(function(line, _, next) {
        if(count++%2){
            this.push(line.toString().toUpperCase() + '\n');
        } else {
            this.push(line.toString().toLowerCase() + '\n');
        }
        next();
    }))
    .pipe(process.stdout);
