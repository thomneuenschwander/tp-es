import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('pizzaPlanet', 'postgres', '1R341256a@', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    freezeTableName: true
  },
  logging: false, // Remove os logs de SQL
});
