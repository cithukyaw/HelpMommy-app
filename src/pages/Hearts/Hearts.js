import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import ListCard from "../../components/ListCard/ListCard";

const Hearts = () => {
    return (
        <>
            <Header title="Hearts Earned History"/>
            <div className="container">
                <ListCard title="Today" index={1}/>
                <ListCard title="Yesterday"/>
                <ListCard title="2 days ago"/>
            </div>
            <Navbar/>
        </>
    );
};

export default Hearts;
