'use strict'

// General libraries
const fs = require('./jake/fs_ext.js')
const path = require('path')

// Jake Utilities
const utils = require('./utils.js')

// App config
const app_config = require('./config.js')
// require func with custom errors???
//
// const app_dir  = fs.check( app_config.dir )
// const spec_dir = fs.check( app_config.spec )


// Tasks
task('default', ()=>
  console.log("This is an example Jakefile")
)

// Lint
const jshint = require('jshint')

namespace('lint', ()=>{
  // minimal project-specific config
  let jshint_config= {
    "app": {
      "browser": true
    },

    "spec": {
      "asi": true,
      "esversion": 6,
      "browser": true
    }
  }

  desc('scripts')
  task('scripts', ()=>{
    // lint app & test scripts

    // do not link scripts that contain the text `.min`
    // jshint( app_dir ,  )
  })
})

// Test
const Mocha = require('mocha')

desc('Run Tests')
task('test', ()=> {
  // https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
  let mocha = new Mocha()

  if ( spec_dir ){
    fs.readdirSync( spec_dir ).filter( (file)=>{
      // Only return scripts
      return file.substr(-3) === '.js';
    }).forEach( (file)=> mocha.addFile( path.join( spec_dir, file ) ) )

    mocha.run( (failures)=>{
      process.on('exit', ()=> process.exit( failures ) )
    })
  }else{
    console.log('No tests found...')
    proces.exit(0)
  }
})
