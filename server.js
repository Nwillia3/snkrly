const express = require('express')
const app = express()
const path = require('path')
const connectDB = require('./config/db')

//import Routes
const brandList = require('./routes/brandlist')
const snkrs = require('./routes/snkrs')
//Test Mode Routes
const testbrandList = require('./routes/test/testBrandList')
const testsnkrs = require('./routes/test/testSnkrs')

//initialize Db
connectDB()


//initialize middlware
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/snkrs', snkrs)
app.use('/api/brands', brandList)

// Test mode routes
app.use('/api/test/snkrs', testsnkrs)
app.use('/api/test/brandlist', testbrandList)


// serve static assets in production
 if (process.env.NODE_ENV === 'production') {
      // set static folder
      app.use(express.static('client/build '))

      app.get("*", (req,res)=> {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
      })
 }


const PORT = process.env.PORT|| 5000

app.listen(PORT, () => `listening on port ${5000}`)