create table users(
user_id serial primary key,
is_admin BOOLEAN default false,
username varchar (25) not null,
email varchar (150) not null,
password varchar(250) not null,
profile_picture text,
is_superuser BOOLEAN default false
)

create table blog_post(
    post_id serial primary key,
    user_id int references users(user_id),
    post_title varchar (250)
    post_text text
)

create table comment (
    comment_id serial primary key,
    user_id int references users(user_id),
    post_id int references blog_post(post_id),
    comment_text text
)