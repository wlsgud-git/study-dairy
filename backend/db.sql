create table folder(
    id serial not null primary key, --고유 아디 
    fullname text[] not null unique, --전체 폴더 이름
    name varchar(20) not null,
    dic_type varchar(6) default 'folder' not null,

    parent_fullname text[] not null, --부모 폴더
	folder_id integer not null,

    FOREIGN KEY (parent_fullname) REFERENCES folder (fullname) on update cascade,
	FOREIGN KEY (folder_id) REFERENCES folder (id) on delete cascade
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
    
    FOREIGN KEY (parent_fullname) REFERENCES folder (fullname) on update cascade,
	FOREIGN KEY (folder_id) REFERENCES folder (id) on delete cascade
)

create table fileList(
    id integer not null,
    full_name text[] not null, --전체 파일 이름

    FOREIGN KEY (full_name) REFERENCES file (full_name) on delete cascade on update cascade
)
