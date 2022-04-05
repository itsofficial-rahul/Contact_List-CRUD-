import logo from './logo.svg';
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
	const [ name, setname ] = useState('');
	const [ number, setnumber ] = useState('');
	const [ data, setdata ] = useState([]);
	const [ edit, setedit ] = useState(null);
	const [ toggle, settoggle ] = useState(false);
	function getdata(e) {
		e.preventDefault();
		if (name == '' && number == '') {
		} else if (name && toggle) {
			setdata(
				data.map((ele) => {
					if (ele.id === edit) {
            toast.success('Update Contact ..', {
              position: "top-center",
              autoClose: 1,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: 0,
              theme:'dark'
              });
						console.log(ele.id, edit);
						return { ...ele, text: name, num: number };
					}
					return ele;
				})
			);
			setname('');
			setnumber('');
			settoggle(false);
		} else if (name !== '' && number !== '') {
      toast.success('Contact Added', {
        position: "top-center",
        autoClose: 1,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme:'colored'
        });
			const newData = { id: new Date().getSeconds().toString(), text: name, num: number };
			setdata(data.concat(newData));
			setname('');
			setnumber('');
		}
	}
	function deletData(id) {
    toast.warn('Contact Delete', {
      position: "top-center",
      autoClose: 1,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme:'colored'
      });
	  setname('')
    setnumber('')
    settoggle(false)
		return setdata(data.filter((ele) => ele.id !== id));
	}
	function editData(id, text, num) {
		setedit(id);
		setname(text);
		setnumber(num);
		settoggle(true);
	}
	return (
		<div className='table_complete' >
			<form onSubmit={(e) => getdata(e)}>
				<div className='input1'>
					<TextField
						required
						value={name}
						type='text'
						onChange={(e) => setname(e.target.value)}
						label='Enter Name'
						color='secondary'
						
					/>
				</div>
				<div className='input2'>
					<TextField
						required
						value={number}
						type='number'
						onChange={(e) => setnumber(e.target.value)}
						label='Enter Mobile'
						color='secondary'
						
					/>
				</div>
				<div className='btn1'>
					{toggle ? (
						<Button
							onClick={(e) => getdata(e)}
							color='success'
							onChange={(e) => e.preventDefault()}
							variant='contained'>
							Save
						</Button>
					) : (
						<Button onClick={(e) => getdata(e)} onChange={(e) => e.preventDefault()} variant='contained'>
							Add
						</Button>
					)}
				</div>
        <ToastContainer />
			</form>
			<div >
				{' '}
				<TableContainer className='table1' component={Paper}>
					<Table sx={{ minWidth: 700 }} aria-label='simple table'>
						<TableHead>
							<TableRow className='ae-zone'>
								<TableCell>Name</TableCell>
								<TableCell>Number</TableCell>
								<TableCell>Delet</TableCell>
								<TableCell>Edit</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map(({ id, text, num }) => (
								<TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component='th' scope='row'>
										{text}
									</TableCell>
									<TableCell>{num}</TableCell>
									<TableCell>
										<button className='deletbtn' onClick={() => deletData(id)}>Delet</button>
									</TableCell>
									<TableCell>
										<button className='editbtn' onClick={() => editData(id, text, num)}>Edit</button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
}

export default App;
