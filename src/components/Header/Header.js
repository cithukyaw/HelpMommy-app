import "./Header.scss";

const Header = props => {
    const {title, customClass} = props;

    return (
        <div className="header">
            <img src="./img/logo.png" alt="Help Mommy" className="img-fluid logo" />
            <span className={customClass}>{title}</span>
        </div>
    );
};

export default Header;
