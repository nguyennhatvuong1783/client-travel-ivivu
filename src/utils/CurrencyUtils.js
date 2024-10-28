export const formatCurrency = (amount) => {
    const formattedNumber = new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0, // Không hiển thị số thập phân
    }).format(amount);

    return (
        <>
            {formattedNumber} <span style={{ fontSize: '0.8em' }}>VND</span>
        </>
    );
};