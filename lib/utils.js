import _ from 'ramda'
import fs from 'fs'
import Future from 'fluture'
import yaml from 'js-yaml'

/**
 * `readFileM :: Path -> Options -> Future e Buffer`
 *
 * ps. "Path" and "Options" are from fs.readFile
 */
export const readFileM = Future.encaseN2(fs.readFile)

/** `parseYaml :: String -> Future YAMLException Object` */
export const parseYaml = s =>
  Future.encase(yaml.safeLoad, s)
  .mapRej(_.assoc('message', 'Compose file corrupted!'))

/** `loadComposeConfig :: String -> Future e Object` */
export const loadComposeConfig = composePath =>
  readFileM(composePath, 'utf8')
  .mapRej(_.assoc('message', 'Compose file not found!'))
  .chain(parseYaml)
