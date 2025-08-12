
const mongoose = require('mongoose');

const workExperienceSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    responsibility: { type: String, required: true }
}, { _id: false });

const eduSchema = new mongoose.Schema({
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
}, { _id: false });

const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    summary: {type: String, required: true},
    workExperiences: {type: [workExperienceSchema], default: []},
    educations: {type: [eduSchema], default: []},
});

module.exports = mongoose.model('Resume', resumeSchema);
