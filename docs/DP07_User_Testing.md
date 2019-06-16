# Design Project 7: User Testing

**Albaka**: Dayeon Kim, Sujin Jang, Heeju Wi, Hyunjoo Paik


## 1. Written Protocol

1. **Instructions for preparation and setting up the testing environment**

    a. Access to http://sooj-j.github.io/albaka using chrome browser
    b. Click "Load Unsafe Scripts" on the right side of the browser address bar
    c. Login with test user account
    | <center>user | <center>id|<center>password|
    | ------------ | --------- | -------------- |
    |    default   |   test1   |        1       |
    | participant1 | testuser1 |        1       |
    | participant2 | testuser2 |        2       |
    | participant3 | testuser3 |        3       |


2. **Introduction and informed consent**

    Hi *PARTICIPANT NAME*, thank you for taking the time to participate in our user testing session. Before we start, I’m going to give you a brief overview of the test.
The system to test is weekly-scheduling webpage for part-timers. I’ll give you three tasks to complete and then asking some questions.
It’s really important to know that we are only testing our system, not you. You can’t do or say anything wrong here. Please feel free to let me know at any time if there’s something you like, dislike, if you’re confused, etc.
Also, I’d like you to *THINK ALOUD* as much as possible. It means that I’d like you to speak what you think and feel as often as you can during the session.
I'd like to ask you if I can make some records to collect meaningful information. I'm going to take a picture and record the screen. Screen recording will discarded immediately after monitored one more time to check the missing observations. If you feel uncomfortable with the recording, please tell me. In that case, I'm not going to record.
If you have any questions, don't hesitate to ask. Let’s get started.

3. **Tutorial or training**

    a. **Tutorial provided by webpage**
   For hard-to-understand components, we will inform the participants that if they hover the help button, information about it will come out.
   
    ![](https://i.imgur.com/zJlWFWj.png)
    ![](https://i.imgur.com/MLxtzPD.png)
    
    For example, if user clicks the help button at the bottom of SUBMIT NEXT WEEK page, then the description is shown.

    b. **Tutorial session**
    To explain the most difficult task, task3, we will give one very simple example of logging in as default user. We send a replacement request and accept a replacement request from other user.

4. **Task list & instruction**

    a. **Set your wage goal for this month.**
    
    You have to set the wage goal which is likely to success for this month. Our system provides several previous and helpful data to set the feasible goal, so use them to get much more desire to achieve. Also give a user message when the goal is too high.

    b. **Submit your available time schedule for the next week to meet the goal.**
    
    There are 3 tabs you can modify. You have to submit your available timetable of the next week schedule with the one tab. The weekly goal is shown at the top, so refer to it and draw up a timetable to satisfy the goal. Also, after submitting, make sure your submission is done correctly.

    c. **Replacement task**

    c-i) **Send replacement requests to other workers and Find someone to take your time (ex. Mon 11:00-13:00)**

    Check the available candidates who can work on the specific time, then send requests. If every worker rejects your request, you can send requests again with some additional reward.

    c-ii) **Respond to the replacement request and manage your reward got from the request**
    
    Click the button on the left-side “CLICK HERE TO START TASK3” on the view page. Now you can get the requests from others newly.(This is needed because for the test user, since there is no other users to send request.) The replacement request will come several times randomly.
    You can decide whether to accept or not according to the terms of the request. Also, you can see and request again to the rejected request in the request-inbox (with the mail-icon on the top menu). Accept more than one request and reject more than one request.
    In the reward-inbox (with gift-icon on the top menu), you can manage the rewards you have to send or receive. Check what you have to get and receive

5. **Recording strategy**

    **photo, note, screen recording**: Take a picture for every session. Write notes about 1) participant's meaningful behavior and comment during the task and 2) answers to interview questions after the task completes. Record screen to check whether any of the minor but important actions of the participant have been missed.
    
    **Roles**
    * facilitator (Dayeon)
        * give debrief about the project
        * provide overview and introduction of user testing to participants
        * guide task scenarios
        * provide a simple tutorial
        * respond to participants' requests for support
        
    * observer (Heeju)
        * write notes about the useful observations during the task
        * write notes about the answers to the questions
    
    * tech person to monitor (Sujin, Hyunjoo)
        * check whether the system and screen recording is working fine


6. **Questionnaires, Interview questions**
    
    * What is the most difficult task and why?
    * Was there anything else that you felt was useless on the task?
    * Are you satisfy with the interface? If not, were there any UI components that prevented you from performing the task?
    * Do you think this system is appropriate for actual use? Or is there any other functionalities you want to add?
    * Is it easy to learn to use this system?
    * Did you refer to the tutorial? If so, 1) Was it helpful? 2) Was it intuitive?
    * Were you able to find the information you needed quickly?
    * Are you able to navigate the site without difficulty? If not, what accessibility issue did you face in navigating?
    * Is there anything in the interface layout that needs to be fixed?
    
7. **Debrief prompt**

    This testing is designed to evaluate the usability of our system albaka, the weekly scheduling system for part-timers.

    The testing was conducted on three workers from in weekly schedule-changing workplace (KAIST swimming pool and KAIST Lotteria). The purpose of the testing is to determine whether our user interface is fit to perform the needs previously identified in an interview with target users. The needs we found were: 1) submit next week's timetable convenient and get newly scheduled timetable as soon as possible, 2) check wage easily and accurately, 3) simplify the process of finding replacement

    Thank you very much for your time.

## 2. Session observations
>1. Participants: Who are they? How did you recruit them? Why are they representative target users? Add brief demographic, context information about each participant that is relevant to your interface.
>2. Use at least one photo or sketch for each participant and provide a summary description of each session (e.g., What was unique about this participant? Main takeaway from this participant's session?).

### Participants
0. Target user: part-timers who works in weekly schedule-changing workplace (ex. KAIST swimming pool, KAIST Lotteria)
1. **Participant1**
    * He is a KAIST swimming pool part-timer who gets schedule per week.
    * We visited KAIST swimming pool to contact him.
    * part-timers in KAIST swimming pool gets their schedule per week using the Naver Café.
    * He has been worked more than 5 years, and usually works more than 20 hours per week. 
    * ![](https://i.imgur.com/v7Barft.jpg)


2. **Participant2**
    * He is a swimming pool part-timer who gets schedule per week.
    * We visited KAIST swimming pool to contact him.
    * part-timers in KAIST swimming pool gets their schedule per week using Naver Café.
    * He has been worked more than 4 years, and usually works more than 10 hours per week.
    * He is unfamiliar with digital devices and prefers to manage his schedule through a paper calendar. 
    * ![](https://i.imgur.com/gA5CFyv.jpg)


3. **Participant3**
    * He is a KAIST Lotteria part-timer who gets schedule per week. 
    * We met him for a need-finding interview and contacted him again to ask for a test.
    * part-timers in KAIST Lotteria gets their schedule per week using Naver Band.
    * He has been worked for 8 months, and usually works more than 15 hours per week.
    * ![](https://i.imgur.com/llLtr8z.jpg)


### Summary description of each session
1. **Participant1**
    **Interesting Observations**
    - Task 1
        - In the login page, he wants id, pw to be capitalize.
        - He cannot distinguish 'sum per week' columns with other days easily. 
    - Task 2
        - he wondered and asked us why there are several tabs. We said we made tabs for saving old timetable which user can use often, he was very satisfied with that function.
    - Task 3
        - He dragged the timeslot from bottom to top, there was error we didn't expected.(The time was shown by 13:00-10:00)
        - He didn't clicked the request-inbox and reward-inbox before we wondered. However, after clicked them, he got what it is and what it provides at once.
    
    **Interview questions**
    a. What is the most difficult task and why?
    - All the tasks were not really hard, I think the system is user-friendly.

    b. Was there anything else that you felt was useless on the task?
    - None.

    c. Are you satisfy with the interface? If not, were there any UI components that prevented you from performing the task?
    - The font size of the wage page and timetable is too small.
    - In the task 1, I thought it would be better if the 'sum per week' columns seems separate from other days to identify them at a glance. 
    - I recommended 'The Total Wage' to be seemed like combined with 'sum per week' and seems like extension of it.

    d. Do you think this system is appropriate for actual use? Or is there any other functionalities you want to add?
    - I thought it will be useful for actual use, and it would be better to manage several part-time works.

    e. Did you refer to the tutorial? If so, 1) Was it helpful? 2) Was it intuitive?
    - The tutorial was helpful and it was intuitive. So even I watched the tutorial for once, but I can follow the task without other help.

    f. Were you able to find the information you needed quickly?
    - Yes, I didn't pay attention to the elements which that was not needed to me. However, if the information is needed for the task, I could access to the element where the elements positions in seconds.

    g. Are you able to navigate the site without difficulty? If not, what accessibility issue did you face in navigating?
    - There was no problem in navigating the site. However, I thought that there is no need to separated 'MY WAGE' tab. I thought it would be better to position 'MY WAGE' in the 'VIEW THIS WEEK' tab, because it can reduce time wasted moving pages and do not have to memorize the infomation in 'MY WAGE'.

    h. Is there anything in the interface layout that needs to be fixed?
    - It would be better to show user's history of wage on 'VIEW THIS WEEK' page by using tabs which user can choose show schedule by week/month/year.


2. **Participant2**
     **Interesting Observations**
    - task 1
        - the progress bar and money he earned on the calendar is different. So he waited for the progress bar to change.
        - He thought the competition rate shown in the timetable of 'SUBMIT NEXT WEEK' will be very useful if the service is used in the real situation.
        - He clicked the 'VIEW THIS WEEK' menu to confirm the timetable he submitted, which is the wrong page.
    - task 2
        -  He started the task from the timetable tab 'SUBMITTED' of 'SUBMIT NEXT WEEK' menu because it seems similar to 'VIEW THIS WEEK' page.
    - task 3
        - He wanted to accept the request partly.
    
    **Interview questions**
    a. What is the most difficult task and why? 
    - In task 1, even if our system provide the goal recommendation, it was difficult to get a sense of how much goal to set. So he set the high goal which our system does not recommend.

    b. Was there anything else that you felt was useless on the task? 
    - In task 3, user can only select the reward in the list. So if the user want to select the other reward, it is rather useless, not helpful.

    c. Are you satisfy with the interface? If not, were there any UI components that prevented you from performing the task? 
    - The font size of the date is too small.
    - He wanted to see how much he will earn in each time slot of time table.
    - He wanted to type another rewards besides the four rewards that the system provided.

    d. Do you think this system is appropriate for actual use? Or is there any other functionalities you want to add? 
    - It would be better to reflect the attendance or lateness of the user.
    - It would be better to show the deadline of accept/reject of each request. For the real application, if the accept of reject was right before the time of the request, it would be useless. So, in each work place, there would be its own deadline considering characterisctics of each work place.

    e. Did you refer to the tutorial? If so, 1) Was it helpful? 2) Was it intuitive? 
    - He couln't understand the tutorial easily because it was first time I saw the system.
    - However, after he used the system he can get it directly. So he thinks it is intuitive enough.

    f. Were you able to find the information you needed quickly?
    - He cannot easily find what is the date of today and found it after our facilitator told. So it would be better to show today on the calendar.
    - In the 'MY WAGE' page, he wants to go directly to 'SUBMIT NEXT WEEK' page of that day when he clicks the date on calender.

    g. Are you able to navigate the site without difficulty? If not, what accessibility issue did you face in navigating?
    - It would be better to make bigger MENU bar.

    h. Is there anything in the interface layout that needs to be fixed?
    - None.

3. **Participant3**
    **Interesting Observations**
    - task1
        - Although today's date is shown on the menu bar, he could not find it and asked the facilitator.
        - The system has problem if the goal is smaller than what the user earned.
    - task 2
        - He clicked the helper function of 'color ?' to check the meaning of each colors. And he said it was very useful to identify the colors.
        - He used the combining function of time slots by drag and drag once more on the near slots.
    - task 3
        - He asked whether he can send request per person
        - He managed request and reward items by using inboxs during sending and receiving several requests.
        - He responded to the request in a variety of ways.(accept/ reject/ reject with reward)

    **Interview questions**
    a. What is the most difficult task and why? 
    - The difficulty level of the three questions was similar, and task3 is likely to feel difficult for users who do not speak English well.

    b. Was there anything else that you felt was useless on the task? 
    - In task1, it was difficult to understand because the criteria or calculation methods of goal recommendation are not guided. Also, I think that it would be nice to get a goal recommendation in the range, not just one number.

    c. Are you satisfy with the interface? If not, were there any UI components that prevented you from performing the task? 
    - Satisfied. None.

    d. Do you think this system is appropriate for actual use? Or is there any other functionalities you want to add? 
    - If replacement is decided offline rather than through this system, it will be better that the user can easily revise the timetable to reflect it in that case.
    - There is some discomfort with the partial limited function. (fake data, etc.)
    - I think it's good because I can save my timetable that I use frequently through the tab function.
    - I think it would be nice if I can set a personal impossibile time, such as class time, and see the timetable except it.
    - I think it would be nice if I can add and send a new reward in addition to the suggested rewards.

    e. Did you refer to the tutorial? If so, 1) Was it helpful? 2) Was it intuitive? 
    - It wasn't very helpful. I've had experience using a similar system using a timetable, like "otl", so it would be easy to understand without the tutorial.

    f. Were you able to find the information you needed quickly?
    - It's mostly written, so I could find it quickly.
    - "Helper" explained what I was curious about, so I could check it right away when I had something I didn't know.

    g. Are you able to navigate the site without difficulty? If not, what accessibility issue did you face in navigating?
    - Sometimes there was a time delay in the system and there was an inconvenience of having to wait.

    h. Is there anything in the interface layout that needs to be fixed? 
    - I don't know why the reward-inbox and request-inbox should be in the menu bar.
    

## 3. Usability lessons
>1. List at least 10 usability problems you discovered. Organize them by high-level task or theme, not by each participant or time. But mention which participant ran into the problem by referring to them as P1, P2, ... (e.g., search results did not show the price information (P1, P3)). For each problem, indicate how critical the problem is: high, medium, and low. Finally, show how you plan to address each of the problems.
>


### 1. Usability problems
### - Themes
T1. Implementation fault
T2. Incompleteness of functionality
T3. Insufficient explanation
T4. Design factor: layout, font
T5. Affordance: UI does not reveal its features clearly
T6. Additional wish points that are not essential to the tasks


### - Task1
- (T1, L) P2 waited for the progress bar to change since the progress bar and total wage on the calendar is different in "MY WAGE" menu.
    -> Make the fake data of wage the user earned more realistic and make them have consistency with other fake data, based on the today's date which system provides.
    
- (T4, L) P1 cannot distinguish the 'sum per week' column with other day columns easily.
    -> Make the column of 'sum per week' distinguishable by using background color or font color.
    
- (T4, L) P1 said 'Total Wage' doesn’t seem like the extension of calendar above it.
    -> Adjust the font and position of 'Total Wage' to get consistency with the calendar above it.

- (T6, M) P1 said it would be better to provide tabs where user can select view schedule by a week/month/year.
    -> Because we have very limited time, so first we will implement function that show the previous week's schedule. We will implement it fully if the time is enough.
    
- (T1, H) **P3 found the system goes wrong when the set goal is smaller than the earned wage.**
    -> Prevents the user from setting the goal to a value less than the earned wage through a warning window.

- (T3, M) P2, P3 thought that it was difficult to understand because the criteria or calculation methods of goal recommendation are not guided.
    -> Provide the helper function of criteria and calculation methods of goal recommendation. Also, provide goal recommendation not by number but by range.


### - Task2
- (T5, M) P2 started the task from the timetable tab 'SUBMITTED' in the 'SUBMIT NEXT WEEK' page.
    -> It was because the 'VIEW THIS WEEK' page and the 'SUBMIT NEXT WEEK' page look similar. Make menu bar and font bigger so that each tab menu conveys what the page means more clearly.
     
- (T6, L) P3 said that it would be nice if users can set a personal impossibile time, such as class time, and see the timetable except it.
    -> It's a good idea. If we have enough time, we will try to implement this new feature.

### - Task3
- (T1, L) P2 wanted to accept the request partly. 
    -> It is very hard to make it work because we have to consider much more serious things.

- (T1, M) P1 dragged the timeslot from bottom to top for request, but the function works wrong in that case.
    -> There are two addresses, 1) Fix the drag direction in one way, 2) Make both possible. We think that first one is more better solution. Modify the code to completely ban the drag from below up.

- (T2, H) **P2 wondered if there is a deadline for acceptance and rejection of the replacement request.**
    -> Based on the deadline which the workplace set, notify the D-day left for each request if the deadline is close.
    
- (T6, L) P3 said if replacement is decided offline rather than through this system, it will be better that the user can easily revise the timetable to reflect it in that case.

- (T2, H) **P3 thinks it would be nice if I can add and send a new reward in addition to the suggested rewards.**
    -> Implement to let users can type the reward what they want.

### - Common issue
- (T4, L) P1 found that the capitalization of words is little bit differ from pages to pages. 
    -> Make consistency of the capitalization of the words used in our web.
    
- (T4, H) **P1, P2 said the font size of date and time is too small.**
    -> Adjust the size of font bigger than current one.
    
- (T4, M) P2, P3 didn’t noticed the date of today is provided on the top menu bar.
    -> Make the menu bar bigger and indicate today's date on the calendar of 'MY WAGE' and 'VIEW THIS WEEK'.
    
- (T2, L) P1 wants the system to provide management for several part-time works not only one.
    -> Our system already provides the register function by workplace, however we didn't consider the target user as who works for several work place. 


### 2. High-level reflections

### - A. Overall learn from the user testing experience
- We could find more implementation faults than we tested, since participants performed the same task, the same function in various ways. Participants were also freer than we thought and wanted a variety of additional functions. For example, dragging the slots up from the bottom or the goal that is significantly off of the goal. 

- We were able to get feedbacks directly on which parts would actually be useful in real situation, through participants' "think aloud".

- Since we implemented the UI based on our task flow, we did not provide the functions which is not needed for the task. Also we use the dummy data for the parts which is not essential to the task. However, participants thought it was unnatural and rather spoil the consistency. 

### - B. What we will do differently for better results and insights

- It is necessary to modify the points which participants pointed out as unnatural. 
    - we have to make the task flow smooth to be real situation. 
    - we have to make the dummy data to regarded as real as possible such as reflecting today's date in order to make user feel our system more complete.

- Based on our reflection, we have to modify the code of our system.

- In the order of user testing, let the participant have time to look around the web page before performing the task. During this time, the participant will be able to familiarize himself/herself with the UI, and consequently perform the task more skillfully.


## 4. Studio Reflections

- I like the intuitive and simple design throughout the site such as question mark. It’s simple and not so intrusive. 
=> Thank you.

- I wish that colors were more distinguishable. 
=> Thank you. We will modify the colors to be more distinguishable.

- I wish that for the colors, the key would be shown more explicitly instead of having to click on the help button.
=> It is great idea. However, for the target user, they use the system more than once per week. As we tried to use as little colors as possible, checking the colors for once is enough. Thus, we thought, showing explanation forever may bother the user.

- What if the orange to red colors were used to show competition? For example, population density maps use bright red to dark red to indicate density. 
=> We already made that competition colors reddish because of the reasons as same as you, however it looked too complex. However, we will modify the colors again and check it is appropriate.

- How about finding users who have a very short career? Less than 3 months. I think all of them have long experiences.
=> For the next user-testing, we will recruit test-users who worked for a short period.


## 5. Plan for iteration
> The list below is goals for each part or task.


1. task flow
    * To make user feel the task as real situation, Modify task description to give detail of what user's situation is.

2. VIEW THIS WEEK
    * Upward dragging handling
    * Let users can type the reward what they want.
    * Set the deadline of request received, and show the D-day of each request if is close to today's date.
    * Show today's day on time table.
    
3. SUBMIT NEXT WEEK
    * Fill the tab1 for user can use tab function.
    
4. MY WAGE
    * We will give recommendation with average wage one have earned by now.
    * Goal recommendation will be given as a range.
    * Give explanation of how we calculated the recommended goal
    * Make 'sum per week' col distinguishable for other col.
    

5. overall
    * Make font size bigger of time table and menu bar.
    * Make dummy data realistic based on today's date.
    * Modify fake today's date to MON to show as many function as possible.


