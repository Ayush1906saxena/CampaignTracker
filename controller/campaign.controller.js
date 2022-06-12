const {
    getAllCampaigns,
    scheduleNewCampaign,
    existsCampaignWithId,
    abortCampaignById
} = require('../models/campaign.model');

async function httpGetAllCampaigns(req, res){
    const campaigns = await getAllCampaigns();
    return res.status(200).json(campaigns);
}

async function httpAddNewCampaign(req, res){
    const campaign = req.body;
    //campaign.launchDate = new Date(campaign.launchDate);
    // if (isNaN(campaign.launchDate)) {
    //     return res.status(400).json({
    //       error: 'Invalid launch date',
    //     });
    // }

    await scheduleNewCampaign(campaign);
    return res.status(201).json(campaign);
}

async function httpAbortCampaign(req, res) {
    const campaignId = Number(req.params.id);
  
    const existsCampaign = await existsCampaignWithId(campaignId);
    if (!existsCampaign) {
      return res.status(404).json({
        error: 'Launch not found',
      });
    }
  
    const aborted = await abortCampaignById(campaignId);
    if (!aborted) {
      return res.status(400).json({
        error: 'Launch not aborted',
      });
    }
  
    return res.status(200).json({
      ok: true,
    });
}

module.exports = {
    httpGetAllCampaigns,
    httpAddNewCampaign,
    httpAbortCampaign
};