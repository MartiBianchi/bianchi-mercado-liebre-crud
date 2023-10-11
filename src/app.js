const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// Express
const app = express()

// Middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

// view engine setup
app.set('view engine', 'ejs')
app.set('views', __dirname + '/' + 'views')

// Routes systems require and use
const mainRouter = require('./routes/main')

app.use('/', mainRouter)

// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)))

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.path = req.path
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// PORT
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`El server está corriendo en http://localhost:${PORT}`)
})
