import React from 'react'
import style from "./Home.module.scss"
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { fetchUsers } from '../redux/slices/userSlice';
import Table from '../components/Table/Table';
import Input from '../components/Input/Input';
import Modal from '../components/Modal/Modal';

const Home = () => {
    const dispatch = useAppDispatch();
    const { openModal } = useAppSelector(state => state.modalSlice)
    React.useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    return (
        <div className={style.wrapper}>
            <Input />
            <Table />
            {
                openModal && <Modal />
            }
        </div>
    )
}
export default Home;