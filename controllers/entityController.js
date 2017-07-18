const mongoose = require('mongoose');
const Entity = mongoose.model('Entity');
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

// GET display all entities
exports.getEntities = async(req, res) => {
    const entities = await Entity.find();

    res.render('entities', {
        title: 'Entities',
        entities
    });
};

// GET entity from for creating new one
exports.addEntity = (req, res) => {
    res.render('editEntity', {
        title: 'Add new entity'
    });
}

exports.createEntity = async(req, res) => {
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

exports.updateEntity = async(req, res) => {
    const entity = await Entity.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        new: true, //return the new store instead of the old one
        runValidators: true
    }).exec();
    // req.flash('success', `Successfully update <strong> ${store.name} <strong>. 
    //                         <a href="/stores/${store.slug}">View Store</a>`)
    res.redirect(`/entities`);
};