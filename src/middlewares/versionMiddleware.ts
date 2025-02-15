
// Middleware for API versioning
export const versionMiddleware = (req, res, next) => {
  // Extract version from request URL  
  const version = req.originalUrl.split('/')[1];  
  req.version = version;
  next();
};

// Middleware to handle specific version requests
export const v1Middleware = (req, res, next) => {    
    if (req.version === 'v1') {
      console.log('Using API version 1');
      next();
    } else {
      res.status(400).send({ message: 'Unsupported API version' });
    }
  };
  
export const v2Middleware = (req, res, next) => {
    if (req.version === 'v2') {
      console.log('Using API version 2');
      next();
    } else {
      res.status(400).send({ message: 'Unsupported API version' });
    }
  };