
const RepositoriesForm = (props) => {
    const { onChange, onSubmit } = props;

    return (
        <form className="mb-4 form-inline" onSubmit={onSubmit}>
            <div className="form-group mx-sm-3 mb-2">
                <label htmlFor="inputSearch" className="sr-only">Search</label>
                <input type="text" className="form-control" id="inputSearch" placeholder="Enter repository..." onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary mb-2">Search</button>
        </form>
    )
}

