import { simpleExample, FindPattern, SyncEmit } from "./eventEmitter/index";
import { findPattern } from "./eventEmitter/index";

// simpleExample();

const a: string = "./src/file/a.txt";
const b: string = "./src/file/b.txt";

// findPattern([a, b], /hello \w+/g)
//   .on("fileread", (file) => console.log(file + " was read"))
//   .on("found", (file, match) =>
//     console.log("matched '" + match + "' in file" + file)
//   )
//   .on("error", (err) => console.log("Error emitted:" + err.message));

// const findPatternObject = new FindPattern(/hello \w+/g);

// findPatternObject
//   .addFile(a)
//   .addFile(b)
//   .find()
//   .on("found", (file, match) =>
//     console.log(`Matched "${match}" in file ${file}`)
//   )
//   .on("error", (err) => console.log(`Error emitted ${err.message}`));

// emit이 먼저 class에서 선언되고 on(listener를 등록)이 호출 된다.
const syncEmit = new SyncEmit();
syncEmit.on("ready", () => console.log("Object is ready to be used"));
