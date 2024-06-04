import React, { useEffect, useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import CreateTaskPopup from '../modals/CreateTask'; 
import Card from './Card';

const TodoList = () => {
    const [modal, setModal] = useState(false); // 모달의 표시 상태를 관리하는 상태 변수
    const [taskList, setTaskList] = useState([]); // 할 일 목록을 저장하는 상태 변수

    // 컴포넌트가 마운트될 때 로컬 스토리지에서 할 일 목록을 불러옴
    useEffect(() => {
        let arr = localStorage.getItem("taskList");
        if (arr) {
            let obj = JSON.parse(arr);
            setTaskList(obj);
        }
    }, []);

    // 할 일을 삭제하는 함수
    const deleteTask = (index) => {
        let tempList = [...taskList];
        tempList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    // 할 일을 업데이트하는 함수
    const updateListArray = (obj, index) => {
        let tempList = [...taskList];
        tempList[index] = obj;
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    // 모달의 표시 상태를 토글하는 함수
    const toggle = () => {
        setModal(!modal);
    };

    // 새로운 할 일을 저장하는 함수
    const saveTask = (taskObj) => {
        let tempList = [...taskList];
        tempList.push(taskObj);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
    };

    return (
        <Container>
            <Box textAlign="center" mt={4}>
                <Typography variant="h4">Todo List</Typography>
                <Button variant="contained" color="primary" onClick={toggle} style={{ marginTop: '20px' }}>
                    Create Task
                </Button>
            </Box>
            <Box mt={4}>
                {taskList && taskList.map((obj, index) => (
                    <Card
                        key={index}
                        taskObj={obj}
                        index={index}
                        deleteTask={deleteTask}
                        updateListArray={updateListArray}
                        taskList={taskList}
                        setTaskList={setTaskList}
                    />
                ))}
            </Box>
            <CreateTaskPopup toggle={toggle} modal={modal} save={saveTask} />
        </Container>
    );
};

export default TodoList;
