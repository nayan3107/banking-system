const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/db');

//for security
const mongoSantize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const { PORT, NODE_ENV } = require('./config/config');
//colors for console
require('colors');

//load env variables
dotenv.config({ path: './config/config.env' });

//connect MongoDB
connectDB();

const app = express();

//Dev Logging Middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//init middleware-substitute for body-parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

//sanitize data
app.use(mongoSantize());

//set security headers
app.use(helmet({ contentSecurityPolicy: false }));

//prevent xss attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

//routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', require('./routes/user'));
app.use('/api/v1/transfers', require('./routes/transfer'));

//errorHandler
app.use(require('./middleware/error'));

//Server listening on PORT
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on PORT ${port}`.yellow);
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// done
