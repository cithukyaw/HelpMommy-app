import "./Header.scss";

const Header = props => {
    const {title} = props;

    return (
        <div className="header">{title}</div>
    );
};

export default Header;
