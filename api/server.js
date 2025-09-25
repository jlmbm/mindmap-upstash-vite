require('dotenv').config()
const express = require('express')
const cors = require('cors')

const signupHandler = require('./signup')
const loginHandler = require('./login')
const saveNoteHandler = require('./saveNote')
const saveMindmapHandler = require('./saveMindmap')
const getDataHandler = require('./getData')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/signup', signupHandler)
app.post('/login', loginHandler)
app.post('/saveNote', saveNoteHandler)
app.post('/saveMindmap', saveMindmapHandler)
app.get('/getData', getDataHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Backend running on http://0.0.0.0:${PORT}`))
