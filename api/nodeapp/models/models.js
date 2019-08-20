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
},{underscored: true})

const DiningTable = sequelize.define('dining_tables', {
    id: {
        type: Sequelize.MEDIUMINT,
        primaryKey: true,
		allowNull: false,
		autoIncrement: true
    },
    number: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
    name: {
		type: Sequelize.STRING,
		allowNull: false
	},
    status: {
		type: Sequelize.TINYINT,
		allowNull: false
	}
},{underscored: true})

const FoodOrder = sequelize.define('food_orders', {
    id: {
        type: Sequelize.MEDIUMINT,
        primaryKey: true,
		allowNull: false,
		autoIncrement: true
    },
    total: {
		type: Sequelize.TINYINT,
		allowNull: false
	},
    status: {
		type: Sequelize.TINYINT,
		allowNull: false
	}
},{underscored: true})

const FoodOrderDescription = sequelize.define('food_order_descriptions', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
		allowNull: false,
		autoIncrement: true
    },
    id_food_order: {
        type: Sequelize.INTEGER,
		allowNull: false
    },
    id_product: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
    quantity: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
    product_name: {
		type: Sequelize.STRING,
		allowNull: false
	},
    price: {
		type: Sequelize.DECIMAL(11,2),
		allowNull: false
	},
    total: {
		type: Sequelize.DECIMAL(11,2),
		allowNull: false
	},
    status: {
		type: Sequelize.TINYINT,
		allowNull: false
	}
},{underscored: true})

const FoodOrderType = sequelize.define('food_order_types', {
    id: {
        type: Sequelize.TINYINT,
        primaryKey: true,
		allowNull: false,
		autoIncrement: true
    },
    description: {
        type: Sequelize.STRING,
		allowNull: false
    }
},{underscored: true})

const Product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
		allowNull: false,
		autoIncrement: true
    },
    id_category: {
        type: Sequelize.SMALLINT,
		allowNull: false
    },
    id_unit: {
        type: Sequelize.SMALLINT,
		allowNull: false
    },
    code: {
        type: Sequelize.STRING,
		allowNull: false
    },
    name: {
        type: Sequelize.STRING,
		allowNull: false
    },
    quantity_package: {
        type: Sequelize.STRING,
		allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(11,2),
		allowNull: false
    },
    image_url: {
        type: Sequelize.STRING,
		allowNull: false
    },
    status: {
        type: Sequelize.TINYINT,
		allowNull: false
    }
},{underscored: true})

const Unit = sequelize.define('units', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
		allowNull: false,
		autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
		allowNull: false
    },
    abbreviation: {
        type: Sequelize.STRING,
		allowNull: false
    }
},{underscored: true})

// Sync all models that aren't already in the database
sequelize.sync({force:true})

Category.bulkCreate(
	[
		{
			id: 1, name: 'Comida', english:'Food'
		},
		{
			id: 2, name: 'Bebida', english:'Drink'
		},
		{
			id: 3, name: 'Postre', english:'Dessert'
		}
	]
)

FoodOrder.belongsTo(DiningTable);
DiningTable.hasMany(FoodOrder);
FoodOrder.belongsTo(FoodOrderType);
FoodOrderType.hasMany(FoodOrder);

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
