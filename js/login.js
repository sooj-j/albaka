// JavaScript source code
// Your web app's Firebase configuration



function putuser(user) {
	firebase.database().ref("userpool/test1").once("value", function (snap) {
		var global_test = snap.val();
		user.thisweek = [[[6, 11], [20, 23]], "null", [[0, 3], [5, 8], [12, 16]], [[5, 9], [15, 18]], "null", [[3, 9]], "null"];
		user.wage = global_test.wage;
		user.wage.may.goal = "";
		user.nextweek = global_test.nextweek;
		user.nextweek.tab.tab1=["null","null","null","null","null","null", "null"]
		user.nextweek.tab.tab2=["null","null","null","null","null","null", "null"]
		user.nextweek.tab.tab3=["null","null","null","null","null","null", "null"]
		user.nextweek.submitted=["null","null","null","null","null","null", "null"]

		firebase.database().ref('userpool/').child(user.id).set(user).then(function () {
			window.location = "view.html?" + "uid=" + user.id;
		});
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

	if (id == null || name == null || pw == null || wp == null || uimg == null) {
		alert("You have to fill out all of the forms. Please fill in them all.");
	};


	var newuser = {
			"id": id,
			"name": name,
			"pw": pw,
			"workplace": wp,
			"img": uimg,
		 // "thisweek": "null",
			"nextweek": "null"
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
function dataURItoBlob(dataURI,uid) {
	var byteString = atob(dataURI.split(',')[1]);
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	var bb = new Blob([ab], { "type": mimeString, "name": uid});
	return bb;
}

function img_resize(target_file,uid) {
	var file_type = target_file.type;

	if (file_type && file_type.substr(0, 5) == "image") {

		var img = document.createElement("img");
		var reader = new FileReader();
		reader.readAsDataURL(target_file);
		reader.onload = function () {
			img.src = reader.result;

			img.onload = function () {
				var MAX_WIDTH = 100;
				var MAX_HEIGHT = 100;
				var width = img.naturalWidth;
				var height = img.naturalHeight;
				console.log(width, height);
				if ((width > MAX_WIDTH) || (height > MAX_HEIGHT)) {
					if ((width / height) > (MAX_WIDTH / MAX_HEIGHT)) {
						height *= MAX_WIDTH / width;
						width = MAX_WIDTH;
					} else {
						width *= MAX_HEIGHT / height;
						height = MAX_HEIGHT;
					}
					var canvas = document.createElement("canvas");
					canvas.width = width;
					canvas.height = height;
					var ctx = canvas.getContext("2d");
					ctx.drawImage(img, 0, 0, width, height);
					var dataUrl = canvas.toDataURL("image/png");
					var blob = dataURItoBlob(dataUrl);
					console.log("url", blob);
					//var formData = new FormData();
					//formData.append("file", blob);
					//console.log("url", formData);

					return blob;

				}
			}
		}
	}
};


function preview() {
	var id = $('#uid').val();
	var file = $("#getimg").prop("files")[0];
	console.log("file", file);

  var storageRef = firebase.storage().ref();

    //find file by user id in storage
	if (file) {

    const task = storageRef.child(id).put(file);
    task.then(snap => storageRef.child(id).getDownloadURL())
        .then((url) => {
            $("#pre_img").attr('src', url);
					console.log("ready to register");
					$("#img_message").html("Your image is loaded successfully. You can 'SIGNUP' now")
        }).catch(console.error);
    }
};

$(document).ready(function () {
    $("#getimg").change(function () {
        preview();
    })
});
