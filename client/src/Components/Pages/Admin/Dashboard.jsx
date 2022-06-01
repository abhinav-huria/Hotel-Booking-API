import "./dashboard.css";

const Dashboard = () => {
    const options = [
        {
            title: "Change Password",
            icon: "fas fa-key",
            link: "/changepassword",
        },
        {
            title: "Add Hotel",
            icon: "fas fa-hotel",
            link: "/addhotel",
        },
        {
title: "View Bookings",
icon: "fas fa-book",
link: "/viewbookings",
},
{
title: "View Users",
icon: "fas fa-users",
link: "/viewusers",
},
    {
        title: "View/Edit hotels",
link: "/modifyhotels",

    }
    ];

    return (
        <>
        <div className="container">
        <div className="row">
        <div className="outer-box">
{ options.map((option) => (
 
      
          <div key={option.link} className="col-md-4">
          <div className="box">
          <a href={option.link}>{option.title}</a>
          </div>
           
        </div>
     
  
  ))}
  </div>
  </div>
      </div>
  </>)
};

export default Dashboard;
