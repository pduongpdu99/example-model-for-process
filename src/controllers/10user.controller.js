const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

/**
 * find
 */
const find = catchAsync(async (req, res) => {
  const result = await userService.find();
  res.send(result);
});

/**
 * find with tree view
 */
const findWithTreeView = catchAsync(async (req, res) => {
  const result = await userService.findWithTreeView(req.params.root);
  res.send(result);
});

/**
 * create
 */
const create = catchAsync(async (req, res) => {
  const account = await userService.create(req.body);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * find By Id And Update
 */
const findByIdAndUpdate = catchAsync(async (req, res) => {
  if (req.body.password !== null && req.body.password !== undefined) {
    if (req.body.password.length < 50) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }
  }

  const account = await userService.findByIdAndUpdate(req.body.id, req.body);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * find By Id And Update
 */
const updateDeviceToken = catchAsync(async (req, res) => {
  const account = await userService.updateDeviceToken(req.params.id, req.body);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * find By Id And Delete
 */
const findByIdAndDelete = catchAsync(async (req, res) => {
  const account = await userService.findByIdAndDelete(req.params.id);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * findById
 */
const findById = catchAsync(async (req, res) => {
  const account = await userService.findById(req.params.id);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * find By Username
 */
const findByUsername = catchAsync(async (req, res) => {
  const account = await userService.getUserByUsername(req.params.username);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * Get count username
 */
const getCountUsername = catchAsync(async (req, res) => {
  const countUsername = await userService.getCountUsername();
  res.send(countUsername.toString());
});

/**
 * paginate
 */
const paginate = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['id', 'banBes', 'idTinh', 'idHuyen']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  // Query by month and year
  if (req.query.month != null && req.query.year != null) {
    filter.$expr = {
      $or: [
        {
          $and: [
            { $eq: [{ $month: '$created_at' }, Number(req.query.month)] },
            { $eq: [{ $year: '$created_at' }, Number(req.query.year)] },
          ],
        },
      ],
    };
  }

  const result = await userService.paginate(filter, options);
  res.send(result);
});

/**
 * Get Permission Of Component
 */
const getPermissionOfComponent = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const { slug } = req.body;

  const data = await userService.getPermissionOfComponent(userId, slug);

  res.send(data);
});

/**
 * Change password
 */
const changePassword = catchAsync(async (req, res) => {
  // Todo
  const { userId } = req.body;
  const oldPasssword = req.body.id;
  const { newPassword } = req.body;

  const result = await userService.changePassword(userId, oldPasssword, newPassword);
  res.send(result);
});

/**
 * Find by date start to date end
 */
const findByDateStartToDateEnd = catchAsync(async (req, res) => {
  const { dateStart } = req.query;
  const { dateEnd } = req.query;
  const result = await userService.findByDateStartToDateEnd(dateStart, dateEnd);
  res.send(result);
});

/**
 * find By Date Start To Date End And IdUser
 * @param {*} idUser
 * @param {*} dateStart
 * @param {*} dateEnd
 * @author ThanhVV
 */
const findByDateStartToDateEndAndIdUser = catchAsync(async (req, res) => {
  const { dateStart } = req.query;
  const { dateEnd } = req.query;
  const { idUser } = req.query;
  const result = await userService.findByDateStartToDateEndAndIdUser(dateStart, dateEnd, idUser);
  res.send(result);
});

/**
 * Get username valid
 */
const getUsernameValid = catchAsync(async (req, res) => {
  const user = await userService.findMaxUsername();

  // Get list username substring 3, length username
  // Example tv10001 => 10001
  const usernames = user.map((e) => e.username.substring(2, e.username.length));

  // Get max username
  const maxCurrent = Math.max(...usernames);

  const result = {
    username: `tv${Number(maxCurrent) + 1}`,
  };

  res.send(result);
});

/**
 * Find list infor subordinate teams
 * @param {*} dateStart
 * @param {*} dateEnd
 */
const findInforSubordinateTeams = catchAsync(async (req, res) => {
  const { idUser } = req.query;

  // Find infor subordinate teams
  const result = await userService.findInforSubordinateTeams(idUser);

  res.send(result);
});

/**
 * Find statis of user
 */
const findStatisticsOfUser = catchAsync(async (req, res) => {
  const { idUser } = req.query;

  // Find statistics of user
  const result = await userService.findStatisticsOfUser(idUser);

  res.send(result);
});

module.exports = {
  find,
  create,
  findByIdAndUpdate,
  updateDeviceToken,
  findByIdAndDelete,
  findById,
  paginate,
  changePassword,
  getPermissionOfComponent,
  findByUsername,
  getCountUsername,
  findByDateStartToDateEnd,
  findByDateStartToDateEndAndIdUser,
  getUsernameValid,
  findInforSubordinateTeams,
  findStatisticsOfUser,
  findWithTreeView,
};
