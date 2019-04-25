# Design Project 4: Lo-fi Prototyping

**Albaka**: Dayeon Kim, Sujin Jang, Heeju Wi, Hyunjoo Paik


## 1. POV

**Weekly scheduled part-timers** need to
1) **Get enough information** about their work
2) **Communicate immediately and clearly** with other part-timers

because each part-timer are lack of
1) **a direct update on their timetable**
2) enough information about **others’ schedule**
3) a rational process of the **replacement**.

>In the **weekly schedule-changing workplace**, part-time schedules are changing every week, so part-timers must submit their available times for each allocation process and keep in mind that their new assigned schedules may differ from their previous schedules.


## 2. Tasks


1. **Set your wage goal for this month and then**
   **Submit your available time schedule for the next week to meet the goal.** 
First, you have to set the wage goal for this month. There’s one table you saved already. You have to submit the next week schedule by creating and using a new table.

2. **Send replacement requests to other workers and**
   **Find someone to take your time on Wed 2:00-4:00**
Check candidates who can work on the specific time, then send requests. If every worker rejects your request, you can send requests again with some additional reward.


3. **Respond to the replacement request and accept it finally**
The replacement request will come several times.
You can decide whether to accept or not according to the terms of the request. You can reject it, but we recommend accepting it at the end.


## 3. Prototype
### 3-1. Link to your prototype 
https://projects.invisionapp.com/prototype/cjutvnd55001e1y01fnevz0l4/play

### 3-2. Prototyping tool

We used Sketch, Photoshop, and Invision Studio.

Using Sketch and Photoshop we could easily give shape to each object because it provides more drawing function than Invision. However, they don't provide interaction for each object so we have to use Invision to provide interaction.

The Invision Studio is good enough to make the simple low prototype, but it couldn't cover all of the functions we were planning to such as dragging and state of each object. 

We have to implement the drag function for several situations, but we could not apply it to each time slot. However, Invision Studio provides 'Mouse Down' interaction, but it accepts all down movements of drag inside a specific block, not only dragging from the exact top to bottom. 

Also, Invision Studio doesn't provide the state of each object. So we cannot let the user select an arbitrary time slot, because if we allow the user to do that, we have to make too many cases. If Invision Studio provides state of each object, we can give users more various opportunities.


### 3-3. Design choices

1. **The order and flow are fixed for overall tasks**
-> Because Invision Studio doesn't provide state, so we couldn't make all of the users flow into the prototype.
We tried hard to give several chances to users, but still, users have to follow the flow of each task and cannot choose the whole options in some tasks.

2. **The time slots that users can select are limited.**
-> In some functions of task 1 and 2, we get the user's time slots that user selected by dragging. Because Invision doesn't provide state for each time slot, so we cannot make every moment of user choice to visible. Also, Invision doesn't provide drag, but only 'mouse down' which works whenever we drag inside the object not exactly dragging from top to bottom of the object. So, we have to limit the user's choice.

3. **The prototype has fake data of the time that the user worked before and the available workers on the specific time when the user seeks the replacement.**
-> To do task 1 and 2, users have to check their previous work information(work hours per day and work schedule) and send/respond to requests to other workers. However, we cannot get previous work information and real co-workers, so we provided the prototype with fake data.




### 3-4. Representative screenshots



1. **The user can set the goal wage of a month.**
![](https://i.imgur.com/VaEYivr.png)
    In MY WAGE mode, the user can submit your goal wage for a month.

    There is a progress bar indicating how much you've achieved the monthly.
![](https://i.imgur.com/VaEYivr.png)
    In MY WAGE mode, there is a progress bar indicating how much the user has achieved the monthly goal.
 
 ![](https://i.imgur.com/EZtOfbK.png)
    In SUBMIT NEXT WEEK mode, there is also a progress bar indicating how much the user has achieved the weekly goal.

2. **The convenience of submitting a schedule**
![](https://i.imgur.com/MwqZs7o.png)
    There are several tabs and each shows the timetable that the user is modifying. The user can also create new timetable by clicking the plus button.
    ![](https://i.imgur.com/LHJbR7K.png)
    The user can add continuous time component by dragging.
    ![](https://i.imgur.com/UthFWYS.png)
    The user must click the 'SUBMIT' button to submit the timetable.
    
    ![](https://i.imgur.com/iWymf04.png)
    The user can check the timetable you've submitted by clicking 'SEE SUBMITTED' tab.

3. **Show one's time table clearly by excluding other's schedule.**
    In order to solve the existing problem that is hard to distinguish own schedule since the timetable included others', our service allows users to view only their own timetable in "VIEW THIS WEEK" mode. In addition, when a change occurs in the timetable, such as replacement described in following 4 and 5, the user can immediately see the updated timetable.
    ![](https://i.imgur.com/NDJA7mI.png)


4. **Simple process for seeking a replacement**
    In "VIEW THIS WEEK" mode, the user can send a request for only workers who are available on the chosen time. The list of workers are provided when the user selects a time block, and the list is automatically set based on the submitted schedule of every worker. 
![](https://i.imgur.com/2TZcRL6.png)

    At this moment, the user can send replacement request just by clicking "SEND all request" button. The user can also easily see how others have responded to the request.
![](https://i.imgur.com/QY6OevW.png)

    If the user is in a position to receive a request, the user can temporarily add and view the requested time in his/her timetable before making a selection, and then able to accept or reject it with just clicking a button.
![](https://i.imgur.com/L6clxWU.png)

    

5. **A new reward system for a situation that everyone refused the replacement**
    We made a new reward system which makes the person who asked the request again less guilt and allow the accepting person to change his/her choice according to reasonable reward.
![](https://i.imgur.com/7XuoxBi.png)


    The reward system is valid only in the case mentioned above, and when the user receives the reward, it can confirm it in the inbox.
![](https://i.imgur.com/63o7EOS.png)







### 3-5. Instructions

There are three modes: VIEW THIS WEEK, SUBMIT NEXT WEEK, and MY WAGE

1. **VIEW THIS WEEK**: view assigned timetable of this week
    * You can send replacement requests to available users by dragging time slots
    * You can offer the reward if every request that you sent are rejected
    * You can respond (accept/reject) received replacement requests
    * On the inbox tab, you can accept the request that he rejected again
    * On the inbox tab, you can view the received rewards.


2. **SUBMIT NEXT WEEK**
    * There can be many tabs for saved timetable. You can also create a new timetable by pressing the 'add' button on the tab bar.
    * You can choose your available time for next week by dragging time you are available.
    * When you want to submit the time table you've modified, just press 'submit' button.
    * After submission, you can see the timetable you've submitted by pressing 'SEE SUBMITTED' button.


3. **MY WAGE**
    * You can see how much you've earned each day and show us how much you've earned for a certain week and for a certain month.
    * You can submit the goal wage you want to earn that month.
    * The progress bar shows how much you've achieved your goal.


## 4. Observations

### Themes

T1. Problems caused by limiting user actions in the digital prototype
T2. Insufficient explanation and Inconvenient tutorial
T3. Incompleteness of function
T4. Design factor: layout, font
T5. Affordance: UI does not reveal its features clearly

---

### Task 1
- (T2 / L) P1, P2 were curious about the process that weekly goal calculated.
-> Make a detailed explanation of how the weekly goal calculated so that users can understand easily if they want.

- (T2 / L) P1, P4 felt difficult to finish the tutorial on “SUBMIT NEXT WEEK” mode.
-> Make “Get out of tutorial” button or "X" close button to explicitly indicate.

- (T3 / M) P1 was confused because he could not see the tab first (automatically) when he added a new tab.
-> Modify the prototype so that when the user adds a new tab, the tab is automatically loaded on the screen.

- (T2 / H) P1, P3 cannot easily understand what ‘competition rate’ means.
-> Give a detailed explanation using tutorial if the user wants to see.

- (T5 / H) P1, P3 cannot easily understand what is the background greyish color of “SUBMIT NEXT WEEK” mode.
-> Move ‘competition rate’ criteria from the bottom to the top on the side, to be visible easily for the user. 


- (T1 / L) P4 clicked all mode buttons as soon as the user test started, but one of them did not work.
-> We limited some functions that are not used in each task, but in the real web, we will enable all of the functions on that page.

### Task 2
- (T5 / M) P1 misunderstood 'not requested yet' for a button and clicked it.
-> Change the ‘not requested yet’ icon so it doesn’t look clickable such as removing the box outside the icon. 

- (T1 / L) P2 dragged the time slot from bottom to top, not from top to bottom.
-> Because the interaction is limited in the Invision, so we cannot make it. Let user can select the time slot by dragging from top to down, from down to top, from left to right and from right to left(This is from paper prototype).
  
- (T5 / M) P2 clicked the reward icon in the status list. (This icon originally means the desired reward by someone who rejected the replacement request.)
-> Since the desired reward differs according to the user, allow this action so that requests can be sent to each user as desired, and implement the corresponding function additionally.

### Task 3
- (T1 / H) P1, P4 found it difficult to match the reward in the reward notification with the inbox icon. 
-> It is caused by that the reward can be expressed in two different ways; as text in request notification and as an icon in the inbox. Because we cannot provide a type function. In the real web, user can type or choose one of the choices we give.

- (T1 / L) P1 attempted to reject without setting a reward.
-> We limited some options that users can choose according to our design choice, so make users do all wanted options in the real web.

- (T5 / M) P3 clicked ‘accept’ button after picking a reward(not ‘reject’) when he rejected the request but wanted to accept when he receives the reward.
-> This can be resolved if users understand the reward system and its progress through the tutorial or explanations.

### Common Issue
- (T2 / M) P1, P4 didn't read the tutorial properly and wanted to see it again. 
-> Make the “See Tutorial” button on the side of the relevant page. Also, make the initial tutorial to show each explanation one by one. 

- (T4 / L) P3 wanted a bigger font size.
-> Adjust the font size to make them more visible.

- (T4 / L) P3 wanted to utilize the side space of the page.
-> Fill the side space with additional functions such as a tutorial tab.

## 5. Paper vs Digital

1. **Types of usability issues**

    * in Paper prototype
        
        1. lack of visual intuitiveness
            * User didn't notice that they can click or drag some object before we notify them.
            * They couldn't see the hover effect because most of the users clicked before seeing the hover effect. 
            * For example, the user clicked response button on received request notification too fast, so that they couldn’t realize the requested time is emphasized on the timetable (hover effect) in the paper prototype. 

        2. lack of functionality
            * There were some functions we didn't prepare. Users wanted new functions (e.g. acceptance notification, clicking 'Albaka') or efficient improvement of existing functions(e.g. send all requests button).

        3. lack of external consistency
            * User didn't notice that they can drag the time slot. Because it didn't have much consistency with external applications, so we have to teach them. Also, we have to change the UI of the time table to make it more draggable; similar to cells of excel.

    * in Digital prototype
        1. limitation on what the user can do
            * In the paper prototype, we can realize almost all the choices the user can make. However, our digital prototype doesn't provide drag or changing the state of each object in the Invision Studio. So we have to limit the choices the user can make.

        2. The notification could be unnoticeable to the user.
            * In the paper prototype, the user can view what changes are going on easily. However, in the digital prototype, the user cannot easily check the change happened if they are not concentrated on. So we tried hard to make user notice the change appears; give the notification if the change appears. Also, we moved the page to the top where the notification is located and keep them until the user closes it.

        3. Size Issue
            * In the paper prototype, we make the size of the objects and text bigger than usual. However, we made the text smaller than the paper prototype to view it at once in the digital type.

        

2. **participants' reaction and expectation to prototypes**
* in Paper prototype
    * Users were hesitant to do some actions(e.g dragging, clicking, ...) because it is not realistic. In the early part of the test, they even felt like a fool themselves.
    * They were quite surprised when changes appear and they kept track of the changes even it is very trivial.
    * However, they cannot distinguish where to click. So they thought for a long time before one action and after one action they looked at the facilitator to check whether it is the right action.

* in Digital prototype
    * Despite we described that it is a prototype, users wanted to do everything naturally, just as they normally would use the Web.
    * It was easier to keep users on the right track(our flow) because the actions they could take are limited. There are a limited number of elements that can be interacted. (e.g Only certain time slots are available to be dragged)
    * However, users couldn't catch the change in small elements such as total time on the SUBMIT THIS WEEK mode. 
    * Compared to the paper prototype, the reaction and expectation were focused on visually emphasized elements. In addition, they can distinguish easier whether it is clickable or not than the paper prototype.


3. **summarize what changes you made in the digital prototype**
    
    * learnability
        * We provide the tutorial pop-up when a user first enters each mode or hovers an element that is difficult to understand the meaning (e.g. monthly goal progress bar).
        
    * visual effect
        * We made the time table looks more draggable. So we made each time slot similar to excel to give the external consistency of excel where we usually drag cells to select.
        * We marked the horizontal lines on every 30 minute (e.g. 2:30, 3:30, …) by dotted lines, and lines on 0 minute (e.g. 2:00, 3:00, …) by solid lines.
        * We made acceptance notification and gray border effect on the removed slots if someone accepted the replacement request, to the user can notice it easily.
        
    * functionality
        * We changed 'send request for each person' to 'send all request' button on the GET REPLACEMENT modal window because after user testing there was no need to send a request for each person. After the user sends the requests, 'send all request' button changes to 'cancel all request'.
        * We made a new reward system: a system that allows users to provide a reward (e.g. meal or coffee) to increase the probability of acceptance of re-request when all replacement requests are rejected.
        * We made numerical criteria for a competitive rate. So the user can associate greyish colors with figures.
        * We changed a mode selector from a switch box to buttons.

## 6. Studio Reflections


1. Students liked our live demo, UI because it has detailed features such as hovering effect, make dragging possible.
2. Many students (Seung Hyun Hwang, Yueru, Ukho Shin, Assem Zhunis, Xinlei) liked our fresh and special way to solve the problem because they think our team tried hard to think many ways to achieve our tasks.
e.g) The suggestion/notification box appears for the request
e.g) The confirmation of user’s action; the user can notice that their action is processed immediately.
3. How about changing the color of the competition rate from monochrome to colorful to make it more distinct by the level.
-> We can’t color to the competition rate because if we do, user cannot easily get where he dragged.
-> It would cause there would be many colors. However, we will make the color of each competition level more distinct in another way.
4. want to distinguish each worker easily.
-> We will consider it by adding colors or icons to each user.
5. some wonder what if all of the users who got the request reject it because all of them want a reward.
-> We already thought about it. However, it is a first-come-first-serve service. Also, we learned from the interview that there are many workers who want to work more in the real field, 
6. How about user send the request over and over again?
-> We will allow the function of ‘sending the request’ after all the user answered. Also, we have to limit the frequency or the number of requests the user can send.
7. how to make user can keep track of his request reward
-> We will consider it in next DP.
8. How the user can change their choice(reject/accept)
-> We are considering to provide the storage box of user’s request which he sent or received. So in that box, user can see how the request is progressing and can change his choice in that box.