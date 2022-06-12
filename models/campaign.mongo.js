const mongoose = require('mongoose');
const Project = require('./project.mongo');

const CampaignSchema = new mongoose.Schema({
    campaignName : {
        type: String,
        required: true,
    },
    launchDate: {
        type: Date,
        default : Date.now,
    },
    projects: {
        type: [mongoose.Schema.Types.ObjectId],
        ref : 'Project',
    },
    upcoming: {
        type: Boolean,
        default: true,
    },
    success: {
        type: Boolean,
        default: true,
    },
},{
    timestamps : true
});

module.exports = mongoose.model('Campaign', CampaignSchema);