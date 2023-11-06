use club_central;
select * from user;
select * from location;

insert into community values(1,"TestComm",1,"Test University's official community","['Passionate','Driven','Tech-Savvy']");

insert into belongs_to_comm values(1,1);

insert into club values(1,1,1,
"The technical hub of Test University. We invest in building projects that involve deep-tech like AI/ML, CyberSecurity, Blockchain etc.",
"['Deep-Tech','Innovative','Creative']","Avalanche Tech"
);

alter table message modify column data longtext;

insert into member_of_club values(1,1);

insert into user values(2,"Dexter","dexter@gmail.com","dexter","1","2000-06-19");
insert into belongs_to_comm values(1,2);

insert into club values(2,1,2,
"The official dance club of Test University, where the beat takes over and your inhibitions melt away. ",
"['Hip-hop','Let Loose','Creative']","Rythm Den"
);

insert into member_of_club values(2,2);
insert into member_of_club values(2,1);

select * from member_of_club;
select * from belongs_to_comm;

select * from community;

insert into community values(2,"NiceComm",1,"NiceComm Dance Club's official community","['Creative','Inspiring']");
insert into belongs_to_comm values(2,1);

select c.* from community c left join belongs_to_comm b on c.comm_id=b.comm_id where user_id=1;

select * from club where comm_id=1;
select * from member_of_club where user_id=2;

select * from club c right join member_of_club m on c.club_id = m.club_id where c.comm_id=1 and m.user_id=1;

select * from community;
select * from belongs_to_comm;
select * from club;