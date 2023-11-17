/* global Bare */
const Module = require('bare-module')
const path = require('bare-path')
const os = require('bare-os')
const process = require('bare-process')
const pkg = require('../package.json')

global.process = process

if (Bare.argv.length === 1) {
  require('bare-repl').start()
} else {
  const imports = pkg.imports

  Module.load(
    Bare.argv[1] = Module.resolve(
      path.resolve(os.cwd(), Bare.argv[1]),
      { imports }
    ),
    { imports }
  )
}
