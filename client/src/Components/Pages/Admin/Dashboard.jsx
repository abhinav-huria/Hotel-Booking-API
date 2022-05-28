import { useState } from "react";

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
{ options.map((option) => (
 
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h3>{option.title}</h3>
              </div>
              <div className="card-body">
               
                  <div className="col-md-4">
                    <a href={option.link}>
                    click</a>
                   
               
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  
  ))}
  </>)
};

export default Dashboard;
