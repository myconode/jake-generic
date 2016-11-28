/* jshint mocha:true */

'use strict'

const utils = require('../utils.js')
const expect = require('chai').expect
const maxTimePerSpec = 5000

describe('simple test', function() {
  this.timeout( maxTimePerSpec )

  it('should be self evident', function() {
    expect(1).to.equal(1)
  })
})
