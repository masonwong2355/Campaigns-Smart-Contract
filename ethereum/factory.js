import CampaignFactroy from './build/CampaignFactory.json';
import web3 from './web3';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactroy.interface),
    '0x105f395b3123A2b5786C89d0dD623A5631129459'
);

export default instance;
