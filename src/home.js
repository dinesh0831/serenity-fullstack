import axios from "axios";
import { useEffect, useState } from "react";
import { TextField, Box, Typography, Button, Modal, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material"


import logo from "./asset/logo.jpg"

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
const style = {

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    padding: { xs: "20px", sm: "24px", md: "32px" },
    borderRadius: "8px",

    boxShadow: 24,
    width: "300px"

};
const AvailableVacation = () => {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState();
    const [role, setRole] = useState();
    const [date, setDate] = useState();
    const [useDays, setHours] = useState();
    const [vacation, setVacation] = useState();
    const [employee, setEmployee] = useState([]);
    const [totalVacation, setTotalVacation] = useState()
    const [open, setOpen] = useState(false);
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [vacationHours, setVacationDays] = useState();
    const [takenDays, setTakenDays] = useState()
    const [timeSheet, setTimeSheet] = useState([])
    const [error, setError] = useState("");
  

    const getEmployees = async () => {
        const { data } = await axios.get("http://localhost:3001/execute")
        console.log(data.recordset)
        // setEmployees(data.recordset)
        // const category_B=data.recordset.filter(item=>{
        //  return   (item.PrimaryRole=="B"||item.PrimaryRole=="C") && (item.DateOfJoining!=null) 
        // })
        // console.log(category_B)
        setEmployees(data.recordset)
     }
    useEffect(() => {
        getEmployees()
        // getVacationtime()
    }, []
    )
    // const vacationTime = (e) => {
    //     getVacationtime(e.target.value)
    //     console.log(e.target.value)
    // }
    // const getVacationtime = async (id) => {
    //     const { data } = await axios.get(`users/vacation`)
        
    //     data.map(item=> setEmployees(current=>[...current,item]))
    //     console.log(data)
    // }


    const handleSubmit = async (id) => {


        const { data } = await axios.post("http://localhost:3001/users/update", {
            id:id,
            name: name,
            role: role,
            hireDate: date,
            usedVacation: useDays


        })
        console.log(data)
        // getVacationtime()
        entryHandleClose()

    }
    var getParticular = async (id) => {
       
        let { data } = await axios.get(`http://localhost:3001/availablevacation/${id}`)
        let new_leave=await axios.get(`http://localhost:3001/users/vacation/${id}`)
        console.log(new_leave)
        console.log(id)
        var total_hr=0
        var total_min=0
        data.recordset.map(item => 
            {
                // if(item.VaccationType==21 || item.VaccationType==17 || item.VaccationType==18 || item.VaccationType==19 || item.VaccationType==20 ||item.VaccationType==21 || item.VaccationType==26 || item.VaccationType==29 ){
                const values=item.TotalTime.split(":");
                total_hr += parseInt(values[0])
                total_min+=parseInt(values[1])
                console.log(total_hr)
                console.log(total_min)
                return values
                
                // }
                

            }    )

            var per_hour= Math.trunc( total_min/60)
            var mins=Math.trunc(total_min%60)

           
            const days=new_leave.data.map(list=>list.usedDays)
        console.log(days)
        const usedDays = days.reduce((a, b) => a + b, 0)
        console.log(usedDays)
        const time_Taken=parseInt(total_hr+per_hour+"."+mins) +usedDays
        console.log(time_Taken)
        
        setTimeSheet(new_leave.data)
        if (time_Taken) {
            setTakenDays(time_Taken)
        }

        else {
            setTakenDays(0)
        }
      
        const reversing = data.recordset.reverse()
        console.log(reversing)
       
        console.log(timeSheet)
        getVacation(id, time_Taken,)


    }

    const getVacation = async (e, days,) => {
       
        console.log(e)
        let selectedEmployee = employees.filter(employee =>{
            console.log(employee.EmployeeMstrID)
           return employee.EmployeeMstrID ===parseInt(e) 

        } 
           )
        console.log(employees)
        console.log(selectedEmployee)
        var joiningDate = selectedEmployee[0].DateOfJoining
        setEmployee(selectedEmployee)
        
        console.log(joiningDate)
        var joiningYear = joiningDate.split("/")
        console.log(joiningYear)
        const currentDate = new Date()
        const currentYear = new Date().getFullYear()
        console.log(currentDate.getDay())
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        var dateToday = day + '/' + month + '/' + year;
        var dateFrom = new Date(joiningYear[2], joiningYear[0] - 1, joiningYear[1])
        console.log(dateFrom)
        console.log(dateToday)
        const week = Math.round((new Date() - dateFrom) / (7 * 24 * 60 * 60 * 1000));
        console.log(week)
        const average=(40-(days/week)).toFixed(2)
        console.log(average)
       
        // const fromDate=dateFrom.getDate();
        // const toDate=dateToday.getDate();
        // const oneWeek=1000 * 60 * 60 * 24 * 7;
        // var difference_ms = Math.abs(toDate - fromDate);
        // var week=Math.floor(difference_ms / oneWeek);
        // console.log(week)

        var months = (currentYear - joiningYear[2]) * 12
        months -= joiningYear[0];
        months += currentDate.getMonth()
        console.log(months)
        var vacation
        if (selectedEmployee[0].role === "a") {
            if (months < 24) {
                var quarter = (months / 3)
                vacation = Math.trunc(quarter) * 1.25
                console.log(vacation)

            }
            else if (months > 24 && months < 60) {
                let twoYear = (24 / 3) * 1.25
                let fiveYear = (Math.trunc((months - 24) / 4)) * 2.5
                vacation = twoYear + fiveYear;
                console.log(vacation)
            }
            else if (months > 60) {
                let twoYear = (24 / 3) * 1.25
                let fiveYear = (36 / 3) * 2.5
                var moreThanSixYear = (Math.trunc((months - 60) / 3)) * 3.75
                vacation = twoYear + fiveYear + moreThanSixYear
                console.log(vacation)
            }
        }
        else {

            if (week < 104) {
                vacation = Math.trunc((week * average) / 52)
                console.log(vacation)

            }
            else if (week > 104 && week < 260) {
                let twoYear = (104 * average) / 52
                let fiveYear = Math.trunc((week - 104) * ((average*2)) / 52)
                vacation = twoYear + fiveYear;
                console.log(vacation)
            }
            else if (week > 260) {
                let twoYear = Math.trunc((104 * average) / 52)
                let fiveYear = Math.trunc((156) * ((average*2)) / 52)
                let moreThanSixYear = Math.trunc((week - 260) * ((average*3)) / 52)
                vacation = twoYear + fiveYear + moreThanSixYear
                console.log(vacation)
            }
        }
        setTotalVacation(vacation)
        
     

        vacation = vacation-days
        console.log(vacation)
        setVacation(vacation)
    }
    const handleClose = () => {
        setOpen(false);

    }
    const updateVacation = () => {
        setOpen(true)
    }

    const handleVacation = async (id) => {
        var balance = vacation - vacationHours
        console.log(id)
        const { data } = await axios.post("http://localhost:3001/users/timeSheet", {
            id: id
            , fromDate: fromDate
            , toDate: toDate
            , days: vacationHours,
            balanced: balance,
            availableVac: vacation
        })
        console.log(data)

        if (data.success === "successfully updated") {
            handleClose()
            getParticular(id)

        }
        else {
            setError(data.error)
        }

    }
    const [entryOpen, setEntryOpen] = useState(false)
    const entryHandleClose = () => {
        setEntryOpen(false)
    }
    console.log(employees)

    return (
        <div style={{}}>
            <Modal open={entryOpen}
                onClose={entryHandleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style} style={{ display: "flex", flexDirection: "column", alignContent: "center" }}>
                    <Typography sx={{ width: 250, height: 24, fontSize: "24px", fonttWeight: 500, lineHeight: "24px", color: "#000", }}>Create User</Typography>
                    <TextField size="small" sx={{ margin: 2, }} variant="outlined" label="Name" type="string" onChange={(e) => setName(e.target.value)} />
                    <TextField size="small" sx={{ margin: 2, }} variant="outlined" label="role" type="string" onChange={(e) => setRole(e.target.value)} />
                    <TextField size="small" sx={{ margin: 2, }} variant="outlined" label="used hours" type="string" onChange={(e) => setHours(e.target.value)} />
                    <TextField
                        id="date"
                        label="Date of Joining"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        sx={{ margin: 2, }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button onClick={()=>handleSubmit(employee[0].EmployeeMstrID)} variant="contained" color="success">Create</Button>
                </Box>
            </Modal>
            <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <Box component="img" src={logo} style={{ width: "200px", margin: 10 }} />
            {/* <Button onClick={()=> setEntryOpen(true)} variant="contained" color="success" sx={{margin:"10px"}}>create</Button> */}
            </Box>
            <Box sx={{ height: 50, width: "100%", bgcolor: "#bd7a29" }}></Box>
            <Box sx={{ margin: "25px" }}>
                <div>
                    <select onChange={(e) => getParticular(e.target.value)}  style={{ width: 300, height: 50, fontSize: 20, padding: "5px" }}>
                        <option  value="select emplyee" >select employee</option>
                        {
                            employees.map(employee => {
                                
                                return (
                                    
                                        <option key={employee.EmployeeMstrID} value={employee.EmployeeMstrID}>{ employee.EmployeeName}</option>

                                 
                                    
                                )
                            })
                        }
                    </select>
                </div>
                <div style={{ marginTop: "25px" }}>
                    {employee.length <= 0 ? null :
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ bgcolor: "#E2E3E5" }}>
                                        <TableCell align="left" sx={{ fontSize: 16, fontWeight: "bold" }}>Employee Name</TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, fontWeight: "bold" }}>Date of Joining</TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, fontWeight: "bold" }}>Role</TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, fontWeight: "bold" }}>Total Vacation </TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, fontWeight: "bold" }}>Vacation Taken </TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, fontWeight: "bold" }}>Available Vacation </TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, fontWeight: "bold" }}>Action </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {employee.map((row) => (
                                        <TableRow
                                        key={employee.EmployeeMstrID}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left" sx={{textTransform:"capitalize"}}>
                                                {row.EmployeeName}
                                            </TableCell>
                                            <TableCell align="left" sx={{textTransform:"capitalize"}}>{row.DateOfJoining}</TableCell>
                                            <TableCell align="left" sx={{textTransform:"capitalize"}}>{row.PrimaryRole}</TableCell>
                                            <TableCell align="left" sx={{textTransform:"capitalize"}}>{totalVacation}</TableCell>
                                            <TableCell align="left" sx={{textTransform:"capitalize"}}>{takenDays}</TableCell>

                                            <TableCell align="left">{vacation}</TableCell>
                                            <TableCell align="left"> <Button onClick={() => updateVacation(row.EmployeeMstrID)} style={{ borderRadius: "20px", textTransform: "none" }} color="success" variant="contained">Update</Button></TableCell>



                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>}
                </div>
                  {timeSheet.length <= 0 ? null :
                    <Box sx={{ marginTop: "25px" }}>
                        <Typography sx={{ fontSize: 20, fontWeight: "bold", margin: "10px" }}>Vacation Hours</Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ bgcolor: "#E2E3E5" }}>
                                        <TableCell align="left" sx={{ fontSize: 16, fontWeight: "bold" }}>Requested Date</TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, fontWeight: "bold" }}>description</TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, fontWeight: "bold" }}>Total</TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, fontWeight: "bold" }}>Applied </TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, fontWeight: "bold" }}>Approved  </TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, fontWeight: "bold" }}>Balanced </TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, fontWeight: "bold" }}>Role </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {timeSheet.map((row,index) => (
                                        <TableRow key={row.Id}

                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left">
                                                {row.fromDate}
                                            </TableCell>
                                            <TableCell align="left">Personal</TableCell>
                                            <TableCell align="left">{row.availableVac}</TableCell>
                                            <TableCell align="left">{row.usedDays}</TableCell>
                                            <TableCell align="left">{row.usedDays}</TableCell>

                                            <TableCell align="left">{row.balanced}</TableCell>
                                            <TableCell align="left"> care taker</TableCell>



                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                }  

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"


                >
                    <Box sx={style}>
                        <Box sx={{ width: 250, height: 24, }}>
                            <Typography sx={{ width: 250, height: 24, fontSize: "24px", fonttWeight: 500, lineHeight: "24px", color: "#000", }} >
                                Add Vacation Hours
                            </Typography></Box>

                        <Box sx={{ marginTop: "10px", }}>
                            <Box style={{ display: "flex", flexDirection: "column", alignContent: "center" }}>
                                {/* <TextField size="small" sx={{ margin: 2, }} variant="outlined" label="Role" type="string" value={role} onChange={(e) => setRole(e.target.value)} /> */}

                                <TextField
                                    id="date"
                                    label="From Date"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    sx={{ margin: 2, }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <TextField
                                    id="date"
                                    label="To Date"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setToDate(e.target.value)}
                                    sx={{ margin: 2, }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField size="small" sx={{ margin: 2, }} variant="outlined" value={useDays} label="Vacation Days/Hours" type="string" onChange={(e) => setVacationDays(e.target.value)} />


                                <Typography>{error}</Typography>
                                <Box sx={{ width: "285px", display: "flex", marginLeft: "auto", marginRight: "auto" }}>
                                    <Box sx={{ marginTop: "23px", width: "132px", }}>
                                        <Box component="button" sx={{ textTransform: "none", width: "132px", height: "40px", border: "1px solid grey", bgcolor: "#FFFFFF", fontSize: "16px", fontWeight: "700", color: "grey", borderRadius: "4px", cursor: "pointer" }} onClick={handleClose}>Close</Box>
                                    </Box>
                                    <Box sx={{ marginTop: "23px", width: "132px", marginLeft: "23px" }}>
                                        <Button component="button" sx={{ textTransform: "none", width: "132px", height: "40px", fontSize: "16px", fontWeight: "700" }} color="success" variant="contained" onClick={() => handleVacation(employee[0].EmployeeMstrID)}>Submit</Button>
                                    </Box>

                                </Box>
                            </Box>


                        </Box>
                    </Box>
                </Modal>




            </Box>
        </div >

    )

}
export default AvailableVacation