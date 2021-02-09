"use strict";

const fs = require("fs");
const cache = {};

function inconsistentRead(filename, callback) {
  if (cache[filename]) {
    // 지연 실행
    process.nextTick(() => callback(cache[filename]));
  } else {
    // 비동기 함수
    fs.readFile(filename, "utf8", (err, data) => {
      cache[filename] = data;
      callback(data);
    });
  }
}
const createFileReader = (filename) => {
  const listeners = [];
  inconsistentRead(filename, (value) => {
    listeners.forEach((listener) => listener(value));
  });
  return {
    onDataReady: (listener) => listeners.push(listener),
  };
};
const reader1 = createFileReader("../../file/a.txt");

reader1.onDataReady((data) => {
  console.log("First call data: " + data);

  // ...sometime later we try to read again from
  // the same file
  const reader2 = createFileReader("../../file/a.txt");
  reader2.onDataReady((data) => {
    console.log("Second call data: " + data);
  });
});
