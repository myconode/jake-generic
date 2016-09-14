'use strict';

// method registration
const exports = {
  "checkExec" : checkExec,
  "stdout" : stdout,
  "stderr" : stderr,
  "json_parse" : json_parse,
  "validateSourceJS" : validateSourceJS,
  "validateScript" : validateScript,
  "validateScripts" : validateScripts
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


function validateSourceJS(sourceCode, options, globals, description) {
  description = description ? description + " " : ""
  let pass = jshint(sourceCode, options, globals)
  if (pass) { console.log(description + "ok") }
  else {
    console.log(description + "failed")
    jshint.errors.forEach(function(error) {
      console.log(error.line + ": " + error.evidence.trim())
      console.log("   " + error.reason)
    })
  }

  return pass
}

function validateScript(filename, options, globals) {
  let sourceCode = fs.readFileSync(filename, "utf8")
  return validateSourceJS(sourceCode, options, globals, filename)
}

function validateScripts(fileList, options, globals) {
  let pass = true
  fileList.forEach(function(filename) {
    pass = validateScript(filename, options, globals) && pass
  })
  return pass
}

module.exports = exports
