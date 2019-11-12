Referente ao curso da Udemy: _Node.js: The Complete Guide to Build RESTful APIs_

#### Important! : Env variables

    (in .bashrc)

    export app_password='sample_passsword'
    export NODE_ENV='development' # development || production
    export DEBUG='app:startup'
    export EXPRESS_PORT='3333'

#### Note

Use

    127.0.0.1

against

    localhost

#### Initializing NPM

    npm init --yes

#### Installing npm pakages

    npm i --save <package>

#### Running server (nodemon)

    nodemon index.js

#### Express middlewares

    https://expressjs.com/en/resources/middleware.html

### MongoDB

Manager: MongoDB Compass

    sudo service mongodb status / stop / start
    mongo
    show dbs;
    use <database>;
    db; // show current database

#### MongoDB / Mongoose : Operators

    eq (equal)
    ne (not equal)
    gt (greater than)
    gte (greater than or equal to)
    lt (less than)
    lte (less than or equal to)
    in (in)
    nin (not in)
    or
    and
    .select() // Filter fields with '1' will be selected
    .sort() // Sort fiels -1 descending, 1 ascending
    .count() // Count objects in collection
    .limit() // Limits the result to
    .skip() // Pagination

Eg

    .find({ price: { $gte: 10, $lte: 20}}) # price > 10 and price < 20
    .find({ price: { $in: [10, 20, 30]}}) # price = 10, 20 or 30
    .or([ { author: 'Mosh'}, {isPublished: true } ]) # author = Mosh or isPublished = true
    .find({ author: /^Mosh/ }) # RegExp, will return courses that starts with "Mosh"
    .find({ author: /^Hamedani$/i }) # RegExp, ends it...
    .find({ author: /.*Mosh.*/ }) # RegExp, contains...
    .find({ author: 'Mosh', isPublished: true })
    .select({ name: 1, tags: 1 }) // Filter fields
    .sort({ name: 1 }) // 1: Ascending, -1: Descending

Pagination eg:

.skip((pageNumber - 1) \* pageSize) // pageNumber = 5, pageSize = 10
