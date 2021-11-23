import config from '../../config/default.json';

import { Api } from './api';


export const apiClient = new Api(config.api.baseUrl);
