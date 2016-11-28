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
// @param { String } package name
// @returns { String } path of the binary
// @throws 
function checkExec(bin=null) {
  let result

  if(bin){
    result = spawnSync('command', [ '-v', bin]).status
  }else{
    throw new ReferenceError("No argument provided to checkNpmExec")
    process.exit(1)
  }

  if (result !== 0){
    throw new ReferenceError(`${bin} is not available on your system. 
                             Please install the software on your workstation and try again.`)
    process.exit(1)
  }

  return bin
}

// checkExec()
// check if a binary is available before usage
//
// @param { String } bin - path to npm-installed binary
// @returns { String } path of the binary
function checkNpmExec(bin) {
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
