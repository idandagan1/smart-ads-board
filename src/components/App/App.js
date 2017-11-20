import React, { Component } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import * as ajaxApi from '../../api/ajaxApi/ajaxApi';
import './App.css';

export default class App extends Component {

    componentDidMount() {
        ajaxApi.initGroupList();
    }

    render() {
        return (
            <div className='App'>
                <Dashboard />
            </div>
        );
    }
}
