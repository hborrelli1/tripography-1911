import $ from 'jquery';
import domUpdates from './domUpdates';

import './css/base.scss';

import './images/turing-logo.png'

import DataController from './data-controller';

let dataController = new DataController();

dataController.getTravelers();
