import styled from "styled-components";

const SettingsMenu = (props) => {

    return (
        <Home>
            <div className="booking-tab">
                <p> <a href="/settings"><i className="fa fa-gears"></i> App Settings </a></p> 
                <hr/>
                <p> <a href="/markets"><i className="fa fa-map"></i> Markets </a></p> 
                <hr/>
                <p> <a href="/categories"><i className="fa fa-th-large"></i> Categories </a></p> 
                <hr/>
            </div>
        </Home>
    )
}

const Home = styled.div`
.booking-tab {
    flex: 0.2;
    background-color: #fff;
    padding: 30px 20px 10px;
    position: relative;
    p {
      cursor: pointer;
    }
    .fa {
      font-size: 1.1rem;
      padding-right: 20px;
    }
    a {
      text-decoration: none;
      color: #000;
    }
  }
  .booking-details {
    flex: 0.78;
    height: 100%;
    background-color: #f1f1f1;
  }
}`

export default SettingsMenu;
