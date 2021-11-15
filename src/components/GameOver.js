import React from 'react';
const closeHandler=()=>{
	window.location.reload();
};
const GameOver = (props) => {
	return (
		<div>
			<h2>Game Over</h2>
			<p>Score was: {props.score}</p>
			<button onClick={closeHandler}>X</button>	
		</div>
	);
};

export default GameOver;