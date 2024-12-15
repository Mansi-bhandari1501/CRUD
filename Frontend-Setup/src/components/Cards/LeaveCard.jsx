import React from 'react';
import { Box, Card, CardActions, CardContent, Button, Typography, Stack, Divider } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { deleteLeavesTypeAction } from '../../features/leaveType/leaveType.action';
import { useNotification } from '../../hooks/useNotification';

const LeaveCard = ({ row, setOpenModal, setEdit }) => {
    const renderYesNo = (value) => {
        return value ? 'Yes' : 'No';
    };

    const dispatch = useAppDispatch();
    const showNotification = useNotification();

    const handleDelete = async () => {
        try {
            const res = await dispatch(deleteLeavesTypeAction(row?.uuid));
            if (res?.meta?.requestStatus === "fulfilled") {
                showNotification("Deleted successfully", "success");
            }
            if (res?.meta?.requestStatus === "rejected") {
                showNotification(res?.payload?.response?.data || "Error", "error");
            }
        } catch (error) {
            showNotification("Error", "error");
            console.log('error: ', error);
        }
    };

    return (
        <Box sx={{ width: 300, marginBottom: 2 }}>
            <Card variant="outlined" sx={{ width: '300px', bgcolor: "#F6F8FF" }}>
                <CardContent sx={{ pb: 0 }}>
                    <Typography fontSize={"16px"} fontWeight={600}>
                        {row?.name}
                    </Typography>
                    <Typography fontSize={"12px"} color="text.secondary" gutterBottom>
                        {row?.description}
                    </Typography>

                    <Divider />
                    <Stack direction={"column"}>
                        <Stack gap={1} py={1}>
                            <Stack direction={"row"} gap={1}>
                                <Typography fontSize={"14px"} fontWeight={400} color="#000000">
                                    Encashable:
                                </Typography>
                                <Typography fontSize={"14px"} color="#808080">
                                    {renderYesNo(row?.encashable)}
                                </Typography>
                            </Stack>
                            <Stack direction={"row"} gap={1}>
                                <Typography fontSize={"14px"} fontWeight={400} color="#000000">
                                    Sandwich allowed:
                                </Typography>
                                <Typography fontSize={"14px"} color="#808080" alignContent={"center"}>
                                    {row?.sandwich_allowed}
                                </Typography>
                            </Stack>
                            <Stack direction={"row"} gap={1}>
                                <Typography fontSize={"14px"} fontWeight={400} color="#000000">
                                    Require Attachments:
                                </Typography>
                                <Typography fontSize={"14px"} color="#808080">
                                    {renderYesNo(row?.required_attachment)}
                                </Typography>
                            </Stack>
                            <Stack direction={"row"} gap={1}>
                                <Typography fontSize={"14px"} fontWeight={400} color="#000000">
                                    Minimum number of club days:
                                </Typography>
                                <Typography fontSize={"14px"} color="#808080">
                                    {row?.min_club_days}
                                </Typography>
                            </Stack>
                            <Stack direction={"row"} gap={1}>
                                <Typography fontSize={"14px"} fontWeight={400} color="#000000">
                                    Exclude company holidays:
                                </Typography>
                                <Typography fontSize={"14px"} color="#808080">
                                    {renderYesNo(row?.exclude_company_holidays)}
                                </Typography>
                            </Stack>
                            <Stack direction={"row"} gap={1}>
                                <Typography fontSize={"14px"} fontWeight={400} color="#000000">
                                    Is Paid:
                                </Typography>
                                <Typography fontSize={"14px"} color="#808080">
                                    {renderYesNo(row?.is_paid)}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Divider />
                </CardContent>
                <CardActions>
                    <Stack direction={"row"} sx={{ width: "100%" }} justifyContent={"flex-end"}>
                        <Button size="small" onClick={() => { setEdit(row); setOpenModal(true); }}>
                            Edit
                        </Button>
                        <Button size="small" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Stack>
                </CardActions>
            </Card>
        </Box>
    );
};

export default LeaveCard;
