# Design Project 3: Paper Prototypying

**Albaka**: Dayeon Kim, Sujin Jang, Heeju Wi, Hyunjoo Paik


## 1. Prototype
1. The mode change

![](https://i.imgur.com/MOk6VTu.png =400x)
![](https://i.imgur.com/4IdD1b8.png =400x)


There are two modes:
MY TIMETABLE (default mode): see the assigned schedule for this week
FOR NEXT WEEK: submit mode for the next week schedule

User can switch mode by dragging the mode switch button.

2. FOR NEXT WEEK mode
![](https://i.imgur.com/Y51uHe5.png =400x)

- The user can save and import timetables separately by using the tab.
- The competition rate is indicated by the brightness of time slots. (How many people are applied)

![](https://i.imgur.com/9L90Qbs.png =400x)
- When the user drags time slots, they are highlighted and added.
- The user can delete continuous time slots from the table.

![](https://i.imgur.com/84X8Dhj.png =800x)
- The total time of selected time slots are calculated and shown automatically.
- The user can submit your table by pressing ‘submit’ button.
- The notification bar is shown below when the user presses the submit button.

3. MY TIMETABLE mode
![](https://i.imgur.com/OgwRxXc.png)
- The user can see one’s assigned schedule for this week by colored slot.
- The user can check the start, end time of each continuous slots at a glance, which is on the top of it.

![](https://i.imgur.com/73UqOvR.png)
- When the user drags time slots where he wants to find someone to replace among the assigned time, a pop-up box.
- In the pop-up box, there are a list of available workers at that time.
- When the user clicks the request button, the request will be sent.
- Slots where the user requested replacement are displayed in dark colors
![](https://i.imgur.com/fytDraA.png)
- After the user sent the request, the status (waiting/rejected) is shown next to the name.
- When the user clicks ‘cancel all request’, every requests on that time slot are canceled.
![](https://i.imgur.com/Wphdhon.png)
- When the user receives a request, a notification bar is immediately shown at the top.
- The user can respond by clicking accept or reject button.
- When the user hovers the notification, the requested time is colored red.
- If the user accepts the replacement request, the time slot shown in red changes to green and is added to the timetable. At the same time, it is deleted from the timetable of the user who sent the replacement request.


## 2. Participants

| Index | Biographical Data | Work Period | Work Place | Work Times | Difference with our persona|
| -------- | -------- | -------- | -------- | -------- |-------- |
| P1    | female  25 y.o., master 1st grade in KAIST      | 7 years     | KAIST Lotteria     | 6 - 10 pm on weekdays |longer work period than our persona.|
| P2    | male, 22 y.o., undergraduate 1st grade in KAIST     | 3 months     | Asheley     | 4 - 8 pm on weekdays |less work period than our persona, differenct work place but also works by weekly schedule|
| P3    | male, 26 y.o., undergraduate 3rd grade in KAIST     | 4 years  | KAIST swimming pool     | 12 - 2 pm on weekdays |longer work period than our persona, differenct work place but also works by weekly schedule|


- We get our test users from the users we interviewed who works by weekly schedules.

## 3. Briefing
![](https://i.imgur.com/rgFKdwi.png)
  The picture above is the weekly time table for weekly changing timetable of current system. One excel sheet includes all workers' schedule, so a user cannot get his own timetable easily.
  
  **Background** 
  In the work where gives weekly changing schedule, workers submit their available time manually every week offline and get weekly timetable which includes all workers’ schedule. The workers say this procedure is very uncomfortable and inefficient, so we will make user's own timetable interactive, based on the his submitted available time.
  
**Purpose** 
Using our system, you can submit your available time online to get a new timetable of next week. Now you can get your own timetable. Also, You can easily send or respond to the replacement request, not contacting all of the workers. Furthermore, you can get your own latest timetable.


## 4. Tasks

1. **Submit a schedule for the next week**: There’s one table you saved already. You have to submit the next week schedule using a new table. Total time of submitted schedule must exceed 6 hours.
2. **Send at least one request for the replacement**: to someone who is available on that time. Then, check whether your request is accepted or not.
3. **Respond to two requests for the replacement**: Accept one request and reject the other.

## 5. Observations

### Themes
1. Limitation of the paper prototype
2. Lack of function
3. Lack of visual emphasis on key function or component
4. Lack of external consistency
5. Incompleteness of function

### Task 1

1. T5 H (p1, p3) felt difficult to match the level of brightness with the actual competition rate.
-> provide criteria: numerical competition rate for each level of brightness.

2. T3 M (p3) mistook the unit of the time slot as one hour because he didn’t watch the time axis carefully.
-> mark the horizontal lines on 30 minute (e.g. 2:30, 3:30, ...) by dotted lines, and lines on 0 minute (e.g. 2:00, 3:00, ...) by solid lines for an intuitive understanding.
3. T5 L (p2) dragged on timetable not only up and down but also left and right.
-> allow left and right drag as well as up and down drag.
4. T3 L (p3) didn’t catch 'the total time' at once.
-> emphasize visually by using big font size or color effect.
5. T2 L (p1) wanted to delete the one of saved timetable
-> make 'delete' button on tab.

### Task 2

6. T3 H (p2) didn’t notice the replacement request is accepted because they didn’t give an attention to the timetable.
-> send notification if someone accepted the request.
-> make continuous effect such as blinking on that slot until the user checks.

7. T1 M (p1, p2, p3) didn’t aware that they can change the mode by moving the switch box.
-> it's the limitation of the paper prototype, the switch will be easy to recognize in the web interface.
8. T2 M (p1, p2, p3) clicked every 'request' button one by one to send requests to all available users. 
-> provide 'request to all available users' button.
9. T2 L (p2) wanted to know who accepted replacement.
-> add acceptance notification with the accepted user name
10. T4 L (p2) pressed the main logo (Albaka) to see the timetable of this week.
-> link to 'MY TIMETABLE' page if user clicked main logo.
11. T5 L (p2) pressed 'cancel all request' button before sending a request to someone.
-> hide a 'cancel all request' button until the user send at least one request.

### Task 3

12. T3 H (p1, p2, p3) clicked 'reject' button so fast, so that they couldn’t realize the requested time is emphasized on the timetable (hover effect).
-> make more visual effects on the notification bar when the user’s mouse comes closely.
-> make a tutorial of responding to requested.

13. T2 M (p2) wanted to change his answer again, after he answered the replacement request.
-> make the history of requests which user can change their respond. 


## 6. Individual Reflections

### Jang Sujin

round 1: observer
round 2: facilitator
round 3: observer

* In two rounds, I participated as an observer. I observed and recorded significant actions without involvement in the user's task procedures. It was easy to detect when users pointed out a lack of functionality or acted differently from our expectations. However, I had to pay attention to observe whether the expected behavior leads to inefficiency. For example, (although clicking the request button was the pridicted) clicking every request button was a critical observation that reduced convenience. Also, it was difficult to consider WHY the off-track action came out in order to come up with the right improvements later.

* In the second round, as a facilitator, I presented the propose and interface of prototype. When user felt difficult because of the poorly represented components, such as switch mode, I had to keep him on the right track. It was difficult to help him to perform the task correctly without giving direct instructions. So, I encouraged him to refer to previous experiences, such as how he got over when he was stuck like this on another platform, or actively ask questions about the ambiguity and make the verbal feedback.

### Wi Heeju

round 1: facilitator
round 2: observer
round 3: facilitator

- For the two rounds, I worked as a facilitator. I tried hard to make the test users go through the task, but not to teach them what they have to do exactly(such as click this button). It was difficult because we did not give them a tutorial of how to use, so it was the first time they used our system and even a paper prototype. We tried hard to make our paper prototype having a consistency with other web applications, but still they got trouble finding where to click for some functions; such as mode change button or how to view someone available on the time table. So I reminded them consistently what is the goal and what is the sub-tasks. I thought we have to give a tutorial for the novice or a hover notification of what will be occured after clicking on that spot. 
- Also, the direct warning message could offend the users or bothering them, so I were very considerate to deliver the warning message.
- There were some functions we made for the users' facilities, but the user didn't even notice that the function is given or going on. Making the proper point of giving them the another bothering notification to use our function or keeping them what they're doing without notifying there are other functions was difficult. We have to test a lot to get what is the right point.

- As a observer, I collected all of the user's motion. Because we tried to make our prototype getting high consistency with other web appliction, the most of users' action were right. But in some tasks, I found that user find the function even they were not intended. For example, in task 2, we provided pop-up of available workers when user drags the time table. Because it was goal of task 2, user surprisingly found where to go(because there was no other button to do the task), but we have to confirm that the user really wanted to use that function.

- Also, I learned that paper prototype is good because user can click everywhere so we can prepare for that actions. However, our test users thought for a long time before clicking. So, there were few or no bad tries; such as clicking main logo, click the button before activated. They were great mistakes we didn't though before, but I wanted to get more mistakes to complement our prototype.

### Kim Dayeon

round 1: computer
round 2: computer
round 3: computer

During all three rounds, I played a role as a human computer in the paper prototype. When a user shows unexpected behaviors or reactions, I must deliver an appropriate error message or warning, but there was lacked preparation for this exceptional situations. Also, since I am not a real computer, the computer's(my) reaction responding to a user's behavior was bit slow, which caused the user's understanding to be deteriorated. Especially, visual effects including hover effect and drag and drop were hard to imitate. 


### Paik Hyunjoo

round 1 : observer
round 2 : observer
round 3 : observer

   Observing how participants deal with our paper prototype we found that there are some functions they expect for sure but we missed. So they did behavior we didn't expected and it was risky to guess why without asking why. Acting as an observer I could see users don't use the function we want them to use as checing total time they assigned. We couldn't get if a participant couldn't recognize that function or just didn't use it. So what I found difficult and important is to find why participant react as that way (I mean if one skip the function we intended them to use they could just skip using it or also could fail to recognize that function) and what caused them to do so. After testing, we got some advise from participant according to what we found during test as I couldn't talk them during testing.

## 7. Studio Reflections

1. Add a new participant. The one of existing partipant (retired part-timer) is out of target user.
-> We agree. We tested our prototype to new participant(P1).

2. On a larger scale, tasks can be grouped into two groups: submit and replacement. It would be better to add another task.
-> The needs of target users found in previous DPs were focused on following three issues: 1)solve the inefficiency of submitting next week's schedule offline, 2)check one's own schedule easily, and 3)find replacement. So we designed these three functions as top priorities. From the next prototype, we will add features such as wage calculation and previous timetable log to reflect the feedback.

3. It would be better if the terms are unified for modes.
-> We will change the term 'MY TIME TABLE MODE' to 'THIS WEEK'S TIME TABLE' to unify with 'FOR NEXT WEEK'


