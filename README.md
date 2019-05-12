# albaka

> CS374: Intro to HCI
> Dayeon Kim, Sujin Jang, Heeju Wi, Hyunjoo Paik

albaka is a weekly scheduling system for part-timers

### directory layout

        js
        │
        ├── constant.js                 define timeAxis and day array
        ├── login.js                    login and signup functions
        ├── submit.js                   submit for next week timetable.. tab......
        ├── view.js                     view this week timetable
        ├── wage.js                     @
        ├── inbox.js                    remained request/ remained rewards to deal with
        ├── hover.js                    hover effect for remained request/reward box work in submit.html and view.html
        └── common.js                   submit과 view에서 동시에 사용 가능한.... 것들... 말고도...괜츈....

        pages
        │
        ├── page 다 여기에 옮기는게 어떨까욤?.?

        css
        │
        ├── style.css                   for common css; top-menu, inbox, table, and other basic frames
        ├── submit.css                  submit page 및 js에서 사용하는 css
        ├── view.css                    view page 및 js에서 사용하는 css
        └── wage.css                    @


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
        │       │       │               ├──  tab2
        │       │       │               └──  tab3
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
        │       │               │               ├── reward : 'beer'
        │       │               │               ├── sender : 'Juho Kim'
        │       │               │               └── isPending : false
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
