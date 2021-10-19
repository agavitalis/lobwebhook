
const Lob = require('lob')('test_e714c6edeb9abbf049924858d337c93b567');
/*
 * GET / route to show the createLetter form.
 */
function createLetter(req, res) {
    //catch any response on the url
    let response = req.query.response
    res.render('index', { response })
}


/*
 * POST / route to process the letters.
 */
function createLetterPost(req, res) {

    // Create the address
    Lob.addresses.create({
        name: 'Robin Joseph',
        email: 'test@gmail.com',
        phone: '123456789',
        address_line1: '123 Test Street',
        address_line2: 'Unit 199',
        address_city: 'Chicago',
        address_state: 'IL',
        address_zip: '60012',
        address_country: 'US'
    })
        .then((address) => {
            return Lob.letters.create({
                description: 'My First Letter',
                to: address.id,
                from: {
                    name: 'Test Person',
                    address_line1: '123 Test Street',
                    address_line2: 'Unit 200',
                    address_city: 'Chicago',
                    address_state: 'IL',
                    address_zip: '60012',
                    address_country: 'US'
                },
                file: '<html style="padding-top: 3in; margin: .5in;">HTML Letter for {{name}}</html>',
                merge_variables: {
                    name: 'Harry'
                },
                color: true
            });
        })
        .then((letter) => {
            console.log('The Lob API responded with this letter object: ', letter);
            //catch any response on the url
            let response = req.query.response
            res.render('index', { response })
        })
        .catch((err) => {
            console.log(err);
        });

}


/*
 * GET / route to get created letters.
 */
function getLetters(req, res) {

    Lob.letters.list({limit: 2}, function (err, res) {
        console.log(err, res);
    });
   
}

/*
 * GET / route to get a letter.
 */
function getALetter(req, res) {

    Lob.letters.retrieve('ltr_4868c3b754655f90', function (err, res) {
        console.log(err, res);
    });
      
}

//export all the functions
module.exports = { createLetter, createLetterPost, getLetters, getALetter };