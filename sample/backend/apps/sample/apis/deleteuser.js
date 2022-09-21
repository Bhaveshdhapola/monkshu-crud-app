/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/

// const { APPROOTDIR } = require("../../../server/lib/constants");

// Custom modules
// console.log(APPROOTDIR)
const { simpleDelete } = require('../db/db')
const API_CONSTANTS =
    require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
exports.doService = async jsonReq => {
    // Validate API request and check mandatory payload required
    if (!validateRequest(jsonReq)) return
    API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    try {
        const test = await deleteUser(jsonReq);
        // console.log(employees)
        if (!test) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { result: true, results: { test } };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const deleteUser = async (jsonReq) => {
    try {
        // const data = [];
        // let res = JSON.parse(jsonReq);
        if (jsonReq) {
            const dlt = 'DELETE FROM employees where id = ?'

            // console.log(jsonReq)
            // const select = 'SELECT * FROM employees';
            // return "hey";
            return simpleDelete(dlt, [jsonReq.id]);
            // return simpleInsert('employees', { name: jsonReq.name, age: jsonReq.age });

            // return data;
            // return "This is your first API";
        }
    } catch (error) {
        console.log(jsonReq)
        throw error;
    }
}

// const getAllData = async (jsonReq) => {
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