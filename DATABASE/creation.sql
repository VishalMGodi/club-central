-- drop database club_central2;
create database club_central2;
use club_central2;


create table user(
    user_id INT AUTO_INCREMENT,
    username VARCHAR(30) unique,
    email VARCHAR(30) unique,
    passwd VARCHAR(30),
    location_id INT,
    date_of_birth date,
    PRIMARY KEY(user_id)
);

create table community(
    comm_id INT AUTO_INCREMENT,
    comm_head_id INT,
    comm_name VARCHAR(30),
    location_id INT,
    comm_description LONGTEXT,
    comm_tags LONGTEXT,
    PRIMARY KEY(comm_id)
);

create table club(
    club_id INT AUTO_INCREMENT,
    comm_id INT,
    club_head_id INT,
    club_description LONGTEXT,
    club_tags LONGTEXT,
    club_name VARCHAR(30),
    PRIMARY KEY(club_id)
);

create table event(
    event_id INT AUTO_INCREMENT,
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
    role_id INT AUTO_INCREMENT,
    club_id INT,
    role_name VARCHAR(30),
    role_permissions INT,
    role_description longtext,
    PRIMARY KEY(role_id)
);

create TABLE form (
    form_id INT AUTO_INCREMENT,
    contact_info VARCHAR(30),
    comm_id INT,
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
    location_id INT AUTO_INCREMENT,
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
    message_id INT AUTO_INCREMENT,
    data BLOB,
    PRIMARY KEY(message_id) --PRIMARY KEY(user_id, club_id, message_id)
);

ALTER TABLE register_for_event ADD CONSTRAINT fk_rfe_user_id
FOREIGN KEY (user_id) REFERENCES user (user_id);
ALTER TABLE register_for_event ADD CONSTRAINT fk_rfe_event_id
FOREIGN KEY (event_id) REFERENCES user (user_id);

ALTER TABLE event ADD CONSTRAINT fk_event_club_id
FOREIGN KEY (club_id) REFERENCES club (club_id);

ALTER TABLE roles ADD CONSTRAINT fk_roles_club_id
FOREIGN KEY (club_id) REFERENCES club (club_id);

ALTER TABLE club ADD CONSTRAINT fk_club_comm_id
FOREIGN KEY (comm_id) REFERENCES community (comm_id);
ALTER TABLE club ADD CONSTRAINT fk_club_user_id
FOREIGN KEY (club_head_id) REFERENCES user (user_id);

ALTER TABLE member_of_club ADD CONSTRAINT fk_moc_user_id
FOREIGN KEY (user_id) REFERENCES user (user_id);
ALTER TABLE member_of_club ADD CONSTRAINT fk_moc_club_id
FOREIGN KEY (club_id) REFERENCES club (club_id);

ALTER TABLE belongs_to_comm ADD CONSTRAINT fk_btc_user_id
FOREIGN KEY (user_id) REFERENCES user (user_id);
ALTER TABLE belongs_to_comm ADD CONSTRAINT fk_btc_comm_id
FOREIGN KEY (comm_id) REFERENCES community (comm_id);

ALTER TABLE is_granted_role ADD CONSTRAINT fk_igr_user_id
FOREIGN KEY (user_id) REFERENCES user (user_id);
ALTER TABLE is_granted_role ADD CONSTRAINT fk_igr_role_id
FOREIGN KEY (role_id) REFERENCES roles (role_id);

ALTER TABLE message ADD CONSTRAINT fk_message_user_id
FOREIGN KEY (user_id) REFERENCES user (user_id);
ALTER TABLE member_of_club ADD CONSTRAINT fk_message_club_id
FOREIGN KEY (club_id) REFERENCES club (club_id);

ALTER TABLE user ADD CONSTRAINT fk_user_location_id
FOREIGN KEY (location_id) REFERENCES location (location_id);

ALTER TABLE community ADD CONSTRAINT fk_community_location_id
FOREIGN KEY (location_id) REFERENCES location (location_id);
ALTER TABLE community ADD CONSTRAINT fk_community_club_head_id
FOREIGN KEY (club_head_id) REFERENCES user (user_id);

ALTER TABLE submit_form ADD CONSTRAINT fk_sf_user_id
FOREIGN KEY (user_id) REFERENCES user (user_id);
ALTER TABLE submit_form ADD CONSTRAINT fk_sf_form_id
FOREIGN KEY (form_id) REFERENCES form (form_id);

ALTER TABLE form ADD CONSTRAINT fk_form_comm_id
FOREIGN KEY (comm_id) REFERENCES community (comm_id);

ALTER TABLE proof ADD CONSTRAINT fk_proof_form_id
FOREIGN KEY (form_id) REFERENCES form (form_id);


DELIMITER $$
CREATE PROCEDURE AddUserWithLocationProcedure(
    IN user_name VARCHAR(30),
    IN user_email VARCHAR(30),
    IN user_password VARCHAR(30),
    IN location_country VARCHAR(30),
    IN location_state VARCHAR(30),
    IN location_city VARCHAR(30)
)
BEGIN
    DECLARE user_location_id INT;

    SELECT location_id INTO user_location_id FROM location
    WHERE country = location_country AND state = location_state AND city = location_city;

    -- If the location does not exist, insert a new location
    IF user_location_id IS NULL THEN
        INSERT INTO location (country, state, city)
        VALUES (location_country, location_state, location_city);
        
        SET user_location_id = LAST_INSERT_ID();
    END IF;

    -- Insert user into the Users table with the location_id
    INSERT INTO user (username, email, passwd, location_id)
    VALUES (user_name, user_email, user_password, user_location_id);
END;
$$
DELIMITER ;

DROP PROCEDURE IF EXISTS newComm;
delimiter //
create procedure newComm(in name varchar(30),in description longtext,in head_id int)
begin
declare comm int;
insert into community(comm_name,comm_description,comm_head_id) values(name,description,head_id);
select max(comm_id) from community into comm;
insert into belongs_to_comm values(comm,head_id);
end
//
DELIMITER ;

DROP PROCEDURE IF EXISTS newClub;
delimiter //
create procedure newClub(in name varchar(30),in description longtext,in comm int, in head varchar(30))
begin
declare guy int;
declare clubby int;
select user_id into guy from user where username=head;
insert into club(comm_id,club_head_id,club_description,club_name) values(comm,guy,description,name);
select max(club_id) from club into clubby;
insert into member_of_club values(clubby,guy);
end;
//
delimiter ;


DROP PROCEDURE IF EXISTS sendCommReq;
delimiter //
create procedure sendCommReq(in name varchar(30),in id int)
begin
declare guy int;
select user_id into guy from user where username=name;
insert into comm_requests(comm_id,user_id) values(id,guy);
end;
//
delimiter ;

DROP PROCEDURE IF EXISTS sendClubReq;
delimiter //
create procedure sendClubReq(in name varchar(30),in id int)
begin
declare guy int;
select user_id into guy from user where username=name;
insert into club_requests(club_id,user_id) values(id,guy);
end;
//
delimiter ;

DROP PROCEDURE IF EXISTS handleCommReq
delimiter //
create procedure handleCommReq(in decision varchar(10), in id int)
begin
	declare userid int;
    declare commid int;
	if decision = "true" then
		select comm_id into commid from comm_requests where req_id=id;
        select user_id into userid from comm_requests where req_id=id;
        insert into belongs_to_comm values(commid,userid);
	end if;
    delete from comm_requests where req_id=id;
end //
delimiter ;

DROP PROCEDURE IF EXISTS handleClubReq;
delimiter //
create procedure handleClubReq(in decision varchar(10), in id int)
begin
	declare userid int;
    declare clubid int;
	if decision = "true" then
		select club_id into clubid from club_requests where req_id=id;
        select user_id into userid from club_requests where req_id=id;
        insert into member_of_club values(clubid,userid);
	end if;
    delete from club_requests where req_id=id;
end //
delimiter ;

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
