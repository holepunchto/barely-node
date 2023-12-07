/* global Bare */
const Module = require('bare-module')
const path = require('bare-path')
const os = require('bare-os')
const process = require('bare-process')
const repl = require('bare-repl')

global.process = process

const moduleOptions = {
  builtins: {
    module: Module,
    path,
    os,
    process,
    repl,

    assert: require('bare-assert'),
    console: require('bare-console'),
    child_process: require('bare-subprocess'),
    events: require('bare-events'),
    fs: require('bare-fs'),
    'fs/promises': require('bare-fs/promises'),
    inspector: require('bare-inspector'),
    timers: require('bare-timers'),
    tty: require('bare-tty'),
    url: require('bare-url')
  },
  conditions: [
    'import',
    'require',
    'node'
  ]
}

if (Bare.argv.length === 1) {
  repl.start({ require: moduleOptions })
} else {
  Module.load(
    Bare.argv[1] = Module.resolve(
      path.resolve(os.cwd(), Bare.argv[1]),
      moduleOptions
    ),
    moduleOptions
  )
}
