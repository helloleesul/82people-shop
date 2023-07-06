const errorHandler = (err, req, res, next) => {

    res.status(400).json({ 
      result: 'error', 
      msg: err.message
    });
};

export { errorHandler };

