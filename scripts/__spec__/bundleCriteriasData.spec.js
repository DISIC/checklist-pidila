const childProcess = require('child_process')
const fs = require('fs')

const RESULT_JSON_FILE_PATH = './scripts/__spec__/bundledCriteriasData.json'
const EXPECTED_JSON_FILE_PATH = './scripts/__spec__/fixtures/expectedCriteriasData.json'
const SCRIPT_FILE_PATH = './scripts/bundleCriteriasData.js'

describe('scripts | BundleCriteriasData', () => {

  beforeEach(() => {
    childProcess.execSync(`node ${SCRIPT_FILE_PATH} --test`)
  })

  afterEach(() => {
    fs.unlinkSync(RESULT_JSON_FILE_PATH)
  })

  it('should write a in a file the correct information', () => {
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
