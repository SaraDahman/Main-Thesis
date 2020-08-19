import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
	table: {
		Width: 80,
		marginRight: '120px',
		float: 'left',
	},
});

export default function SimpleTable(props) {
	const classes = useStyles();

	return (
		<TableContainer>
			<Table className={classes.table} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>items</TableCell>
						<TableCell>Amount</TableCell>
						<TableCell align='left'>Price</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props['meals'].map((row) => (
						<TableRow key={row.name}>
							<TableCell component='th' scope='row'>
								{row.mealName}
							</TableCell>
							<TableCell align='left'>{row.mealAmount}</TableCell>
							<TableCell align='left'>{row.price}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
