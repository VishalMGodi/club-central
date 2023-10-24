create database club_central;
use club_central;


create table user(
    user_id INT,
    username VARCHAR(30) unique,
    email VARCHAR(30) unique,
    passwd VARCHAR(30),
    location_id INT,
    date_of_birth date,
    PRIMARY KEY(user_id)
);

create table community(
    comm_id INT,
    comm_name VARCHAR(30),
    location_id INT,
    comm_description LONGTEXT,
    comm_tags LONGTEXT,
    PRIMARY KEY(comm_id)
);

create table club(
    club_id INT,
    comm_id INT,
    club_head_id INT,
    club_description LONGTEXT,
    club_tags LONGTEXT,
    club_name VARCHAR(30),
    PRIMARY KEY(club_id)
);

create table event(
    event_id INT,
    club_id INT,
    event_name VARCHAR(30),
    prize_money INT,
    team_size VARCHAR(20),
    event_type VARCHAR(20), 
    event_mode enum("Online","Offline","Hybrid"),
    event_description longtext,
    start_time datetime,
    end_time datetime,
    PRIMARY KEY(event_id)
);

create table roles(
    role_id INT,
    club_id INT,
    role_name VARCHAR(30),
    role_permissions INT,
    role_description longtext,
    PRIMARY KEY(role_id)
);

create TABLE form (
    form_id INT,
    contact_info VARCHAR(30),
    community_id INT,
    auth_id VARCHAR(50),
    PRIMARY KEY(form_id)
);

create table proof(
    form_id INT,
    data INT,
    primary key(form_id, data)
);
create table belongs_to_comm(
    comm_id INT,
    user_id INT,
    primary key(comm_id, user_id)
);
create table member_of_club(
    club_id INT,
    user_id INT,
    primary key(club_id, user_id)
);


CREATE TABLE submit_form(
    user_id INT,
    form_id INT,
    PRIMARY KEY(user_id, form_id)
);
CREATE TABLE location(
    location_id INT,
    country VARCHAR(30),
    state VARCHAR(30), 
    city VARCHAR(30),
    PRIMARY KEY(location_id)
);
CREATE TABLE is_granted_role(
    user_id INT,
    role_id INT,
    PRIMARY KEY(user_id, role_id)
);
CREATE TABLE register_for_event(
    user_id INT,
    event_id INT,
    time DATETIME,
    PRIMARY KEY(user_id, event_id)
);
CREATE TABLE message(
    user_id INT,
    club_id INT,
    message_id INT,
    data BLOB,
    PRIMARY KEY(user_id, club_id, message_id)
);

ALTER TABLE register_for_event ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id) REFERENCES user (user_id);
ALTER TABLE register_for_event ADD CONSTRAINT fk_event_id
FOREIGN KEY (event_id) REFERENCES user (event_id);

ALTER TABLE event ADD CONSTRAINT fk_club_id
FOREIGN KEY (club_id) REFERENCES club (club_id);

ALTER TABLE roles ADD CONSTRAINT fk_club_id
FOREIGN KEY (club_id) REFERENCES club (club_id);

ALTER TABLE club ADD CONSTRAINT fk_comm_id
FOREIGN KEY (comm_id) REFERENCES community (comm_id);
ALTER TABLE club ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id) REFERENCES user (user_id);

ALTER TABLE member_of_club ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id) REFERENCES user (user_id);
ALTER TABLE member_of_club ADD CONSTRAINT fk_club_id
FOREIGN KEY (club_id) REFERENCES club (club_id);

ALTER TABLE belongs_to_comm ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id) REFERENCES user (user_id);
ALTER TABLE belongs_to_comm ADD CONSTRAINT fk_comm_id
FOREIGN KEY (comm_id) REFERENCES community (comm_id);

ALTER TABLE is_granted_role ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id) REFERENCES user (user_id);
ALTER TABLE is_granted_role ADD CONSTRAINT fk_role_id
FOREIGN KEY (role_id) REFERENCES role (role_id);

ALTER TABLE message ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id) REFERENCES user (user_id);
ALTER TABLE member_of_club ADD CONSTRAINT fk_club_id
FOREIGN KEY (club_id) REFERENCES club (club_id);

ALTER TABLE user ADD CONSTRAINT fk_location_id
FOREIGN KEY (location_id) REFERENCES location (location_id);

ALTER TABLE community ADD CONSTRAINT fk_location_id
FOREIGN KEY (location_id) REFERENCES location (location_id);

ALTER TABLE submit_form ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id) REFERENCES user (user_id);
ALTER TABLE submit_form ADD CONSTRAINT fk_form_id
FOREIGN KEY (form_id) REFERENCES form (form_id);

ALTER TABLE form ADD CONSTRAINT fk_comm_id
FOREIGN KEY (comm_id) REFERENCES community (comm_id);

ALTER TABLE proof ADD CONSTRAINT fk_form_id
FOREIGN KEY (form_id) REFERENCES form (form_id);



-- -- # Primary Key Constraint
-- ALTER TABLE table_name ADD CONSTRAINT pk_constraint_name
-- PRIMARY KEY (column_name);

-- -- Foreign Key Constraint
-- ALTER TABLE child_table_name ADD CONSTRAINT fk_constraint_name
-- FOREIGN KEY (child_column_name) REFERENCES parent_table_name (parent_column_name);

-- -- Unique Constraint
-- ALTER TABLE table_name ADD CONSTRAINT unique_constraint_name
-- UNIQUE (column_name);

-- -- Check Constraint
-- ALTER TABLE table_name
-- ADD CONSTRAINT check_constraint_name CHECK (condition);

-- -- Default Constraint
-- ALTER TABLE table_name
-- ALTER COLUMN column_name SET DEFAULT default_value;

-- -- Not Null Constraint:
-- ALTER TABLE table_name
-- MODIFY column_name data_type NOT NULL;
