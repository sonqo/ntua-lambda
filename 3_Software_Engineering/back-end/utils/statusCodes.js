module.exports = {
  // Status code 400 - Bad request
  sc400: response => {
    response.statusMessage = 'Bad request. Parameters are not valid'; // set status message
    response.status(400).end(); // set status code
    console.log('Status code: ', response.statusCode);
    console.log(response.statusMessage);
    return response; // return whole response
  },

  // Status code 401 - Not authorized
  sc401: response => {
    response.statusMessage =
      'Not authorized. You have no permission to perform this action';
    response.status(401).end();
    console.log('Status code: ', response.statusCode);
    console.log(response.statusMessage);
    return response;
  },

  // Status code 402 - Out of quota
  sc402: response => {
    response.statusMessage = 'Out of quota. Time expired';
    response.status(402).end();
    console.log('Status code: ', response.statusCode);
    console.log(response.statusMessage);
    return response;
  },

  // Status code 403 - No data
  sc403: response => {
    response.statusMessage = 'No data. Requested data does not exist';
    response.status(403).end();
    console.log('Status code: ', response.statusCode);
    console.log(response.statusMessage);
    return response;
  },
};