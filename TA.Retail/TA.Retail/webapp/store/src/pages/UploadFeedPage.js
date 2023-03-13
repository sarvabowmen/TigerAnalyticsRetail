import React, {useState} from 'react'
//import FileUpload from '../components/FileUpload/FileUpload'
import { useDispatch, useSelector } from 'react-redux';
import { importPricingFeeds } from '../redux/storedetails/reducer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Stack from '@mui/material/Stack';
import { useForm } from "react-hook-form";


const UploadFeedPage = () => {
const [file, setFile] = useState(undefined);
const [canShowSubmit, setCanShowSubmit] = useState(false);
const [fileName, setFileName] = useState("");
const dispatch = useDispatch();
const { handleSubmit } = useForm();
const { loading } = useSelector((state) => state.pricingFeeds);

const onUpload = function(event) {
  setFile(event.target.files);
  if(event.target.files != null && event.target.files.length > 0){
    setCanShowSubmit(true);
  }
  
};

const importCSV = function() {
  console.log(file);
  const formData = new FormData();
  formData.append(
      "fileChooser",
      file,
  );

  dispatch(importPricingFeeds(file));
};

if (loading) return <p>Loading...</p>

  return (
    <>
    <div>UploadFeedPage</div>
    <form onSubmit={handleSubmit(importCSV)}>
    <div>
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
        Upload Price Feed CSV here
        <input hidden onChange={(e) => { onUpload(e)}} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" multiple type="file" />
      </Button>
      <IconButton color="primary" aria-label="upload Price Feeds CSV" component="label" style={{margin  : "0px"}}>
        <input hidden onChange={(e) => { onUpload(e)}} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" type="file" />
        <CloudUploadIcon />
      </IconButton>
    </Stack>
     { canShowSubmit ?  <input type="submit" /> : null }
     
    </div>
    </form>
    </>
  )
}

export default UploadFeedPage;