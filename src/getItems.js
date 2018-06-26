function getItems (quantity, letter='a') {
  let items = [];

  for (let i =1; i <= quantity; i++) {
    items.push({ id: i, content: `${letter.toUpperCase() + i}`});
  }
  
  return items;
}

module.exports = getItems;