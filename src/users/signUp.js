// handler to register users
module.exports.signUp = async (event, context) => {
    try{
        // require cryptr package
        const cryptrObj = require('cryptr');
        // get the encrption key from constant file
        const cryptr = new cryptrObj('!WE$CYHUI*'); // Encryption key this should be kept as confidential like AWS secrets manager
        event = JSON.parse(event.body);
        // get input values
        let { firstName,lastName,emailAddress, password} = event;
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
        // Signup process
        let response = await knex('food_factory_users')
                        .insert({
                            First_Name: firstName,
                            Last_Name: lastName,
                            Email_Address: emailAddress, // Email address should be unique. Set Email_Address as unique column in table
                            Password: cryptr.encrypt(password),
                            User_Status:'Active'
                        })
                        .then(registerUser =>{
                            return ('User registered successfully');
                        })
                        .catch(signUpInsideCatchError =>{
                            console.log('Error in signUp() catch block.', signUpInsideCatchError);
                            return ('Error while registering the user');
                        });
        // Return response back to UI
        return response;        
    } catch (signUpError){
        console.log('Error in signUp() catch block.',signUpError);
        return ('Error while process the request to registering the user');
    }
};