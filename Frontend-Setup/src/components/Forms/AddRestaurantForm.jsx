import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextFieldRow from '../TextField/customTextFeildRow';
import { UploadFile } from '@mui/icons-material';
import { foodTypes, cuisine } from '../../constants/constants';
import CustomAutocomplete from '../Input/CustomAutocomplete';
import styled from '../Modal/CustomModal.module.css';
import { restaurantSchema } from '../../schemas/restuaran.schema';
import { useDispatch } from 'react-redux';
import { postRestaurantAction, updateRestaurantAction } from '../../feature/restaurant/restaurant.action';
import useNotification from '../../hooks/useNotification';

function AddRestaurantForm(props) {
  const { selectedRow, setOpenModal } = props;
  const defaultValues = selectedRow
    ? {
        name: selectedRow?.name,
        price: selectedRow?.price,
        tag: selectedRow?.tag,
        category: selectedRow?.category || [],
        // cuisine: selectedRow?.cuisine || [],
        amount: selectedRow?.amount,
        desc: selectedRow?.desc,
        image: selectedRow?.image,
      }
    : {
        name: '',
        price: '',
        tag: '',
        category: [],
        amount: '',
        desc: '',
        image: null,
      };

  const showNotification = useNotification();
  const { control, handleSubmit, formState: { errors }, getValues } = useForm({
    resolver: zodResolver(restaurantSchema),
    defaultValues,
  });
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleNumericInput = (event) => {
    const newValue = event.target.value.replace(/[^0-9]/g, '');
    event.target.value = newValue;
  };

  const handleImageChange = (event) => {
    console.log(event)
    const file = event.target.image;
    if (file) {
      if (file.type.startsWith('image/') && file.size <= 2 * 1024 * 1024) {
        setSelectedImage(file);
      } else {
        showNotification('Invalid file. Please upload an image under 2MB.', 'error');
      }
    }
  };

  const onSubmit = async () => {
    const data = getValues();
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.price) formData.append('price', data.price);
    if (data.tag) formData.append('tag', data.tag);
    if (data.amount) formData.append('amount', data.amount);
    if (data.desc) formData.append('desc', data.desc);

    if (Array.isArray(data.category)) {
      data.category.forEach((item, index) => {
        formData.append(`category[${index}]`, item);
      });
    }

    if (Array.isArray(data.cuisine)) {
      data.cuisine.forEach((item, index) => {
        formData.append(`cuisine[${index}]`, item);
      });
    }

    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    const id = selectedRow?._id;
console.log("form",id);
    try {
      const res = selectedRow
        ?  dispatch(updateRestaurantAction({ data: formData, id }))
        :  dispatch(postRestaurantAction(formData));

      if (res?.meta?.requestStatus === 'fulfilled') {
        showNotification(selectedRow ? 'Updated successfully' : 'Created successfully', 'success');
        setSelectedImage(null);
        setOpenModal(false);
      }

      if (res?.meta?.requestStatus === 'rejected') {
        showNotification(res?.payload?.response?.data?.message || 'Error occurred', 'error');
      }
    } catch (error) {
      showNotification('An error occurred', 'error');
    }
  };

  return (
    <Box className={styled.root} sx={{ backgroundColor: 'white', width: '50%' }} component="form" onSubmit={handleSubmit(onSubmit)} p={3}>
      <Box className={styled.Head}>{selectedRow? "Edit Restaurant" : "Add Restaurant"}</Box>
      <Stack spacing={2}>
        <CustomTextFieldRow control={control} name="name" label="Name" required />
        <CustomTextFieldRow control={control} name="price" label="price" required inputProps={{ onChange: handleNumericInput, maxLength: 5 }}/>
        <CustomTextFieldRow control={control} name="tag" label="Tag" required  />
        <CustomAutocomplete control={control} name="category" label="category" options={foodTypes} defaultValue={[]} />
        {/* <CustomAutocomplete control={control} name="cuisine" label="Cuisine" options={cuisine} defaultValue={[]} /> */}
        <CustomTextFieldRow control={control} name="amount" label="amount" required inputProps={{ onChange: handleNumericInput, maxLength: 10 }} />
        <CustomTextFieldRow control={control} name="desc" label="Description" multiline required />

        <Box>
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleImageChange}
            name="image"
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span" startIcon={<UploadFile />}>
              Upload Image
            </Button>
          </label>
          {selectedImage && (
            <Box mt={2}>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '5px' }}
              />
              <p>{selectedImage.name}</p>
            </Box>
          )}
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Stack>
    </Box>
  );
}

export default AddRestaurantForm;
