const mongoose = require('mongoose');
const Entity = mongoose.model('Entity');
const User = mongoose.model('User');
const multer = require('multer'); // for image uploading
const multerOptions = {
    storage: multer.memoryStorage(),
    filterFilter: function (req, file, next) {
        const isPhote = file.mimetype.startsWith('image/'); //image/
        if (isPhote) {
            next(null, ture);
        } else {
            next({
                message: "That filetype is not allowed!"
            }, false);
        }
    }
}
/* 
    Multer adds a body object and a file or files object to the request object. 
    The body object contains the values of the text fields of the form, 
    and the file or files object contains the files uploaded via the form.
*/
const uuid = require('uuid');
const jimp = require('jimp');

// GET display all entities
exports.getEntities = async(req, res) => {
    const entities = await Entity.find();

    res.render('entities', {
        title: 'Entities',
        entities
    });
};

// Accept a single file with the name fieldname. 
// The single file will be stored in req.file.
// https://www.npmjs.com/package/multer
exports.upload = multer(multerOptions).single('photo');

exports.resize = async(req, res, next) => {
    if (!req.file) {
        next();
        return;
    }
    //console.log(req.file);
    const extension = req.file.mimetype.split('/')[1];
    req.body.photo = `${uuid.v4()}.${extension}`;

    //resize
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${req.body.photo}`)
    // After written the photo to file system, keep going.
    next();
}

// GET entity from for creating new one
exports.addEntity = (req, res) => {
    res.render('editEntity', {
        title: 'Add new entity'
    });
}

exports.createEntity = async(req, res) => {
    // Relationship between user and store
    req.body.postedBy = req.user._id;

    const entity = new Entity(req.body);
    await entity.save();
    //req.flash("success", `Successfully created ${store.name}. Care to leave a review?`); // type and message
    //res.redirect(`/entity/${store.slug}`);
    res.redirect(`/`);
};

// Edit
// GET /entities/edit/:id  get entity for editing
exports.getEntityForEditing = async(req, res) => {
    // 1. find the entity 
    const entity = await Entity.findOne({
        _id: req.params.id
    });
    // 2. confirm they are the owner of the store
    //  confirmOwner(store, req.user);

    // 3. Render out the edit form so the user can update their store
    res.render('editEntity', {
        title: `Edit ${entity.name}`,
        entity
    });
};

// POST /entities/add/:id  because edit and add use the same edit form
exports.updateEntity = async(req, res) => {
    // The query executes immediately if callback is passed else a Query object is returned.
    // http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
    const entity = await Entity.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        new: true, //return the new store instead of the old one
        runValidators: true
    }).exec();
    req.flash('success', `Successfully update <strong> ${entity.name} <strong>. 
                            <a href="/entities/${entity.slug}">View Details</a>`)
    res.redirect(`/entities`);
};

exports.getEntityBySlug = async(req, res, next) => {
    //res.json(req.params)
    const entity = await Entity.findOne({
        slug: req.params.slug
    }); // populate user data related to the store.

    if (!entity)
        return next(); // go to errorHandlers.notFound
    res.render('entityDetail', {
        title: entity.name,
        entity
    });
};

exports.addOrRemoveFavorite = async(req, res) => {
    const favorites = req.user.favorites.map(obj => obj.toString());
    // add or remove store to user.hearts
    const operator = favorites.includes(req.params.id) ? '$pull' : '$addToSet';
    const user = await User
        .findByIdAndUpdate(req.user._id, {
            [operator]: {
                favorites: req.params.id
            }
        }, {
            new: true
        });
    res.json(user);
};