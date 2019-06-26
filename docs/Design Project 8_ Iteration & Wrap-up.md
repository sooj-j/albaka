# Design Project 8: Iteration & Wrap-up

**Albaka**: Dayeon Kim, Sujin Jang, Heeju Wi, Hyunjoo Paik


**Video URL**: https://youtu.be/GjgfWao66Ys
(captions are provided on the youtube)

## 1. Final Interface

### Brief description according to the menu

**1) MY WAGE**
Users can see wage information they’ve earned in past months. Users can also set the montly goal by referring to the recommended goal.
![](https://i.imgur.com/uafeWyO.png)

**2) SUBMIT NEXT WEEK**
Users can submit the timetable for the next week in this menu. Users can add time blocks by dragging and remove time blocks by clicking the ‘x’ button on each block. 
![](https://i.imgur.com/hA6fI0z.png)

**3) VIEW THIS WEEK**
Users can check the timetable for this week in this menu. Users can send and get replacement requests with other users.
![](https://i.imgur.com/F8FHbcj.png)



### Quality arguments 


In short, our service ALBAKA is **the weekly-scheduling webpage** for part-timers. We targetted **part-timers who works in weekly schedule-changing workplace** such as Lotteria, Vips, PizzaHut. We were able to identify some important needs from the interviews of target users.

First, they were actually repeatedly working week after week in the form of submitting and receiving time sheets through offline. Part-timers want to submit their available timetable for next week and get a newly scheduled timetable for this week while spending less time and effort. Second, since weekly part-timers’ schedules are flexible, replacements occur quite often. Part-timers wanted to reduce unnecessary waste of time and emotion of the procedure. Lastly, in the current system, they cannot get their wage unless they write down all the works they did by themselves. So, they wanted to reduce this unnecessary effort as well as motivation for working. **Based on these needs**, we have set up three different tasks **(goal setting, timetable submission, sending and responding replacement request)**. Each task conforms to the aforementioned needs, which have led to the actual implementation process.

In user testing and demo session, we met **the actual target user**. They really liked our service, and were amazed at the completeness of implementation. They also asked for the service to be made available. Through these responses, we were able to gain recognition that our services are able to relieve existing inconveniences and have novelty.


Our service is equipped with both easy-to-use **learnability**, **intuitive design** and **consistency**. First, the help buttons we made helped learnability. Representatively, they showed how the recommended wage was calculated, how the competition rate for each time slot is expressed in next week's timetable, and what color each time-slot means in this week's timetable. In user testing, most users could easily know what each UI component meant by clicking on these help buttons and then, plan their next action.

![](https://i.imgur.com/MLxtzPD.png)

In addition, since our UI components are almost completely designed in external appearance, it is easy for users to intuitively recognize what features they have. From the user testing, all of te test-users said after doing once, they didn't felt difficulties for doing tasks. For example, the process bar in SUBMIT NEXT WEEK shows a direct relationship with time because the value varies each time a user adds a time block.

![](https://i.imgur.com/STALhMm.png)

![](https://i.imgur.com/KVCrjMp.png)

Moreover, there is difference in SUBMIT NEXT WEEK and MY WAGE for the progressbar. We considered usability, so in the SUBMIT page we give the weekly goal, while we use monthly goal in MY WAGE page.

![](https://i.imgur.com/VwKo7Xh.png)

In progress bar, we provide user recommended goal and based wage to make user decide the goal easily. Also, if the goal is too high based on the recommended goal, we alert user.
![](https://i.imgur.com/HRl9yEo.png)


Because the replacement window shows other users as profile pictures and shows the rewards as icons, it makes it easier to distinguish and understand without having to read the text.
![](https://i.imgur.com/ksr6m1t.png)

If user receive replacement request, user can check the reward if it has with the icon on it.
If you click that block, user can accept or reject or reject with the reward. This is what other system doesn't have and we put them in one response that user do not have to spend more time and not be disturbed from that.
Moreover, this is hard-coding part since this reward is also used in reward-inbox and request-inbox.
![](https://i.imgur.com/QGKlkzq.png)



Finally, because our service has a timetable look similar to the calendar application or otl that most people usually use, external consistency has been achieved. In particular, tab menus and time blocks show this consistency well and are a typical example of a design that does not require explanation.

![](https://i.imgur.com/EMrEK91.png)
Also, our SUBMIT NEXT WEEK and the time table in the VIEW THIS WEEK menu have inner constancy because they have similar forms. This made users more comfortable and could be distinguished through color. 

For the color of each time table, we tried to pick colors which looks very different but not disturbing users. So we choose basic color orange, blue, green and choose soft-tone of them. We choose orange for their fixed schedule, dark-orange for time-slot they sent request in VIEW THIS WEEK page. Also, we choose light-blue for dragging slot, medium-light-blue for setted-slot in SUBMIT NEXT WEEK. And we made colors as variable to have same color through whole part.
![](https://i.imgur.com/iuESao7.png)


From the user need, we tried to show the competition rate of each time slot when user submit their time schedule. Since we colored the dragged slot as blue so we made the competition rate color as grey which would not disturb the origin function.

![](https://i.imgur.com/MpLkF4T.png)

After rejecting request, we want to not disturbing user by that request, so we removed them from the timetable. However, we let the user can accept again when he clicks the reward inbox. You may not notice this, however, ALBAKA shows request with the reward on the top because we thought it has higher priority. You can see it on the screenshot. Also, for the real world application, the left time is important. So if there is little time or days left, we show d-day or time left.

![](https://i.imgur.com/HrsJwJY.png)

We also made reward-inbox which user can check what reward he has to send or receive. We tried to emphasize what reward is and the person who is related by using icon and emphasized text.

![](https://i.imgur.com/IsHz8w4.png)


If we solve a few of the things we have, we think it's very likely to be used(**feasibility**). The weakness we think is the security of logins and databases, a separate page for checking membership information, and interworking with actual data rather than with fake data.

We have worked hard to apply the needs we grasped to the service, and we think the project has been successful.


## 2. Iteration

From the User Testing and Design Studio #7, we could get some feedbacks and we built up our plan for iteration. However, the time is limited so we had to choose some which will be very helpful for the users. Below is what we did for iteration in DP8 period and each has the reason why we did, what detailed changes we made including concreate examples.

1. Most of the users said that it is hard to catch out characters because they were so small, so we made our overall font sizes of timetable and menu bars bigger.
![](https://i.imgur.com/S7ni2RV.png)


2. We added more attractive indicators of the today’s date. After the user-testing, we asked did they get the today’s date, however, they said they didn’t noticed. So, we thought for our project, the today’s date is important, so we tried to made another indicator to indicate today’s date at a glance. We put the red circle on today’s date, which is usually used to indicate today’s date, not to lose consistency. We made date circle on ‘THIS WEEK’ and ‘MY WAGE’ page.
![](https://i.imgur.com/tbLHqAS.png)

3. A test-user said that an user cannot make the replacement request if a few hours left for the replacement, because it will take time to get to the workplace. We thought this is really important feature if ALBAKA is applied for real workplace. So, we made indicators of how many hours left if it is request of today, or how many days left if there is less than 2 days left.
![](https://i.imgur.com/ukjbBA7.png)

4. For the ‘SUBMIT’ page, we made that user cannot drag up. If user drag down to upside, there were time indicating error. Since there were very few people dragging upside down, we made user cannot drag upside down. Only dragging down is accepted for ‘SUBMIT’ page. You can see only hover effect is applied, but cannot drag whole block by dragging upside down.
-> you can check it by dragging upside down in SUBMIT NEXT WEEK page.

5. We made dummy data more realistic based on today’s date. When we did user-testing, VIEW THIS WEEK, SUBMIT NEXT WEEK, MYWAGE pages’ date is different from others. And this made testing user confusing. Since the users were not actual users, dummy data was forced to be used, therefore, we have to set today's date arbitrarily. However, to make it look as real as possible, we made the date of SUBMIT NEXT WEEK page one more week ahead of the view this week, and made the date of MY WAGE to record the monthly wages up to the date of today.
-> We set today's date of ALBAKA as 5/13 for testing. We made dummy data of history of wages before 5/13 for MY WAGE page. We set the week as 5/13~5/19 for VIEW THIS WEEK page. Then, we made the week of SUBMIT NEXTWEEK page as a week ahead which is 5/20~5/26.

6. Since there were lots of users wondering how the recommended goal is set in ‘MY WAGE’ page. We thought users should not have questions about the system, because users may lose trust for our system. So, we tried to solve their questions by making helper function using ‘?’ icon. We set the recommended goal based on previous wages of each user and we explained this calculation in that helper function.
 ![](https://i.imgur.com/Hnkb3uZ.png)



7. There was a feedback that it would be look better for weekly sum and total sum to look different from other ordinary days in ‘MY WAGE’ page. Because they cannot catch the sum is really sum of the days of the week. If user cannot catch the weekly sum and monthly sum easily, we thought it is totally different from what we want to do intentionally, so we tried to make the weekly sum and the monthly sum to look like sum of each row of days and column. So we made the background color or week’s total wage to grey which is different from ordinary white background color. Also, we made the TOTAL WAGE to look like sum of weekly sum by changing them be in the extension of weekly sum column and having same color as them.
![](https://i.imgur.com/vaWudIA.png)

From this iteration of DP8 period, we learned how to manage our limited time efficiently. There were some great feedback for our system from user-testing feedback. However, to deal with some of them, we have to build up our system newly. So, we have to choose some of them for iteration. For this decision, we have to decide how to choose the priority of iteration feedbacks. We labeled some feedback for iteration as having high priority which said that is totally different from what we want to do in aspect of user’s need and what made our system incomplete. 




## 3. Individual reflection

- Paik Hyun joo
    First of all, I want to thank to all my teammates. Teammates were very close and knew each other very well but I never felt excluded and was able to focus on my work. I feel so lucky to meet such good teammates.
    Our team had very free atmosphere. As three of teammates were very close, it was easy for any of our team to say one’s opinion any time and they were reflected aggressively. It helped to get output with every small details concerned enough. It helped a lot especially in this class as we could take care of every small pieces of visual components. Also teammates were very meticulous so we could get almost all small parts of studio session. Especially we got many advices of our teaching assistant and it enabled us to get many insights about design and improve it. Also we continuously listed up things to do and enable every teammates to see progress of each project. Also distributing one’s tasks clearly made us to do one’s job responsibly.
    But as the story continued and the work progressed, these often made major changes that made each person tired. I remember that it took more than five hours to make the first presentatoin of the studio. I was tired when we didn't make any progress, as we continued to discuss similar topics to spend time discussing almost completed slides. Over time, however, we was able to effectively finish the job with the help of our assistant, knowing where to focus. So, to summarize, it was good for everyone to give their own opinions and to listen to them, but I was tired because of the repetition of similar topics, but we were able to improve them with choice and focus. 
For our team, design was achieved through a lot of modifications and discussions. We have done countless simulation making prototype and shared opinions every time we met. Even at our kakaotalk group we often asked advices to each other every time we have done something and gave opinion to other’s job. As design have certain answer by merging many people’s opinion we could get better idea. Also I found user testing is very helpful for user friendly design. So many modification was inevitable and making prototypes to choose how we will change our design helped as prototypes are not used again to do next level prototyping and to implement the real service. We had hard time narrowing target users and choosing 3 tasks. We originally chose manager and part-timers as target users and manages at weekly scheduled work places and we narrowed it as weekly scheduled part-timers. Also we had to choose our tasks precisely. There balance and work flow decided how balanced and the functions are implemented and it’s all about our program. Sometimes test users felt awkward doing user testing and it helped us think of missing parts of our services and lack of consistencies. So I found specific and clear target users and tasks define our service’s identity. Without them, our service have no proper background why it is created and why it is essential. 

    It was a special experience working in team as I had many chances to do some special works alone. I made an overall design of time table using sketch program and gave presentation about our prototype infront of all of classmates. It was a great pleasure for me to speak up my design and opinions in ways I like. For a final prototype, I was one to take charge of wage page. I made every functions and design of that page. It was simple to make as I made one html code shared for all test user as it doesn't ruin user testing. I concentrated on drawing calender which look unified to timetable and visually organized. Making progress bar and calender I focused much on layout, fontsize and color. 




- Dayeon Kim
Our team was made up of friends who knew each other. We were of a similar age, so we could talk and treat each other comfortably. Also, since most of the members had a delicate and meticulous nature, I could pay attention to the details I had to take in preparation for the presentation or in the report. Because of our closeness, we were able to express our opinions and to praise or criticize each other freely, and I think this led to a good result.
    
	At first, we all got together and started talking about the project, and it took us a very long time to discuss all the minor issues. But as the semester progressed, we were able to comprehend what was important and what was not important through the course. In addition, the time of the meeting could be shortened gradually as each of us promised to think fully and bring some opinions or results before getting together and talk to each other. And after each studio session, we were able to make up for what we missed by getting feedback from our teaching assistant for about half an hour on our performance and future plans.

    In the course of the team project, I learned the importance of division of roles according to team members’ respective capabilities and responsibility for their part. I have thought allocating the same workload was the fairest and best option, but with this project, I found that each person can increase its efficiency by distributing a greater amount of work to their parts of confidence. It had to be able to make such a decision when time was running out and there was a lot of work to be done. We did everything together in the first half of the project, but in the latter half, we were able to learn how to allocate each other's work efficiently. And in the latter half, I led the way, taking the responsibility together of interview and user testing of the studio process and the "SUBMIT THIS WEEK" menu of the implementation process.

	I have experienced the web development once through an internship last winter. At this time, it was a management webpage developed for employees in the company, which took two weeks and four weeks to plan and implement. At that time, since it was the first time that all the team members were developing the web, we began implementation with a plan consisting of hand sketches and descriptive text. We had to repeat inefficient and exhaustive tasks several times because we had to modify the plan during implementation as well as after implementation. 

	I realized a lot when I approached a similar web-based GUI implementation project in a different way in this HCI class. First, we could always see if the project was going the right way by clarifying the needs and the POV. And with prototyping iteration, we were able to reduce errors in the final implementation phase by gradually building in-depth models. Before the final demo session, I thought there were too many interviews, but more user testing seems to be needed, given the fact that there are still shortcomings left, despite repeated feedback and corrections.

	Also, we could see that the UI we think is very different from the UI users think. In particular, we focused on the practicality of the UI operation as well as the way it works. However, users tried to evaluate each element with more focus on its intuition and design. Through the team-based design project experience, I was able to realize the importance of communicating with team members and with users in design process and GUI implementation.

- Jang Sujin

    Fortunately, most of the things I could expect to the project team were good thanks to meeting the nice members. Especially, the brainstorming process worked well. We had so many meetings to prepare for the weekly studio. Each time we presented various ideas very enthusiastically in a friendly atmosphere. Each of us appeals to own ideas, and the process of reflecting the most popular on the project was smooth.

    We had a bit of a challenge performing development work. Prior to the development, it was difficult to evenly distribute the work because it was difficult to know how much load would be required. It is a little sad that the our codes lack unity because we were running out of time to review each other's code.

    When there have been several differences of opinion about ui or internal logic, , we have made a majority decision on what we believe to be more appropriate for users after sufficient discussion. For example, in the albaka system, the weekly wage goal is calculated in the submit page based on the user's monthly goal. There were two opinions: 1) remaining monthly goal * (1 / num. of remaining weeks) 2) remaining monthly goal * (num. of days of this week / num. of remaining days).  If there are many remaining weeks, there is not much difference between the two calculations. However, there is critical example: remaining monthly goal is $80 and eight days left this month, then $40 for the first and $70 for the second. So, I was able to convince members to use the second calculation.

    The Lesson I learned about the teamwork is as follows: 1) Problems always occur. No matter how well-organized a team is, at least one conflict is inevitable. It is important to learn from the process of converging opinions. For example, you can find compelling examples or learn to logically assert technical advantages. 2) Always pay attention to the team members. Members must listen to each other's ideas. In addition, when implementing a product, review the other person's code and learn what to learn and fix. 3) People are as important as projects. Maintaining good relationships within a team also has a good effect on the team atmosphere and a gently loosened atmosphere increases productivity.

    The process of identifying individual needs and creating a service only for them was interesting. Before taking the class, I thought it was important to create a service for as many users as possible. However, it was valuable to train to create customized services for the target user (as narrow as possible). The more certain the target user is, the more distinctive the service can be. Because we created a platform targeting weekly-scheduling part-timers where replacement occur frequently, we were able to develop interesting elements such as a replacement system using reward. While doing DP, we did user testing for each prototype and found meaningful observation to improve the system. Because users directed improvement of service, goal can be established clearly. The clear task goal is also helped implementation.

    I developed the web frontend technical capabilities, such as jquery and bootstrap, and also had the opportunity to think about web UI factors that could enhance usability. For example, the dragging function, which is commonly used in the timetable service, used to enhance learnability.


- Heeju Wi

   When we have to decide something, each member asserted their own opinions based on their own logic. Through this process, we got great idea which we didn’t think of before, and then we was able to go in better direction. Reward of the replacement and goal setting came from this. Also, by free discussion with my teammates, we can adjust our wrong HCI concept and fill the missing part of UI in the aspect of HCI. For example, for ‘SUBMIT’ part, we added the functions based on each of HCI knowledge and there would be enough functions which user may needed such as tab, submit, and reset button. Also, after implementing the part of each member, other members tested it for what have to be fixed. That was great for us, because before the user testing, we can fix the trivial errors and get the real deep user feedback, not disturbing from implementation errors.
   
   For the report writing, at first, we tried to make them perfect. So we tried to confirm and change it over and over.  I think it was not efficient way for team. Also, since we did not want to harm each others, so we didn’t try to give other opinions easily early on. However, after the lecture of the importance of free discussion, we tried to ask each other, whether is there other opinion and asked why you came up with that opinion to create free-speaking-environment.
   
   Since all teammates cannot have same ability, there were someone who can implement fast. However, all the teammates have to implement their parts equally. So we tried to distribute parts based on their skills to let them make the same effort. Also, if someone finished their part quickly, they helped others to make better quality. We distributed our works by asking each of them and adjusting the amount of work appropriately, so all of teammates followed our plan without any complaint.
   
   I learned that it is important to be free to express my own opinions. This is what I learned from the class theoretically and team project in practice. If we didn’t freely discuss, I think we cannot come to this result. For the next team project, I will try hard to create environment where we can freely discuss. 
   
   For the user-centered design process, I learned what is important feature for user such as learnability. When I designed UI before, I just tried to think by myself what would be better for user. However, now I know what is better such as size, color basically by the lecture of the HCI class, and I can search the research to get which one is better. Also, I learned how to do user-testing in team. Before having this lecture, I didn’t ever heard of the facilitator. Now I know why the role distribution between teammate is important for user testing. Moreover, I learned how to user-test without no bias or no force. For the web-based GUI implementation, I learned that making the concrete form of each data is important. At first, even we built up some form of data, there were some difference in each part so we have to implement again to fix the error. In addition, we added attribute when we need it, so it didn’t have same form and we cannot understand each meaning easily.
   
   I tried to make our system act more completely and distribute work for each. So I implemented some indicators for user and fixed some trivial errors for DP8 such as putting indicators today's date, D-day, D- time and fixed some error which made our web incomplete such as hide goal when goal isn't set and inbox error. Overall, since I knew all teammates, I tried to create an environment where all members could freely express their opinions. I implemented inbox part and adjusting whole part to have the consistency.