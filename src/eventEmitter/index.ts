import { EventEmitter } from "events";
import fs from "fs";
export const simpleExample = () => {
  const myEmitter = new EventEmitter();

  myEmitter.on("someEvent", function (msg) {
    console.log(msg);
  });

  myEmitter.emit("someEvent", "test event");
};

// 관찰자 패턴 p.75

export const findPattern = (files: any, regex: any): EventEmitter => {
  const emitter = new EventEmitter();
  files.forEach((file: any) => {
    fs.readFile(file, "utf8", (err, content) => {
      if (err) {
        return emitter.emit("error", err);
      }
      emitter.emit("fileread", file);
      let match;
      if ((match = content.match(regex)))
        match.forEach((ele) => emitter.emit("found", file, ele));
    });
  });
  return emitter;
};

export class FindPattern extends EventEmitter {
  regex: any;
  files: any;
  constructor(regex: any) {
    super();
    this.regex = regex;
    this.files = [];
  }
  addFile(file: any) {
    this.files.push(file);
    return this;
  }
  find() {
    this.files.forEach((file: any) => {
      fs.readFile(file, "utf8", (err, content) => {
        if (err) {
          return this.emit("error", err);
        }
        this.emit("fileread", file);

        let match = null;
        if ((match = content.match(this.regex))) {
          match.forEach((ele) => this.emit("found", file, ele));
        }
      });
    });
    return this;
  }
}

export class SyncEmit extends EventEmitter {
  constructor() {
    super();
    this.emit("ready");
  }
}
