const express=require('express');
const router=express.Router();
const MenuItem = require('../models/MenuItem');


router.post('/', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains menu item data

        // Create a new MenuItem document
        const newMenuItem = new MenuItem(data);

        // Save the new menu item to the database
        const response = await newMenuItem.save();
        console.log('Menu item saved:', response);

        res.status(200).json(response);
    } catch (err) {
        console.error('Error saving menu item:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET method to get the menu items
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('Menu items fetched');
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching menu items:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:taste', async (req, res) => {
    try{
        const taste = req.params.taste; // Extract the work type from the URL parameter
        if (taste == 'sweet' || taste == 'sour' || taste == 'spicy') {
            const response = await MenuItem.find({ taste:taste });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error'});
        }})

   
   
    router.put('/:id', async (req, res) => {
        try {
            const taste = req.params.id; // Extract the id from the URL parameter
            const updatedMenuData = req.body; // Updated data for the person
    
            const response = await MenuItem.findByIdAndUpdate(taste, updatedMenuData, {
                new: true, // Return the updated document
                runValidators: true, // Run Mongoose validation
            });
    
if (!response){
return res.status(404).json({error: 'item not found '});
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
            const taste = req.params.id; // Extract the person's ID from the URL parameter
    
            // Assuming you have a Person model
            const response = await MenuItem.findByIdAndDelete(taste);
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