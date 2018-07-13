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
  }
};
