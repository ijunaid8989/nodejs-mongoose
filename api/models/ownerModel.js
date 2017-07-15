'use strict';
var mongoose         = require('mongoose'),
    Schema           = mongoose.Schema,
    bcrypt           = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    uniqueValidator  = require('mongoose-unique-validator');


var ownerSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    index: { 
      unique: true
    }
  },
  password: {
    type: String,
    required: true
    // validate: {
    //   validator: function(password) {
    //     return password.length > 5;
    //   },
    //   message: '{VALUE} should be greater than 5 characters!'
    // },
  },
  is_owner: {
    type: Boolean,
    default: true
  },
  bank_details: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  auth_token: {
    type: String,
    default: null
  },
  auth_type: {
    type: String,
    enum: ['LOCAL', 'FB', 'GPLUS'],
    default: 'LOCAL'
  }
});

ownerSchema.path('email').validate(function(value, done) {
    this.model('Owners').count({ email: value }, function(err, count) {
        if (err) {
            return done(err);
        }
        // If `count` is greater than zero, "invalidate"
        done(!count);
    });
}, 'exists');


ownerSchema.pre('save', function(next) {
    var owner = this;

    // only hash the password if it has been modified (or is new)
    if (!owner.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(owner.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            owner.password = hash;
            next();
        });
    });
});

ownerSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('Owners', ownerSchema);
