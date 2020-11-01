import React from 'react';
import ReactDOM from 'react-dom';
import MaqTable from '../index';
import {isTSAnyKeyword} from '@babel/types';

it("Renders wothout crashing", ()=>{
    const div=document.createElement("div");
    ReactDOM.render(<MaqTable></MaqTable>,div)
})