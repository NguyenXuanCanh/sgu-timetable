import React, { useState, useEffect } from 'react'
export default function Scrapping(props) {

    let [data, setData] = useState();

    useEffect(() => {
        async function callAPI() {
            await fetch(`https://sgu-timetable.herokuapp.com/get/${props.id}`)
                .then((res) => res.text())
                .then((res) => {
                    setData(JSON.parse(res));
                })
        }
        callAPI();
    }, []);

    function renderTable() {
        return <React.Fragment>
            <table className="table-auto p-5 m-auto bg-gray-50 w-full">
                <thead>
                    <tr>
                        {(data) ? data[0].srcTxtSv : ''}
                    </tr>
                    <tr>
                        <th className="bg-blue-300 border border-emerald-500 px-4 py-2 text-emerald-600">Tiết</th>
                        <th className="bg-blue-300 border border-emerald-500 px-4 py-2 text-emerald-600">Thứ 2</th>
                        <th className="bg-blue-300 border border-emerald-500 px-4 py-2 text-emerald-600">Thứ 3</th>
                        <th className="bg-blue-300 border border-emerald-500 px-4 py-2 text-emerald-600">Thứ 4</th>
                        <th className="bg-blue-300 border border-emerald-500 px-4 py-2 text-emerald-600">Thứ 5</th>
                        <th className="bg-blue-300 border border-emerald-500 px-4 py-2 text-emerald-600">Thứ 6</th>
                        <th className="bg-blue-300 border border-emerald-500 px-4 py-2 text-emerald-600">Thứ 7</th>
                        <th className="bg-blue-300 border border-emerald-500 px-4 py-2 text-emerald-600">Chủ Nhật</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTimeTable()}
                </tbody>
            </table >
            {(data) ? <div className="mt-6">
                {data[0].txtSv}
            </div> : ""}
        </React.Fragment>
    }


    function renderTimeTable() {
        let tableData = new Array(7);
        for (let i = 0; i < tableData.length; i++) {
            tableData[i] = new Array(10);

        }

        data?.map((item, index) => {
            let phongHoc = '';
            console.log(item)
            for (let i in item['NgayHoc']) {
                phongHoc = item['PhongHoc'][i];
                let thuBangSo;
                switch (item['NgayHoc'][i]) {
                    case 'Hai': {
                        thuBangSo = 0;
                        break;
                    }
                    case 'Ba': {
                        thuBangSo = 1;
                        break;
                    }
                    case 'Tư': {
                        thuBangSo = 2;
                        break;
                    }
                    case 'Năm': {
                        thuBangSo = 3;
                        break;
                    }
                    case 'Sáu': {
                        thuBangSo = 4;
                        break;
                    }
                    case 'Bảy': {
                        thuBangSo = 5;
                        break;
                    }
                    default: {
                        thuBangSo = 6;
                        break;
                    }
                }
                let count = 0;
                let TietBD = parseInt(item['TietBD'][i] - 1)
                while (count < item['SoTiet'][i]) {
                    tableData[thuBangSo][TietBD + count] = { ...item };
                    tableData[thuBangSo][TietBD + count].newPhongHoc = phongHoc
                    count++;
                }
            }
        })

        let reverseTableData = new Array(10);
        for (let i = 0; i < 10; i++) {
            reverseTableData[i] = new Array(7);
        }

        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 10; j++) {
                if (tableData[i][j]) {
                    reverseTableData[j][i] = {};
                    reverseTableData[j][i] = tableData[i][j];
                }
            }
        }

        for (let i = 0; i < 10; i++) {
            reverseTableData[i][7] = i + 1;
        }
        console.log(tableData)
        return reverseTableData?.map((itemTable, index) => {
            return <tr key={index} className={(index == 5) ? "my-bt" : ''}>
                <td className="p-0 border-emerald-500 my-br text-emerald-600 font-semibold text-center bg-blue-300">
                    {(itemTable[7]) ? <div>
                        {itemTable[7]}
                    </div> : ''}
                </td>
                <td className="p-0 border-emerald-500 my-br text-emerald-600 text-center ">
                    {(itemTable[0]) ? <div className="bg-red-200 px-4 py-2 tooltip">
                        {itemTable[0]['TenMH']}
                        <span class="tooltiptext">
                            <div>
                                Mã MH: {itemTable[0]['MaMH']}
                            </div>
                            <div>
                                Mã Nhóm: {itemTable[0]['MaNhom']}
                            </div>
                            <div>
                                Phòng: {itemTable[0]['newPhongHoc']}
                            </div>
                        </span>
                    </div> : ''}
                </td>
                <td className="p-0 border-emerald-500 my-br text-emerald-600 font-medium text-center">
                    {(itemTable[1]) ? <div className="bg-red-200 px-4 py-2 tooltip">
                        {itemTable[1]['TenMH']}
                        <span class="tooltiptext">
                            <div>
                                Mã MH: {itemTable[1]['MaMH']}
                            </div>
                            <div>
                                Mã Nhóm: {itemTable[1]['MaNhom']}
                            </div>
                            <div>
                                Phòng: {itemTable[1]['newPhongHoc']}
                            </div>
                        </span>
                    </div> : ''}
                </td>
                <td className="p-0 border-emerald-500 my-br text-emerald-600 font-medium text-center">
                    {(itemTable[2]) ? <div className="bg-red-200 px-4 py-2 tooltip">
                        {itemTable[2]['TenMH']}
                        <span class="tooltiptext">
                            <div>
                                Mã MH: {itemTable[2]['MaMH']}
                            </div>
                            <div>
                                Mã Nhóm: {itemTable[2]['MaNhom']}
                            </div>
                            <div>
                                Phòng: {itemTable[2]['newPhongHoc']}
                            </div>
                        </span>
                    </div> : ''}
                </td>
                <td className="p-0 border-emerald-500 my-br text-emerald-600 font-medium text-center">
                    {(itemTable[3]) ? <div className="bg-red-200 px-4 py-2 tooltip">
                        {itemTable[3]['TenMH']}
                        <span class="tooltiptext">
                            <div>
                                Mã MH: {itemTable[3]['MaMH']}
                            </div>
                            <div>
                                Mã Nhóm: {itemTable[3]['MaNhom']}
                            </div>
                            <div>
                                Phòng: {itemTable[3]['newPhongHoc']}
                            </div>
                        </span>
                    </div> : ''}
                </td>
                <td className="p-0 border-emerald-500 my-br text-emerald-600 font-medium text-center">
                    {(itemTable[4]) ? <div className="bg-red-200 px-4 py-2 tooltip">
                        {itemTable[4]['TenMH']}
                        <span class="tooltiptext">
                            <div>
                                Mã MH: {itemTable[4]['MaMH']}
                            </div>
                            <div>
                                Mã Nhóm: {itemTable[4]['MaNhom']}
                            </div>
                            <div>
                                Phòng: {itemTable[4]['newPhongHoc']}
                            </div>
                        </span>
                    </div> : ''}
                </td>
                <td className="p-0 border-emerald-500 my-br text-emerald-600 font-medium text-center">
                    {(itemTable[5]) ? <div className="bg-red-200 px-4 py-2 tooltip">
                        {itemTable[5]['TenMH']}
                        <span class="tooltiptext">
                            <div>
                                Mã MH: {itemTable[5]['MaMH']}
                            </div>
                            <div>
                                Mã Nhóm: {itemTable[5]['MaNhom']}
                            </div>
                            <div>
                                Phòng: {itemTable[5]['newPhongHoc']}
                            </div>
                        </span>
                    </div> : ''}
                </td>
                <td className="p-0 border-emerald-500 text-emerald-600 font-medium text-center">

                </td>
            </tr>
        })
    }

    return (
        <React.Fragment>
            {renderTable()}
        </React.Fragment>
    )
}
