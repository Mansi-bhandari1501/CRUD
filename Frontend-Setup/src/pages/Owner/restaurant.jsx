
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomModal from "../../components/Modal/CustomModal";
import AddRestaurantForm from "../../components/Forms/AddRestaurantForm";
import Overlay from "../../components/Overlay/overlay";
import RestaurantTable from "../../components/Table/RestaurantTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantAction } from "../../feature/restaurant/restaurant.action";

const Restaurant = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const limit = parseInt(event.target.value, 10);
    setLimit(limit);
    setPage(0);
  };
  useEffect(() => {
    // Check if the page has been reloaded once already
    const hasReloaded = localStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      // If not reloaded, reload the page and set the flag
      localStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, [token]);
  useEffect(() => {
    dispatch(getAllRestaurantAction({ pagination: { page: page + 1, limit: limit } }));
  }, [dispatch, token, page, limit]);

  return (
    <Box sx={{ padding: 3 }}>
      <Overlay isOpen={openModal} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Restaurants</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#115293' },
            borderRadius: 5,
            padding: '10px 20px',
            boxShadow: 2,
          }}
        >
          Add Restaurant
        </Button>
      </Box>
      <CustomModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        children={<AddRestaurantForm open={openModal} handleClose={() => setOpenModal(false)} newMode={true} setOpenModal={setOpenModal} />}
      />
      <Box sx={{ backgroundColor: 'white', borderRadius: 2, boxShadow: 2, padding: 3 }}>
        <Stack spacing={4}>
          <RestaurantTable
            page={page}
            limit={limit}
            setPage={setPage}
            setLimit={setLimit}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Restaurant;
