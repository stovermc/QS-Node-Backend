
app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'

app.get('/', function(request, response) {
  response.send('Welcome to Quantified Self.')
})

app.listen(app.get('port'), function() {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
