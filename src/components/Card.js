import React, { useState } from 'react';
import { Card as MuiCard, CardContent, Typography, Checkbox, Button } from '@mui/material';
import EditTaskPopup from '../modals/EditTask'; // Ensure this path is correct

const Card = ({ taskObj, index, deleteTask, updateListArray, taskList, setTaskList }) => {
    const [modal, setModal] = useState(false); // 모달의 표시 상태를 관리하는 상태 변수
    const [completed, setCompleted] = useState(taskObj.completed || false); // 할 일 완료 상태를 관리하는 상태 변수

    // 다양한 색상 배열을 정의하여 입력 인덱스에 따라 색상이 다르게 표시되도록 함
    const colors = [
        { primaryColor: "#5D93E1", secondaryColor: "#ECF3FC" },
        { primaryColor: "#F9D288", secondaryColor: "#FEFAF1" },
        { primaryColor: "#5DC250", secondaryColor: "#F2FAF1" },
        { primaryColor: "#F48687", secondaryColor: "#FDF1F1" },
        { primaryColor: "#B964F7", secondaryColor: "#F3F0FD" }
    ];

    // 모달의 표시 상태를 토글하는 함수
    const toggle = () => {
        setModal(!modal);
    };

    // 할 일을 업데이트하고 완료 상태를 저장하는 함수
    const updateTask = (obj) => {
        obj.completed = completed;
        updateListArray(obj, index);
    };

    // 할 일을 삭제하는 함수
    const handleDelete = () => {
        deleteTask(index);
    };

    // 체크박스 변경을 처리하고 완료 상태를 업데이트하는 함수
    const handleCheckboxChange = () => {
        let tempList = [...taskList];
        tempList[index].completed = !completed;
        setCompleted(!completed);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    return (
        <MuiCard 
            variant="outlined" 
            style={{ 
                marginBottom: '15px', 
                backgroundColor: completed ? '#d3d3d3' : '' // 완료된 경우 회색으로 변경
            }}
        >
            <div style={{
                backgroundColor: colors[index % colors.length].primaryColor,
                height: '10px',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px'
            }}></div>
            <CardContent>
                <Typography 
                    variant="h5" 
                    component="div" 
                    style={{ textDecoration: completed ? 'line-through' : 'none' }}
                >
                    <Checkbox checked={completed} onChange={handleCheckboxChange} /> {/* 완료 상태를 위한 체크박스 */}
                    {taskObj.Name}
                </Typography>
                <Typography 
                    variant="body2" 
                    style={{ textDecoration: completed ? 'line-through' : 'none' }}
                >
                    {taskObj.Description}
                </Typography>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={toggle} 
                    style={{ 
                        marginRight: '10px', 
                        borderColor: colors[index % colors.length].primaryColor, 
                        color: colors[index % colors.length].primaryColor 
                    }}
                >
                    Edit
                </Button>
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={handleDelete}
                    style={{ 
                        borderColor: colors[index % colors.length].primaryColor, 
                        color: colors[index % colors.length].primaryColor 
                    }}
                >
                    Delete
                </Button>
            </CardContent>
            <EditTaskPopup modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </MuiCard>
    );
};

export default Card;
