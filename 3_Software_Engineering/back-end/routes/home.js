const express = require('express');
const router = express.Router(); // initialize express Router



router.get('/',(req,res) => {
        
    res.send('Energy market app');
        
}); 



module.exports = router;