create table folder(
    id serial not null primary key, --고유 아디 
    nidx integer not null,
    full_name text[] not null, --전체 폴더 이름
    name varchar(20) not null, --폴더 이름
    dic_type varchar(6) default 'folder' not null,

    folder_id integer not null, --부모 폴더

    FOREIGN KEY (folder_id) REFERENCES folder (id) on delete cascade on update cascade
)

create table file(
    id serial not null primary key, --파일 아이디
    nidx integer not null,
    full_name text[] not null unique, --전체 파일 이름
    name varchar(20) not null, --파일 이름
    title varchar(30) not null default '',
    content varchar not null default '',
    dic_type varchar(4) default 'file' not null,

    folder_id integer not null, --부모 폴더
    
    FOREIGN KEY (folder_id) REFERENCES folder (id) on delete cascade on update cascade
)

create table fileList(
    id integer not null,
    nidx integer not null,
    full_name text[] not null, --전체 파일 이름
    name varchar(20) not null, --파일 이름
    title varchar(30) not null default '',
    content varchar not null default '',

    FOREIGN KEY (id) REFERENCES file (id) on delete cascade on update cascade
)
