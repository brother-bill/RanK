# [RanK](https://rugged-hot-springs-35104.herokuapp.com/)
**Note:** Since I am using Heroku's free hobby plan, the application will go to sleep after being inactive for some time. This will cause a noticeable delay when starting up the application again.

RanK is a fully deployed web application created using the MERN stack.
It allows a user to authenticate through Google OAuth and create listings that rank specific characters based on popularity.

## Application in action with Form Validation
<img src="https://github.com/TahaBilalCS/RanK/blob/master/demo/action.gif"/>

## Features
* State Management and Redux Devtools Extension Compatibility
* Scheduled Database Updates
* Authenticated Routing
* Basic CRUD Operations
* Form Validation
* Toggle between **Dark/Light** mode using Local Storage


## Front End
**React**, **Redux/Thunk**, and **Redux Forms**  were used to design the front end with Semantic UI. 
Developing the front end of this application helped me understand why Redux is important when we are already updating/retreiving information from a database.
When performing CRUD operations without Redux, I noticed a slight delay in the retreival of my updated components. But by managing my state correctly, I am able to more quickly
reflect my changes while double checking it's accuracy with the database. Although Redux is a bit overkill for a CRUD only application, I quickly began to value it's
potential when working with more complex applications that manage state outside the scope of a database.

## Back End
**NodeJS/ExpressJS** and **Mongoose** were used to develop the backend while **Heroku** and **MongoDB Atlas** were used for deployment.
This application also retreives statistics from a tar file at Koreanbuilds.net.

All listings and rankings are updated every **24** hours at **10:30PM EST**. This is 30 minutes after Koreanbuilds.net updates game statistics that we then extract to update our rankings accordingly.

I initially used "node-scheduler" to schedule a daily update of my database. Although this worked locally, it posed a problem with Heroku's free hobby plan.
After a set amount of time, the deployed application will go to sleep and will not run any scheduled processess.
However Heroku has a built in scheduler on their site which allows me to schedule a job for any process I need. That is the solution I ended up using when trying to update my database with new statistics.




## Logging in through Google OAuth:
<img src="https://github.com/TahaBilalCS/RanK/blob/master/demo/login.gif"/>


## Final Thoughts
This project redefined my thought process when working with Full Stack Web Applications. The process of deploying is a whole other beast compared to only working locally. As this was my first deployed application, setting up production/development environments taught me how to better manage the state of my project through continuous integrations.

# Author
**Bilal Taha**
