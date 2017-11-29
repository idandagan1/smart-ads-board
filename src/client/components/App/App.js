/** global webgazer:true */
import React, { Component } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import * as ajaxApi from '../../api/ajaxApi/ajaxApi';
import * as utils from '../../common/utils';
import './App.css';

export default class App extends Component {

    componentDidMount() {
        this.initGallery();
    }

    initGallery = () => {
        utils.removeGallery();
    }

    render() {
        return (
            <div className='App'>
                <Dashboard />
            </div>
        );
    }
}
