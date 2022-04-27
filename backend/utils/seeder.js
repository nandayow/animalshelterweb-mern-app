const Health = require('../models/health');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const healths = require('../data/healths');

dotenv.config({ path: 'backend/config/config.env' })

connectDatabase();

const seedHealths = async () => {
    try {

        await Health.deleteMany();
        console.log('Healths are deleted');

        await Health.insertMany(healths)
        console.log('All Healths are added.')

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedHealths()