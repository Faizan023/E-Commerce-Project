Create DataBase OnlineShop;
use OnlineShop;

Create Table Customers(
Id Int Identity(1,1) Not Null,
FirstName Varchar(15) Not Null,
LastName Varchar(15) Not Null,
Email Varchar(50) Not Null,
Password  varchar(10) Not Null,
Gender Varchar(10) Not Null,
PhoneNumber Varchar(10) Not Null,
DateOfBirth Date Not Null,
Address Varchar(100) Not Null,
CreatedDateTime Datetimeoffset Not Null,
CreatedBy int Not Null,
UpdatedDateTime Datetimeoffset Null,
UpdatedBy int Null,
Active Bit Not Null,
ActivationDate Datetimeoffset Not Null,
ActivationKey Varchar(5) Not Null,

Constraint PK_CId Primary Key (Id)
);

Create Table Products(
Id Int Identity(1,1) Not Null,
Img VarBinary(max) Not Null,
Name Varchar(30) Not Null,
CategoryId Int Not Null,
Description Varchar(100) Not Null,
Price Int Not Null,
Discount Int Not Null,
Quantity Int Not Null,
Color Varchar(15) Not Null,
Measurment Varchar(15) Not Null,
MesurmentValue Varchar(10) Not Null,
BrandId Int Not Null,
CreatedDateTime DateTimeOffset Not Null,
UpdatedDateTime DateTimeOffset Null,
CreatedBy Int Not Null,
UpdatedBy Int Null,

Constraint Pk_PId Primary Key (Id),
Constraint Fk_Cid Foreign Key (CategoryId) References ProductCategories(Id),
Constraint Fk_BId Foreign Key (BrandId) References Brands(Id)
);

Create Table Orders(
Id Int Identity(1,1) Not Null,
CustomerId Int Not Null,
Quantity Int Not Null,
Amount Int Not Null,
ProductId Int Not Null,
PaymentMethod Varchar(20) Not Null,
OrderDate DateTimeOffset Not Null,
DeliveryAddress Varchar(100) Not Null,
BillingAddress Varchar(100) Not Null,
DeliveryDate Date Not Null,
DeliveryCharge Int Not Null,
Status Varchar(20) Not Null,
CreatedDateTime DateTimeOffset Not Null,
UpdatedDateTime DateTimeOffset Null,
CreatedBy Int Not Null,
UpdatedBy Int Null,

Constraint Pk_OId Primary Key (Id),
Constraint Fk_CustomerId Foreign Key (CustomerId) References Customers(Id),
Constraint Fk_PId Foreign Key (ProductId) References Products(Id)
);

Create Table Cart(
Id Int Identity(1,1) Not Null,
CustomerId Int Not Null,
ProductId Int Not Null,
CreateDateTime DateTimeOffset Not Null,
UpdateDateTime DateTimeOffset Null,
Quantity Int Not Null,
CreatedBy Int Not Null,
UpdatedBy Int Null,

Constraint Pk_CartId Primary Key (Id),
Constraint Fk_CustomerCart Foreign Key (CustomerId) References Customers (Id),
Constraint Fk_ProductCart Foreign Key (ProductId) References Products (Id)
);

Create Table ProductCategories(
Id Int Identity(1,1) Not Null,
Name Varchar(20) Not Null,
CreateDateTime DateTimeOffset Not Null,
UpdateDateTime DateTimeOffset Null,
CreatedBy Int Not Null,
UpdatedBy Int Null,

Constraint Pk_CategoryId Primary Key (Id)
);

Create Table Users(
Id Int Identity(1,1) Not Null,
FirstName Varchar(15) Not Null,
LastName Varchar(15) Not Null,
Email Varchar(50) Not Null,
RoleId Int Not Null,
Password Varchar(15) Not Null,
CreateDateTime DateTImeOffset Not Null,
UpdateDateTime DateTimeOffset Null,
CreatedBy Int Not Null,
UpdatedBy Int Null,

Constraint Pk_UserId Primary Key (Id),
Constraint Fk_RoleId Foreign Key (RoleId) References Roles (Id)
);
Create Table Roles(
Id Int Identity(1,1) Not Null,
Name Varchar(20) Not Null,
CreatedBy Int Not Null,
UpdatedBy Int Null,

Constraint Pk_RoleId Primary Key (Id)
);


Create Table Sales(
Id Int Identity(1,1) Not Null,
Name Varchar(20) Not Null,
StartDate Date Not Null,
EndDate Date Not Null,
CreateDateTime DateTimeOffset Not Null,
UpdateDateTime DateTimeOffset Null,
CreatedBy Int Not Null,
UpdatedBy Int Null,

Constraint PK_SalesId Primary Key (Id)
);

Create Table Brands(
Id Int Identity(1,1) Not null,
Name Varchar(20) Not Null,
CreateDateTime DateTimeOffset Not Null,
UpdateDateTime DateTimeOffset Null,
CreatedBy Int Not Null,
UpdatedBy Int Null,

Constraint Pk_BrandId Primary Key (Id)
);

Create Table ProductMappings(
Id Int Identity(1,1) Not Null,
SaleId Int Not Null,
ProductId Int Not Null,	
CreateDateTime DateTimeOffset Not Null,
UpdateDateTime DateTimeOffset Null,
CreatedBy Int Not Null,
UpdatedBy Int Null,

Constraint Pk_MapId Primary Key (Id),
Constraint Fk_SaleId Foreign Key (SaleId) References Sales (Id),
Constraint Fk_ProductsId Foreign Key (ProductId) References Products (Id)
);