import "./dashboard.css";

const Dashboard = () => {
  const options = [
    {
      title: "Change Password",
      link: "/changepassword",
    },
    {
      title: "Add Hotel",
      link: "/addhotel",
    },
    {
      title: "View Bookings",
      link: "/viewbookings",
    },
    {
      title: "View Users",
      link: "/viewusers",
    },
    {
      title: "View/Edit hotels",
      link: "/modifyhotels",
    },
  ];

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="outer-box">
            {options.map((option) => (
              <div key={option.link} className="col-md-4">
                <div className="box">
                  <a href={option.link}>{option.title}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
