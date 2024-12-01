create table folder(
    id serial not null primary key, --고유 아디 
    full_name varchar not null unique default '', --전체 폴더 이름
    name varchar(20) not null, --폴더 이름
    dic_type varchar(6) default 'folder' not null,

    folder_id integer not null, --부모 폴더

    FOREIGN KEY (folder_id) REFERENCES folders (id) on delete cascade on update cascade,
)

create table file(
    id serial not null primary key, --파일 아이디
    full_name varchar not null unique, --전체 파일 이름
    name varchar(20) not null, --파일 이름
    title varchar(30) not null default '',
    content varchar not null default '',
    dic_type varchar(4) default 'file' not null,

    folder_id integer not null, --부모 폴더
    
    FOREIGN KEY (folder_id) REFERENCES folders (id) on delete cascade on update cascade,
)


create table testfol(
    id serial not null primary key,
    full_name varchar not null,
    name varchar not null,
    fol_id integer not null, 
    
    FOREIGN KEY (fol_id) REFERENCES testfol (id) on delete cascade on update cascade
)

create table testfi(
    id serial not null primary key,
    full_name varchar not null,
    name varchar not null,
    content varchar not null default '',
    fol_id integer not null, 
    
    FOREIGN KEY (fol_id) REFERENCES testfol (id) on delete cascade on update cascade
)