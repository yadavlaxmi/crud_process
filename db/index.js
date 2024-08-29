
const express = require('express');
const app = require('./middleware'); 
const userRoutes = require('../routes/userRoutes');



app.use('/api', userRoutes);



const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



