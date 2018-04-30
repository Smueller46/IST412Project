const User = require('mongoose').model('User');
const options = {discriminatorKey: 'kind'};
const stuentSchema = user.discriminator('Student',
new mongoose.Schema({
    dawgTag: String
}, options));
