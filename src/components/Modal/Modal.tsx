import style from "./Modal.module.scss"
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { setCloseModal } from '../../redux/slices/modalSlice'

const Modal = () => {
    const dispatch = useAppDispatch();
    const {items} = useAppSelector(state=>state.userSlice);
    const {userId} = useAppSelector(state=>state.modalSlice);
    const userItem = items.filter(item => item.id==userId);
    return (
        <div className={style.modal} onClick={() => dispatch(setCloseModal())}>
            <div className={style.modal__content} onClick={(e) => e.stopPropagation()}>
                <p>ФИО: <span>{userItem[0].firstName} {userItem[0].lastName} {userItem[0].maidenName}</span></p>
                <p>Возраст: <span>{userItem[0].age.toString()}</span></p>
                <p>Город: <span>{userItem[0].address.city}</span></p>
                <p>Улица: <span>{userItem[0].address.address}</span></p>
                <p>Рост: <span>{userItem[0].height.toString()}</span></p>
                <p>Вес: <span>{userItem[0].weight.toString()}</span></p>
                <p>Телефон: <span>{userItem[0].phone}</span></p>
                <p>Почта: <span>{userItem[0].email}</span></p>
            </div>
        </div>
    )
}
export default Modal;
