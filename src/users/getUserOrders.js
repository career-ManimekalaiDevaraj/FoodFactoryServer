// handler to user orders
module.exports.getUserOrders = async (event, context) => {
    try {
        event = JSON.parse(event.body);
        // get input values
        let { userId } = event;
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
        // getUserOrders process
        let response = await knex('food_orders as FO')
            .select('FO.Order_Id','FO.Amount','FO.Date','FO.Food_Id','F.Food_Name')
            .innerJoin('foods as F', 'F.Food_Id','FO.Food_Id')
            .where('FO.User_Id',userId)
            .then(userOrders => {
                // Check food oders exist or not
                if (userOrders.length) {
                    return (JSON.stringify(userOrders));
                } else {
                    return ('There is no food orders exist');
                }
            })
            .catch(getUserOrdersInsideCatchError => {
                console.log('Error in getUserOrders() catch block.', getUserOrdersInsideCatchError);
                return ('Error while getting the user food orders');
            });
        // Return response back to UI
        return response;
    } catch (getUserOrdersError) {
        console.log('Error in getUserOrders() catch block.', getUserOrdersError);
        return ('Error while process the request to getting the user food orders');
    }
};