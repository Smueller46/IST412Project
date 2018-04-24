const User = require('mongoose').model('User');
const options = {discriminatorKey: 'kind'};

const employerSchema = User.discriminator('Employer',
new mongoose.Schema({
    companyName: String
}, options));
