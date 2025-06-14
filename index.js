
document.addEventListener("DOMContentLoaded",()=>{
    const userloginsection = document.getElementById("userloginsection");
    const adminloginsection = document.getElementById("adminloginsection");
    const adminform = document.getElementById("adminform");
    const userform = document.getElementById("userform");
    const userdashboard = document.getElementById("userdashboard");
    const admindashboard = document.getElementById("admindashboard");
    const courierform = document.getElementById("courierform");
    const userOrderTable = document.getElementById("userorderdetails");
    const adminOrderTable = document.getElementById("adminorderdetails");

    let userOrders = JSON.parse(localStorage.getItem("orders")) || [];

    window.showUserLogin = () => {
        userloginsection.style.display = "block";
        adminloginsection.style.display = "none";
        userdashboard.style.display = "none";
        admindashboard.style.display = "none";  
    };
    window.showAdminLogin = () => {
        userloginsection.style.display = "none";
        adminloginsection.style.display = "block";
        userdashboard.style.display = "none";
        admindashboard.style.display = "none";
    };    
    window.logout = () => {
        localStorage.removeItem("loggedinuser");
        localStorage.removeItem("loggedinadmin");
        showUserLogin();

    };

    userform.addEventListener("submit",(e)=>{
        e.preventDefault();
        const username=document.getElementById("username").value;
        const phoneno=document.getElementById("phoneno").value;
       
        if(username=="Lenin" && phoneno=="6381851468"){
            localStorage.setItem("loggedinuser",username);
            userloginsection.style.display = "none";
            userdashboard.style.display = "block";
            UserOrders();
        }
        else if(username=="balaji" && phoneno=="1234567890") {
            localStorage.setItem("loggedinuser",username);
            userloginsection.style.display = "none";
            userdashboard.style.display = "block";
            
        }
        else{
            alert("Invalid User Name and Password")
        }
    });
    adminform.addEventListener("submit",(e)=>{
        e.preventDefault();
        const adminname=document.getElementById("adminname").value;
        const password=document.getElementById("password").value;
        
        if(adminname=="Lenin" && password=="123"){
            localStorage.setItem("loggedinadmin",adminname);
            adminloginsection.style.display = "none";
            admindashboard.style.display = "block";
            UserOrders();
            AdminOrders();
        }
        else{
            alert("Invalid Admin Name and Password")
        }
    });

    courierform.addEventListener("submit", (e) => {
      e.preventDefault();
        const ordername = document.getElementById("ordername");
        const phone = document.getElementById("contact");
        const fromlat= document.getElementById("fromlat");
        const fromlon= document.getElementById("fromlon");
        const tolat= document.getElementById("tolat");
        const tolon= document.getElementById("tolon");
    
        const order={
            name:ordername.value,
            phone:phone.value,
            fromlat:fromlat.value,
            fromlon:fromlon.value,
            tolat:tolat.value,
            tolon:tolon.value,
            status:"processing",
            customername: document.getElementById("customername").value.trim(),
            customerphone: document.getElementById("customerphone").value.trim()
        };
        userOrders.push(order);
        saveorder();

        UserOrders();
        courierform.reset();
    });
    function saveorder(){
        localStorage.setItem("orders",JSON.stringify(userOrders));
    }

    function UserOrders() {
        const currentUser = localStorage.getItem("loggedinuser");
        const userOrdersData = JSON.parse(localStorage.getItem("orders")) || [];
        userOrderTable.innerHTML = "";

        userOrders
        .filter(order => order.username===currentUser)
        .forEach((order, i) => {

        userOrderTable.innerHTML += `
          <tr>
            <td>${i + 1}</td>
            <td>${order.name}</td>
            <td>${order.phoneno}</td>
            <td>${order.fromlat}</td>
            <td>${order.fromlon}</td>
            <td>${order.tolat}</td>
            <td>${order.tolon}</td>
            <td>${order.status}</td>
          </tr>`;
      });
    }
    function AdminOrders() {
        const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
        adminOrderTable.innerHTML = "";
        userOrders.forEach((order, i) => {
        adminOrderTable.innerHTML += `
          <tr>
            <td>${i + 1}</td>
            <td>${order.name}</td>
            <td>${order.fromlat}</td>
            <td>${order.fromlon}</td>
            <td>${order.tolat}</td>
            <td>${order.tolon}</td>

            <td>
              <select onchange="updateStatus(${i}, this.value)" class="form-select">
                <option value="Processing" ${order.status === "Processing" ? "selected" : ""}>Processing</option>
                <option value="Picked Up" ${order.status === "Picked Up" ? "selected" : ""}>Picked Up</option>
                <option value="In Transit" ${order.status === "In Transit" ? "selected" : ""}>In Transit</option>
                <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
                <option value="Return" ${order.status === "Return" ? "selected" : ""}>Return</option>
              </select>
            </td>
          </tr>`;
      });
    }

    window.updateStatus = (index, newStatus) => {
      userOrders[index].status = newStatus;
      saveorder();
      UserOrders();
      AdminOrders();
    };
});