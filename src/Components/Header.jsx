import React from "react";
import s from "./Header.module.css"

function Header(props) {
    return (
        <div className={s.header}>
            <span className={s.logo}>Converter!</span>
            <div className={s.HeaderValues}>
                <span >USD $ {props.values.USD}</span>
                <span>EUR € {props.values.EUR}</span>
            </div>

        </div>
    )
}

export default Header;