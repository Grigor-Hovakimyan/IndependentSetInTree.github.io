'use strict';

function maxIndependentSets(x) {
    document.getElementById('number').innerText=x;
    if (+x === 0) {
        document.getElementById('indSet').innerText = 1;
    } else if (+x % 2 === 0) {
        var y = (+x / 2) - 1;
        document.getElementById('indSet').innerText = Math.pow(2, y) + 1;
    } else if (+x % 2 === 1) {
        var z = (+x - 1) / 2;
        document.getElementById('indSet').innerText = Math.pow(2, z);
    }
    generalSolution();
}

var vertexSet = {};
var edgesSet = [];
var edgesCopy = [];
var solutEnd = [];
var cover = [];

function edges() {

    var origin = document.getElementById('origin');
    var endPoint = document.getElementById('endPoint');
    if (origin.value.length === 1 && endPoint.value.length === 1) {
        var edg = [];
        var edgCopy = [];
        edg.push(origin.value, endPoint.value);
        edgCopy.push(origin.value, endPoint.value);
        edgesSet.push(edg);
        edgesCopy.push(edgCopy);
        vertexSet[origin.value] = 0;
        vertexSet[endPoint.value] = 0;
        origin.removeAttribute('id');
        endPoint.removeAttribute('id');
        var ver = document.createElement('input');
        var ver1 = document.createElement('input');
        var br = document.createElement('br');
        ver.id = 'origin';
        ver1.id = 'endPoint';
        document.getElementsByTagName('form')[0].appendChild(ver);
        document.getElementsByTagName('form')[0].appendChild(ver1);
        document.getElementsByTagName('form')[0].appendChild(br);
    }
}

var k = 0;

function solution() {
    edges();
    if (document.getElementById('origin').value==='' && document.getElementById('endPoint').value==='') {
        document.getElementById('origin').style.display = 'none';
        document.getElementById('endPoint').style.display = 'none';
    }
    var i, j;
    var vertex = Object.keys(vertexSet)[k];
    var edgesSetLength = edgesSet.length;
    for (i = 0; i < edgesSetLength; i++) {
        for (j = 0; j < edgesSet[i].length; j++) {
            if (edgesSet[i][j] === vertex) {
                vertexSet[Object.keys(vertexSet)[k]]++;
                edgesSet[i].splice(j, j + 1);
            }
        }
    }
    k++;
    if (k <= Object.keys(vertexSet).length) {
        solution();
    } else {
        maxIndependentSets(Object.keys(vertexSet).length);
    }
}

function generalSolution() {
    if (Object.keys(vertexSet).length > 0) {
        var keys = Object.keys(vertexSet),
            res = keys[0];
        keys.forEach(function (v) {
            res = +vertexSet[res] > +vertexSet[v] ? v : res;
        });
        var edgesCopyLength = edgesCopy.length;
        delete vertexSet[res];
        solutEnd.push(res);
        for (var i = 0; i < edgesCopyLength; i++) {
            for (var j = 0; j < edgesCopy[i].length; j++) {
                if (edgesCopy[i][j] === res) {
                    if (edgesCopy[i].length === 1) {
                        edgesCopy[i] = '';
                    }
                    if (edgesCopy[i].length === 2) {
                        if (j === 0) {
                            delete vertexSet[edgesCopy[i][j + 1]];
                            cover.push(edgesCopy[i][j + 1]);
                        } else if (j === 1) {
                            delete vertexSet[edgesCopy[i][j - 1]];
                            cover.push(edgesCopy[i][j - 1]);
                        }

                    }
                }
            }
        }
    generalSolution();
}
for (var g=0;g<cover.length;g++){
    for (var p=g+1;p<cover.length;p++){
        if (cover[g]===cover[p]){
           cover[g]='';
           console.log(cover);
        }
    }
}
    var coverOne=[];
for (var b=0;b<cover.length;b++){
    if(cover[b]!==''){
        coverOne.push(cover[b]);
    }
}
coverOne.toString();
solutEnd.toString();
document.getElementById('indSetEnd').innerHTML = '{' + solutEnd + '}';
document.getElementById('cover').innerHTML = '{' + coverOne + '}';
console.log(vertexSet);
}
