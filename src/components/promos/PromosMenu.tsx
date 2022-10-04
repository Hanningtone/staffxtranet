import styled from "styled-components";

const PromosMenu = (props: any) => {
    return (
        <Home>
            <div className="booking-tab">
                <p> <a href="/settings"><i className="fa fa-gears"></i> Referal Codes </a></p> 
                <hr/>
                <p> <a href="/markets"><i className="fa fa-map-marker"></i> Promo Codes  </a></p> 
            </div>
        </Home>
    )
}

const Home = styled.div`
.booking-tab {
    flex: 0.2;
    background-color: #fff;
    padding: 30px 20px;
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

export default PromosMenu;
