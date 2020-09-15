const FactoryGirl = require('factory-girl');

const { factory } = FactoryGirl;
const adapter = new FactoryGirl.SequelizeAdapter();

// use the sequelize adapter as the default adapter
factory.setAdapter(adapter);

module.exports = { factory };
