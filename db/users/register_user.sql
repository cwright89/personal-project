insert into users (
    username,
    email,
    password
) values (
    ${username},
    ${email},
    ${hash}
)
returning user_id, username, email;