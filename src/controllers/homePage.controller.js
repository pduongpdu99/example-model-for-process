const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { homePageService } = require('../services');

/**
 * ranking
 */
const ranking = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await homePageService.ranking(filter, options);
  res.send(result);
});

module.exports = {
  ranking,
};
