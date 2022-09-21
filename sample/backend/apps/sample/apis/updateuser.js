/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/

// Custom modules
const { simpleUpdate } = require('../db/db')
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
exports.doService = async jsonReq => {
    // Validate API request and check mandatory payload required
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    try {
        const test = await updateUser(jsonReq);
        if (!test) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { result: true, results: { test } };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const updateUser = async (jsonReq) => {
    try {
        if (jsonReq) {
            const query = `UPDATE employees SET name=?, age=? where id = ?`;
            return simpleUpdate(query, [jsonReq.name, jsonReq.age, jsonReq.id]);
        }
    } catch (error) {
        console.log(jsonReq)
        throw error;
    }
}

const validateRequest = jsonReq => (jsonReq);