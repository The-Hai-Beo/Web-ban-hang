function toggleSelectAll() {
    var selectAllCheckbox = document.getElementById("selectAll");
    var selectItemCheckboxes = document.getElementsByClassName("selectItem");

    for (var i = 0; i < selectItemCheckboxes.length; i++) {
        selectItemCheckboxes[i].checked = selectAllCheckbox.checked;
        toggleInput(i + 1);
    }
}

function toggleInput(row) {
    var checkbox = document.getElementsByClassName('selectItem')[row - 1];
    var input = document.getElementById('soLuong' + row);

    if (checkbox.checked) {
        input.disabled = false;
        input.focus();
    } else {
        input.disabled = true;
        input.value = "";
        document.getElementById('tongTien' + row).innerText = "0";
        calculateTotalTatCa();
    }
}

function calculateTotal(row) {
    var donGiaStr = document.getElementById('donGia' + row).innerText;
    var donGia = parseFloat(donGiaStr.replace(/,/g, "")); // Loại bỏ dấu , trong đơn giá
    var soLuong = parseFloat(document.getElementById('soLuong' + row).value);
    var tongTien = donGia * soLuong;

    var formattedTongTien = formatNumberWithCommas(tongTien) + " VND";
    document.getElementById('tongTien' + row).innerText = formattedTongTien;

    calculateTotalTatCa();
}

function calculateTotalTatCa() {
    var tongTienTatCa = 0;
    var selectItemCheckboxes = document.getElementsByClassName("selectItem");

    for (var i = 0; i < selectItemCheckboxes.length; i++) {
        if (selectItemCheckboxes[i].checked) {
            var tongTienStr = document.getElementById('tongTien' + (i + 1)).innerText;
            var tongTien = parseFloat(tongTienStr.replace(/,/g, ""));
            tongTienTatCa += tongTien;
       }
       localStorage.setItem('tongTienTatCa', tongTienTatCa);
    }


    var formattedTongTienTatCa = formatNumberWithCommas(tongTienTatCa) + " VND";
    document.getElementById('tongTienTatCa').innerText = formattedTongTienTatCa;
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

 // Hiển thị tổng giá trị đơn hàng từ file gioHang.js
 const tongTienTatCa = localStorage.getItem('tongTienTatCa');

 if (tongTienTatCa !== null) {
    document.getElementById('tongTienTatCa').textContent = tongTienTatCa !== null 
    ? parseInt(tongTienTatCa).toLocaleString() 
    : "0";

 } else {
     document.getElementById('tongTienTatCa').textContent = "0";
 }
 
     function getCustomerInfo() {
         const name = document.getElementById('name').value;
         const email = document.getElementById('email').value;
         const address = document.getElementById('address').value;
         const phone = document.getElementById('phone').value;
         const total = document.getElementById('tongTienTatCa').textContent;
 
         alert(`Thông tin khách hàng:\nHọ và Tên: ${name}\nEmail: ${email}\nĐịa chỉ: ${address}\nSố điện thoại: ${phone}\nTổng giá trị đơn hàng: ${total} VND`);
     }
// Định nghĩa hàm để xóa mục cụ thể
function clearSpecificItem() {
    localStorage.removeItem('tongTienTatCa');
}

// Sử dụng hàm khi trang được tải lại
window.onload = function() {
    clearSpecificItem();
};
  
