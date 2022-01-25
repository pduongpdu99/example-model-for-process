const formatDate = (dateInput) => {
  const datefFormat = new Date(dateInput);
  datefFormat.setHours(datefFormat.getHours() + 7);
  return datefFormat;
};

module.exports = formatDate;
