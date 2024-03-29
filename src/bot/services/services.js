const axios = require('axios')
const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NjgxNTU0OTR9.oDgeY2Tbr6eeKStrHG2_t0Y7oCfl_6JBhidCBbn5qzs'
const dirty = require('dirty')
const db = dirty('user.db')

const services_regex = ['SERVIÇO', 'SERVICO', 'SERVIÇOS', 'SERVICOS']

exports.chooseService = async (request) => {
  var message = request.text.toUpperCase()

  var contains_choose = false
  var contain_service = false
  var selectedService = ''
  var selectedObject = ''

  var services = await getServices()

  services.forEach((service) => {
    if (contain_service === 1) return

    if (message.endsWith(service.id.toString())) {
      contain_service = 1
      selectedObject = service
      selectedService = `Você selecionou o serviço de Nº ${service.id} - ${service.name} \n
Agora digite o dia que deseja realizar o serviço no formato dd/mm/YYYY, Por exemplo: 'Horarios do dia 01/01/2001'`  
    }
  })

  services_regex.forEach(function(word) {
    if (contains_choose === 1) return
    contains_choose = contains_choose + message.includes(word)
  })

  if (contains_choose === 1 && contain_service === 1) {
    db.set('service', { selected: selectedObject })
    return selectedService
  }
  return ''
}

exports.verifyServices = async (request) => {
  
  var message = request.text.toUpperCase()

  var contains_services = false

  services_regex.forEach(function(word) {
    if (contains_services === 1) return
    contains_services = contains_services + message.includes(word)
  })

  if (contains_services === 1) {
    var services = 'Estes são os serviços disponíveis: \n'
    
    services = await getServices().then(response => {
      response.forEach(function(service) {
        services = services + service.id + '- ' + service.name + '\n'
      })
      return services 
    })

    return services + 'Para escolher um serviço digete: Quero realizar o serviço Nº do serviço'
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
