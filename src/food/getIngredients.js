// handler to getIngredients
module.exports.getIngredients = async (event, context) => {
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
        // getIngredients process
        let response = await knex.raw('Select Ingredient_Name from ingredients where Available_Quantity < Threshold_Quantity')
            .then(ingredientsDetails => { 
                return (JSON.stringify(ingredientsDetails[0]));
            })
            .catch(getIngredientsInsideCatchError => {
                console.log('Error in getIngredients() catch block.', getIngredientsInsideCatchError);
                return ('Error while getting the ingredients details');
            });
        // Return response back to UI
        return response;
    } catch (getIngredientsError) {
        console.log('Error in getIngredients() catch block.', getIngredientsError);
        return ('Error while process the request to getting the ingredients details');
    }
};