create table folder(
    id serial not null primary key, --고유 아디 
    c_name varchar not null unique, --전체 폴더 이름
    name varchar(20) not null, --폴더 이름
    folder_id varchar not null, --부모 폴더
    FOREIGN KEY (c_name) REFERENCES folder (c_name) on delete cascade on update cascade 
)
create table file(
    id serial not null primary key, --파일 아이디
    c_name varchar not null unique, --전체 파일 이름
    name varchar(20) not null, --파일 이름

    folder_id varchar not null, --부모 폴더
    FOREIGN KEY (c_name) REFERENCES folder (c_name) on delete cascade on update cascade 
)