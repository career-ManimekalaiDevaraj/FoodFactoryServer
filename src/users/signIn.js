// handler to sign into the app
module.exports.signIn = async (event, context) => {
    try {
        // require cryptr package
        const cryptrObj = require('cryptr');
        // get the encrption key from constant file
        const cryptr = new cryptrObj('!WE$CYHUI*'); // Encryption key this should be kept as confidential like AWS secrets manager
        event = JSON.parse(event.body);
        // get input values
        let { emailAddress, password } = event;
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
        // signIn process
        let response = await knex('food_factory_users')
                    .pluck('Password')
                    .where('Email_Address',emailAddress)
                    .where('User_Status','Active')
                    .then(userExist => { // response will be ['d058a6f31ff2140c2cfbaf797beb67']
                        // Check account exist as well as password is same or not
                        if (userExist && userExist.length && password === cryptr.decrypt(userExist[0])){
                            return ('User logged-in successfully');
                        }else{
                            return ('User does not exist');
                        }
                    })
                    .catch(signInInsideCatchError => {
                        console.log('Error in signIn() catch block.', signInInsideCatchError);
                        return ('Error while signin into application');
                    });
        // Return response back to UI
        return response;
    } catch (signInError) {
        console.log('Error in signIn() catch block.', signInError);
        return ('Error while process the request to signin into application');
    }
};