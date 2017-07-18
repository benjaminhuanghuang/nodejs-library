const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // tell mongoose use Promise provide by node.js
const slug = require('slugs'); //convert entity name to URL-friendly format


const entitySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Please enter a name!"
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String],
    publishDate:  Date,
    photo: String,
    author: String,

    createdDate: {
        type: Date,
        default: Date.now
    },
    // postedBy: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //     required: 'You must supply an poster'
    // }
});

// Define indexes
entitySchema.index({
    name: 'text',
    description: 'text'
});

// pre-save hook in mongo db
// Because we want to use this in the function, so don't use => function here
entitySchema.pre('save', async function (next) {
    if (!this.isModified('name')) {  // recreate slug only when name was changed
        next();
        return;
    }
    this.slug = slug(this.name);

    //find other entity that have a slug of ...
    const slugRegex = new RegExp(`^(${this.slug})((-[0-9]*$))$`, 'i');
    const nameWithSlug = await this.constructor.find({
        slug: slugRegex
    });

    if (nameWithSlug.length) {
        this.slug = `${this.slug}-${this.nameWithSlug.length + 1}`;
    }
    next();
});

entitySchema.statics.getTagsList = function () {
    return this.aggregate([{
            $unwind: '$tags'
        },
        {
            $group: {
                _id: '$tags',
                count: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                count: -1
            }
        }
    ]);
}


module.exports = mongoose.model('Entity', entitySchema);