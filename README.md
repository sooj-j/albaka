# albaka

> CS374: Intro to HCI
> Dayeon Kim, Sujin Jang, Heeju Wi, Hyunjoo Paik

albaka is a weekly scheduling system for part-timers

### directory layout

        js
        │
        ├── constant.js                 timeAxis and day
        ├── login.js                    login and signup functions
        ├── submit.js                   ?
        ├── view.js                     ?
        ├── wage.js                     ?

        pages
        │
        ├──


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
        │       ├── test1 (id)
        │       │       │
        │       │       ├──  id              string
        │       │       ├──  pw              string
        │       │       ├──  name            string
        │       │       ├──  img             url?
        │       │       ├──  workplace       
        │       │       ├──  thisweek
        │       │       │       ├──  0 : mon_arr
        │       │       │       ├──  1 : tue_arr
        │       │       │       ├──  2 : wed_arr
        │       │       │       ├──  3 : thu_arr
        │       │       │       ├──  4 : fri_arr
        │       │       │       ├──  5 : sat_arr
        │       │       │       └──  6 : sun_arr
        │       │       │       
        │       │       └──  nextweek
        │       │               │
        │       │               ├──  submitted
        │       │               │       ├──  0 : mon_arr
        │       │               │       ├──  1 : tue_arr
        │       │               │       ├──  2 : wed_arr
        │       │               │       ├──  3 : thu_arr
        │       │               │       ├──  4 : fri_arr
        │       │               │       ├──  5 : sat_arr
        │       │               │       └──  6 : sun_arr
        │       │               │
        │       │               └──  tab
        │       │                       ├──  tab1
        │       │                       │      ├──  0 : mon_arr
        │       │                       │      ├──  1 : tue_arr
        │       │                       │      ├──  2 : wed_arr
        │       │                       │      ├──  3 : thu_arr
        │       │                       │      ├──  4 : fri_arr
        │       │                       │      ├──  5 : sat_arr
        │       │                       │      └──  6 : sun_arr
        │       │                       ├──  tab2
        │       │                       └──  tab3
        │       │                   
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
                │       └──  timetable  
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
