import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 60,
    float: "left",
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();
  console.log("props", props);

  // let totalPrice = 0;
  // props.map((elemt) => {
  //   console.log("price", elemt);
  //   totalPrice += elemt["price"] * elemt["mealAmount"];
  //   console.log(totalPrice);
  // });

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>items</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell align="left">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props["meals"].map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.mealName}
              </TableCell>
              <TableCell align="left">{row.mealAmount}</TableCell>
              <TableCell align="left">{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
