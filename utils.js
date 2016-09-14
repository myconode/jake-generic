'use strict'

const fs = require('fs')
const path = require('path')
const spawnSync = require('child_process').spawnSync

// method registration for function exports
const utils = {
  "checkExec" : checkExec,
  "stdout" : stdout,
  "stderr" : stderr,
  "json_parse" : json_parse
}



// checkExec()
// check if a binary is available before usage
//
// @param { String } bin - path to npm-installed binary
// @param { String } software - name of software that's being checked
// @returns { String } path of the binary
function checkExec(bin) {
  let software = path.basename(bin)
  let result = spawnSync("command", [ "-v", bin]).status

  if (result !== 0){
    console.error(`${software} is not available at ${bin}`)
    process.exit(1)
  }

  return bin
}


// buffer to string conversions
function stdout(buffer){
  console.log(buffer.toString('utf-8'))
}

function stderr(buffer){
  console.error(buffer.toString('utf-8'))
}


// @param { String } file - absolute path to JSON document
// @returns { Object } - deserialized JSON object
function json_parse(file){
  return JSON.parse(fs.readFileSync(file), "utf8")
}


module.exports = utils
