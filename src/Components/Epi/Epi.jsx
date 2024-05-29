const Epi = (props) => {
    const { tapList } = props;

    // Kiểm tra nếu tapList không phải là một mảng
    if (!Array.isArray(tapList)) {
        return <div>Tap list không hợp lệ</div>;
    }
    
    return (
        <div>
            {tapList.map((tap, index) => (
                <button key={index + 1} >
                    Tập {tap}
                </button>
            ))}
        </div>
    );
};

export default Epi;
