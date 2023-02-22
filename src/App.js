import logo from './logo.svg';
import './App.css';
import { React, useState } from 'react';

function bareme(salary) {
    let tranches = [[10777.0, 0.0],
		    [27478.0, 0.11],
		    [78570.0, 0.30],
		    [168994.0, 0.41],
		    [Infinity, 0.45]];
    
    let after_tax = 0.0
    let last = -1.0 // Stupid trick to fix the span when there is no previous tranche
    
    for (const [upper_amount, taxe_cutoff] of tranches) {
	const span_of_the_current_tranche = upper_amount - last - 1
	
	let applicable_portion = Math.min(salary, span_of_the_current_tranche)

	salary -= applicable_portion
	after_tax += applicable_portion * (1.0 - taxe_cutoff)
	
	console.log(`+ ${applicable_portion} * ${(1.0 - taxe_cutoff)}`)
	console.log(after_tax)
	
	last = upper_amount
    }

    return after_tax
}


function App() {
    const [Brut, SetBrut] = useState(0)

    const handleChange = (event) => {
	const name = event.target.name
	const value = event.target.value

	SetBrut(value)
    }
    
    let after_tax = bareme(Brut)
    
    return (<div>
		<input name="brut"  type="number" value={Brut} onChange={handleChange}>
		</input>
		<p> After tax incoming: {after_tax} </p>
	    </div>);
}

export default App;
