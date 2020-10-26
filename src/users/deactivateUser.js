// handler to deactivate users
module.exports.deactivateUser = async (event, context) => {
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
        // deactivateUser process
        let response = await knex('food_factory_users')
                        .update({
                            User_Status: 'Inactive'
                        })
                        .where('User_Id', userId)
                        .then(updateResponse =>{
                            if(updateResponse){
                                return ('User deactivated successfully');
                            }else{
                                return ('Error while deactivating the user.');
                            }
                        })
                        .catch(deactivateUserInsideCatchError => {
                            console.log('Error in deactivateUser() catch block.', deactivateUserInsideCatchError);
                            return ('Error while deactivating the user');
                        });
        // Return response back to UI
        return response;
    } catch (deactivateUserError) {
        console.log('Error in deactivateUser() catch block.', deactivateUserError);
        return ('Error while process the request to deactivating the user');
    }
};