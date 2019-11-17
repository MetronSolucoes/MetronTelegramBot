const axios = require('axios')
const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NjgxNTU0OTR9.oDgeY2Tbr6eeKStrHG2_t0Y7oCfl_6JBhidCBbn5qzs'
const dirty = require('dirty')
const db = dirty('user.db')

exports.verifyPresentations = async (request) => {
  var presentations = ['Olá', 'ola', 'Ola', 'olá',
  'oie', 'eae', 'Eae', 'Opa', 'Oi', 'oi', 'oii', 'Como vai?', 'Preciso de ajuda', 'ajuda', 'Ajuda']
  
  var message = request.text

  var contains_presentations = false

  presentations.forEach(function(word) {
    if (contains_presentations === 1) return
    contains_presentations = contains_presentations + message.includes(word)
  })

  if (contains_presentations === 1) {
    var company = await getCompany()
    
    return presentation_message = (`Olá ${request.from.first_name}, sou o Metron, seu assistente pessoal
    do estabelecimento ${company.name}. \n
    Eu poderei te ajudar com: \n
    - Listagem de serviços, digite o comando: Liste os serviços`)
  }

  return ''
}

async function getCompany() {
  response = await axios.get('https://metron-v1.herokuapp.com/api/v1/companies',
  { headers: { Authorization: auth_token } }).then(response => {
    return response.data
  })

  return response
}