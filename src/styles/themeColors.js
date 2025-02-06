const getColors = (theme) => {
  const isDark = theme === 'dark';

  return {
    background: isDark ? '#121212' : '#fff',
    font: isDark ? '#ffffff' : '#000000',
    listItem: isDark ? '#254424' : '#ADD0B3',
    date: isDark ? '#bbb' : 'gray',
  };
};

export default getColors;
