const mongoose = require('mongoose');
const Entity = mongoose.model('Entity');
const multer = require('multer');    // for image uploading
const multerOptions = {
    storage: multer.memoryStorage(),
    filterFilter: function (req, file, next) {
        const isPhote = file.mimetype.startsWith('image/');  //image/
        if (isPhote) {
            next(null, ture);
        } else {
            next({
                message: "That filetype is not allowed!"
            }, false);
        }
    }
}

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
