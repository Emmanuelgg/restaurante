const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Option 1: Passing parameters separately
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql' /* one of  | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize.authenticate()
    .then(() => {
        console.log('Conectado')
    })
    .catch(err => {
        console.log('No se conecto')
    })


const Category = sequelize.define('categories', {
    id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
		allowNull: false,
		autoIncrement: true
    },
    name: {
		type: Sequelize.STRING,
		allowNull: false
	},
    english: {
		type: Sequelize.STRING,
		allowNull: false
	}
})
// Sync all models that aren't already in the database
sequelize.sync()
// sequelize.sync({ alter: true }).then(() => {
//   console.log(chalk.green('database synced :)'))
//   console.log('disconnecting...')
// }).catch(e => {
//   console.log(e)
// })

// Force sync all models
// sequelize.sync({force: true})

// Create the tables:
// Category.sync()

// drop the tables:
// Category.drop()

// Force the creation!
// Category.sync({force: true}) // this will drop the table first and re-create it afterwards
