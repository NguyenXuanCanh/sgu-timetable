import React, { useState, useEffect } from 'react'
import Scrapping from '../Scrapping/Scrapping';
import swal from 'sweetalert';
export default function Body() {
    useEffect(() => {
        document.title = "Thời khóa biểu SGU"
    }, []);
    const [id, setId] = useState();
    const [submit, onSubmit] = useState();

    function renderForm() {
        return <form className="text-center bg-gray-50 w-full pt-16">
            <h1 className="text-center text-4xl text-gray-900">Sắp xếp TKB theo tuần</h1>
            <label className="text-xl m-5 block">Nhập mã số sinh viên</label>
            <input className="rounded p-2 border-2 mr-8" type="text" name="id" value={id} onChange={e => setId(e.target.value)} />
            <input className="rounded p-4 bg-blue-400 hover:bg-blue-600 transition-all cursor-pointer text-gray-50" type="submit" value="Xác nhận" onClick={(e) => {
                e.preventDefault();
                if (submit) {
                    window.location.reload();
                } else if (!id) {
                    swal("Úi!", "Bạn chưa nhập MSSV kìa!", "error");
                } else if (id > 10000000000 || id < 1000000000) {
                    swal("Úi!", "MSSV có 10 ký tự. Bạn kiểm tra lại nhé!", "error");
                }
                else {
                    swal("Đang tìm mssv!", "Nếu lâu quá chưa nhận được kết quả, bạn vui lòng tải lại trang giúp mình nhé!", "success");
                    onSubmit(true);
                }
            }} />
            <label className="text-xl block">Nếu muốn xem nhiều MSSV, bạn vui lòng tải lại trang giúp mình nhé</label>
        </form>
    }

    function renderScraper() {
        return <div>
            <Scrapping id={id}></Scrapping>
        </div>
    }

    return (
        <div className="w-10/12 m-auto mt-16 pb-16 bg-gray-50 wrapper">
            {renderForm()}
            {(submit) ? renderScraper() : ''}
        </div>
    )
}
