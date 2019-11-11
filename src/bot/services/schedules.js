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