-- Generates necessary tables for Cumlus.af

drop table if exists accounts;
drop table if exists files;

create table accounts (
	id integer primary key autoincrement,
	email text not null,
	password text not null
);

create table files (
	name text not null,
	uploaded_at timestamp not null,
	account integer not null,

	foreign key(account) references accounts(id)
);