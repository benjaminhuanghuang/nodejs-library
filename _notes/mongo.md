## Model relation
```
const entitySchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.ObjectId,     // refer User model
        ref: 'User',
        required: 'You must supply an poster'
    }
});
```

## Virtual field
```
// Add virtual field to user. The virtual field is not saved in database.
userSchema.virtual('gravatar').get(function () {
  const hash = md5(this.email);
  return `http://gravatar.com/avatar/${hash}?200`;
});

```

## Work with add-ins
```
// use the email as login field
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

userSchema.plugin(mongodbErrorHandler);
```

## Add index
```
entitySchema.index({
    name: 'text',
    description: 'text'
});
```

## Pre-save hook in mongo db
```
// Because we want to use this in the function, so don't use => function here
entitySchema.pre('save', async function (next) {
    // encrypt user password
    next();
});
```

## Static function on model
```
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
```

## Generate mock data for testing
  