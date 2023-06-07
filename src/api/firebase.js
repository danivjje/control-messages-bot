require('dotenv').config()
const { getDatabase, get, ref, push, set, remove } = require("@firebase/database");
const { initializeApp } = require("firebase/app");

const firebaseConfig = {
    apiKey: process.env.FIREBASE_TOKEN,
    authDomain: "control-messages-bot.firebaseapp.com",
    databaseURL: "https://control-messages-bot-default-rtdb.firebaseio.com",
    projectId: "control-messages-bot",
    storageBucket: "control-messages-bot.appspot.com",
    messagingSenderId: "631760122008",
    appId: "1:631760122008:web:c04b405be630032fd460ed",
    measurementId: "G-J1X9MLED4N",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const getData = async (link) => {
    return await get(ref(database, link)).then(result => result.toJSON());
}

const postData = async (link, sendData) => {
    const reference = ref(database, link);
    const newLink = push(reference);
    return await set(newLink, sendData);
}

const getChat = async (id) => {
    const reference = ref(database, `chats/${id}`);
    return await get(reference).then(result => result.toJSON());
}

const postChat = async (id) => {
    postData(`chats/${id}/messages`, { registered: true });
    postData(`chats/${id}/stickers`, { registered: true });
    postData(`chats/${id}/gifs`, { registered: true });
}

const clearList = async (id, list) => {
    const reference = ref(database, `chats/${id}/${list}`);
    remove(reference);
    postData(`chats/${id}/${list}`, { registered: true });
}

const removeData = async (link) => {
    const reference = ref(database, link)
    remove(reference);
};

module.exports = {
    getData, postData, postChat, getChat, clearList, removeData
};