import bcrypt from "bcrypt"

const generatePassword = async (password) => {
    let hashed_password = await bcrypt.hash(password , 10)
    return hashed_password;
}

const checkPassword = async (password , hashed) => {
    let isCorrect = await bcrypt.compare(password , hashed)
    return isCorrect;
}

export {generatePassword};
export {checkPassword};