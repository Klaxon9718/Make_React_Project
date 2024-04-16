import PropTypes from 'prop-types'
import styles from "./Button.module.css"

function Button({text}){
    return (
        //className 추가
        <button className={styles.btn}>{text}</button>
    )
}

Button.propTypes = {
    text: PropTypes.string.isRequired
}

//App.js에서 import 하기위해 해당 코드를 추가한다
export default Button;