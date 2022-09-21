/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/

// const { APPROOTDIR } = require("../../../server/lib/constants");

// Custom modules
// console.log(APPROOTDIR)
const { simpleSelect } = require('../db/db')
const API_CONSTANTS =
    require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
exports.doService = async jsonReq => {
    // Validate API request and check mandatory payload required
    if (!validateRequest(jsonReq)) return
    API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    try {
        const user = await getUserByID(jsonReq);
        // console.log(employees)
        if (!user) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { result: true, results: { user } };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const getUserByID = async (jsonReq) => {
    try {
        // const data = [];
        if (jsonReq) {
            const select = 'SELECT * FROM employees where id = ?';
            return simpleSelect(select, [jsonReq.id]).then(res => {return res});
            // return data;
        }
        // return "This is your first API";
    } catch (error) {
        throw error;
    }
}

// const getUserByID = async (jsonReq) => {
//     try {
//         // const data = [];
//         if (jsonReq) {
//             // const select = 'SELECT * FROM employees';
//             // return simpleSelect(select).then(res => {return res});
//             // return data;
//             return "This is your first API";
//         }
//     } catch (error) {
//         throw error;
//     }
// }
const validateRequest = jsonReq => (jsonReq);