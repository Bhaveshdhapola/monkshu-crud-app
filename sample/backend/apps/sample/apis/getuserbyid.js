/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/

// Custom modules
const { simpleSelect } = require('../db/db')
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
exports.doService = async jsonReq => {
    // Validate API request and check mandatory payload required
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    try {
        const user = await getUserByID(jsonReq);
        if (!user) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { result: true, results: { user } };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const getUserByID = async (jsonReq) => {
    try {
        if (jsonReq) {
            const select = 'SELECT * FROM employees where id = ?';
            return simpleSelect(select, [jsonReq.id]).then(res => { return res });
        }
    } catch (error) {
        throw error;
    }
}

const validateRequest = jsonReq => (jsonReq);