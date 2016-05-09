/* jshint mocha:true */

'use strict'

const expect = require('chai').expect
const maxTimePerSpec = 10000

describe('simple test', function() {
  this.timeout( maxTimePerSpec )

  it('should be self evident', function() {
    expect(1).to.equal(1)
  })
})
