export const createDatabase = `
    create database if not exists wallet
`;
export const createUserTable = `
    create table if not exists user_t(
        id int auto_increment primary key,
        username varchar(50),
        phone_number varchar(25),
        password varchar(50),
        verified bit
    )
`

export const selectUserByPhoneNum = `
    select * from user_t
    where phone_number = ?
`

export const insertUser = `
    insert into user_t(id, username, phone_number, password, verified)
    values(null,?,?,?,0)
`

export const updateVerificationState = `
    update user_t
    set verified = 1
    where phone_number = ?
`

export const checkUser = `
    select * from user_t
    where phone_number=? and password=? and verified=1
`