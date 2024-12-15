import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  TablePagination,
  Chip,
  IconButton
} from '@mui/material';
import NoDatafound from '../NoData';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../Modal/CustomModal';
import AddRestaurantForm from '../Forms/AddRestaurantForm';
import { Delete, Edit } from '@mui/icons-material';
import { deleteRestaurant } from '../../feature/restaurant/restaurant.type';
import { deleteRestaurantAction } from '../../feature/restaurant/restaurant.action';

const RestaurantTable = ({
  page,
  limit,
  setPage,
  setLimit,
  handleChangeRowsPerPage,
  handleChangePage,
}) => {
  const { allRestaurant, count } = useSelector((state) => state?.restaurant || []);
 const dispatch = useDispatch();
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <div style={{ marginTop: '4px', maxHeight: '100%', overflow: 'auto', width: '100%' }}>
      <TableContainer component={Paper} sx={{ maxHeight: '90%', overflowX: 'auto' }}>
        <Table
          size="small"
          sx={{ border: '1px solid #E0E0E0', overflow: 'hidden', overflowX: 'auto' }}
          aria-label="collapsible table"
        >
          <TableHead>
            <TableRow sx={{ height: '50px', border: '2px solid #E0E0E0', backgroundColor: "#e8f1fa" }}>
              <TableCell sx={{ width: '10px' }}></TableCell>
              <TableCell sx={{ maxWidth: '50px', minWidth: '30px', fontSize: '16px', fontWeight: '500' }}>
                S No.
              </TableCell>
              <TableCell sx={{ maxWidth: '220px',minWidth: '150px', fontSize: '16px', fontWeight: '500' }}>
                Name
              </TableCell>
              <TableCell sx={{ maxWidth: '220px',minWidth: '150px', fontSize: '16px', fontWeight: '500' }}>
                Description
              </TableCell>
              <TableCell sx={{ maxWidth: '100px',minWidth: '150px', fontSize: '16px', fontWeight: '500' }}>
                Food Type
              </TableCell>
              <TableCell sx={{ maxWidth: '100px',minWidth: '150px', fontSize: '16px', fontWeight: '500' }}>
                Cuisine
              </TableCell>
              <TableCell sx={{ maxWidth: '100px',minWidth: '150px', fontSize: '16px', fontWeight: '500' }}>
                Amount
              </TableCell>
              <TableCell sx={{ maxWidth: '100px',minWidth: '150px', fontSize: '16px', fontWeight: '500' }}>
                Total Assigned
              </TableCell>
              <TableCell sx={{ maxWidth: '100px',minWidth: '150px', fontSize: '16px', fontWeight: '500' }}>
               
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {count === 0 && (
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography variant="h5" style={{ textAlign: 'center', marginTop: '50px', width: "100%" }}>
                    <NoDatafound heading="" subHeading="No Restaurant Data Yet" />
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {Array.isArray(allRestaurant) && allRestaurant?.map((row, index) => (
              <TableRow sx={{ height: '40px' }} key={row.restaurant_id}>
                <TableCell sx={{ width: '1px' }}></TableCell>
                <TableCell sx={{ maxWidth: '50px', minWidth: '30px' }}>{((limit * page) + index + 1)}</TableCell>
                <TableCell sx={{ maxWidth: '220px',minWidth: '150px' }}>{row?.name}</TableCell>
                <TableCell sx={{ maxWidth: '220px',minWidth: '150px' }}>{row?.desc}</TableCell>
                <TableCell sx={{ maxWidth: '220px',minWidth: '150px' }}>{row?.tag}</TableCell>
                <TableCell sx={{ maxWidth: '100px',minWidth: '150px' }}>
                  {row?.category?.map((type, i) => (
                    <Chip key={i} label={type} sx={{ marginRight: '4px', fontSize: '12px' }} />
                  ))}
                </TableCell>
                <TableCell sx={{ maxWidth: '220px',minWidth: '150px' }}>{row?.amount}</TableCell>

                {/* <TableCell sx={{ maxWidth: '100px',minWidth: '150px'}}>
                  {row?.cuisine?.map((cuisine, i) => (
                    <Chip key={i} label={cuisine} sx={{ marginRight: '4px', fontSize: '12px' }} />
                  ))}
                </TableCell> */}
                <TableCell sx={{ maxWidth: '100px',minWidth: '150px' }}>{row?.price}</TableCell>
                <TableCell sx={{ maxWidth: '200px',minWidth: '150px' }}>
                  <IconButton onClick={() => {setOpenEdit(true); setSelectedRow(row)}}><Edit/></IconButton>
                  <IconButton onClick={() => {dispatch(deleteRestaurantAction(row?._id)) }}><Delete/></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {count > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: "100%" }}>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={count}
            rowsPerPage={limit}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ title: "Go to next page" }}
            backIconButtonProps={{ title: "Go to previous page" }}
            labelRowsPerPage={<span style={{ fontSize: "12px" }}>Rows per page:</span>}
            labelDisplayedRows={({ from, to, count }) => (
              <span style={{ fontSize: "12px" }}>{`${from}-${to} of ${count}`}</span>
            )}
            SelectProps={{
              style: { fontSize: "12px" },
            }}
          />
        </Box>
      )}

      <CustomModal  open={openEdit} handleClose={() => { setOpenEdit(false);  }}
            children={ <AddRestaurantForm selectedRow={selectedRow} open={openEdit}  handleClose={() => { setOpenEdit(false); }} newMode={true} setOpenModal={setOpenEdit} /> }
          />
   
    </div>
  );
};

export default RestaurantTable;
