export default catchAsync => async (req, res, next) => {
  try {
    await catchAsync(request, response, next);
  } catch (error) {
    return next(error);
  }
};
