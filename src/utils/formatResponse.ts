export function formatNgaySinh(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatPhoneNumber(sdtString: string) {
  // Xóa tất cả các ký tự không phải số
  const numericValue = sdtString.replace(/\D/g, "");

  // Đảm bảo số điện thoại có độ dài hợp lệ
  if (numericValue.length === 10) {
    // Định dạng số điện thoại theo mẫu (XXX) XXX-XXXX
    return `(${numericValue.slice(0, 3)}) ${numericValue.slice(
      3,
      6
    )}-${numericValue.slice(6)}`;
  } else {
    // Trả về số điện thoại ban đầu nếu không hợp lệ
    return sdtString;
  }
}

export function calculateAge(birthDate: string) {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  const age = today.getFullYear() - birthDateObj.getFullYear();

  // Kiểm tra xem ngày sinh trong năm hiện tại đã qua hay chưa
  const isBirthdayPassed =
    today.getMonth() < birthDateObj.getMonth() ||
    (today.getMonth() === birthDateObj.getMonth() &&
      today.getDate() < birthDateObj.getDate());

  // Giảm tuổi nếu chưa đến ngày sinh trong năm hiện tại
  return isBirthdayPassed ? age : age - 1;
}
