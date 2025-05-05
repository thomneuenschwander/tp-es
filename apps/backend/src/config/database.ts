import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('pizzaPlanet', 'postgres', '2210', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    freezeTableName: true
  },
  logging: false, // Remove os logs de SQL
});
