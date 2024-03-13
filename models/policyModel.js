const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  accountType: { type: String, required: true },
  accountName: { type: String, required: true },
  policyEndDate: { type: Date, required: true },
  policyStartDate: { type: Date, required: true },
  categoryName: { type: String, required: true },
  companyName: { type: String, required: true },
  policyType: { type: String, required: true },
  premiumAmount: { type: Number, required: true },
  policyMode: { type: Number, required: true },
  userId: {type: String,  required: false}, // for admin use only
   
});

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;
