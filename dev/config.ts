// tslint:disable:no-implicit-dependencies

import Chalk from 'chalk'
import log   from 'fancy-log'
import meow  from 'meow'
import path  from 'path'

// region - Interfaces

interface IFlags {
  help: boolean
  version: boolean
  base?: string
  development: boolean
  skipNpmCheck: boolean
  port: string
  livereload: string
  backend: string
}

type IBuildPathFn = (...path: string[]) => string

interface IConfig {
  argv: meow.Result<IFlags>
  pkg: any
  base: string
  skipNpmCheck: boolean
  serverPort: number
  apiPrefixes: string[]
  livereloadHost: string
  backendDest: string

  root: IBuildPathFn
  absRoot: IBuildPathFn
  source: IBuildPathFn
  absSource: IBuildPathFn
  building: IBuildPathFn
  absBuilding: IBuildPathFn
  output: IBuildPathFn
  absOutput: IBuildPathFn
  outputByEnv: IBuildPathFn
  absOutputByEnv: IBuildPathFn
}

// endregion

// region - Default constants

const DEFAULT_BASE           = '/'
const DEFAULT_IS_DEVELOPMENT = false
const DEFAULT_PORT           = 8888
const DEFAULT_PREFIX         = ['/api/']
const DEFAULT_PING           = 0
const DEFAULT_LIVERELOAD     = '0.0.0.0'
const DEFAULT_BACKEND        = 'http://127.0.0.1:8899'

const DEFAULT_BUILDING_DIR    = '.building'
const DEFAULT_OUTPUT_DIR      = 'dist'
const DEFAULT_SOURCE_BASE_DIR = 'src'

// endregion

const { blue, green, gray, yellow } = Chalk

// region - Configure Meow
const argv = meow<IFlags>(
  `
    Usage:
      $ npm ${yellow('<task>')} -- ${yellow('<options>')}

    Tasks:
      run serve               start preview server
      start                   alias of "run serve"
      test                    run tests
      run coverage            generate coverage report
      run build               build the source code

    Options:                                                     [${gray('default value')}]
      building:
        -b, --base            base directory of site.            [${green('"/"')}]
      common:
        -h, --help            show this help message
        -d, --development     Set NODE_ENV to "development"      [${yellow('false')}]
        -s, --skip-npm-check
      developing:
        -p, --port            port of preview server             [${blue('8888')}]
        -l, --livereload      the hostname to bind & livereload  [${green('"localhost"')}]
        -e, --backend         destination of backend proxy       [${green('"http://127.0.0.1:8899"')}]

    For more detail of tasks / options, see code in "dev/gulp" directory.
  `,
  {
    flags: {
      base        : { alias: 'b', type: 'string', default: DEFAULT_BASE },
      help        : { alias: 'h', type: 'boolean' },
      version     : { alias: 'v', type: 'boolean' },
      development : { alias: 'd', type: 'boolean', default: DEFAULT_IS_DEVELOPMENT },
      skipNpmCheck: { alias: 's', type: 'boolean' },
      port        : { alias: 'p', default: DEFAULT_PORT },
      livereload  : { alias: 'l', type: 'string', default: DEFAULT_LIVERELOAD },
      backend     : { alias: 'e', type: 'string', default: DEFAULT_BACKEND },
    },
  },
)

// endregion

// region - Main exports

const rootDir     = path.join(__dirname, '..')
const sourceDir   = DEFAULT_SOURCE_BASE_DIR
const buildingDir = DEFAULT_BUILDING_DIR
const outputDir   = DEFAULT_OUTPUT_DIR

const base =
        (argv.flags.base[0] === '/' ? '' : '/')
        + argv.flags.base
        + (argv.flags.base[argv.flags.base.length - 1] === '/' ? '' : '/')

process.env.NODE_ENV  = (argv.flags.development || DEFAULT_IS_DEVELOPMENT) ? 'development' : 'production'
process.env.BABEL_ENV = process.env.NODE_ENV
process.env.VUE_ROUTER_BASE = base

log(`Initializing project in "${rootDir}" for ${process.env.NODE_ENV} environment.`)

const root: IBuildPathFn = (...pathInRoot) => path.join(rootDir, ...pathInRoot)
const absRoot            = root

const source: IBuildPathFn    = (...pathInSource) => path.join(sourceDir, ...pathInSource)
const absSource: IBuildPathFn = (...pathInSource) => root(sourceDir, ...pathInSource)

const building: IBuildPathFn    = (...pathInBuilding) => path.join(buildingDir, ...pathInBuilding)
const absBuilding: IBuildPathFn = (...pathInBuilding) => root(buildingDir, ...pathInBuilding)

const output: IBuildPathFn    = (...pathInOutput) => path.join(outputDir, ...pathInOutput)
const absOutput: IBuildPathFn = (...pathInOutput) => root(outputDir, ...pathInOutput)

const outputByEnv: IBuildPathFn = (...pathInOutput) => {
  const dir = process.env.NODE_ENV === 'production' ? outputDir : buildingDir
  return path.join(dir, ...pathInOutput)
}

const absOutputByEnv: IBuildPathFn = (...pathInOutput) => {
  const dir = process.env.NODE_ENV === 'production' ? outputDir : buildingDir
  return root(dir, ...pathInOutput)
}

const config: IConfig = {
  argv,
  pkg           : argv.pkg || {},
  base,
  skipNpmCheck  : argv.flags.skipNpmCheck,
  serverPort    : parseInt(argv.flags.port, 10),
  apiPrefixes   : DEFAULT_PREFIX,
  livereloadHost: argv.flags.livereload,
  backendDest   : argv.flags.backend,
  root,
  absRoot,
  source,
  absSource,
  building,
  absBuilding,
  output,
  absOutput,
  outputByEnv,
  absOutputByEnv,
}

// endregion

export default config
