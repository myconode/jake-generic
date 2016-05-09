'use strict'

const fs = require('fs')
const path = require('path')

// fs-extensions
// all sychronous

// present()
// simply check if the path exists
// its really telling of the js community that a method like this doesn't exist
//
// @param String - path
// @returns Boolean
fs.present = (_path)=>{
  try{
    fs.accessSync(_path, fs.F_OK)
    return true
  } catch(e) { return false }
}

// check()
// similar to exists, but returns name of the path if it exists
//
// @param String - path
// @returns String
// @raises ReferenceError
fs.check = function(_path){
  try{
    let pcwd = process.cwd()
    let test_path = path.join( pcwd, _path )
    fs.accessSync(test_path, fs.F_OK)
    return _path
  } catch(e) {
    throw new ReferenceError(`${path} does not exist`)
  }
}


// isDir()
// given a path, checks if that directory exists in fs
//
// @param String - path
// @returns Boolean
fs.isDir = function(_path){
  try{
    return fs.lstatSync(_path).isDirectory()
  } catch(e) { return false }
}


module.exports = fs
