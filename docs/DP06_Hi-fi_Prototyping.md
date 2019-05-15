# Design Project 6: Hi-fi Prototyping

**Albaka**: Dayeon Kim, Sujin Jang, Heeju Wi, Hyunjoo Paik


## 1. POV

**Part-timers in weekly schedule-changing workplace** need the points listed below.

1. **Part-timers want to do submit their available timetable for next week and get newly scheduled timetable for this week while spending less time and effort **

    a. Submitting available time for next week going offline and writing down all the available time slot needs duplicated working and costs unnecessary time and effort.
    b. It spends time and effort to get their own time table from the whole time table which contains other workers'.
    c. Users want to get their scheduled time table as soon as it’s scheduled.

2. **Since weekly part-timers’ schedules are flexible, replacements occur quite often. Part-timers wanted to reduce unnecessary waste of time and emotion of the procedure.**

    a. Other part-timers who submitted available time at the time are highly likely to take one’s place.
    b. Providing appointed methods to send and receive request and can reduce emotional waste and time to select one and sending messages one by one.

3. **How much wage they’ve earned is the key interest of part-timers.**
    a. In the current system, they cannot get their wage unless they write down all the works they did by themselves. So our system would reduce this unnecessary effort.
    b. Setting goal which is likely to be successful can give part-timers successful achievement and motivation.


## 2. Target users
    
We targetted **part-timers who works in weekly schedule-changing workplace**.

## 3. Tasks
1. **Set your wage goal for this month.**
Users said most of their motivation comes from wage. So by setting goal of wage and achieving those goal can help them to be more eager workers.
First, you have to set the wage goal which is likely to success for this month. Our system provides several previous data to set the feasible goal, so use them to get much more desire to achieve. Also give a user message when the goal is too high.

2. **Submit your available time schedule for the next week to meet the goal.** 
 There are 3 tabs you saved already. You have to submit your available timetable of the next week schedule after resetting the one tab. Also, after submitting, make sure your submission is done correctly.
 

3. **Replacement task**
 
    3-1) **Send replacement requests to other workers and Find someone to take your time on Mon 11:00-13:00**
    Check the available candidates who can work on the specific time, then send requests. If every worker rejects your request, you can send requests again with some additional reward.
    
    3-2) **Respond to the replacement request and manage your reward got from the request**
    Click the button on the left-side "CLICK HERE TO START TASK3" on the view page. Now you can get the requests from others newly.(This is needed because for the test user, there is no other users to send request.)
    The replacement request will come several times randomly.
    You can decide whether to accept or not according to the terms of the request. Also, you can see and request again to the rejected request in the request-inbox(with the mail-icon on the top menu). Accept more than one request and reject more than one request.
    In the reward-inbox (with gift-icon on the top menu), you can manage the rewards you have to send or receive. Check what you have to get and receive.


## 4. Implementation Notes

### 4-1. URL of your prototype
http://sooj-j.github.io/albaka


### 4-2. URL of your Git repository
https://github.com/sooj-j/albaka

### 4-3. Libraries and frameworks
Bootstrap, Font-awesome, Jquery, Firebase


### 4-4. Representative screenshots


**1) Task1**
![](https://i.imgur.com/Zt9bo5a.png)
The shape of the page when we first open the "MY WAGE" page. 

![](https://i.imgur.com/mxEg4sS.png)
Users can see informations about wage they've earned past months clicking prev button.

![](https://i.imgur.com/iNDuP3U.png)
Clicking 'set again' button, users can set again the goal of the month. There's recommendation goal.

![](https://i.imgur.com/SuaV4ei.png)
If users enter too high wage compared to their previous wage, it will give them a message and it disapears after 6 second. It also disapears after setting appropriate goal.


**2) Task2**

![](https://i.imgur.com/nEKYwTA.png)

There are **3 tabs** and users can work independently using each timetable. On the timetable, colors on each time slot indicate the **competitive rate** and the description is shown when the color '?' button is clicked. 


![](https://i.imgur.com/PTHiOJK.png)


Users can **add and remove time blocks** by **dragging and clicking the 'x' button** on each block. Users can also **reset** the timetable to an initial condition(an empty timetable) by clicking the 'reset' button. **The progress bar** shows the expect wage of the timetable and it changes in real time. The description is shown when the expect wage '?' button is clicked.

![](https://i.imgur.com/tlHUuzK.png)
![](https://i.imgur.com/5TaP75v.png)

Users can **submit** their timetable by 'submit' button. After submitting the timetable, they can check their submitted timetable in **the submitted tab**.

**3) Task3**
**3-1) Task3-1**
![](https://i.imgur.com/oktzJCo.png)

If the user drags the (orange-colored) assigned time slots, the **get replacement** model with the list of available users is open.

![](https://i.imgur.com/1QygFaz.png)

If the user clicks the **SEND all requests** button, the requests are sent to all available users and a request status (waiting, rejected) is showed next to the name of each available user.

If the available user rejected and wanted a reward, the reward is showed as an icon next to status.

![](https://i.imgur.com/oqjDNSw.png)
![](https://i.imgur.com/hPNbgNj.png)

If all available users reject the request, the **reward modal** opens. Reward dropdown shows the number of users who want each reward.

![](https://i.imgur.com/BaBMiXa.png)

If another user accepts a request sent by other user, the **acceptance modal** opens and the corresponding time block is emptied in the timetable.


**3-2) Task3-2**


![](https://i.imgur.com/PkgDcEA.jpg)
The time block colored with blue means you received request for the replacement on that time from other worker.


![](https://i.imgur.com/TkNp5dm.png) 

If users click the blue time block, they can get pop-up message which asks them whether to accept or reject request.

![](https://i.imgur.com/ACUtMS2.png)

Also for the reject case, users can choose 'reward' he wants to get for the replacement. This means that the user rejects the request now, but he/she will accept the request when the sender of the request provides that specific reward.

![](https://i.imgur.com/qECnxo3.png)

After user rejected, the blue time block he rejected was gone. User can check the rejected request in the request-inbox which located in the top-menu with mail icon. Also, you can check the number which indicates rejected request increased.

![](https://i.imgur.com/BzGh5Pn.png)

In the request-inbox, user can easily check the time block request wants by hovering with dark-grey color on the timetable.

![](https://i.imgur.com/zVayOWI.png)

After accept one request, you can check it directly becomes your scheduled time. User don't have to do extra work after accepting request, such as writing them on the calendar and report their changed work-time to their manager.

![](https://i.imgur.com/5WvSo5v.png)

We also show the received request with the icon which indicates each reward. Above time block indicates users can get chicken if they accept it.

![](https://i.imgur.com/Tsyddsk.png)

In the Reward-Inbox, users can easily manage their rewards to receive or send. Users can see the row with the red box is added after accepting related request.

![](https://i.imgur.com/6ku81uR.png)

We provide tutorials for some functions. Users can get what the color means if you click the '?' button on the bottom-right and for the request-inbox, reward-inbox.



## 5. Individual Reflections

>1)Which part the UI did you directly contribute to?
>2)What were some of the difficulties you faced?
>3)List one useful implementation skill you learned while working on DP5 and DP6.

1. **HyunjooPaik**
    1-1) I made my-wage page and functions related to it. I implemented goal setting and progress bar.  functions and uploading wage of may to database. 
I decided to recommend approrpiate goal to user and give message to user to induce user to set appropriate goal which can motivate user to work a lot. 
    1-2) I made a calender which is independant from timetable others committed. It made me concerned of how much I think of the consistency with other pages. I decided just unify overall design. Also to me, the way giving recommendation and giving message was chosen carefully. I concluded making user disturbed. So I decided to delete the message as 8 seconds pass or user set appropriate goal again.
    1-3)  I used a lot of bootstrap's functions. I was really great service to design a web page neatly. Only I used grid as time table is not suitable for grid. In my case grid made the web page seem well arranged. 
    
2. **Dayeon Kim**
    2-1) I was in charge of UI for "Submit Next Page". I designed a db scheme related to timetable, implemented various functions of the submit page, and linked our html pages and firebase to enable real-time updating and loading. In details, I made a tab list so that users could work independently using multiple timetables. In addition, the time block itself, addition through drag and deletion through button were implemented on each timetable table. In addition, I implemented the time sum of time blocks shown on the screen so that it could be reflected in the process bar. Finally, I created a submit button and the "submitted tab" so that users can submit a user-generated timetable (update to database).
    2-2) In the process of implementing the time slot drag function, I detected the mouse down, over, and up so that the time block can be added according to the mouse position at that time. At this time, it was complicated to distinguish between allowable drag and unallowable drag, and it was difficult to create a procedure to merge with time blocks already added. In javascript, both asynchronous and synchronous processes work, but at first I didn't understand this very well and was embarrassed that the execution order was random. To achieve a successful implementation, I realized that I need to adjust the end of execution order and execute the functions in the desired order.
    2-3) In this project, which has multiple pages and many functions required for each page, I learned that it is important to plan sequence and structure of implementation. If I don't have a plan, I can lose an important element, and I have to spend a lot of time filling the missing element. I implemented the main parts first, then added details sequentially through iteration, and used the method of finding and correcting errors at each step. Through iteration, it was very good to be able to detect critical errors in advance. Also, it was very helpful to use the console and the dummy data wisely to catch errors. Through this project, I was able to learn the benefits of iteration method directly.
    
3. **Sujin Jang**
    3-1) I implemented the timetable UI of the view page. I read schedule and replacement data from the firebase database and displayed on the timetable. Also I implemented actions that are generated by dragging or clicking time slots.
It also implemented the modals related to the replacement: get replacement modal(with available user list and the status), request modal, and receive replacement modal.
I implemented the system (using timer) that the new replacement request (from dummy user) and response to replacement requests sent by the user comes automatically
    3-2) It was difficult to create a system where users exchange requests with other virtual users automatically using timer. Since I had to modify requests data for two events (user action and timer), I had to design the sequence of updates of database well in order to prevent conflicts from occurring in this process.
    3-3) I learned how to handle firebase realtime database. I save, retrieved, and modified the user's timetable and replacement information easily by using realtime db. I also learned that it is important to design the architecture of database well in the early stages of implementation, since fixing the defect of the architecture requires a lot of code modification and time-consuming.


4. **Heeju Wi**
    3-1)
    a. Inbox for request and reward.
	- User can access to their ‘Inbox’ when he clicks the icon in the top-menu. We provide 2 kinds of inbox; for the request(with mail-icon) and reward(with gift-icon). 
	- We provide the number of each inbox have, based on the real-time database, to notify user.
    - In the ‘request-inbox’, user can see their past requests which he rejected once on the view-timetable. We provided this because user can change their mind, however, user might not want to see it if he doesn’t want. Also, user can remove the request forever or accept on the inbox.
    - In the ’reward-inbox’, user can manage their rewards which he has to receive from other users or give to other users. Because we cannot link the real payment system, so we provide button to confirm that user really accepted or received each reward.
    - User can access inbox anytime. For the user test, it is used in task 3-b.
    
    b. login and sign-up UI
	- User have to provide their workplace, real-name, id, password, image of their face. We provide the system for each workplace. User’s information will be uploaded to the DB, and their actions such as replacement request, interaction with the reward, submitting their available time, goal setting, scheduled time are based on the DB and uploaded to the DB if change happens.
    c. design-modification of view page to make consistency with Inbox
    - such as attach User Image, modal frame design modification
    
    d. tutorial(helper) function for colors and inbox.
    
    3-2)
    1.	In aspect of hovering color, I put a lot of time to choose the proper color for the hover effect on the time table when they put the cursor on a row of request-inbox. We want user to recognize the time slot(which a request user hovers on want)faster than just typing such as MON 13:00~14:00. However, there is already 3colors in the time table, so it was hard to choose the color which user can feel difference in the aspect of function, but not making too crowded. Thus, I choose the dark-grey color which can be recognized fast because other colors use not-greyish colors, but not making timetable too much colorful.

    2.	In the aspect of output-text and typography, it was hard to choose the output sentence to show description of which reward or request user have to deal with. I think the output sentence has to be recognized fast, but not making user bothering. I thought the simple and shorter is better, but if user get the only core information, they cannot recognize easily what that means and can be boring. However, if I put explanation for that, it becomes too long and the same long-description is shown on the inbox list. I worried that user may feel bothered and feel tired when they open the inbox, so they would not click and answer to the inbox. So I made the output-sentence of each row like another user is talking to the user(“Heeju: Can you work at MON 12:00~13:00”), because I thought it has the higher chance to make user not ignore than just computer description(“Heeju send you a replacement request; from 12:00 to 13:00 on Mon.“). 
    3.	In the similar context with the above difficulty, I have to choose other output sentence for the reward- inbox. It was really hard because I had another option to use arrow image(meal->Heeju) not the text(“Give meal to Heeju”). It makes each description shorter and simpler, however I cannot predict whether novice can get the meaning of arrow. Thus in this time, I used just shorter text which contains only core information about the reward. However, after the user test, I will check the user can get the right meaning if our system use arrow image and apply it to our system. Also, to make user get the information what he regards as important I thought reward is totally different from request, and our system has to emphasize the important feature which reward has. So for the reward, I made the output sentence to emphasize not the user, but the reward itself based on the user-test case done before.
    4.	In aspect of implementation with DB, the synchronization was very tough. Because I have to update the number of inbox when the databased is changed. Also, for the each row of inbox, we have to get other information from DB to give user more information. This requires synchronized access to DB several times, so I have to make function carefully. However, most of the time spent is caused by the Firebase. Because firebase hide the structure of the data, so we cannot distinguish array and json well. So I have to move that to file and check whether the data is what I really want and put them again to firebase. So the most of the error occurred for that reason, and it took me a lot of time to make synchronization function working right.

    
    3-3) I learned how to synchronize within my implement and within team. For my code, I learned a lot of things how to synchronize functions well when using jQuery especially with firebase. Also, for the team synchronization, I realized that the input and output setting for each team member’s implementation is very important. And setting it with the right structure is very important to make less time spent.



## 6. Studio Reflections
>Summarize the feedback from the studio session, and mention how you addressed it or will address it later in the process.

1. The layout/design and interface of timetable and calendar is neat and intuitive.
2. The functions(dragging timeslot, showing wage with progress bar, notification, ...) are well implemented and it is like a real hi-fi.
3. I wish there will be a Undo function.
    -> The undo function will be helpful for the reversal of a replacement request. Instead, we made a inbox so that users can change the "reject" request to "accept".
4. It would be better if "my page" exists. To see profile of me and see requests from others easily. 
-> We also agree it would be better if there's my page to edit one's information such as workplace  or image. But it's not necessary for the task we planned.
5.  I wish there is a legend or a key table to clearly indicate what each of the color schemes represent. It is easy to learn through experience, but i think it would help a new user get accustomed much more quickly.
-> After getting studio reflection, we implemented helper function with the button "?". For the colors, it is locateds on the bottom-right page. User can see what color means by looking at it. Moreover, for other cases, we also put the helper function next to each UI elements for the user's learnability.
6. What if users can merge their google calendar or input their school timetable for example to automatically block out certain timeslots.
-> We will consider it if we implement fully working system. However, we think the implementation is not hard because we already save and load almost all data used for timetable. So just load the google calendar to our firebase DB and little bit modification would be needed.
7. For the request task, implementing "Reject all request mode" will be helpful.
-> That's a good idea. Even if the request come from the user's available time slot, but we think it is good to make user not bothering by the request when he wants.




