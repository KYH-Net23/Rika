import PropTypes from "prop-types";

const LoginButton = ({label, color, textColor, onClick}) => {
    return (
        <button
            type="submit"
            onClick={onClick}
            style={{backgroundColor:color, color:textColor}}
                className="w-11/12 mb-4 h-12 text-white rounded-3xl p-1 font-bold size-4 border border-gray-300">{label}
        </button>
    )
}

LoginButton.propTypes = {
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    textColor: PropTypes.string,
    onClick: PropTypes.func
}

export default LoginButton
