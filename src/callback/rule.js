const fs = require("fs");

function readJSON(filename, callback) {
  fs.readFile(filename, "utf8", (err, data) => {
    let parsed;
    if (err)
      //propagate the error and exit the current function
      return callback(err);

    try {
      //parse the file contents
      parsed = JSON.parse(data);
    } catch (err) {
      //catch parsing errors
      return callback(err);
    }
    //no errors, propagate just the data
    callback(null, parsed);
  });
}

function cb(err, data) {
  if (err) {
    return console.error("err", err);
  }

  console.log(data);
}

function readJSONThrows(filename, callback) {
  fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }
    return callback(null, JSON.parse(data));
  });
}

// readJSON("../../file/valid_json.json", cb);
// readJSON("../../file/a.txt", cb);
readJSONThrows("../../file/a.txt", (err) => console.log("err", err));

process.on("uncaughtException", (err) => {
  console.error("This will catch at last the " + " JSON parsing exception: " + err.message);
  process.exit(1);
});
