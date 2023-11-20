cmake_minimum_required(VERSION 3.25)

project(bare_compat C)

include(bare)

bare_target(target)

add_subdirectory(vendor/bare EXCLUDE_FROM_ALL)

add_library(bare_compat_obj OBJECT)

set_target_properties(
  bare_compat_obj
  PROPERTIES
  C_STANDARD 11
  POSITION_INDEPENDENT_CODE ON
)

add_bare_bundle(
  ENTRY src/main.js
  OUT src/main.bundle.h
  IMPORT_MAP import-map.json
  TARGET c
)

target_sources(
  bare_compat_obj
  PRIVATE
    src/main.bundle.h
    src/main.c
)

target_include_directories(
  bare_compat_obj
  PUBLIC
    $<TARGET_PROPERTY:bare,INTERFACE_INCLUDE_DIRECTORIES>
)

add_executable(bare_compat_bin $<TARGET_OBJECTS:bare_compat_obj>)

set_target_properties(
  bare_compat_bin
  PROPERTIES
  ENABLE_EXPORTS ON
  OUTPUT_NAME node
)

target_link_libraries(
  bare_compat_bin
  PRIVATE
    $<LINK_LIBRARY:WHOLE_ARCHIVE,bare_static>
)

link_bare_module(
  bare_compat_bin
  bare_buffer
  node_modules/bare-buffer
)

link_bare_module(
  bare_compat_bin
  bare_env
  node_modules/bare-env
)

link_bare_module(
  bare_compat_bin
  bare_fs
  node_modules/bare-fs
)

link_bare_module(
  bare_compat_bin
  bare_hrtime
  node_modules/bare-hrtime
)

link_bare_module(
  bare_compat_bin
  bare_module
  node_modules/bare-module
)

link_bare_module(
  bare_compat_bin
  bare_os
  node_modules/bare-os
)

link_bare_module(
  bare_compat_bin
  bare_pipe
  node_modules/bare-pipe
)

link_bare_module(
  bare_compat_bin
  bare_repl
  node_modules/bare-repl
)

link_bare_module(
  bare_compat_bin
  bare_tty
  node_modules/bare-tty
)
