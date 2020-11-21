import criteriasData from '../assets/data/bundledCriteriasData.json'
import alertsData from '../assets/data/bundledAlertsData.json'

export const getCriteriasData = function () {
  return Promise.resolve(criteriasData)
}

export const getAlertsData = function () {
  return Promise.resolve(alertsData)
}
