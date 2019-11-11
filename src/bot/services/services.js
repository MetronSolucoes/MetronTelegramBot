const axios = require('axios')
const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NjgxNTU0OTR9.oDgeY2Tbr6eeKStrHG2_t0Y7oCfl_6JBhidCBbn5qzs'

exports.verifyServices = async (request) => {
  let services_regex = ['Serviço', 'Serviços', 'servico', 'serviços', 'Servico',
  'serviço']
  
  var message = request.text

  var contains_services = false

  services_regex.forEach(function(word) {
    contains_services = contains_services + message.includes(word)
  })

  if (contains_services === 1) {
    var services = 'Estes são os serviços disponíveis: \n'
    
    services = await getServices().then(response => {
      response.forEach(function(service) {
        services = services + service.name + '\n'
      })
      return services
    })

    return services
  }

  return ''
}

async function getServices () {
  response = await axios.get('https://metron-v1.herokuapp.com/api/v1/services',
            { headers: { Authorization: auth_token } }).then(response => {
              return response.data
            })

  return response
}
