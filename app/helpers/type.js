module.exports = {
  getInt: num => {
    try {
      const result = parseInt(num, 10);
      return isNaN(result) ? 0 : result;
    } catch (e) { console.warn('Failed to convert to int', e); }
    return 0;
  },

  getBool: bool => {
    return bool === 'true';
  },

  getList: list => {
    try {
      return !list ? [] : `${list}`.split(',');
    } catch (e) { console.warn('Failed to convert to list', e); }
    return [];
  }
};
