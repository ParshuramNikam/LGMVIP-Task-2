import "./App.css";
import { useState, useEffect } from "react";
import Card from "./components/Card";
import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 4rem auto;
  border-color: #1462ff;
`; 

function App() {
	const [usersData, setUsersData] = useState([]);
	const [isLoading, setIsLoading] = useState("Loading...");
	let [loading, setLoading] = useState(true);

	const fetchData = async () => {
		await fetch("https://reqres.in/api/users?page=1")
			.then((res) => res.json())
			.then((users) => {
				setLoading('false')
				setUsersData(users.data);
				setIsLoading("Get Users");
			})
			.catch((err) => console.log(err));
	};

	const refresh_handler = ()=>{
		setUsersData([]);
		setIsLoading("Loading...")
		setTimeout(() => {
			fetchData()
		}, 400);
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<nav>
				<div>UsersData</div>
				<button onClick={refresh_handler}>{isLoading}</button>
			</nav>
			{
				usersData.length===0 
				// ? <ClipLoader color="#ffffff" loading={loading} css={override} size={150} />
				? <MoonLoader size={120} color={'#1462ff'} css={override}  loading={loading} />
				: null
			}
			<div className="wrapper">
				{usersData.map((user, index) => {
					return (
						<Card
							key={index.toString()}
							img={user.avatar}
							title={`${user.first_name} ${user.last_name}`}
							email={user.email}
						/>
					);
				})}
			</div>
		</>
	);
}

export default App;
