const express = require('express');
const app = require('./middleware'); 
const userRoutes = require('./routes/userRoutes'); 

const PORT = process.env.PORT || 3009;

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
