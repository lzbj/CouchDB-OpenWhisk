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
 * @param   params.docid                  Couchdb doc id
 * @return  Promise for the get specified doc by id.
 */

function main(params) {

    // Configure database connection
    var nano = require('nano')('http://' +params.username + ':' + params.password + '@' + 'localhost:5984');
    nano.db.create(params.dbname)
    db = nano.db.use(params.dbname)


    return new Promise(function(resolve, reject) {
        db.get(params.docid, function (err, response) {
            if(!error) {
                console.log('success', response);
                resolve(response);
            } else {
                console.error('error', error);
                reject(error);
            }
        });
    });

}
