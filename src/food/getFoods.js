// handler to deactivate users
module.exports.getFoods = async (event, context) => {
    try {
        // database connection
        let knex = require('knex')({
            client: 'mysql',
            connection: {
                host: '127.0.0.1',
                user: 'root',
                port: 3306,
                password: 'welcome2caprice',
                database: 'food_factory',
                charset: 'utf8'
            }
        });
        // getFoods process
        let response = await knex.raw('Select Food_Name,Selling_Cost,Cost_Of_Production from foods where Cost_Of_Production > Selling_Cost')
            .then(foodDetails => { // response will [ [ RowDataPacket { Food_Name: 'Food1' } ]]
                return (JSON.stringify(foodDetails[0]));
            })
            .catch(getFoodsInsideCatchError => {
                console.log('Error in getFoods() catch block.', getFoodsInsideCatchError);
                return ('Error while getting the food details');
            });
        // Return response back to UI
        return response;
    } catch (getFoodsError) {
        console.log('Error in getFoods() catch block.', getFoodsError);
        return ('Error while process the request to getting the food details');
    }
};