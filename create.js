/**
 * Created by dliu on 2017/6/28.
 */
var request = request('request');

/**
 * This action
 *
 * @param   params.username               Couchdb username
 * @param   params.password               Couchdb password
 * @param   params.database               Couchdb database name
 * @return  Promise for the downloaded image object
 */

function main(params) {

    // Configure database connection
    var nano = require('nano')('http://' +params.username + ':' + params.password + '@' + 'localhost:5984');
    nano.db.create(params.dbname)
    db = nano.db.use(params.dbname)

    // Generate a random name to trigger the database change feed
    var imageName = IMAGE_NAME_PREFIX + getRandomInt(1, 100000) + IMAGE_NAME_POSTFIX;

    return new Promise(function(resolve, reject) {
        request({
            uri: LOGO_URL,
            method: 'GET',
        }, function(err, response, body) {
            if (err) {
                reject();

            } else {
                db.multipart.insert({
                        _id: imageName
                    }, [{
                        name: imageName,
                        data: body,
                        content_type: CONTENT_TYPE
                    }],
                    imageName,
                    function(err, body) {
                        if (err && err.statusCode != 409) {
                            console.log("Error with file insert.");
                            reject();
                        } else {
                            console.log("Success with file insert.");
                            resolve({payload: 'The image name is: ' + imageName});

                        }
                    }
                );

            }
        });
    });

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}