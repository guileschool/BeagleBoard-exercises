#!/usr/bin/env node
// Draws boxes around letters
var fs = require('fs');
var util = require('util');
const exec = require('child_process').exec;

var vision  = JSON.parse(fs.readFileSync(process.argv[3]).toString());
var text = vision.textAnnotations;

// console.log(vision.textAnnotations[0].boundingPoly);

// console.log(vision.fullTextAnnotation.pages[0].blocks[0].paragraphs[0].words[0].symbols);

var coordinates = "";
var pages = vision.fullTextAnnotation.pages;
for(var p in pages) {
    // console.log("page[%d] = " + pages[p], p);
    var blocks = pages[p].blocks;
    for(var b in blocks) {
        // console.log("block[%d] = " + blocks[b], b);
        var paragraphs = blocks[b].paragraphs;
        for(var pg in paragraphs) {
            // console.log("paragraph[%d] = " + paragraphs[pg], pg);
            var words = paragraphs[pg].words;
            for(var w in words) {
                // console.log("word[%d] = " + words[w], w);
                var symbols = words[w].symbols;
                for(var s in symbols) {
                    // console.log("symbol[%d] = " + util.inspect(symbols[s]), s);
                    // console.log("text: %s, boundingBox: " + symbols[s].boundingBox, symbols[s].text);
                    var vertices = symbols[s].boundingBox.vertices;
                    var coord = "-draw \"polygon ";
                    for(var j in vertices) {
                        coord += vertices[j].x + ',' + vertices[j].y + ' ';
                    }
                    coordinates += coord + "\" -pointsize 10 -annotate +" + (vertices[0].x+5.0) + "+" + (vertices[0].y+25.0) + " ";
                    coordinates += "'"+symbols[s].text+"' ";
                    // console.log(vertices);
                    // console.log(coordinates);
                }
            }
        }
    }
}

var cmd = "convert " + process.argv[2] + " -fill none -stroke red -strokewidth 1 "
            + coordinates + " frame.jpg";
            
// console.log(cmd);

console.log("Marking boxes");

exec(cmd, function(err, stdout, stderr) {
  if (err) {
    console.err("exec err: " + err);
    return;
  }
  if(stdout) {
    console.log("stdout: " + stdout);
  }
  if(stderr) {
    console.log("stderr: " + stderr);
  }
});