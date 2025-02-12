const express=require('express');
const router=express.Router();
const Person = require('../models/person');
router.post('/', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains person data

        // Create a new Person document
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log('Data saved:', response);

        res.status(200).json(response);
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET method to get the person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; // Extract the work type from the URL parameter
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error'});
        }})

    // To update data
    router.put('/:id', async (req, res) => {
        try {
            const personId = req.params.id; // Extract the id from the URL parameter
            const updatedPersonData = req.body; // Updated data for the person
    
            const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
                new: true, // Return the updated document
                runValidators: true, // Run Mongoose validation
            });
    
if (!response){
return res.status(404).json({error: 'Person not found '});
}

            console.log('data updated');
            res.status(200).json(response);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    

    // To Delete data
    router.delete('/:id', async (req, res) => {
        try {
            const personId = req.params.id; // Extract the person's ID from the URL parameter
    
            // Assuming you have a Person model
            const response = await Person.findByIdAndDelete(personId);
            if (!response) {
                return res.status(404).json({ error: 'Person not found' });
            }
    
            console.log('data delete');
            res.status(200).json({ message: 'Person Deleted Successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

module.exports=router;
