import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';
import Layout from '../../../components/Layout';
import { Link, Router } from '../../../routes';

class RequestNew extends Component {
    state = {
        description: '',
        amount: '',
        recipient: '',
        errorMessage: '',
        loading: false,
    };
    static async getInitialProps(props) {
        const { address } = props.query;
        return { address };
    }

    onSubmit = async () => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);
        const { description, amount, recipient } = this.state;

        this.setState({ loading: true, errorMessage: '' });
        try {
            const accounts = await web3.eth.getAccounts();

            await campaign.methods
                .createRequest(
                    description,
                    web3.utils.toWei(amount, 'ether'),
                    recipient
                )
                .send({ from: accounts[0] });

            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
    };

    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>Back</a>
                </Link>
                <h1>Create a Request</h1>

                <Form
                    onSubmit={this.onSubmit}
                    error={!!this.state.errorMessage}
                >
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={(event) =>
                                this.setState({
                                    description: event.target.value,
                                })
                            }
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Amount in Either</label>
                        <Input
                            value={this.state.amount}
                            onChange={(event) =>
                                this.setState({
                                    amount: event.target.value,
                                })
                            }
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={(event) =>
                                this.setState({
                                    recipient: event.target.value,
                                })
                            }
                        />
                    </Form.Field>

                    <Message
                        error
                        header="Oops!"
                        content={this.state.errorMessage}
                    />
                    <Button loading={this.state.loading} primary>
                        Create
                    </Button>
                </Form>
            </Layout>
        );
    }
}

export default RequestNew;
