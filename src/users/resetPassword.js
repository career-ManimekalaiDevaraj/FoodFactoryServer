// handler to reset password
module.exports.resetPassword = async (event, context) => {
    try {
        // require cryptr package
        const cryptrObj = require('cryptr');
        // get the encrption key from constant file
        const cryptr = new cryptrObj('!WE$CYHUI*'); // Encryption key this should be kept as confidential like AWS secrets manager
        event = JSON.parse(event.body);
        // get input values
        let { emailAddress,currentPassword,newPassword } = event;
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
        // resetPassword process
        let response = await knex('food_factory_users')
            .select('Password')
            .where('Email_Address',emailAddress)
            .where('User_Status','Active')
            .then(async (userExist) => {
                // Check account exist as well as currentPassword is same or not
                if (userExist && userExist.length && currentPassword === cryptr.decrypt(userExist[0].Password)) {
                    // If user exist as well as password mateches then allow them to update the password
                    return knex('food_factory_users')
                                        .update({
                                            Password: cryptr.encrypt(newPassword)
                                        })
                                        .where('Email_Address', emailAddress)
                                        .then(response =>{
                                            if(response){
                                                return ('Password reset successfully');
                                            }else{
                                                return ('Error while resetting the user password');
                                            }
                                        });
                } else {
                    return ('User does not exist');
                }
            })
            .catch(resetPasswordInsideCatchError => {
                console.log('Error in resetPassword() catch block.', resetPasswordInsideCatchError);
                return ('Error while resetting the user password');
            });
        // Return response back to UI
        return response;
    } catch (resetPasswordError) {
        console.log('Error in resetPassword() catch block.', resetPasswordError);
        return ('Error while process the request to resetting the user password');
    }
};