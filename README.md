# Booking App

## Table of contents
* [General info](#general-info)
* [Features](#features)
* [Setup](#setup)

## General info
This project is simple a application that demonstrates an E-commerce website with live chat using the MERN stack and Socket.io.<br/>

### Structures
#### 1. Client side
  - The application loads data from API and displays them.
  - Users can select to display products in a single category, click on any product to get more information including pricing and add them to their shopping cart then checkout.
  - Auto update Available stock quantity when having new order with Socket.io.
  - Realtime chat (Socket.io) with Admins and Associates.
#### 2. Admin side
  - Authorization for Admin and Associates role (Chat function only).
  - Dashboard for Revenue, Orders, and Users.
  - Create new, Update and Delete Products (with multiple images upload).
  - Live chat with Client: each Conversation must include up to 2 members and is only visible to the relevant member, Admin can view all Conversations.
#### 3. API
  - Connect to the database.
  - Perform Authentication and Authorization with the incoming request.
  - Respond with appropriate Resources, Errors, and Status codes.
### Demo
- [Client page](https://booking-client.onrender.com)  
- [Admin page](https://booking-admin.onrender.com)
- [Server page](https://booking-server.onrender.com)

## Features
* Uses React Js for UI
* Backend using NodeJs
* Authentication using JWT
* MongoDB for database
* CSS styled-components
* UI Components libraries: Bootstrap and Material-UI
* Responsive
 	
## Setup
To run this project, install it locally using npm and change the mongoDB url, Cloudinary API Key, and Gmail.

