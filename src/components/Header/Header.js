import "./Header.scss";

const Header = (props) => {
    let {title} = props;

    return (
        <div className="header">{title}</div>
    );
};

export default Header;
