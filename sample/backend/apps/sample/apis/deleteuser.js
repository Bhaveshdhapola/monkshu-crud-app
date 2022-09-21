/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/

// Custom modules
const { simpleDelete } = require('../db/db')
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
exports.doService = async jsonReq => {
    // Validate API request and check mandatory payload required
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    try {
        const user = await deleteUser(jsonReq);
        if (!user) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { result: true, results: { user } };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const deleteUser = async (jsonReq) => {
    try {
        if (jsonReq) {
            const dlt = 'DELETE FROM employees where id = ?'
            return simpleDelete(dlt, [jsonReq.id]);
        }
    } catch (error) {
        console.log(jsonReq)
        throw error;
    }
}

const validateRequest = jsonReq => (jsonReq);