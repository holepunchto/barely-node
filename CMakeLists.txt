cmake_minimum_required(VERSION 3.25)

project(barely C)

include(bare)

bare_target(target)

add_subdirectory(vendor/bare EXCLUDE_FROM_ALL)

add_library(barely_obj OBJECT)

set_target_properties(
  barely_obj
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
  barely_obj
  PRIVATE
    src/main.bundle.h
    src/main.c
)

target_include_directories(
  barely_obj
  PUBLIC
    $<TARGET_PROPERTY:bare,INTERFACE_INCLUDE_DIRECTORIES>
)

add_executable(barely_bin $<TARGET_OBJECTS:barely_obj>)

set_target_properties(
  barely_bin
  PROPERTIES
  ENABLE_EXPORTS ON
  OUTPUT_NAME barely
)

target_link_libraries(
  barely_bin
  PRIVATE
    $<LINK_LIBRARY:WHOLE_ARCHIVE,bare_static>
)

link_bare_module(barely_bin bare_buffer bare-buffer)

link_bare_module(barely_bin bare_fs bare-fs)

link_bare_module(barely_bin bare_hrtime bare-hrtime)

link_bare_module(barely_bin bare_inspector bare-inspector)

link_bare_module(barely_bin bare_module bare-module)

link_bare_module(barely_bin bare_os bare-os)

link_bare_module(barely_bin bare_pipe bare-pipe)

link_bare_module(barely_bin bare_repl bare-repl)

link_bare_module(barely_bin bare_subprocess bare-subprocess)

link_bare_module(barely_bin bare_timers bare-timers)

link_bare_module(barely_bin bare_tty bare-tty)
