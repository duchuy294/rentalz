(function (document, window) {
    window.CONSTANT_DATA = {
        room: {
            '0': '',
            '1': '1',
            '2': '2',
            '3': '3'
        },
        type: {
            '0': '',
            '1': 'Apartment',
            '2': 'Hotel',
            '3': 'Motel'
        },
        furniture: {
            '0': '',
            '1': 'Furniture',
            '2': 'Unfinished',
            '3': 'Partly Equipped'
        },
        LOCALE_VI: {
            name: 'Tên thuộc tính',
            address: 'Địa chỉ tài sản',
            type: 'Loại bất động sản',
            room: 'Phòng ngủ',
            createdAt: 'Ngày',
            pricePerMonth: 'Giá thuê hàng tháng',
            furniture: 'Các loại đồ nội thất'
        }
    };
    window.formatNumberToMoney = function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    window.toastMessage = function(content, type) {
        const x = document.getElementById('snackbar');
        const msgType = `msg-${type}`;
        x.className = msgType;
        x.innerHTML = content;
        setTimeout(function () {
            x.className = x.className.replace(msgType, '');
        }, 3000);
    }
    window.convertDate = function(date) {
        const d = new Date(date);
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = d.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }
})(document, window);