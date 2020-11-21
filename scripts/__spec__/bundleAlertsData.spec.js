const childProcess = require('child_process')
const fs = require('fs')

const RESULT_JSON_FILE_PATH = './scripts/__spec__/bundledAlertsData.json'
const EXPECTED_JSON_FILE_PATH = './scripts/__spec__/fixtures/expectedAlertsData.json'
const SCRIPT_FILE_PATH = './scripts/bundleAlertsData.js'

describe('scripts | BundleAlertsData', () => {

  beforeEach(() => {
    childProcess.execSync(`node ${SCRIPT_FILE_PATH} --test`)
  })

  afterEach(() => {
    fs.unlinkSync(RESULT_JSON_FILE_PATH)
  })

  it('should write a in a file the correct alerts information', () => {
    // given
    const expectedFileAsString = fs.readFileSync(EXPECTED_JSON_FILE_PATH).toString()
    const expectedObject = JSON.parse(expectedFileAsString)

    // when
    const fileContentAsString = fs.readFileSync(RESULT_JSON_FILE_PATH).toString()
    const resultObject = JSON.parse(fileContentAsString)

    // then
    expect(resultObject).toEqual(expectedObject)
  })
})
