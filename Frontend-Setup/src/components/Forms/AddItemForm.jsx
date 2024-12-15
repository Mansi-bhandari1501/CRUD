
import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextFieldRow from '../TextField/customTextFeildRow'; 
import { UploadFile } from '@mui/icons-material';
import { foodTypes, cuisine } from '../../constants/constants'; 
import CustomAutocomplete from '../Input/CustomAutocomplete'; 
import styled from '../Modal/CustomModal.module.css'; 
import { useDispatch, useSelector } from 'react-redux';
// import { postItemAction, updateItemAction } from '../../feature/item/item.action';
import useNotification from '../../hooks/useNotification';
import { itemSchema } from '../../schemas/items.schema';
import SingleCustomAutocomplete from '../Input/SingleCustomAutocomplete'; 

import { postItemsAction, updateItemsAction } from '../../feature/items/items.action';
import { getAllRestaurantAction } from '../../feature/restaurant/restaurant.action';

function AddItemForm(props) {
  console.log('props: ', props);
    const { selectedItem, setOpenModal } = props
    console.log('selectedItem: ', selectedItem);
  const defaultValues = selectedItem ? {
    name: selectedItem?.name,
    description: selectedItem?.description,
    price: selectedItem?.price,
    category: selectedItem?.category,
    food_type: selectedItem?.food_type,
    cuisine: selectedItem?.cuisine,
    restaurant_id: selectedItem?.restaurant?.restaurant_id,
    files: selectedItem?.image_url,
  } : {
    name: '',
    description: '',
    price: '',
    category: '',
    food_type: '',
    cuisine: '',
    restaurant_id: '',
    files: null
  };
  
  const showNotification = useNotification();
  const { control, handleSubmit, formState: { errors }, getValues } = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues
  });
  const { allRestaurant, count } = useSelector((state) => state?.restaurant || []);
  const Restaurant = allRestaurant.map((restaurant) => ({
    label: restaurant.name,
    value: restaurant.restaurant_id,
  }));
  
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file); 
    }
  };

  const onErrors = (errors) => {
    console.log('errors: ', errors);
  };

  const onSubmit = async () => {
    const data = getValues(); 
    
    const formData = new FormData();
    formData.append('name', data?.name);
    formData.append('description', data?.description);
    formData.append('price', data?.price);
    formData.append('category', data?.category);
    formData.append('food_type', data?.food_type);
    formData.append('cuisine', data?.cuisine);

    // Append food_type array
    // if (Array.isArray(data?.food_type)) {
    //   data.food_type.forEach((item, index) => {
    //     formData.append(`food_type[${index}]`, item);
    //   });
    // }
  
    // // Append cuisine array
    // if (Array.isArray(data?.cuisine)) {
    //   data.cuisine.forEach((item, index) => {
    //     formData.append(`cuisine[${index}]`, item);
    //   });
    // }

    formData.append('restaurant_id', data?.restaurant_id);

    if (selectedImage) {
      formData.append('files', selectedImage); 
    }
    const id = selectedItem?.item_id;
    console.log('id: ', id);
    try {
      const res = selectedItem
        ? await dispatch(updateItemsAction({ data: formData, id }))
        : await dispatch(postItemsAction(formData));
      
      if (res?.meta?.requestStatus === "fulfilled") {
        showNotification(selectedItem ? "Item updated successfully" : "Item created successfully", "success");
        setOpenModal(false);
        dispatch(getAllRestaurantAction({pagination: {page: 1, limit: 100}}))
      }
      
      if (res?.meta?.requestStatus === "rejected") {
        showNotification(res?.payload?.response?.data || "Error", "error");
        // setOpenModal(false);

      }
    } catch (error) {
      showNotification("Error", "error");
      console.log('error: ', error);
    }
  };

  return (
    <Box className={styled.root} sx={{ backgroundColor: "white", width: "50%" }} component="form" onSubmit={handleSubmit(onSubmit, onErrors)} p={3}>
      <Box className={styled.Head}>
        Add Item
      </Box>
      <Stack spacing={2}>
        <CustomTextFieldRow control={control} name="name" label="Item Name" required />
        <CustomTextFieldRow control={control} name="description" label="Description" multiline required />
        <CustomTextFieldRow control={control} name="price" label="Price" required inputProps={{ onChange: (e) => e.target.value = e.target.value.replace(/[^0-9.]/g, '') }} />
        <CustomTextFieldRow control={control} name="category" label="Category" required />
        <SingleCustomAutocomplete control={control} name="food_type" label="Food Type" options={foodTypes} />
        <SingleCustomAutocomplete control={control} name="cuisine" label="Cuisine" options={cuisine} />
        {/* <CustomTextFieldRow control={control} name="restaurant_id" label="Restaurant" required /> */}
        <SingleCustomAutocomplete control={control} name="restaurant_id" label="Restaurant" options={Restaurant} />

        <Box>
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleImageChange}
            name="files"
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span" startIcon={<UploadFile />}>
              Upload Image
            </Button>
          </label>
          {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ marginTop: 10, width: 100, height: 100 }} />}
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Stack>
    </Box>
  );
}

export default AddItemForm;
