const TeleBot = require('telebot')
const Metron = new TeleBot('806036577:AAHpC502B_acOm65-B2l-SXmtWecdzaZqIc')
const Presentations = require('./src/bot/services/presentations')
const Services = require('./src/bot/services/services')
const Schedules = require('./src/bot/services/schedules')

Metron.start()

Metron.on('text', async (msg) => {
    var message = msg.text

    let contains_list_hours = false

    let message_return = false

    var hours_message = ''

    var presentation_message = await Presentations.verifyPresentations(msg)

    if (presentation_message !== '') { message_return = true }
    
    async function getServices() {
        return await Services.verifyServices(msg)
    }

    services_message = await getServices().then(response => {
        return response
    })

    var services_select = await Services.chooseService(msg).then(response => {
        return response
    })

    var disponible_schedule = await Schedules.verifySchedules(msg)
 
    if (disponible_schedule !== '') return msg.reply.text(disponible_schedule)

    if (services_select !== '') return msg.reply.text(services_select)

    if (services_message !== '') { message_return = true }

    if (message_return === true) { return msg.reply.text(presentation_message + services_message + hours_message) }

    msg.reply.text('Desculpe não entendi')
})



Metron.on(['/start', '/hello'], (msg) => msg.reply.text(
    `Olá ${msg.from.first_name}, bem vindo ao Metron`))

