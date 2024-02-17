const app = require('./configs/app.js');
require('dotenv').config();
require('./database/mongo');

const port = process.env.PORT || 3000;

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
