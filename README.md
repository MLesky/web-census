#
**## WEB CENSUS APPLICATION**

## Task:

Build a beautiful web application which allows users to make a census of the population of a country. The platform allows to store the information as follow:

- Only users above 21 years are permitted to register on the platform
- A user registers with the description (number of male and female) of the children he/she has
- Of late children are not considered
- Each user has to indicate the number of children he/she has who are above and under 21 years old
- Users also indicate their names, address, place and date of birth,...
- The platform should be able to generate the list of registered users (the platform gives possibility to download)
- The platform should be able to display statistics (total number of male, female, under 21,....) per region

## Users

1. **Admins**
 Admins can register users, view statistics and info about users and download the list of registered uses
2. **Users**

Users can register, view and update their information

## Features:

1.
### Registration

Users register with the following information;

- Firstname
- Secondname
- Surname
- Date of birth (least date must be 21 years ago from current date)
- Gender
- Number of alive male and female children below 21 years
- Number of alive male and female children above 20 years
- Place of birth
- Address

          - Region, town, division, sub division, village, other ...

1.
### Update

Users should be able to update their information such as address and number of children alive

1.
### Download

Admin should be able to download a pdf for certain information such as list of registered users

1.
### Statistics

The platform should display statistics from all the registered users in the form of bars and charts

1.
### Search/Filter

Admins should be able to search and filter users, places, etc

## Statistics

1.
### Country (The whole system)

- Total number registered
- Average Age
- Oldest Age
- All registered users (Table)
- Male to female percentage (pie chart)
- Number of users per region (bar chart)
- Number of users per age group/date of birth (bar chart) _(age group is set by an age step integer value)_
- Number of users per place of birth (bar chart)

### Region

- Total number registered
- Average Age
- Oldest Age
- All registered users (Table)
- Male to female percentage (pie chart)
- Number of users per division (bar chart)
- Number of users per age group/date of birth (bar chart) _(age group is set by an age step integer value)_
- Number of users per place of birth (bar chart)

### Division

- Total number registered
- Average Age
- Oldest Age
- All registered users (Table)
- Male to female percentage (pie chart)
- Number of users per sub-division, village and town (bar chart)
- Number of users per age group/date of birth (bar chart) _(age group is set by an age step integer value)_
- Number of users per place of birth (bar chart)

## Navigation and Pages

### User

- Registration page
- Login
- Profile page (View info and update)

### Admin

- Registration page/form **(register new users)**
- Login
- Dashboard

    - Home/Default/Country
    - Regions tab (View regions)
    - Divisions tab (View divisions)
    - Users tab (view all users)

## UI/UX Designs

- [Design](https://www.figma.com/file/6a44OaA92bbthgsrVPdpLO/CHIELE-CENSUS?type=design&node-id=0%3A1&mode=design&t=aMNMaaJrTzBXBiqe-1)
- [Prototype](https://www.figma.com/proto/FADLwPUjddQtKD36Xh3PQU/School-Docs?type=design&node-id=401-740&t=wB9waiirRCfAVOFI-0&scaling=min-zoom&page-id=1%3A6&starting-point-node-id=401%3A740)


### Get Project

#### Clone repo
    npm clone https://github.com/MLesky/web-census.git

#### Get dependencies
    cd web-census
    npm install

#### Run App
    npm start

### URL
    / - for register page
    /dashboard - for dashboard
