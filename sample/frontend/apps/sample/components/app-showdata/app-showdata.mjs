/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed license.txt file.
*/
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";
import { APP_CONSTANTS } from "../../js/constants.mjs";


// This function adds the user to the database
const addUser = async () => {
    let name = app_showdata.shadowRoot.querySelector("#name").value;
    let age = app_showdata.shadowRoot.querySelector("#age").value;

    if (!name || !age) {
        alert("Enter the user details to add!");
        return;
    }
    if (isNaN(parseInt(age))) {
        alert("Enter Correct age in numbers");
        return;
    }
    const data = {
        "name": name,
        "age": age
    }

    let resp = await apiman.rest(APP_CONSTANTS.API_ADD_USER, "POST", data, false, true);
    if (!resp.result) router.reload();
    app_showdata.shadowRoot.querySelector("#name").value = '';
    app_showdata.shadowRoot.querySelector("#age").value = '';
    getAllUser();
}

// This function fetch all the users from the database
const getAllUser = async () => {
    let resp = await apiman.rest(APP_CONSTANTS.API_SHOWUSER, "POST", {}, false, true);
    if (!resp.result) router.reload();

    app_showdata.shadowRoot.querySelector("#users").innerHTML = "";

    for (let i = 0; i < resp.results.userDetails.length; i++) {
        let userDetailsRow = document.createElement("tr");
        userDetailsRow.innerHTML = `<td>${resp.results.userDetails[i].name}</td> <td>${resp.results.userDetails[i].age}</td> 
                        <td><input type='button' value='Edit' onclick='monkshu_env.components["app-showdata"].getUserDataByID(${resp.results.userDetails[i].id})'/>
                        <input type='button' value='Delete' onclick='monkshu_env.components["app-showdata"].deleteData(${resp.results.userDetails[i].id})'/></td>`;
        app_showdata.shadowRoot.querySelector("#users").appendChild(userDetailsRow);
    }
}

/* This function delete the user from the database
*  @param {number} id - to find the user by id for delete
*/
const deleteData = async (id) => {
    let permission = confirm("Are you sure about deleting this user?");
    if (!permission) return;
    const data = { id: id }
    let resp = await apiman.rest(APP_CONSTANTS.API_DELETE_USER, "POST", data, false, true);
    if (!resp || !resp.result) router.reload();
    console.log("Deleted")
    getAllUser();
}

// This function gives the user details in the input box
const getUserDataByID = async (id) => {
    const data = { id: id }
    let resp = await apiman.rest(APP_CONSTANTS.API_USER_DATA_BY_ID, "POST", data, false, true);
    if (!resp.result) router.reload();
    app_showdata.shadowRoot.querySelector("#name").value = resp.results.user[0].name;
    app_showdata.shadowRoot.querySelector("#age").value = resp.results.user[0].age;
    app_showdata.shadowRoot.querySelector("#get-user-details").style.display = "none";
    app_showdata.shadowRoot.querySelector("#add-user-details").style.display = "none";
    app_showdata.shadowRoot.querySelector("#update-user-details").style.display = "inline";
    app_showdata.shadowRoot.querySelector("#selected_user_id").innerText = id;
}

/* This function updates the user details in the database
*  @param {number} id - to find the user by id for update details
*/
const updateUser = async () => {
    // let id = app_showdata.shadowRoot.querySelector("#selected_user_id");
    // console.log( app_showdata.shadowRoot.querySelector("#selected_user_id").innerText)
    let name = app_showdata.shadowRoot.querySelector("#name").value;
    let age = app_showdata.shadowRoot.querySelector("#age").value;
    if (!name || !age) {
        alert("Fill all the details in order to update the data");
        return;
    }
    if (isNaN(parseInt(age))) {
        alert("Enter Correct age in numbers");
        return;
    }
    const data = {
        id: app_showdata.shadowRoot.querySelector("#selected_user_id").innerText,
        name: name,
        age: age
    }
    let resp = await apiman.rest(APP_CONSTANTS.API_UPDATE_USER, "POST", data, false, true);
    if (!resp || !resp.result) router.reload();
    console.log("Updated")
    app_showdata.shadowRoot.querySelector("#selected_user_id").innerText = "";
    app_showdata.shadowRoot.querySelector("#name").value = "";
    app_showdata.shadowRoot.querySelector("#age").value = "";
    app_showdata.shadowRoot.querySelector("#get-user-details").style.display = "inline";
    app_showdata.shadowRoot.querySelector("#add-user-details").style.display = "inline";
    app_showdata.shadowRoot.querySelector("#update-user-details").style.display = "none";
    getAllUser();
}
function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("app-showdata",
        `${APP_CONSTANTS.APP_PATH}/components/app-showdata/app-showdata.html`,
        app_showdata);
}
const trueWebComponentMode = true; // making this false renders the component without using Shadow DOM
export const app_showdata = {
    trueWebComponentMode, register,
    getAllUser, addUser, deleteData, updateUser, getUserDataByID
}