create database QuanLyXeMoto;

create table `user` (
    username varchar(20) not null primary key,
    `password` varchar(100) not null,
    email varchar(50),
    phonenumber varchar(13)
);

create table Product(
    id int auto_increment not null primary key,
    `name` varchar(255) not null,
    `image` varchar(255),
    `status` varchar(255) character set utf8 collate utf8_unicode_ci not null,
    `amount` int(11),
    `price` varchar(50)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into `user`(username, `password`, email, phonenumber) values('hieu', '123', 'hieu@gmail.com', '123456789');

insert into product(name, image, status, amount, price) values('Xe Moto 01', 'nike.png', 'Còn Hàng', 4, '100000')