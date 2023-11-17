cmake_minimum_required(VERSION 3.25)

set(name bare_distributable)

project(
  ${name}
  VERSION 1.0
  LANGUAGES C CXX
)

include(bare)

bare_target(target)

add_subdirectory(vendor/bare EXCLUDE_FROM_ALL)

add_library(${name}_obj OBJECT)

set_target_properties(
  ${name}_obj
  PROPERTIES
  C_STANDARD 99
  CXX_STANDARD 20
  POSITION_INDEPENDENT_CODE ON
)

add_bare_bundle(
  ENTRY src/main.js
  OUT src/main.bundle.h
  IMPORT_MAP package.json
  TARGET c
)

target_sources(
  ${name}_obj
  PRIVATE
    src/main.bundle.h
    src/main.c
)

target_include_directories(
  ${name}_obj
  PUBLIC
    $<TARGET_PROPERTY:bare,INTERFACE_INCLUDE_DIRECTORIES>
)

add_executable(${name}_bin $<TARGET_OBJECTS:${name}_obj>)

set_target_properties(
  ${name}_bin
  PROPERTIES
  ENABLE_EXPORTS ON
  OUTPUT_NAME ${name}
)

target_link_libraries(
  ${name}_bin
  PRIVATE
    $<LINK_LIBRARY:WHOLE_ARCHIVE,bare_static>
)

link_bare_module(
  ${name}_bin
  bare_fs
  node_modules/bare-fs
)

install(
  TARGETS ${name}_bin
  RUNTIME DESTINATION ${target}
)