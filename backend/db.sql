-- table
create table folder(
    id serial not null primary key, --고유 아디 
    fullname text[] not null unique, --전체 폴더 이름
    name varchar(20) not null,
    dic_type varchar(6) default 'folder' not null,

    parent_fullname text[] not null, --부모 폴더
	folder_id integer not null,

    FOREIGN KEY (parent_fullname) REFERENCES folder (fullname) on delete cascade on update cascade,
	FOREIGN KEY (folder_id) REFERENCES folder (id) 
)

create table file(
    id serial not null primary key, --파일 아이디
    fullname text[] not null unique, --전체 파일 이름
    name varchar(20) not null,
    title varchar(30) not null default '',
    content varchar not null default '',
    dic_type varchar(4) default 'file' not null,

    parent_fullname text[] not null, --부모 폴더
    folder_id integer not null,
    
    FOREIGN KEY (parent_fullname) REFERENCES folder (fullname) on delete cascade on update cascade,
	FOREIGN KEY (folder_id) REFERENCES folder (id) 
)

create table fileList(
    id integer not null,
    fullname text[] not null, --전체 파일 이름

    FOREIGN KEY (fullname) REFERENCES file (fullname) on delete cascade on update cascade
)

-- insert
insert into folder values(0, '{}', '', 'folder', '{}', 0)

-- drop
drop table (table_name)
drop function modify_fullname()
drop trigger change_fullname on folder

-- grant 
grant all on (table_name) to sd_name
grant usage, select, update, on sequence (folder_id_seq) to sd_name
-- trigger
create trigger change_fullname
after update of parent_fullname on folder
for each statement 
execute function modify_fullname()

-- function
create function modify_fullname()
returns trigger as $$
begin 
    update folder set fullname = parent_fullname || array[name] where id >= 1;
	update file set fullname = parent_fullname || array[name] where id >= 1;
end;
$$ language plpgsql;
