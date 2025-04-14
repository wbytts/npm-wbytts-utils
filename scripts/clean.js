import fse from 'fs-extra'

async function main() {
  fse.removeSync("./dist")
  fse.removeSync("./lib")
  fse.removeSync("./types")
}

main()
