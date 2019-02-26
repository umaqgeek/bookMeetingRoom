export const getSqlErrors = (sqlErrorMessage) => {
  if (sqlErrorMessage.toLowerCase().includes('SQLSTATE[23000]'.toLowerCase())) {
    return 'Duplicate data';
  }
  return 'Server error';
};
