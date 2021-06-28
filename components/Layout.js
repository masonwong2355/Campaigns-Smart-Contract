import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';
import Head from 'next/head';

const Layout = (props) => {
    return (
        <div>
            <Container>
                <Header></Header>
                {props.children}
            </Container>
        </div>
    );
};

export default Layout;
