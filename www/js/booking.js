(function (document, window) {
    // Login Section
    if (window.name != 'homepage')
        return false;

    const LOCALE_VI = {
        name: 'Tên thuộc tính',
        address: 'Địa chỉ tài sản',
        type: 'Loại bất động sản',
        room: 'Phòng ngủ',
        createdAt: 'Ngày',
        pricePerMonth: 'Giá thuê hàng tháng',
        furniture: 'Các loại đồ nội thất',
        noted: 'Ghi chú'
    };
    class Property {
        constructor() {
            this.name = $('#name').val() || '';
            this.address = $('#address').val() || '';
            this.type = $('#type').val() || '';
            this.room = $('#room').val() || '';
            this.createdAt = $('#createdAt').val() || '';
            this.pricePerMonth = $('#pricePerMonth').val() || '';
            this.furniture = $('#furniture').val() || '';
            this.noted = $('#noted').val() || '';
        }
        getPropertyInfo() {
            let convertTimeStamp = '';
            if (this.createdAt) {
                convertTimeStamp = new Date(this.createdAt).getTime();
            }
            return {
                name: this.name,
                address: this.address,
                type: this.type,
                room: this.room,
                createdAt: convertTimeStamp, // this.createdAt,
                pricePerMonth: this.pricePerMonth,
                furniture: this.furniture,
                noted: this.noted
            }
        }
    }

    function toastMessage(content, type) {
        const x = document.getElementById('snackbar');
        x.className = `mgs-${type}`;
        x.innerHTML = content;
        setTimeout(function () {
            x.className = x.className.replace('mgs-error', '');
        }, 3000);
    }

    function clearFormData(formData) {
        for (const key in formData) {
            if (formData[key]) {
                $(`#${key}`).val('');
                $(`#${key}`).css('border-color', 'inherit');
            }
        }
    }

    function validateForm(data) {
        let isValid = true;
        for (const key in data) {
            const txt = LOCALE_VI[key];
            if (!data[key]) {
                $(`#${key}`).css('border-color', 'red');
                $(`#${key}`).focus();
                toastMessage(`Vui lòng nhập ${txt}`, 'error');
                isValid = false;
                break;
            } else {
                if (key === 'createdAt') {
                    const value = $(`#${key}`).val();
                    if (value.indexOf('/') === -1) {
                        $(`#${key}`).val('');
                        toastMessage(`Vui lòng chọn ${txt}`, 'error');
                        isValid = false;
                        break;
                    }
                }
                $(`#${key}`).css('border-color', 'green');
            }
        }
        return isValid;
    }

    async function createProperty(formData) {
        const response = await fetch('http://localhost:3000/api/hotel/new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (result.status) {
            toastMessage(result.message, 'success');
            clearFormData(formData);
        }
    }

    function confirm() {
        const property = new Property();
        const propertyInfo = property.getPropertyInfo();
        const isValidFormData = validateForm(propertyInfo);
        if (isValidFormData) {
            createProperty(propertyInfo);
        }
    }

    $('#confirm').on('click', function () {
        confirm();
    });
})(document, window);