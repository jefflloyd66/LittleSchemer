"use strict";

function log(s) {
    console.log(s);
}

function parse(s) {
    var arr = [];
    var word = '';
    for (let i = 0; i < s.length; i++) {
        let char = s[i];
        if (char === "(") {
            var depth = 1;
            for (let j = i+1; j < s.length; j++) {
                var c = s[j];
                if (c === "(") {
                    depth += 1;
                } else if (c === ")") {
                    depth -= 1;
                }
                if (depth === 0) {
                    arr.push(parse(s.slice(i+1, j)));
                    i = j+1;
                    break;
                }
            }
        } else if (char === ' ') {
            arr.push(word);
            word = '';
        } else {
            word += char;
        }
    }
    if (word > '') {
        arr.push(word);
    }
    return arr;
}

function isAtom(v) {
    var arr = !Array.isArray(v) ? parse(v) : v;
    return (arr.length === 1 && !Array.isArray(arr[0]));
}

function isList(v) {
    var arr = !Array.isArray(v) ? parse(v) : v;
    return arr.length === 1 && Array.isArray(arr[0]);
}

function isExpression(v) {
    var arr = !Array.isArray(v) ? parse(v) : v;
    return isAtom(arr) || isList(arr);
}

function expressionCount(v) {
    var arr = !Array.isArray(v) ? parse(v) : v;
    return arr[0].length;
}

function car(v) {
    log(v);
    var arr = !Array.isArray(v) ? (parse(v))[0] : v;
    log(arr);
    if (!isList(arr)) return undefined;
    log(arr[0])
    return arr[0];
}

log(isAtom("atom") === true);
// log(isAtom("1492 turkey") === false);
// log(isList("(atom)") === true);
// log(isList("(atom turkey or)") === true);
// log(isList("(atom turkey) or") === false);
// log(isList("((atom turkey) or)") === true);
// log(isExpression("(atom turkey or)") === true);
// log(isExpression("(atom turkey) or") === false);
// log(expressionCount("(((how) are) ((you) (doing so)) far)") === 3);
// log(isList("()") === true);
// log(isAtom("()") === false);
// log(isList("(()()())") === true);
// log(expressionCount("(()()())") === 3);
log(car("(a b c)") === 'a');
// log(car("hotdog") === undefined);
// log(car("()") === undefined);
// var c = car("(((hotdogs)) (and) (pickle) relish)");
// log(c);
// log(Array.isArray(c) && Array.isArray(c[0]) && c[0][0] === 'hotdogs');
// log(Array.isArray(car(car("(((hotdogs)) (and))"))));
// log(car(car("(((hotdogs)) and)")))