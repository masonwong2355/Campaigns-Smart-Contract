import CampaignFactroy from './build/CampaignFactory.json';
import web3 from './web3';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactroy.interface),
    'endpoint'
);

export default instance;
