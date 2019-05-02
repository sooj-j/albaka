// JavaScript source code
// Your web app's Firebase configuration



function putuser(user) {
    firebase.database().ref('userpool/').child(user.id).set(user).then(function () {
        window.location = "view.html?" + "uid=" + user.id;
    });

}

function login() {
    var id = $('#uid').val();
    var pw = $('#psw').val();
    firebase.database().ref("userpool").child(id).once("value", function (snap) {
        if (snap.exists()) {
            if (snap.val().pw == pw) {
                window.location= "view.html?"+"uid="+id;
            } else {
                alert("Wrong Password. Pleas try again.");
                window.location = "index.html";
            }
        } else {
            alert("No Id exists.");
            window.location = "index.html";
        }

    });
   

}

function register() {
    var id = $('#uid').val();
    var name = $('#uname').val();
    var pw = $('#psw').val();
    var wp = $('#workplace').val();
    var uimg = $("#pre_img").attr('src');


    var newuser = {
        "id": id,
        "name": name,
        "pw": pw,
        "workplace": wp,
        "img": uimg
    };

    firebase.database().ref("userpool").child(id).once("value", function (snap) {
        if (snap.exists()) {
            alert("Id already exists. Please try another id.^.^");
            window.location = "signup.html";
        } else {
            console.log("add new user");
            putuser(newuser);
        }

    });

      

    

};



function preview() {
    var id = $('#uid').val();
    var file = $("#getimg").prop("files")[0];

    var storageRef = firebase.storage().ref();

    //find file by user id in storage
    if (file) {
        const task = storageRef.child(id).put(file);
        task.then(snap => storageRef.child(id).getDownloadURL())
            .then((url) => {
                $("#pre_img").attr('src', url);
            })
            .catch(console.error);
    }
};

$(document).ready(function () {
    $("#getimg").change(function () {
        preview();
    })
});

