const LocalStrategy = require('passport-local').Strategy;

function initialisePassport(passport, findUserByKey) {
    async function isLoginValid(email, password, done) {
        //Access database to retrive password for validation 
        let user;
        try {
            user = await findUserByKey('email', email);
        } catch (err) {
            console.log('Could not connect to database.' + err);
        }

        //Tests to see if credentials are valid
        try{
            if (!user) {
                console.log('Could not find email address in database.');
                return done(null, false, { message: 'Email address does not appear to be registed.' });
            }
            if (user.password !== password) {
                console.log('Incorrect password.');
                return done(null, false, { message: 'Incorrect password.' });
            }
            if (user.password === password) {
                console.log('Credentials validated, login will commence!');
                return done(null, user);
            }
        } catch (error) {
            console.log('There was an error checking credentials' + error)
            return done(error);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, isLoginValid));
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser((id, done) => { 
        return done(null, findUserByKey('_id', id));
     });
}; 

module.exports = initialisePassport;