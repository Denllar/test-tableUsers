import React from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/hook';
import style from "./Table.module.scss"
import { setOpenModal } from '../../redux/slices/modalSlice';
import Loader from './Loader';
import { usersType } from '../../redux/slices/userSlice';


type sortConfigType = {
    key: string,
    direction: string,
}

const useSortableData = (items: usersType[], setReset: (arg0: boolean) => void, config = null) => {
    const [sortConfig, setSortConfig] = React.useState<sortConfigType | null>(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            if (sortConfig.key === 'city' || sortConfig.key === 'address') {
                sortableItems.sort((a, b): number => {
                    if (a.address[sortConfig.key] < b.address[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a.address[sortConfig.key] > b.address[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                });
            } else {
                sortableItems.sort((a, b) => {
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                });
            }
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key: string) => {
        setReset(true);
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

    };
    return { itemsCopy: sortedItems, requestSort, sortConfig, setSortConfig };
};


const Table: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, status } = useAppSelector(state => state.userSlice);
    const [reset, setReset] = React.useState(false);
    const { firstName, lastName, maidenName, age, gender, phone, city, street } = useAppSelector(state => state.inputSlice);

    const { itemsCopy, requestSort, sortConfig, setSortConfig } = useSortableData(items, setReset);

    const ageFunc = (item: usersType) => {
        if (age === "" || Number(item.age) === Number(age)) {
            return true;
        } else {
            return false;
        }
    };

    const getClassNamesFor = (name: string) => {
        if (!sortConfig) {
            return;
        }
        const directionFunc = () => {
            if (sortConfig.direction === 'ascending') {
                return '👇';
            } else if (sortConfig.direction === 'descending') {
                return '☝️';
            }
        }
        return sortConfig.key === name ? directionFunc() : undefined;
    };

    const renderItems = reset ? itemsCopy : items;

    if (status === 'loading') {
        return (
            <div className={style.main}>
                <h2>Загрузка...</h2>
                <table className={style.loaderTable}>
                    <thead>
                        <tr>
                            <th><p style={{ opacity: 0.6 }}>№</p></th>
                            <th><button>Имя</button></th>
                            <th><button>Фамилия</button></th>
                            <th><button>Отчество</button></th>
                            <th><button>Возраст</button></th>
                            <th><button>Пол</button></th>
                            <th><button>Номер телефона</button></th>
                            <th><button>Город</button></th>
                            <th><button>Улица</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><p>1</p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                        </tr>
                        <tr>
                            <td><p>2</p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                        </tr>
                        <tr>
                            <td><p>3</p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                            <td><p><Loader /></p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    if (status === 'error') {
        return (
            <h2>Ошибка! Попробуйте позже</h2>
        )
    }

    if (renderItems.length === 0) {
        return (
            <h2>Нет пользователей</h2>
        )
    }

    const clearRequestSort = () => {
        setReset(false);
        setSortConfig(null);
    }

    return (
        <main className={style.main}>
            <button className={style.removeBtn} onClick={clearRequestSort} disabled={reset === false}>Сбросить</button>
            <table className={style.tableUsers}>
                <thead>
                    <tr>
                        <th></th>
                        <th><button onClick={() => requestSort('firstName')}>Имя  {getClassNamesFor('firstName')}</button></th>
                        <th><button onClick={() => requestSort('lastName')}>Фамилия {getClassNamesFor('lastName')}</button></th>
                        <th><button onClick={() => requestSort('maidenName')}>Отчество {getClassNamesFor('maidenName')}</button></th>
                        <th><button onClick={() => requestSort('age')}>Возраст {getClassNamesFor('age')}</button></th>
                        <th><button onClick={() => requestSort('gender')}>Пол {getClassNamesFor('gender')}</button></th>
                        <th><button>Номер телефона</button></th>
                        <th><button onClick={() => requestSort('city')}>Город {getClassNamesFor('city')}</button></th>
                        <th><button onClick={() => requestSort('address')}>Улица {getClassNamesFor('address')}</button></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        renderItems
                            .filter(item => item.firstName.toUpperCase().includes(firstName.toUpperCase()))
                            .filter(item => item.lastName.toUpperCase().includes(lastName.toUpperCase()))
                            .filter(item => item.maidenName.toUpperCase().includes(maidenName.toUpperCase()))
                            .filter(ageFunc)
                            .filter(item => item.gender !== gender)
                            .filter(item => item.phone.toUpperCase().includes(phone.toUpperCase()))
                            .filter(item => item.address.city.toUpperCase().includes(city.toUpperCase()))
                            .filter(item => item.address.address.toUpperCase().includes(street.toUpperCase()))
                            .map((item, index) => (
                                <tr key={String(item.id)} className='user' onClick={() => dispatch(setOpenModal(item.id))}>
                                    <td><p>{index + 1}</p></td>
                                    <td><p>{item.firstName}</p></td>
                                    <td><p>{item.lastName}</p></td>
                                    <td><p>{item.maidenName}</p></td>
                                    <td><p>{Number(item.age)}</p></td>
                                    <td><p>{item.gender}</p></td>
                                    <td><p>{item.phone}</p></td>
                                    <td><p>{item.address.city}</p></td>
                                    <td><p>{item.address.address}</p></td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </main>
    )
}
export default Table;