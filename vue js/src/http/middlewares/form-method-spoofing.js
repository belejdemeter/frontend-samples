import store from '../../store';
import _ from 'lodash';

/**
 * HTML forms do not support PUT, PATCH or DELETE actions. 
 * So, when defining PUT, PATCH or DELETE routes that are called from an HTML form, 
 * you will need to add a hidden _method field to the form. 
 * The value sent with the _method field will be used as the HTTP request method
 */
export default {
	type: 'request',
	handler: (config) => {
		if (config.method != 'get' && config.method != 'post') {
		    if (config.data instanceof FormData) {
		        config.data.append('_method', _.toUpper(config.method));
		        config.method = 'post';
		    }
		}
	    return config;
	}
};