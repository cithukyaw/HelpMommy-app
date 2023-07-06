import "./Header.scss";

const Header = props => {
    const {title} = props;

    return (
        <div className="header">
            <img src="./img/logo.png" alt="Help Mommy" className="img-fluid logo" />
            {title}
        </div>
    );
};

export default Header;
