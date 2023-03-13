import React, { Fragment, useEffect, useState } from 'react';
import CreateIcon from "@material-ui/icons/Create";
import {
    Box, Button, Snackbar, Table,
    TableBody, TableCell, TableHead, TableRow
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from 'react-redux';
import { getPricingFeeds, updateProduct } from '../redux/storedetails/reducer';
import AutoComplete from '../components/AutoComplete/AutoComplete';

const useStyles = makeStyles({
  root: {
      "& > *": {
          borderBottom: "unset",
      },
  },
  table: {
      minWidth: 650,
  },
  snackbar: {
      bottom: "104px",
  },
});

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130, editable: true },
  { field: 'sku', headerName: 'SKU', width: 130, editable: true },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 90,
    editable: true
  },
  { field: 'date', headerName: 'date', width: 130, editable: true },
 
];

const StoreDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [rows, setRows] = useState([
    ]);
    const [open, setOpen] = React.useState(false);
    const [isEdit, setEdit] = React.useState(false);
    const [disable, setDisable] = React.useState(true);

  const { entities, loading } = useSelector((state) => state.pricingFeeds);

  useEffect(() => {
    dispatch(getPricingFeeds())
    const clone = JSON.parse(JSON.stringify(entities));
    if(entities !== null && entities.length > 0) {
     
      clone.forEach(element => {
        element.isEdit = false;
      });
    }
   
    setRows(clone);
  }, [])

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }
    setOpen(false);
};


  const handleEdit = (e, index, id) => {
    // If edit mode is true setEdit will 
    // set it to false and vice versa
    setEdit(!isEdit);
    const { value } = e.target;
    const list = [...rows];
    list[index]["isEdit"] = true;
    setRows(list);
};

const handleInputChange = (e, index) => {
  setDisable(false);
  const { name, value } = e.target;
  const list = [...rows];
  list[index][name] = value;
  setRows(list);
};

const handleSave = (e, index, id) => {
  dispatch(updateProduct(rows));
  const list = [...rows];
  list[index]["isEdit"] = false;
  setEdit(!isEdit);
  setRows(list);
  console.log("saved : ", rows);
  setDisable(false);
  setOpen(false);
 
};

const onAutoComplete = (results) => {
  setRows(results);
}

  if (loading) return <p>Loading...</p>;

  if(entities != null && entities.length > 0) {
  return (
    <Fragment>
      <div>StoreDetails</div>
      <div style={{ height: 400, width: '100%' }}>
        <AutoComplete prods={rows} onAutoComplete={onAutoComplete}></AutoComplete>
      <TableBody>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        className={classes.snackbar}
      >
        <Alert onClose={handleClose} severity="success">
          Record saved successfully!
        </Alert>
      </Snackbar>
      <Box margin={1}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        </div>
        <TableRow align="center"> </TableRow>
  
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center" >SKU</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Symbol</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              return (
                  <TableRow key= {i}>
                    {row.isEdit ? (
                      <Fragment>
                        <TableCell padding="none">
                          <input
                            value={row.id}
                            name="id"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                        <TableCell padding="none">
                          <input
                            value={row.name}
                            name="name"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                        <TableCell padding="none">
                        <input
                            value={row.sku}
                            name="sku"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                        <TableCell padding="none">
                        <input
                            value={new Date(Date.parse(row.date)).toISOString().split('T')[0]}
                            name="date"
                            type="date"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                        <TableCell padding="none">
                        <input
                            value={row.price}
                            name="price"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                        <TableCell padding="none">
                        <input
                            value={row.currencySymbol}
                            name="currencySymbol"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                        </Fragment>
                    ) : (
                      <Fragment>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {row.sku}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {row.date}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {row.price}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                        >{row.currencySymbol}</TableCell>
                        </Fragment>
                    )}
                    {row.isEdit ? (
                      <Button className="mr10" value={row.id} onClick={(e)=> { handleSave(e, i, row.id) }}>
                        <SaveIcon />
                      </Button>
                    ) : (
                      <Button className="mr10" value={row.id} onClick={(e)=> { handleEdit(e, i, row.id) }}>
                         <CreateIcon />
                      </Button>
                    )}
                    
                  </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      </TableBody>
    </div>
  </Fragment>
  ) 
  } else {
    return <div> No Records Found Please uplod product pricing feeds </div>
  }
}

export default StoreDetails 