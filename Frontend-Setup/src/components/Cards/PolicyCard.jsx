import React from 'react';
import {
    Paper,
    Typography,
    Stack,
    Chip,
    Divider,
    Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const colors = ['#B0C4DE', '#6495ED', '#1E90FF', '#4169E1', '#4682B4', '#0047AB'];

const PolicyCard = ({ policy }) => {
    const navigate = useNavigate();

    const convertDateToMMDDYYYY = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
    };

    return (
        <Paper sx={{ width: "60%", padding: "16px", border: "2px solid #E0E0E0", borderRadius: "8px", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
            <Stack width={"100%"} spacing={2}>
                <Typography variant="h4">{policy?.name} ergrtrtter</Typography>
                <Typography fontSize={'16px'} component="div" color="text.secondary" gutterBottom>
                    {policy?.description}rtyrtyrytryryryryryryreyryry
                </Typography>
                <Stack direction="row" spacing={1}>
                    {/* {policy?.role?.map((chip, index) => ( */}
                        <Chip
                            // key={index}
                            // label={chip.role_type}
                            label="tertetete"
                            // style={{ backgroundColor: colors[index % colors.length], color: '#fff' }}
                        />
                    {/* ))} */}
                </Stack>
                <Divider />
                <Typography>
                    This Policy is applied to following Leaves
                </Typography>
                <Stack className='stackoverflow' sx={{ p: '24px', borderRadius: '8px', width: '100%', maxHeight: '350px', overflowY: 'auto', gap: '16px' }}>
                    {/* {policy?.leaves?.map((leave, index) => ( */}
                        <Stack  sx={{ p: '24px', borderRadius: '8px', width: '100%', border: "2px solid #E0E0E0" }}>
                            <Typography> 
                                {/* {leave?.balance} */}
                                tretertet
                            </Typography>
                            <Typography> 
                                {/* {convertDateToMMDDYYYY(leave?.expired_at)} */}
                                grtertet
                            </Typography>
                        </Stack>
                        {/* Add more <Stack> elements if needed */}
                    {/* ))} */}

                    {/* <Stack direction="row" gap={2} justifyContent="flex-end" width="100%">
                        <Button onClick={handleEditClick}>Edit</Button>
                        <Button>Delete</Button>
                    </Stack> */}

                </Stack>
            </Stack>
        </Paper>
    );
};

export default PolicyCard;
