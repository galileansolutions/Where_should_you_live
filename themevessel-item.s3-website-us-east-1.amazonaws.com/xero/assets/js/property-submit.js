function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("location not supported in browser");
    }
}

var tlatitude='0',tlongitude='0';

function showPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    tlatitude = position.coords.latitude;
    tlongitude= position.coords.longitude;
}

// initialize storage reference
const storageService = firebase.storage();
const storageRef = storageService.ref();

// handle upload change
document.querySelector('#fileupload').addEventListener('change', handleFileUploadChange);
let selectedFile;
function handleFileUploadChange(e){
  selectedFile = e.target.files[0];
}

function addProperty()
{

    /*let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let area = document.getElementById("area").value;
    let bedroom = document.getElementById("bedroom").value;
    let bathroom = document.getElementById("bathroom").value;
    let address = document.getElementById("address").value;
    let detail = document.getElementById("detail").value;
    let city = document.getElementById("city").value;
    let code = document.getElementById("code").value;
    let age = document.getElementById("age").value;
    let contact = document.getElementById("contact").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    */

    let val = $('#sale:checked').length > 0;
    console.log(val);
    var propertyRef = firebase.database().ref("properties/");

    propertyUpload = propertyRef.push({
        name : document.getElementById("name").value,
        price : document.getElementById("price").value,
        area : document.getElementById("area").value,
        bedroom : document.getElementById("bedroom").value,
        bathroom : document.getElementById("bathroom").value,
        address : document.getElementById("address").value,
        detail : document.getElementById("detail").value,
        city : document.getElementById("city").value,
        code : document.getElementById("code").value,
        age : document.getElementById("age").value,
        contact : document.getElementById("contact").value,
        email : document.getElementById("email").value,
        phone : document.getElementById("phone").value,
        sale : $('#sale:checked').length > 0,
        rent : $('#rent:checked').length > 0,
        laundryroom : $('#laundry-room:checked').length > 0,
        freeparking : $('#free-parking:checked').length > 0,
        windowcovering : $('#window-covering:checked').length > 0,
        swimmingpool : $('#swimmingpool:checked').length > 0,
        latitude : tlatitude,
        longitude : tlongitude
    })
    console.log(""+tlatitude + tlongitude );

    console.log(propertyUpload);
    propertyUpload.then((data)=>{
        propertyId = data.path.pieces_[1]; 
        
        //create a child directory called images, and place the file inside this directory
        if(selectedFile)
        {
            const uploadTask = storageRef.child(`images/${propertyId}`).put(selectedFile); 
            
            console.log("uploading property");
            uploadTask.on('state_changed', (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                }, (error) => {
                    // Handle unsuccessful uploads
                    console.log(error);
                }, () => {
                    // Do something once upload is complete
                    console.log('success');
                });
        }
        

        var userRef = firebase.database().ref("users/" + localStorage.UID + "/property");
        var userUpd =  userRef.push(propertyId);
        console.log("user updated");

        
        
    
    });

    /*let propertyId = "1234";
    //create a child directory called images, and place the file inside this directory
    const uploadTask = storageRef.child(`images/${propertyId}`).put(selectedFile); 

    console.log("uploading property");
    uploadTask.on('state_changed', (snapshot) => {
            // Observe state change events such as progress, pause, and resume
        }, (error) => {
            // Handle unsuccessful uploads
            console.log(error);
        }, () => {
            // Do something once upload is complete
            console.log('success');
        });*/
    
}