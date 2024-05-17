import logo from "../../assets/logo-2.svg";
const CertificationPage = () => {
  return (
    <div style={{height: "100vh", display: "flex",
          
    flexDirection: "column",
    paddingBottom: "2rem",
    paddingTop: "2rem",
    justifyContent: "space-between",  marginRight: "3rem",
    marginLeft: "3rem",}}>
      <div>       
        <div>
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <img src={logo} alt="logo" />
            <div style={{ fontSize: "11px" }}>
              <p> certificate no: 10-0437-0834-03984-a237903275--20</p>
              <p>certificate url: -2340985-324502-04230-098-0808--</p>
              <p>reference Number: 00005</p>
            </div>
          </div>
          <div
            style={{ marginTop: "5rem", fontWeight: "bold", fontSize: "20px" }}
          >
            <h1>CERTIFICATE OF COMPLETION</h1>
            <h1 style={{ fontSize: "50px", marginTop: "1rem" }}>
              Learn frontend development from peter (2024)
            </h1>
            <div style={{ display: "flex", fontSize: "17px" }}>
              <p style={{ fontWeight: "400" }}>Instructor:</p>
              <p style={{ marginLeft: "5px" }}>Peter Adedokun</p>
            </div>
          </div>
        </div>
        
      </div>
      <div>
          <p style={{fontWeight: "bold", fontSize: "30px"}}>John Doe </p>
          <div style={{display: "flex"}}>
            <p>Date:</p>           
            <p style={{fontWeight: "bold", marginLeft: "5px"}}> may. 17, 2023</p>
          </div>
          <div style={{display: "flex"}}>
            <p>Length</p>           
            <p style={{fontWeight: "bold", marginLeft: "5px"}}> 74.5 total hours</p>
          </div>
        </div>
    </div>
  );
};

export default CertificationPage;
