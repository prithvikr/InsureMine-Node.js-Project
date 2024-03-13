const Policy = require('../models/policyModel');

// Sample data
const policyData = {
    accountType: 'Commercial',
    accountName: 'Lura Lucca & Owen Dodson',
    policyEndDate: new Date('2019-11-02'),
    policyStartDate: new Date('2018-11-02'),
    categoryName: 'Commercial Auto',
    companyName: 'Integon Gen Ins Corp',
    policyType: 'Single',
    premiumAmount: 1180.83,
    policyMode: 12,
    
};

// Create a new Policy document
const newPolicy = new Policy(policyData);

// Save the new Policy document
newPolicy.save()
    .then(savedPolicy => {
        console.log('Policy saved successfully:', savedPolicy);
    })
    .catch(error => {
        console.error('Error saving policy:', error.message);
    });
