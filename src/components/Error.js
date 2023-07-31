const Error = props => {
    const { field } = props;

    return field && <p className="form-error my">{field?.message}</p>;
};

export default Error;
