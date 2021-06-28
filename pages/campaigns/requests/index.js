import React, { Component } from 'react';
// import factory from '../../ethereum/factory';
import Campaign from '../../../ethereum/campaign';
import { Table, Grid, Button } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map((element, index) => {
                    return campaign.methods.requests(index).call();
                })
        );
        console.log(requests);
        //     return { requests: requests };
        //     //     const campaigns = await factory.methods.getDeployedCampaigns().call();

        //     //     return { campaigns };
        return { address, requests, requestCount, approversCount };
    }

    reanderRow() {
        // const items = this.props.requests.map((request) => {
        //     return {
        //         header: address,
        //         description: (
        //             <Link route={`/campaigns/${address}`}>
        //                 <a>View Campaign</a>
        //             </Link>
        //         ),
        //         fluid: true,
        //     };
        // });

        // return <Card.Group items={items} />;
        return this.props.requests.map((request, index) => {
            return (
                <RequestRow
                    key={index}
                    id={index}
                    request={request}
                    address={this.props.address}
                    approversCount={this.props.approversCount}
                />
            );
        });
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <h3>Request List</h3>
                        </Grid.Column>

                        <Grid.Column width={6}>
                            <Link
                                route={`/campaigns/${this.props.address}/requests/new`}
                            >
                                <a>
                                    <Button
                                        primary
                                        floated="right"
                                        style={{ marginBottonL: '10px' }}
                                    >
                                        Add Request
                                    </Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Table celled>
                            <Header>
                                <Row>
                                    <HeaderCell>ID</HeaderCell>
                                    <HeaderCell>Description</HeaderCell>
                                    <HeaderCell>Amount</HeaderCell>
                                    <HeaderCell>Recipient</HeaderCell>
                                    <HeaderCell>Approval Count</HeaderCell>
                                    <HeaderCell>Approve</HeaderCell>
                                    <HeaderCell>Finalize</HeaderCell>
                                </Row>
                            </Header>

                            <Body>{this.reanderRow()}</Body>
                        </Table>
                    </Grid.Row>
                </Grid>
                <Grid.Row>
                    <div>Found {this.props.requestCount} request.</div>
                </Grid.Row>
            </Layout>
        );
    }
}

export default RequestIndex;
