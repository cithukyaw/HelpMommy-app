const Error = props => {
    const { field } = props;

    return field && <p className="form-error">{field?.message}</p>;
};

export default Error;
