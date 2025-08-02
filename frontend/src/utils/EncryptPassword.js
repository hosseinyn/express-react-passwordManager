import CryptoJS from "crypto-js";

const encryptPassword = (password , key) => {
    const encrypted_password = CryptoJS.AES.encrypt(password , key).toString();
    return encrypted_password;
}

const decryptPassword = (password , key) => {
    const decrypted_password = CryptoJS.AES.decrypt(password, key).toString(CryptoJS.enc.Utf8);
    return decrypted_password;
}

export { decryptPassword };
export { encryptPassword };