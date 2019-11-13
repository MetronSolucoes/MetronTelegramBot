const axios = require('axios')
const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NjgxNTU0OTR9.oDgeY2Tbr6eeKStrHG2_t0Y7oCfl_6JBhidCBbn5qzs'

exports.verifySchedules = (request) => {
  let schedules_regex = ['Horário', 'Hora', 'horario', 'hora', 'horários', 'horarios', 'horas', 'Horas',
  'Horários']
  
  var message = request.text

  var contains_schedules = false

  schedules_regex.forEach(function(word) {
    contains_schedules = contains_schedules + message.includes(word)
  })

  if (contains_schedules === 1) {
    return ('Essa fera ai meu')
  }

  return ''
}