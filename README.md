# albaka

> CS374: Intro to HCI
> Dayeon Kim, Sujin Jang, Heeju Wi, Hyunjoo Paik

albaka is a weekly scheduling system for part-timers

### directory layout and simple descriptions

        js
        │
        ├── constant.js                 define timeAxis and date array
        ├── login.js                    login and signup functions
        ├── submit.js                   submit for next week timetable
        │                                 - can add time slots by dragging / delete time slots by clicking X btn on time blocks
        |                                 - initializeTimeTable: draw the empty timetable
        |                                 - readFromDatabase: load from Database / make & color & write time on time blocks / calculate the sum of time blocks
        ├── view.js                     view this week timetable
        |                                 - can send and receive replacement request
        ├── wage.js, wage_april.js, wage_march.js, wage_february.js                     
        ├── inbox.js                    remained request/ remained rewards to deal with
        ├── hover.js                    hover effect for remained request/reward box work in submit.html and view.html
        └── common.js                   submit과 view에서 동시에 사용 가능한 functions

        htmls (not a directory)
        │
        ├── index.html                  UI for login
        ├── nav.html                    UI for top menu navbar
        ├── signup.html                 UI for signup
        ├── submit.html                 UI for submitting next week timetable
        ├── view.html                   UI for viewing this week timetable
        ├── wage.html                   UI for checking the previous wage
        └── wage_april.html, wage_march.html, wage_february.html

        css
        │
        ├── style.css                   for common css; top-menu, inbox, table, color, and other basic frames
        ├── submit.css                  css for submit.html, submit.js
        ├── view.css                    css for view.html, view.js
        └── wage.css                    css for wage.html, wage.js


        docs
        │
        ├── DP01_Needfinding
        ├── DP02_Ideation
        ├── DP03_Paper_Prototpyping
        └── DP04_Lo_Fi_Prototyping



### Firebase Database Layout
        albaka
        │
        ├── userpool
        │       │
        │       ├── test1 (= user id)
        │       │       │
        │       │       ├──  id              user id (string)
        │       │       ├──  pw              user password(string)
        │       │       ├──  name            user real name(string)
        │       │       ├──  img             user’s small face image (url from firebase storage)
        │       │       ├──  workplace       workplace (use shortcut such as wp1, wp2..)
        │       │       ├──  thisweek
        │       │       │       ├──  0 : mon_arr
        │       │       │       ├──  1 : tue_arr
        │       │       │       ├──  2 : wed_arr
        │       │       │       ├──  3 : thu_arr
        │       │       │       ├──  4 : fri_arr
        │       │       │       ├──  5 : sat_arr
        │       │       │       └──  6 : sun_arr
        │       │       │       
        │       │       ├──  nextweek
        │       │       │       │
        │       │       │       ├──  submitted
        │       │       │       │       ├──  0 : mon_arr
        │       │       │       │       ├──  1 : tue_arr
        │       │       │       │       ├──  2 : wed_arr
        │       │       │       │       ├──  3 : thu_arr
        │       │       │       │       ├──  4 : fri_arr
        │       │       │       │       ├──  5 : sat_arr
        │       │       │       │       └──  6 : sun_arr
        │       │       │       │
        │       │       │       └──  tab
        │       │       │               ├──  tab1
        │       │       │               │      ├──  0 : mon_arr
        │       │       │               │      ├──  1 : tue_arr
        │       │       │               │      ├──  2 : wed_arr
        │       │       │               │      ├──  3 : thu_arr
        │       │       │               │      ├──  4 : fri_arr
        │       │       │               │      ├──  5 : sat_arr
        │       │       │               │      └──  6 : sun_arr
        │       │       │               ├──  tab2 ...
        │       │       │               └──  tab3 ...
        │       │       │
        │       │       ├──  received_req // for rejected requests once
        │       │       │       |
        │       │       │       └── random_index(int) //per one requestex. ex) 0,1,,,
        │       │       │               ├──  date : "Day Date" ex) "TUE 4/13"
        │       │       │               ├──  end_time : "request end time" ex) "13:00"
        │       │       │               ├──  start_time : "request start time" ex)"10:30"
        │       │       │               ├──  from : "user id" who sent this request
        │       │       │               └──  reward : (string) reward of the request/ "" for no reward
        │       │       │        
        │       │       ├──  change // for accepted request
        │       │       │       |
        │       │       │       └──randomkey
        │       │       │               ├── date : "Day Date" ex) "TUE 4/13"
        │       │       │               ├── end_time : "request end time" ex)
        │       │       │               ├── start_time : "request start time"
        │       │       │               ├── receiver: "userid" who accepted the request
        │       │       │               └── reward: "reward" to give
        │       │       │
        │       │       ├──  requestQueue // queue for automatically receive request
        │       │       │       └──  randomKey
        │       │       │            ├── 0 (start row) : 10
        │       │       │            ├── 1 (end row) : 20
        │       │       │            ├── day : 0
        │       │       │            ├── reward (optional) : 'beer'
        │       │       │            ├── sender : 'Juho Kim'
        │       │       │            └── isPending (optional) : false
        │       │       │
        │       │       ├──  requestSent
        │       │       │       ├──  0
        │       │       │       │    └──  -LeZMr5akx23bdV0aLYH (random key)
        │       │       │       │               ├── 0 (start row) : 10
        │       │       │       │               ├── 1 (end row) : 20
        │       │       │       │               └── status : ['wait', 'wait', 'wait']
        │       │       │       ├──  1
        │       │       │       ├──  2
        │       │       │       ├──  3
        │       │       │       ├──  4
        │       │       │       ├──  5
        │       │       │       └──  6
        │       │       │
        │       │       └──  requestReceived
        │       │               ├──  0
        │       │               │    └──  -LeZMr5akx23bdV0aLYH (random key)
        │       │               │               ├── 0 (start row) : 10
        │       │               │               ├── 1 (end row) : 20
        │       │               │               ├── reward (optional) : 'beer'
        │       │               │               ├── sender : 'Juho Kim'
        │       │               │               └── isPending (optional) : false
        │       │               ├──  1
        │       │               ├──  2
        │       │               ├──  3
        │       │               ├──  4
        │       │               ├──  5
        │       │               └──  6
        │       │                       
        │       ├── test2 (id)
        │       └── ...
        │       
        └── workplace
                │
                ├── wp1 (workplace1)   
                │       │
                │       ├──  userlist
                │       │       │
                │       │       ├──  id : test1   
                │       │       └──  id : test2  
                │       │
                │       ├── CompetitionRate // key= day, value =string which contains 38 numbers which means how many workers had subbmitted per 30 min.
                │       │       │
                │       │       ├── 0 : "0,0,0,1,1,2,3,...,2,0"
                │       │       ├── 1 : "0,0,0,1,1,2,3,...,2,0"
                │       │       ├── 2 : "0,0,0,1,1,2,3,...,2,0"
                │       │       ├── 3 : "0,0,0,1,1,2,3,...,2,0"
                │       │       ├── 4 : "0,0,0,1,1,2,3,...,2,0"
                │       │       ├── 5 : "0,0,0,1,1,2,3,...,2,0"
                │       │       ├── 6 : "0,0,0,1,1,2,3,...,2,0"
                │       │
                │       └──  timetable  //timetable scheduled from workers' submitted time, each arr contains userid per 30 min
                │               │
                │               ├──  190401_0407
                │               │       ├──  0 : mon_arr
                │               │       ├──  1 : tue_arr
                │               │       ├──  2 : wed_arr
                │               │       ├──  3 : thu_arr
                │               │       ├──  4 : fri_arr
                │               │       ├──  5 : sat_arr
                │               │       └──  6 : sun_arr
                │               │      
                │               ├──  190408_0415
                │               │       ├──  0 : mon_arr
                │               │       ├──  1 : tue_arr
                │               │       ├──  2 : wed_arr
                │               │       ├──  3 : thu_arr
                │               │       ├──  4 : fri_arr
                │               │       ├──  5 : sat_arr
                │               │       └──  6 : sun_arr
                │               │      
                │               └── ...
                └── wp2
