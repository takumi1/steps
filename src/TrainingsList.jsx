import React, { useState } from 'react';
import './App.css'
import Track from "./Track";

const TrainingsList = () => {
    const [dateInput, setDateInput] = useState('')
    const [distanceInput, setDistanceInput] = useState('')
    const [form, setForm] = useState([]);


    const handleDate = e => {
        let checkNull = e.target.value.split('.');
        let checkDate = checkNull[0]
        let checkMonth = checkNull[1]
        if (checkDate && checkDate.startsWith('0')) checkDate = checkDate.slice(1)
        if (checkMonth && checkMonth.startsWith('0')) checkMonth = checkMonth.slice(1)
        checkNull[0] = checkDate
        checkNull[1] = checkMonth
        let finalDate = checkNull.join('.')
        setDateInput(finalDate)
    };

    const handleDistance = e => {
        setDistanceInput(e.target.value)
    };

    let nonSortedState = [];
    const sortDate = () => {
        let arr = [];
        let newDate

        for (let i of nonSortedState) {
            arr = i.date.toString().split('.');
            arr = arr.map(parseFloat)
            newDate = Math.floor(new Date(arr[2], arr[1] - 1, arr[0]).getTime() / 1000)
            i.date = newDate;
        }

        nonSortedState.sort((prv, nxt) => prv.date - nxt.date);

        for (let i of nonSortedState) {
            i.date = `${new Date(i.date * 1000).getDate()}.${new Date(i.date * 1000).getMonth() + 1}.${new Date(i.date * 1000).getFullYear()}`;
        }
        setForm(nonSortedState)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            'date': dateInput,
            'distance': distanceInput
        };
        nonSortedState = ([...form]);
        let addDistance = nonSortedState.find(item => item.date === dateInput)
        if (addDistance) addDistance.distance = parseFloat(addDistance.distance)
        if (addDistance) addDistance.distance += +distanceInput
        else nonSortedState = ([...form, newItem]);
        sortDate();
    };


    const deleteItem = (item) => {
        let delArr = form;
        let delItem = delArr.findIndex(el => el.date === item.date)
        delArr.splice(delItem, 1)
        setForm([...delArr])
    }

    return (
        <div className='trainingsContainer'>
            <form className='inputForm' onSubmit={handleSubmit}>

                <div className="dateContainer">

                    <label htmlFor="date">Дата(ДД.ММ.ГГ)</label>

                    <input name='date' className='date'
                           type="text"
                           value={form.date}
                           onChange={handleDate}

                    /></div>

                <div className="distanceContainer">

                    <label htmlFor="distance">Пройдено км</label>

                    <input name='distance' className='distance'
                           type="text"
                           value={form.distance}
                           onChange={handleDistance}
                    /></div>

                <button>OK</button>

            </form>
            <div className="contentContainer">
                <div className="labels">
                    <span>Дата(ДД.ММ.ГГ)</span>
                    <span>Пройдено км</span>
                    <span>Действия</span>
                </div>
                <div className="trackList">
                    {
                        form.map((item, index) =>
                            <Track key={index} date={item.date} distance={item.distance}
                                   delete={() => deleteItem(item)}/>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default TrainingsList;
