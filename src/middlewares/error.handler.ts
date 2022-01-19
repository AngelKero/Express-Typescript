export function logErrors(err, req, res, next) {
  const { output } = err;
  console.log(output);
  next(err);
}

// export function errorHandler(err, req, res, next) {
//   res.status(500).json({
//     error: err.message
//   });
// }

export function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json({
      error: output.payload
    });
  } else {
    next(err);
  }
}

