const axios = require('axios')
const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NjgxNTU0OTR9.oDgeY2Tbr6eeKStrHG2_t0Y7oCfl_6JBhidCBbn5qzs'
const dirty = require('dirty')
const db = dirty('user.db')

exports.verifySchedules = async (request) => {
  
  if (db.get('service') !== undefined) {

    var message = request.text

    var splited = message.split(' ')
    var date = splited[splited.length - 1]

    if (date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)) {

      var m = date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
      var parsedDate = new Date(m[3], m[2] - 1, m[1])

      var params = {
        initial_check: parsedDate,
        final_check: await sumHours(parsedDate, db.get('service').selected.duration)
      }

      response = await getSchedules(params)
 
      return response.length > 0 ? response : 'Este horário não está disponível'
    }
  } else {
    return ''
  }
}

async function getSchedules (params) {
  response = await axios.post('https://metron-v1.herokuapp.com/api/v1/schedulings/available_times', params,
            { headers: { Authorization: auth_token } }).then(response => {
              return response.data
            })
  return response
}

async function sumHours (time, minutes) {
  return time + (minutes * 60 * 1000)
}