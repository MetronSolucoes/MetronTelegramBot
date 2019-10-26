exports.verifyPresentations = (request) => {
  var presentations = ['Olá', 'ola', 'Ola', 'olá',
  'oie', 'eae', 'Eae', 'Opa', 'Oi', 'oi', 'oii', 'Como vai?', 'Preciso de ajuda']
  
  var message = request.text

  var contains_presentations = false

  presentations.forEach(function(word) {
    contains_presentations = contains_presentations + message.includes(word)
  })

  if (contains_presentations === 1) {
    return presentation_message = (`Olá ${request.from.first_name}, sou o Metron, seu assistente pessoal
    da BarberCorte`)
  }

  return ''
}