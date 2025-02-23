// const express = require('express');
// const app = express();
// const db = require('./db'); // Ensure db connection is properly set up
// const bodyParser = require('body-parser');
// const Person = require('./models/person');
// const MenuItem= require('./models/MenuItem');


// app.use(bodyParser.json()); // Middleware for parsing JSON request bodies

// app.get('/', (req, res) => {
//     res.send('Welcome to my hotel... How can I help you? We have a list of menu items.');
// });

// // POST route to add a person
// app.post('/person', async (req, res) => {
//     try {
//         const data = req.body; // Assuming the request body contains person data

//         // Create a new Person document
//         const newPerson = new Person(data);

//         // Save the new person to the database
//         const response = await newPerson.save();
//         console.log('Data saved:', response);

//         res.status(200).json(response);
//     } catch (err) {
//         console.error('Error saving data:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// // Get method to get the person
// app.get('./person', async(req,res)=>{
//     try{
// const data = await Person.find();
// console.log('Data fetched');
// res.status(200).json(data);
//     }catch(err){
//  console.error('Error saving data:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//     }
// })

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });


// const express = require('express');
// const app = express();
// const db = require('./db'); // Ensure db connection is properly set up
// require('dotenv').config();


// const bodyParser = require('body-parser');
// app.use(bodyParser.json()); // Middleware for parsing JSON request bodies
// const PORT = process.env.PORT || 3000;

// const passport = require('passport');
// const Person=require('./models/person');
// const localStrategy = require('passport-local').Strategy;


// const logRequest = (req, res, next) => {
//     console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
//     next();
// };


// app.use(logRequest);

// passport.use(new localStrategy(async(USERNAME,password,done)=>{
//     // authencation logic
//     try{
// console.log('Recived credentials',USERNAME,password);
// const user= await Person.findOne({username:USERNAME});
    
// if(!user)
//     return done(null,false,{ message:'Incorrect username.' });

// const isPasswordMatch= user.password === password ? true : false;
// if(isPasswordMatch){
//     return done(null,user);
// }else{
//     return done(null,false,{message:'Incorrect Password'});
//   }  
// }catch(err){
//     return done(err);
// }

// }))

// app.use(passport.initialize());

// const localAuthMiddleware = passport.authenticate('local',{session:false})
// app.get('/', localAuthMiddleware, function(req, res) {
//     res.send('Welcome to my hotel... How can I help you?');
// });

// const personRoutes=require('./routes/personRoutes')
// const menuItemRoutes = require('./routes/menuItemRoutes');
// // const Person = require('./models/person');

// app.use('/person',localAuthMiddleware,personRoutes);
// app.use('/menu', localAuthMiddleware,menuItemRoutes);


// app.listen(PORT, () => {
//     console.log('Server is running on port 3000');
// });


const express = require('express');
const app = express();
const db = require('./db'); // Ensure db connection is properly set up
require('dotenv').config();
const passport = require('./auth');
const bodyParser = require('body-parser');

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // Middleware for parsing JSON request bodies


const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
    next();
};

app.use(logRequest);
app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false})

app.get('/signup', function(req, res) {
    res.send('Welcome to my hotel... How can I help you?');
});

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
