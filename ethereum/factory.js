import CampaignFactroy from './build/CampaignFactory.json';
import web3 from './web3';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactroy.interface),
    '0x61DdF8696aD6334f5939700a0A5591EDB608b421'
);

export default instance;
