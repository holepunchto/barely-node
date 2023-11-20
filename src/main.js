/* global Bare */
const Module = require('bare-module')
const path = require('bare-path')
const os = require('bare-os')
const process = require('bare-process')
const repl = require('bare-repl')

global.process = process

const builtins = {
  module: Module,
  path,
  os,
  process,
  repl,

  assert: require('bare-assert'),
  console: require('bare-console'),
  events: require('bare-events'),
  fs: require('bare-fs'),
  tty: require('bare-tty'),
  url: require('bare-url')
}

if (Bare.argv.length === 1) {
  repl.start()
} else {
  Module.load(
    Bare.argv[1] = Module.resolve(
      path.resolve(os.cwd(), Bare.argv[1]),
      { builtins }
    ),
    { builtins }
  )
}
