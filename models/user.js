const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const userSchema   = new Schema({
    name: String,
    phone: Number,
    email: { type: String, required: true, unique: true },
    is_logged_in: Boolean,
    otp_secret: String,
    created_at: Date,
    updated_at: Date
});

userSchema.methods.getName = () => {
    return this.name;
}

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

module.exports = mongoose.model('User', userSchema);