import React from 'react'
import style from './Input.module.scss'
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { setAddFirstName, setAddLastName, setAddMaidenName, setAddAge, setAddGender, setAddPhone, setAddCity, setAddStreet, setClearInput } from '../../redux/slices/inputSlice';

const Input = () => {
    const dispatch = useAppDispatch();
    const { firstName, lastName, maidenName, age, gender, phone, city, street } = useAppSelector(state => state.inputSlice)
    const [isDisabled, setIsDisabled] = React.useState(false);


    React.useEffect(() => {
        const disabledButoon = () => {
            if (firstName.length === 0 && lastName.length === 0 && maidenName.length === 0 && age.length === 0 && gender.length === 0 && phone.length === 0 && city.length === 0 && street.length === 0) {
                setIsDisabled(false);
            } else {
                setIsDisabled(true);
            }
        }
        disabledButoon();
    }, [firstName, lastName, maidenName, age, gender, phone, city, street]);

    return (
        <div className={style.wrapper}>
            <div className={style.main}>
                <h2>Поиск</h2>
                <div className={style.container}>
                    <div className={style.input}>
                        <p>Имя</p>
                        <input onChange={(event) => dispatch(setAddFirstName(event.target.value))} value={firstName} />
                    </div>
                    <div className={style.input}>
                        <p>Фамилия</p>
                        <input onChange={(event) => dispatch(setAddLastName(event.target.value))} value={lastName} />
                    </div>
                    <div className={style.input}>
                        <p>Отчество</p>
                        <input onChange={(event) => dispatch(setAddMaidenName(event.target.value))} value={maidenName} />
                    </div>
                    <div className={style.input}>
                        <p>Возраст</p>
                        <input onChange={(event) => dispatch(setAddAge(event.target.value))} value={age} type='number' />
                    </div>
                    <div className={style.input}>
                        <p>Пол</p>
                        <select onChange={(event) => dispatch(setAddGender(event.target.value))} value={gender}>
                            <option value="">все</option>
                            <option value="male">жен.</option>
                            <option value="female">муж.</option>
                        </select>
                    </div>
                    <div className={style.input}>
                        <p>Номер телефон</p>
                        <input onChange={(event) => dispatch(setAddPhone(event.target.value))} value={phone} />
                    </div>
                    <div className={style.input}>
                        <p>Город</p>
                        <input onChange={(event) => dispatch(setAddCity(event.target.value))} value={city} />
                    </div>
                    <div className={style.input}>
                        <p>Улица</p>
                        <input onChange={(event) => dispatch(setAddStreet(event.target.value))} value={street} />
                    </div>
                </div>
                <button disabled={isDisabled === false} onClick={() => dispatch(setClearInput())}>Очистить</button>
            </div>
        </div>
    )
}
export default Input;
