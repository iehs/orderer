const db = require('../db.js');
const Sequelize = require('sequelize');

const Items = db.define('item', {
  cat: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  partNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  supplier: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.ENUM('Men', 'Women', 'Kids')
  }
});

Items.addHook('afterSave', item => {
  let unformattedPrice = item.getDataValue('price');
  let formattedPrice = Math.round(unformattedPrice * 100) / 100;
  item.price = formattedPrice;
});

Items.updateCartInfo = function(arrayOfItemIDs) {
  return Promise.all(
    arrayOfItemIDs.map(id => {
      return Items.findById(id);
    })
  )
    .then(items => {
      return items;
    })
    .catch(err => console.error(err));
};

module.exports = Items;